<?php

header("Content-type: text/html; charset=utf-8");

if($_GET["erase"]){

  $dir[] = "/var/www/rigla.ru/upload/storage/goods/fx/40x40/";
  $dir[] = "/var/www/rigla.ru/upload/storage/goods/fx/60x60/";
  $dir[] = "/var/www/rigla.ru/upload/storage/goods/fx/80x80/";
  $dir[] = "/var/www/rigla.ru/upload/storage/goods/fx/100x100/";
  $dir[] = "/var/www/rigla.ru/upload/storage/goods/fx/150x150/";
  $dir[] = "/var/www/rigla.ru/upload/storage/goods/fx/200x200/";
  $dir[] = "/var/www/rigla.ru/upload/storage/goods/fx/360x300/"; 
  


  for($i=0;$i < count($dir); $i++){

    if(!opendir($dir[$i]))
     echo 'Каталог не найден';
    else
     $files = scandir($dir[$i]);

    foreach($files as $file){

      if(in_array($file, array('.','..'))) continue;
      //if (!is_dir ($file)) continue;

      if(!unlink($dir[$i].$file))      
        echo "Ошибка удаления файла".$dir[$i].$file." <br>";    

    }    

  }
  
  //echo "Удаление прошло успешно";
  
}


?>