#!/usr/bin/env node
/*
  Confere a planilha de produtos e (opcionalmente) atualiza o produtos.json.

  Uso:
    node scripts/validar-produtos.mjs                      confere o link da planilha que está no index.html
    node scripts/validar-produtos.mjs arquivo.csv          confere um CSV local
    node scripts/validar-produtos.mjs <link-csv>           confere um link CSV
    node scripts/validar-produtos.mjs --gerar-json         confere e grava o produtos.json
    (a opção --gerar-json pode ser combinada com qualquer origem acima)

  Sem dependências. As regras de leitura (preço, Sim/Não, linhas ignoradas) são as mesmas do index.html.
*/
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const gerarJson = args.includes("--gerar-json");
let origem = args.find((a) => !a.startsWith("--"));

if (!origem) {
  const html = readFileSync(join(RAIZ, "index.html"), "utf8");
  origem = (html.match(/sheetCsvUrl:\s*"([^"]+)"/) || [])[1];
  if (!origem) {
    console.error("Não achei o link da planilha no index.html. Informe um arquivo ou link: node scripts/validar-produtos.mjs <arquivo-ou-link>");
    process.exit(2);
  }
}

/* ---------- leitura (espelha o index.html) ---------- */
const norm = (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

function parseCSV(text) {
  const rows = [];
  let row = [], cur = "", q = false, linha = 1, inicio = 1;
  const fecha = () => {
    row.push(cur); cur = "";
    rows.push({ cells: row, linha: inicio });
    row = []; inicio = linha;
  };
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else q = false; }
      else { if (c === "\n") linha++; cur += c; }
    } else if (c === '"') q = true;
    else if (c === ",") { row.push(cur); cur = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      linha++; fecha();
    } else cur += c;
  }
  if (cur !== "" || row.length) fecha();
  return rows.filter((r) => r.cells.some((x) => x.trim() !== ""));
}

function parsePreco(v) {
  let s = String(v == null ? "" : v).replace(/[^\d,.]/g, "");
  if (!s) return NaN;
  const c = s.lastIndexOf(","), d = s.lastIndexOf(".");
  if (c >= 0 && d >= 0) { const m = Math.max(c, d); s = s.slice(0, m).replace(/[.,]/g, "") + "." + s.slice(m + 1); }
  else if (c >= 0) s = s.split(",").length > 2 ? s.replace(/,/g, "") : s.replace(",", ".");
  else if (d >= 0 && /^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, "");
  return parseFloat(s);
}

function imgUrl(u) {
  u = String(u || "").trim();
  const m = /^https?:\/\/(?:drive|docs)\.google\.com\/(?:file\/d\/|open\?(?:[^#]*&)?id=|uc\?(?:[^#]*&)?id=|thumbnail\?(?:[^#]*&)?id=)([\w-]{10,})/.exec(u);
  return m ? `https://drive.google.com/thumbnail?id=${m[1]}&sz=w1000` : u;
}

async function lerTexto(o) {
  if (/^https?:\/\//i.test(o)) {
    const r = await fetch(o);
    if (!r.ok) throw new Error(`o link respondeu com erro ${r.status}`);
    return r.text();
  }
  if (!existsSync(o)) throw new Error(`arquivo não encontrado: ${o}`);
  return readFileSync(o, "utf8");
}

/* ---------- conferência ---------- */
const avisos = [];
const aviso = (linha, msg) => avisos.push(`Linha ${linha}: ${msg}`);

let texto;
try { texto = await lerTexto(origem); }
catch (e) { console.error(`Não consegui ler a planilha (${e.message}).`); process.exit(2); }

const rows = parseCSV(texto.replace(/^﻿/, ""));
const cab = (rows[0]?.cells || []).map((x) => norm(x).replace(/\(.*?\)/g, "").replace(/\s+/g, " ").trim());
if (!rows.length || (cab.indexOf("referencia") < 0 && cab.indexOf("ref") < 0) || cab.indexOf("nome") < 0) {
  console.error("Isto não parece a planilha de produtos: faltam as colunas Referência e Nome na primeira linha.");
  process.exit(2);
}
const col = (r, nomes) => {
  for (const n of nomes) { const ix = cab.indexOf(n); if (ix >= 0) return (r[ix] || "").trim(); }
  return "";
};
const sim = (v) => /^(sim|s|true|1|x|yes)$/.test(norm(v));
const nao = (v) => /^(nao|n|false|0|no|inativo)$/.test(norm(v));

const vistos = new Map(); // referência -> linha
const produtos = [];
let lidas = 0;

for (const { cells: r, linha } of rows.slice(1)) {
  lidas++;
  const ref = col(r, ["referencia", "ref"]);
  const nome = col(r, ["nome"]);
  const precoTxt = col(r, ["preco", "valor"]);
  const preco = parsePreco(precoTxt);
  const categoria = col(r, ["categoria"]);
  const ativo = !nao(col(r, ["ativo"]));
  const imagem = col(r, ["imagem", "foto"]);

  if (!ref) { aviso(linha, "sem Referência — a linha será ignorada."); continue; }
  if (vistos.has(ref)) { aviso(linha, `referência repetida (${ref} já está na linha ${vistos.get(ref)}) — a linha será ignorada.`); continue; }
  if (!nome) { aviso(linha, `${ref} está sem Nome — a linha será ignorada.`); continue; }
  if (!isFinite(preco) || preco <= 0) { aviso(linha, `${ref} com preço inválido (${precoTxt ? `"${precoTxt}"` : "vazio"}) — a linha será ignorada.`); continue; }
  vistos.set(ref, linha);
  if (!categoria) aviso(linha, `${ref} sem Categoria — vai aparecer em "Outros".`);

  const arq = imgUrl(imagem) || `images/${ref}.webp`;
  if (/drive\.google\.com|docs\.google\.com/i.test(imagem) && !/[?&]id=[\w-]{10,}|\/file\/d\/[\w-]{10,}/.test(imagem)) {
    aviso(linha, `${ref}: o link do Drive na coluna Imagem não parece um link de arquivo.`);
  } else if (ativo && !/^(https?:)?\/\//i.test(arq) && !existsSync(join(RAIZ, arq))) {
    aviso(linha, `${ref} sem foto: não existe ${arq} (suba a foto no GitHub ou cole o link do Drive na coluna Imagem).`);
  }

  produtos.push({
    ref, nome, categoria: categoria || "Outros", preco, imagem: arq,
    selo: col(r, ["selo"]), data: col(r, ["data"]),
    tags: col(r, ["tags"]).split(",").map((t) => t.trim()).filter(Boolean),
    descricao: col(r, ["descricao"]), ativo,
    doisBanhos: sim(col(r, ["dois banhos", "doisbanhos"])), destaque: sim(col(r, ["destaque"])),
  });
}

const ativas = produtos.filter((p) => p.ativo).length;
console.log(`Origem: ${/^https?:/i.test(origem) ? "link da planilha" : origem}`);
console.log(`${lidas} linhas lidas, ${produtos.length} peças válidas (${ativas} à venda, ${produtos.length - ativas} escondidas).`);
avisos.forEach((a) => console.log("  - " + a));
console.log(avisos.length ? `${avisos.length} ponto(s) para corrigir.` : "Tudo certo.");

if (gerarJson) {
  if (!produtos.length) {
    console.error("Não gravei o produtos.json: nenhuma peça válida foi encontrada.");
    process.exit(1);
  }
  writeFileSync(join(RAIZ, "produtos.json"), JSON.stringify(produtos, null, 2) + "\n");
  console.log(`produtos.json atualizado com ${produtos.length} peças.`);
}
process.exit(avisos.length ? 1 : 0);
