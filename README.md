# Tutorial: Como Usar o Projeto Motion Comics

## 1. Como rodar o projeto

O servidor mais simples para HTML é o embutido do Python. Basta abrir o terminal na pasta do projeto e rodar:

cd D:\Design\Programas\Sinônimos

PHP-8.4.14\php.exe -S 0.0.0.0:8000

Depois, acesse `http://localhost:8000` no navegador.

## 2. Estrutura de Pastas

- `index.html` — Página inicial
- `viewer.html` — Visualizador de comics
- `assets/comics/` — Pasta dos comics (cada comic tem sua própria pasta)
- `assets/music/` — Sons e trilhas
- `assets/thumbnails/` — Imagens de capa
- `css/style.css` — Estilos
- `js/catalog.js` — Catálogo de comics
- `js/viewer.js` — Lógica do player

## 3. Adicionar Novas Páginas a um Comic

1. Crie uma pasta para o comic em `assets/comics/`, por exemplo: `assets/comics/MeuComic/`
2. Adicione os vídeos das páginas, nomeando como `Frame 1.mp4`, `Frame 2.mp4`, etc.
3. (Opcional) Adicione uma imagem de capa em `assets/thumbnails/` com o mesmo nome da pasta do comic, ex: `meucomic.jpg`.

## 4. Adicionar Novos Sons

1. Coloque o arquivo de áudio em `assets/music/`, por exemplo: `meusom.mp3`
2. No arquivo `js/catalog.js`, adicione o nome do som na configuração do comic, se desejar que ele toque junto.

## 5. Criar uma Nova Comic

1. Siga o passo 3 para criar a pasta e adicionar os vídeos.
2. Edite `js/catalog.js` para cadastrar o novo comic, informando nome, pasta, thumbnail e som.
3. Atualize a página para ver o novo comic listado.

## 6. Dicas

- Os vídeos devem ser curtos e leves para melhor experiência.
- As imagens de capa devem ter proporção semelhante ao vídeo.
- O som é opcional, mas pode ser usado para trilha ou efeitos.

## 7. Personalização

- Edite `css/style.css` para mudar cores, fontes ou layout.
- Edite `viewer.html` para alterar a estrutura do visualizador.

## 8. Interface Automática para Adicionar Comics

Agora você pode adicionar novas comics, músicas e páginas facilmente usando a interface web:

### Passo a Passo

1. Rode o servidor PHP local:
   ```pwsh
   PHP-8.4.14\php.exe -S localhost:8000
   ```
   (ou use o Python se preferir, mas para uploads o PHP é melhor)

2. No navegador, acesse:
   ```
   http://localhost:8000/admin.html
   ```

3. Preencha o formulário:
   - Nome da comic
   - Thumbnail (imagem de capa)
   - Música (opcional)
   - Vídeos das páginas (Frame 1, Frame 2...)

4. Clique em "Enviar e Criar Comic".

5. Pronto! A comic será criada, os arquivos salvos nas pastas corretas e o catálogo atualizado automaticamente.

### Estrutura das Pastas
- `assets/comics/NOME/` — Vídeos das páginas
- `assets/thumbnails/NOME.jpg` — Imagem de capa
- `assets/music/NOME.mp3` — Música (opcional)
- `js/catalog.js` — Catálogo atualizado automaticamente

### Observações
- O nome da comic será usado para criar as pastas e arquivos.
- Os vídeos devem ser enviados em ordem (Frame 1, Frame 2...).
- A música é opcional.
- O catálogo será atualizado sem precisar editar código.

Se aparecer mensagem de sucesso, volte à página principal para ver sua comic nova!

---

Se precisar de exemplos de configuração ou de como editar o catálogo, peça aqui!
