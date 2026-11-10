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
| **Imagem** | Link da foto no Google Drive (veja "Colocar foto numa peça"). Se ficar **em branco**, o site usa a foto `images/Referência.webp` do GitHub. |

## Adicionar uma peça
1. Vá até a primeira linha vazia da planilha (ou copie uma linha pronta).
2. Preencha pelo menos **Referência, Nome, Categoria, Preço** e coloque **Ativo = Sim**.
3. Coloque a foto (veja "Colocar foto numa peça").

## Editar uma peça
Mude a célula e pronto. Para trocar o preço, mexa só em **Preço (R$)**.

## Esconder uma peça (sem apagar)
Coloque **Ativo = Não**. Para voltar a mostrar, coloque `Sim` (ou apague o `Não`).

## Destacar uma peça
Coloque **Destaque = Sim**. Para tirar, `Não`.

## Colocar foto numa peça

### Jeito mais fácil: pelo Google Drive (sem mexer no GitHub)
1. Reduza o peso da foto (veja "Tamanho ideal" abaixo) e envie para uma pasta do seu **Google Drive**.
2. Clique com o botão direito na foto > **Compartilhar** > em "Acesso geral" escolha **Qualquer pessoa com o link** (permissão "Leitor").
3. Clique em **Copiar link**.
4. Na planilha, cole o link na coluna **Imagem** da peça.
5. Espere alguns minutos e atualize o site.

Importante: se o compartilhamento não estiver como "Qualquer pessoa com o link", a foto não aparece para as clientes. Cole o link do **arquivo**, não o da pasta.

### Jeito alternativo: pelo GitHub
Serve para as fotos que já estão lá, e se preferir. Deixe a coluna **Imagem** em branco.
1. Abra o repositório do catálogo no GitHub e entre na pasta **images**.
2. Clique em **Add file > Upload files** e arraste a foto.
3. O nome do arquivo precisa ser **a Referência + .webp**. Ex.: `PROD-048.webp` (maiúsculas iguais às da planilha).
4. Escreva uma mensagem curta e clique em **Commit changes**. Leva um ou dois minutos para aparecer.

### Tamanho ideal
Foto vertical (4 por 5), com cerca de **800 × 1000 pixels** e **até 150 KB**. Fotos pesadas deixam o site lento no celular.

Para reduzir o peso: abra [squoosh.app](https://squoosh.app), arraste a foto, escolha **WebP** (ou JPEG) à direita, ajuste a largura para 800, qualidade em torno de 75 e baixe. No Drive pode ser WebP ou JPEG; no GitHub tem que ser `Referência.webp`.

## Por que a planilha demora para aparecer no site?
O Google guarda uma cópia da planilha publicada e a renova só de tempos em tempos, então a mudança pode levar **alguns minutos** (às vezes até uns 5) para chegar ao site. Foto nova no GitHub também leva um ou dois minutos. Se acabou de mudar, espere um pouco e atualize a página.

## Se algo não aparecer
- **Peça não aparece:** confira se **Ativo** não está como `Não`, se a **Referência** não está repetida ou vazia, se o **Nome** está preenchido e se o **Preço** é um número. Linhas assim são ignoradas pelo site de propósito.
- **Aparece sem foto (só as iniciais):** se usou o Drive, confira se o compartilhamento está em "Qualquer pessoa com o link" e se o link é do arquivo (não da pasta). Se usou o GitHub, confira se o nome do arquivo é igual à Referência e termina em `.webp`.
- **Preço estranho:** apague o conteúdo da célula e digite de novo, só o número (ex.: `79,90`).
- **Mudei e nada mudou:** espere uns 5 minutos e atualize a página (no celular, feche e abra o navegador).
- **Continua sem aparecer:** peça ajuda a quem cuida do site. Se o link da planilha deixar de funcionar, o site continua mostrando a última lista que carregou, por isso a vitrine não fica vazia.

> Não apague nem renomeie as colunas da primeira linha. Pode mudar a ordem delas, mas mantenha os nomes.
