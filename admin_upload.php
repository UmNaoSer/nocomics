<?php
// Explicação: Este script recebe os arquivos do formulário, salva nas pastas corretas e atualiza o catálogo.
// Você só precisa rodar o servidor PHP e acessar admin.html no navegador.

function slugify($text) {
  $text = strtolower(preg_replace('/[^\w]+/', '-', $text));
  return trim($text, '-');
}

$base = __DIR__;
$comic_name = isset($_POST['comic_name']) ? $_POST['comic_name'] : '';
$comic_slug = slugify($comic_name);

$errors = [];
if (!$comic_name) $errors[] = 'Nome da comic obrigatório.';
if (!isset($_FILES['thumbnail'])) $errors[] = 'Thumbnail obrigatória.';
if (!isset($_FILES['frames'])) $errors[] = 'Pelo menos um vídeo obrigatório.';

if ($errors) {
  echo '<div class="msg">' . implode('<br>', $errors) . '</div>';
  exit;
}

// 1. Salvar thumbnail
$thumb_dir = "$base/assets/thumbnails/";
$thumb_path = $thumb_dir . $comic_slug . '.jpg';
move_uploaded_file($_FILES['thumbnail']['tmp_name'], $thumb_path);

// 2. Salvar música (se enviada)
$music_file = '';
if (isset($_FILES['music']) && $_FILES['music']['size'] > 0) {
  $music_dir = "$base/assets/music/";
  $music_ext = pathinfo($_FILES['music']['name'], PATHINFO_EXTENSION);
  $music_file = $comic_slug . '.' . $music_ext;
  move_uploaded_file($_FILES['music']['tmp_name'], $music_dir . $music_file);
}

// 3. Salvar vídeos das páginas
$frames_dir = "$base/assets/comics/$comic_slug/";
if (!is_dir($frames_dir)) mkdir($frames_dir, 0777, true);
foreach ($_FILES['frames']['tmp_name'] as $i => $tmp) {
  $frame_name = "Frame " . ($i+1) . ".mp4";
  move_uploaded_file($tmp, $frames_dir . $frame_name);
}

// 4. Atualizar catálogo (js/catalog.js)
$catalog_path = "$base/js/catalog.js";
$catalog = file_get_contents($catalog_path);


// Adiciona comic ao catálogo (estrutura compatível com o array comics)
// Encontrar o maior id existente
if (preg_match_all('/id:\s*(\d+)/', $catalog, $ids)) {
  $max_id = max($ids[1]);
  $new_id = $max_id + 1;
} else {
  $new_id = 1;
}
// Listar páginas existentes
$pages = [];
foreach (glob($frames_dir . 'Frame *.mp4') as $f) {
  $rel = 'assets/comics/' . $comic_slug . '/' . basename($f);
  $pages[] = $rel;
}
sort($pages, SORT_NATURAL);
$pages_js = "[\n            '" . implode("',\n            '", $pages) . "'\n        ]";
$new_entry = "    {\n        id: $new_id,\n        title: '$comic_name',\n        thumbnail: 'assets/thumbnails/$comic_slug.jpg',\n        pages: $pages_js\n    },\n";
$catalog = preg_replace('/const comics = \[/', "const comics = [\n$new_entry", $catalog);
file_put_contents($catalog_path, $catalog);

// 5. Mensagem de sucesso
echo '<div class="msg">Comic adicionada com sucesso!<br>Volte à página principal para ver.</div>';
?>
