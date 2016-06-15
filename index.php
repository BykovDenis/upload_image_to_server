<?

header('Content-Type: text/html; charset=utf-8');

    define('no_top', true);
    define('no_zztl', true);
    define('no_base', true);
    define('admin_part', true);  
	
    require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
    
    $riglaUser = new RiglaUser();
    
    if (!$riglaUser->isAdmin())
        include $_SERVER["DOCUMENT_ROOT"].'/admin/login.php';
    
    if (!$riglaUser->adminHasFunction(19))
    {
        echo 'У вас нет доступа';
        exit;
    }

$APPLICATION->SetTitle("Работа с изображенями товаров на сайте");

include $_SERVER["DOCUMENT_ROOT"].'/admin/inc/menu.php';	 ?>

<ul style='text-align:left;'>
	<li><a href="appendImageGoods.php">Добавить фото с изображением товаров на сайте</a></li>		
  <li><a href="removeImageGoods.php">Удалить фото с изображением товаров на сайте</a></li>		
</ul>

<?

require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");

?>