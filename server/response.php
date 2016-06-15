<?php  

  // Сохранить файл с изображениями на сервере

  $img =str_replace(' ', '+', $_POST["img"]);
  //echo "<img src='".$img."' alt='".$_POST["name"]."'>";
  $img = str_replace('data:image/jpeg;base64,', '', $img);
  $filename = strtolower($_POST["name"]);  

  $img = base64_decode($img);  
  if(file_put_contents("/var/www/rigla.ru/upload/storage/goods/".$filename.".jpg",$img))
    echo "Изображение на сайт загружено ".$filename.".jpg<br>";    
  else
    echo "Ошибка загрузки изображения на сайт ".$filename."<br>";    

?>