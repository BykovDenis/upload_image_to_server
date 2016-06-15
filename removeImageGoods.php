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

$APPLICATION->SetTitle("Загрузка фото товаров на сайт");

include $_SERVER["DOCUMENT_ROOT"].'/admin/inc/menu.php';	

?>
<main class="upload-photo">
  <div class="upload-photo__layout clearfix">	
    <form method="post" id="frm_remove_images"  class="upload-photo__form">
      <label>
        <h1  class="upload-photo__header">Укажите коды АП, удаляемых товаров через запятую</h1>
        <input type="text" id="txt_remove_goods" size="100">
      </label>
      <hr>
      <input type="button" id="btn_remove_goods" value="Удалить фото товаров" class="upload-photo__file-label">  
      <div id="image"></div>		
    </form>
  </div>
</main>

	<script src="js/script.js">
	</script>	

<?

require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");

?>