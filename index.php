<!DOCTYPE html>
<html>
<head>
	<meta charstet="utf-8">
	<title>Загрузка фото на сервер</title>
	<link href="css/styles.css" rel="stylesheet">
</head>
<body>
	<main class="upload-photo">
		<div class="upload-photo__layout clearfix">			
			<div class="upload-photo__form">
				<h1 class="upload-photo__header">Добавить фото на сайт</h1>
				<form action="index.php" name="frmForm1" method="post" id="frmUpload" enctype="application/x-www-urlencoded">		
				  <input  type="hidden" name="MAX_FILE_SIZE" value="50000000"  />		
					<input class="btn"  type="submit" id="sbmUpload" name="sbmUpload" value="Загрузить фото">					
					<label for="files1" class="upload-photo__file-label">Выбрать файлы</label>
					<input class="btn btn--upload" type="file" name="file[]" id="files1" multiple>
					<h3 class="upload-photo__count"></h3>
					<div class="upload-photo__preview">
					</div>
			    <div id="image"></div>					
				</form>	
			</div>

		</div>
	</main>
	
	<script src="js/script.js">
	</script>	
</body>
</html>