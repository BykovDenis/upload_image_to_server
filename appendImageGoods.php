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
			<div class="upload-photo__form">
				<h1 class="upload-photo__header">Добавить фото на сайт</h1>
				<form action="index.html" name="frmForm1" method="post" id="frmUpload" enctype="application/x-www-urlencoded">		
				  <input  type="hidden" name="MAX_FILE_SIZE" value="50000000"  />					
					<label for="files1" class="upload-photo__file-label"> Загрузить фото на сайт</label>
					<input class="upload-btn upload-btn--upload" type="file" name="file[]" id="files1" multiple>
					<h3 id="upload-photo__count" class="upload-photo__count"></h3>
          <div id="upload-photo__progress"></div>
          <h3 id="upload-photo__success" class="upload-photo__count"></h3>
					<div class="upload-photo__preview">
					</div>
			    <div id="image"></div>					
				</form>	
			</div>

		</div>
	</main>	
	<script src="js/script.js">
	</script>	

<?

require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");

?>