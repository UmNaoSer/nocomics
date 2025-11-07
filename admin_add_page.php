<?php
// Recebe o vídeo e adiciona à pasta da comic escolhida. Atualiza o catalog.js se necessário.
function get_next_frame($folder) {
  $files = glob($folder . '/Frame *.mp4');
  $max = 0;
  foreach ($files as $file) {
    if (preg_match('/Frame (\d+)\.mp4$/', $file, $m)) {
      $num = intval($m[1]);
      if ($num > $max) $max = $num;
    }
  }
  return $max + 1;
}

$base = __DIR__;
$comic_folder = isset($_POST['comic_folder']) ? $_POST['comic_folder'] : '';
if (!$comic_folder) {
  echo '<div class="msg">Comic não selecionada.</div>';
  exit;
}

$frames_dir = "$base/assets/comics/$comic_folder/";
if (!is_dir($frames_dir)) {
  echo '<div class="msg">Pasta da comic não encontrada.</div>';
  exit;
}

if (!isset($_FILES['frame'])) {
  echo '<div class="msg">Arquivo de vídeo não enviado.</div>';
  exit;
}

$next_frame = get_next_frame($frames_dir);
$frame_name = "Frame $next_frame.mp4";
move_uploaded_file($_FILES['frame']['tmp_name'], $frames_dir . $frame_name);

// Atualiza o catalog.js para garantir que a comic existe (não adiciona páginas, só garante que está lá)
// Atualiza o catalog.js para garantir que a comic existe (adiciona ao array comics se não existir)
$catalog_path = "$base/js/catalog.js";
$catalog = file_get_contents($catalog_path);
if (strpos($catalog, "folder: '$comic_folder'") === false) {
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
    $pages[] = str_replace($base . '/', '', $f);
  }
  sort($pages, SORT_NATURAL);
  $pages_js = "[\n        '" . implode("',\n        '", $pages) . "'\n    ]";
  $new_entry = "    {\n        id: $new_id,\n        title: '$comic_folder',\n        thumbnail: 'assets/thumbnails/$comic_folder.jpg',\n        pages: $pages_js\n    },\n";
  $catalog = preg_replace('/const comics = \[/', "const comics = [\n$new_entry", $catalog);
  file_put_contents($catalog_path, $catalog);
}

// Mensagem de sucesso
// Mensagem de sucesso detalhada, mostrando o diretório exato
$comic_dir_path = "assets/comics/$comic_folder/";
echo '<div class="msg">Página adicionada com sucesso à comic <b>' . htmlspecialchars($comic_folder) . '</b>!<br>Diretório: <code>' . $comic_dir_path . '</code></div>';
?>
