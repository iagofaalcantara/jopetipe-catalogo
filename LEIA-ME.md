# Catálogo JOPETIPE — como usar

## O que tem na pasta
- `index.html` — o site inteiro (visual, sacola, busca, pedido pelo WhatsApp).
- `produtos.json` — lista dos produtos que o site mostra.
- `produtos-planilha.csv` — a mesma lista em formato de planilha (abra no Excel ou Google Planilhas).
- `images/` — as fotos das peças (`images/<REFERÊNCIA>.webp`).

## Colocar no ar (grátis)
1. Crie uma conta gratuita em **Cloudflare Pages** (ou Netlify) e escolha "enviar arquivos" (upload direto).
2. Envie esta pasta inteira (sem compactar, ou o ZIP, conforme a plataforma pedir).
3. Registre o domínio em nome dela (por exemplo `jopetipe.com.br`, em torno de R$ 40/ano no Registro.br) e aponte para o site na própria plataforma.

## Adicionar ou alterar produtos
**Jeito simples (sem mexer em código): Google Planilhas**
1. Importe `produtos-planilha.csv` no Google Planilhas.
2. Arquivo > Compartilhar > Publicar na web > escolha a aba e o formato **CSV** > Publicar. Copie o link.
3. No `index.html`, cole o link em `sheetCsvUrl` (bloco CONFIGURAÇÃO, no começo do script).
4. Daí em diante, ela edita a planilha (nome, preço, categoria, "Ativo" = Sim/Não) e o site atualiza sozinho.
5. Foto nova: salve em `images/` com o nome da referência (ex.: `PROD-048.webp`) e reenvie a pasta `images`. Deixe a coluna "Imagem" em branco ou preencha com `images/PROD-048.webp`.

**Jeito direto:** edite `produtos.json` e reenvie o arquivo.

## Outros ajustes
- WhatsApp, Instagram e e-mail: bloco CONFIGURAÇÃO no começo do script do `index.html`.
- Textos de entrega, trocas e cuidados: seção "Confiança" do `index.html`. Os de entrega e trocas são genéricos; ajuste para a política real da loja.
