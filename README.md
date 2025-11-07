# Tutorial: Como Usar o Projeto Motion Comics

## 1. Iniciando o Projeto

### Modo Local (Desenvolvimento/Administração)
Para desenvolver e administrar comics (adicionar/editar), use o servidor PHP:

1. Abra o terminal na pasta do projeto:
   ```powershell
   cd D:\Design\Programas\Sinônimos
   ```

2. Inicie o servidor PHP:
   ```powershell
   .\PHP-8.4.14\php.exe -S localhost:8000
   ```

3. Acesse no navegador:
   - Catálogo de Comics: http://localhost:8000
   - Administração: http://localhost:8000/adminadd.php

### Modo GitHub Pages (Produção/Leitura)
No GitHub Pages, apenas a visualização de comics estará disponível:
- Catálogo e visualização funcionam normalmente
- Funções de administração são desabilitadas (não é possível adicionar/editar comics)

## 2. Estrutura do Projeto

### Páginas Principais
- `index.html` — Catálogo de comics
- `viewer.html` — Visualizador de comics
- `adminadd.php` — Administração (criar comics/adicionar páginas)

### Arquivos
- `assets/comics/` — Vídeos das comics (cada comic tem sua pasta)
- `assets/thumbnails/` — Imagens de capa das comics
- `assets/music/` — Músicas/sons das comics
- `css/style.css` — Estilos visuais
- `js/catalog.js` — Catálogo de comics (atualizado automaticamente)
- `js/viewer.js` — Player de comics

## 3. Como Administrar Comics

### Criar Nova Comic
1. Acesse: http://localhost:8000/adminadd.php
2. No formulário "Adicionar Nova Comic":
   - Digite o nome da comic
   - Selecione a imagem de capa (thumbnail)
   - Opcional: selecione uma música
   - Selecione os vídeos das páginas (Frame 1, Frame 2...)
3. Clique em "Enviar e Criar Comic"

### Adicionar Página a Comic Existente
1. Acesse: http://localhost:8000/adminadd.php
2. No formulário "Adicionar Página a Comic Existente":
   - Escolha a comic na lista
   - Selecione o vídeo da nova página
3. Clique em "Adicionar Página"

## 4. Dicas e Boas Práticas

### Vídeos
- Use formato MP4
- Nomeie como "Frame 1.mp4", "Frame 2.mp4", etc.
- Mantenha os vídeos curtos e otimizados

### Thumbnails
- Use formato JPG
- Mantenha a mesma proporção dos vídeos
- Tamanho recomendado: 800x450 pixels

### Músicas
- Use formato MP3
- A música é opcional
- Será tocada em loop durante a leitura

## 5. Solução de Problemas

### Se o servidor não iniciar
- Verifique se está na pasta correta
- Confirme que o PHP está no caminho correto
- Tente usar o caminho completo do PHP

### Se os uploads não funcionarem
- Verifique as permissões das pastas
- Confirme que o PHP tem acesso para escrita
- Verifique o tamanho máximo permitido no php.ini

### Se as comics não aparecerem
- Verifique se os arquivos estão nas pastas corretas
- Confirme que os nomes dos arquivos seguem o padrão
- Verifique se o catalog.js está sendo atualizado

## 6. Desenvolvimento e Personalização

### Personalizar Visual
- Edite `css/style.css` para mudar cores e estilos
- Mantenha a estrutura HTML das páginas
- Teste em diferentes tamanhos de tela

### Editar Comportamento
- Modifique `js/viewer.js` para alterar controles
- Ajuste `js/catalog.js` para mudar a listagem
- Mantenha a compatibilidade com GitHub Pages

---

Para mais informações ou ajuda, consulte a documentação ou abra uma issue no GitHub!
