# Motion Comic Viewer 🎬

Uma aplicação web para visualização de motion comics com suporte a múltiplas páginas, música e interface administrativa.

## 📋 Requisitos

Para usar apenas o site (GitHub Pages):
- Navegador web moderno (Chrome, Firefox, Edge, etc.)
- Conta no GitHub (se quiser hospedar seu próprio site)

Para desenvolvimento local:
- Windows, Linux ou macOS
- PHP 8.0 ou superior (já incluído para Windows)
- Git (opcional, para clonar o repositório)
  - [Download Git para Windows](https://git-scm.com/download/win)
  - [Download Git para macOS/Linux](https://git-scm.com/downloads)

## 🚀 Instalação e Configuração

### 1. Obtendo o Código

**Opção A - Clonar do GitHub:**
```bash
git clone https://github.com/UmNaoSer/nocomics.git
cd nocomics
```

**Opção B - Download Direto:**
1. Acesse https://github.com/UmNaoSer/nocomics
2. Clique no botão verde "Code"
3. Selecione "Download ZIP"
4. Extraia o arquivo ZIP para uma pasta de sua escolha

### 2. Configurando o Servidor PHP

#### Windows:
1. O PHP já está incluído na pasta `PHP-8.4.14` do projeto
2. Para abrir o PowerShell na pasta correta:
   - Clique com o botão direito na pasta do projeto mantendo a tecla Shift pressionada
   - Selecione "Abrir janela do PowerShell aqui" ou "Abrir janela do terminal aqui"
   
   Alternativa (manual):
   - Abra o PowerShell (pesquise "PowerShell" no menu Iniciar)
   - Digite `cd` e arraste a pasta do projeto para o PowerShell
   - Pressione Enter

3. Execute o comando para iniciar o servidor:
   ```powershell
   .\PHP-8.4.14\php.exe -S localhost:8000
   ```

#### Linux/macOS:
1. Instale o PHP:
   - Ubuntu/Debian:
     ```bash
     sudo apt update
     sudo apt install php
     ```
   - macOS (usando Homebrew):
     ```bash
     brew install php
     ```
2. Na pasta do projeto, inicie o servidor:
   ```bash
   php -S localhost:8000
   ```

### 3. Acessando a Aplicação

1. Abra seu navegador
2. Acesse: http://localhost:8000
3. Você verá o catálogo de comics na página inicial

## 💻 Uso

### Visualização de Comics

1. Na página inicial, você verá todas as comics disponíveis
2. Clique em uma comic para começar a leitura
3. Use os controles na parte inferior para:
   - ⬅️ Voltar página
   - 🔄 Repetir página atual
   - ➡️ Próxima página
4. A música começará automaticamente (se disponível)

### Administração (Modo Local)

> ⚠️ **Importante**: As funções administrativas só funcionam no modo local (localhost), não no GitHub Pages.

Acesse: http://localhost:8000/adminadd.php

#### Adicionar Nova Comic:
1. Preencha o nome da comic
2. Envie uma imagem thumbnail (JPG)
3. (Opcional) Envie um arquivo de música (MP3)
4. Envie os arquivos de vídeo das páginas
5. Clique em "Enviar e Criar Comic"

#### Adicionar Página a Comic Existente:
1. Selecione a comic
2. Envie o arquivo de vídeo da nova página
3. Clique em "Adicionar Página"

#### Excluir Páginas ou Comics:
1. Selecione a comic
2. Para excluir uma página:
   - Digite o número da página
   - Clique em "Excluir Página"
3. Para excluir uma comic inteira:
   - Clique em "Excluir Comic Inteira"
   - Confirme a ação

## 📁 Estrutura de Arquivos

```
/
├── assets/
│   ├── comics/        # Vídeos das páginas
│   ├── music/         # Arquivos de música
│   └── thumbnails/    # Imagens de capa
├── css/
│   └── style.css      # Estilos da aplicação
├── js/
│   ├── catalog.js     # Dados das comics
│   └── viewer.js      # Player de comics
├── PHP-8.4.14/        # Servidor PHP (Windows)
├── launcher/
│   └── start-server.ps1  # Script de inicialização
└── *.php, *.html     # Páginas da aplicação
```

## 🌐 GitHub Pages vs. Modo Local

### GitHub Pages (Produção)
Para hospedar seu próprio site no GitHub Pages:

1. Faça um fork deste repositório:
   - Acesse https://github.com/UmNaoSer/nocomics
   - Clique no botão "Fork" no canto superior direito
   - Aguarde a cópia ser criada em sua conta

2. Ative o GitHub Pages:
   - Vá para "Settings" (Configurações) no seu fork
   - Role até a seção "GitHub Pages"
   - Em "Source", selecione "main" ou "master"
   - Clique em "Save"
   - Aguarde alguns minutos

3. Acesse seu site:
   - A URL será: `https://seu-usuario.github.io/nocomics`
   - Exemplo: https://umnaoser.github.io/nocomics/

> ⚠️ **Importante**: No GitHub Pages, apenas a visualização funciona. Para adicionar ou editar comics, use o modo local.

### Modo Local (Desenvolvimento)
- Todas as funcionalidades disponíveis
- Permite adicionar, editar e excluir comics
- URL: http://localhost:8000

## 🛠️ Solução de Problemas

### Erro de Upload de Arquivos Grandes
Se encontrar erros ao fazer upload de vídeos grandes:
1. Abra `PHP-8.4.14/php.ini`
2. Localize e altere:
   ```ini
   upload_max_filesize = 200M
   post_max_size = 200M
   ```
3. Reinicie o servidor PHP

### A Música Não Toca
- Verifique se o arquivo está em formato MP3
- Confirme se o nome do arquivo corresponde ao da comic
- Certifique-se de que permitiu áudio no navegador

### Vídeos Não Carregam
- Verifique se estão em formato MP4
- Confirme se os nomes seguem o padrão "Frame X.mp4"
- Verifique as permissões das pastas

## 📝 Notas

- Mantenha backups dos arquivos de mídia
- Em produção (GitHub Pages), faça commit apenas dos arquivos essenciais
- Para melhor performance, otimize os vídeos antes do upload

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie sua Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
