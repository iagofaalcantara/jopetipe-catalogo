# Como cuidar dos produtos pela planilha

Tudo o que aparece na vitrine vem da aba **Catálogo** da planilha do Google. Mudou na planilha, muda no site.

## O que cada coluna significa

| Coluna | O que colocar |
|---|---|
| **Referência** | Código único da peça, ex.: `PROD-048`. Não repita e não deixe em branco. |
| **Nome** | `Título | subtítulo`. Ex.: `Pulseira Opaline | Riviera premium elegance`. O que vem antes da barra `|` é o título; depois, o subtítulo (pode ficar sem). |
| **Categoria** | Colares, Brincos, Anéis, Pulseiras, Braceletes, Relógios, Joias ou Conjuntos. Escreva sempre igual para a peça entrar no grupo certo. |
| **Preço (R$)** | Ex.: `79,90`, `R$ 79,90` ou `1.079,90`. Só o valor, sem texto. |
| **Selo** | Etiqueta opcional no cartão, ex.: `Novo`. |
| **Data** | Dia em que a peça chegou (`2026-06-03`). Serve para "Novidades". |
| **Tags** | Palavras para a busca, separadas por vírgula: `dourado, premium`. |
| **Descrição** | Texto opcional que aparece ao abrir a peça. |
| **Ativo** | `Sim` mostra a peça. `Não` esconde. Em branco conta como `Sim`. |
| **Dois banhos** | `Sim` ou `Não`. Mostra a etiqueta "Dois banhos". |
| **Destaque** | `Sim` ou `Não`. Destaques aparecem primeiro e a primeira peça em destaque vai para a foto principal do topo. |
| **Imagem** | Pode deixar **em branco**: o site usa `images/Referência.webp`. |

## Adicionar uma peça
1. Vá até a primeira linha vazia da planilha (ou copie uma linha pronta).
2. Preencha pelo menos **Referência, Nome, Categoria, Preço** e coloque **Ativo = Sim**.
3. Envie a foto (veja abaixo).

## Editar uma peça
Mude a célula e pronto. Para trocar o preço, mexa só em **Preço (R$)**.

## Esconder uma peça (sem apagar)
Coloque **Ativo = Não**. Para voltar a mostrar, coloque `Sim` (ou apague o `Não`).

## Destacar uma peça
Coloque **Destaque = Sim**. Para tirar, `Não`.

## Subir foto nova (pelo site do GitHub)
1. Abra o repositório do catálogo no GitHub e entre na pasta **images**.
2. Clique em **Add file > Upload files** e arraste a foto.
3. O nome do arquivo precisa ser **a Referência + .webp**. Ex.: `PROD-048.webp` (letras maiúsculas iguais às da planilha).
4. Escreva uma mensagem curta (ex.: "foto PROD-048") e clique em **Commit changes**.

**Tamanho ideal:** foto vertical (4 por 5), com cerca de **800 × 1000 pixels** e **até 150 KB**. Fotos pesadas deixam o site lento no celular.

**Como reduzir o peso:** abra [squoosh.app](https://squoosh.app), arraste a foto, escolha **WebP** à direita, ajuste o tamanho para 800 de largura, deixe a qualidade em torno de 75 e baixe o arquivo. Depois renomeie para `Referência.webp`.

## Por que a planilha demora para aparecer no site?
O Google guarda uma cópia da planilha publicada e a renova só de tempos em tempos, então a mudança pode levar **alguns minutos** (às vezes até uns 5) para chegar ao site. Foto nova no GitHub também leva um ou dois minutos. Se acabou de mudar, espere um pouco e atualize a página.

## Se algo não aparecer
- **Peça não aparece:** confira se **Ativo** não está como `Não`, se a **Referência** não está repetida ou vazia, se o **Nome** está preenchido e se o **Preço** é um número. Linhas assim são ignoradas pelo site de propósito.
- **Aparece sem foto (só as iniciais):** o arquivo em `images` não existe ou o nome está diferente da Referência (confira maiúsculas e se termina em `.webp`).
- **Preço estranho:** apague o conteúdo da célula e digite de novo, só o número (ex.: `79,90`).
- **Mudei e nada mudou:** espere uns 5 minutos e atualize a página (no celular, feche e abra o navegador).
- **Continua sem aparecer:** peça ajuda a quem cuida do site. Se o link da planilha deixar de funcionar, o site continua mostrando a última lista que carregou, por isso a vitrine não fica vazia.

> Não apague nem renomeie as colunas da primeira linha. Pode mudar a ordem delas, mas mantenha os nomes.
