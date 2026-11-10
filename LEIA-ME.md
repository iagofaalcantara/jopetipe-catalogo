# Catálogo JOPETIPE — como usar

## O que tem na pasta
- `index.html` — o site inteiro (visual, sacola, busca, pedido pelo WhatsApp).
- `produtos.json` — cópia de reserva dos produtos (o site usa se a planilha não abrir).
- `produtos-planilha.csv` — a mesma lista em formato de planilha (modelo para importar no Google Planilhas).
- `images/` — as fotos das peças (`images/<REFERÊNCIA>.webp`).
- `docs/PLANILHA.md` — **guia de quem edita os produtos** (leia este!).
- `scripts/validar-produtos.mjs` — confere a planilha e atualiza o `produtos.json`.

## Adicionar ou alterar produtos
Os produtos vêm da aba **Catálogo** do Google Planilhas. O link já está configurado em `sheetCsvUrl` (bloco CONFIGURAÇÃO do `index.html`).

**Passo a passo completo, em português simples: [docs/PLANILHA.md](docs/PLANILHA.md)** — colunas, como adicionar, esconder e destacar peças, como subir fotos e o que fazer se algo não aparecer.

Ordem que o site segue para ler os produtos: planilha → última lista guardada no navegador → `produtos.json`.

## Conferir a planilha (opcional, para quem tem Node instalado)
```
node scripts/validar-produtos.mjs                 # aponta referência repetida, preço inválido, categoria vazia, foto que falta
node scripts/validar-produtos.mjs --gerar-json    # confere e atualiza o produtos.json com o que está na planilha
```
Rode `--gerar-json` de vez em quando e publique o `produtos.json` novo, para a cópia de reserva ficar em dia.

## Outros ajustes
- WhatsApp, Instagram e e-mail: bloco CONFIGURAÇÃO no começo do script do `index.html`.
- Textos de entrega, trocas e cuidados: seção "Confiança" do `index.html`. Os de entrega e trocas são genéricos; ajuste para a política real da loja.
