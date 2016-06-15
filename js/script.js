var photo_preview = document.querySelector('.upload-photo__preview');
var counter_photo = document.getElementById('upload-photo__count');
var upload_photo_success = document.getElementById('upload-photo__success');
var upload_photo_progress = document.getElementById('upload-photo__progress');
var files = document.getElementById("files1");
var arr_photo = []; // фото товаров

var max_width = 800;
var max_height = 800;
var quality = 80;

var debug = 1;
var formData = new FormData();


if(files) {
    files.addEventListener("change", function(){
    
    if(confirm("Подтвердите загрузку изображений на сайт")) {

      var img = document.createElement('img');
      upload_photo_progress.appendChild(img);
      
      img.src = "images/progress1.gif";

     var files = this.files;

      counter_photo.innerText = 'Выбрано '+files.length+' файлов';
      
      var files = this.files;
      var length = files.length;
      var size = files.size;  
      var counter = 0;  
       
      for(var i=0; i< length; i++){    

          file = files[i];

            if(file.type.match(/image.*/)){

              preview(file);

              var fr = new FileReader();        
              
              fr.addEventListener('load', function(event){

                counter++;
                var img = document.createElement('img');
                img.src = event.target.result;

                var img1 = document.createElement('img');
                document.forms[0].appendChild(img1);

                var imgScale = scaleImage(img);                 
                //img1.src = imgScale;        

                formData.append(files[counter-1].name, imgScale);// масштабированное изображение

                if(debug){  
                  console.log('Имя файла : '+deleteFileNameExtension(file.name));
                  console.log('Тип файла : '+file.type);
                  console.log('Размер файла : '+file.size+' bytes');              
                  console.log('Ширина картинки '+img.width);
                  console.log('Высота картинки '+img.height);     
                  console.log('Новая ширина картинки '+img1.width);
                  console.log('Новая высота картинки '+img1.height);   
                  console.log('Счетчик '+counter);

                  }        

                sendToServer(new Array(deleteFileNameExtension(files[counter-1].name), imgScale));
                
              if(i >= length-1){ 
              
                var elem = upload_photo_progress.children[0];
                elem.remove()
              
                //upload_photo_progress.removeChild(img);
                upload_photo_success.innerText = "Успешно загружено " + i + " файла";
                deletePreviewOnServer();            
              }

              },true);

              fr.readAsDataURL(file);         

        }    
      }
    }  

  }, false);

  function preview(file){

    var reader = new FileReader();

    reader.addEventListener('load', function(){

      var divs = document.createElement('div');
      divs.class = 'upload-photo__contain';

      var img = document.createElement('img');
        img.src = event.target.result; 
        img.alt = file.name;
        img.width = '250';

      var span = document.createElement('span');
        span.innerText = file.name;

      photo_preview.appendChild(divs);
      divs.appendChild(span);
      divs.appendChild(img);	

      arr_photo.push({file: file, img: img});


    });	


      reader.readAsDataURL(file);						

  }


  function deleteFileNameExtension(fileName){
    
    var name = fileName.replace(/.jpg|.png|.tiff|.bmp$/,"");
    
    return name;
    
  }

  /**
   * Отправлять данные на сервер
   * @param {[image]} img Изображение
   */
  function sendToServer(img){

    var xhr = new XMLHttpRequest();

    xhr.onload = function(){

      var div = document.getElementById('image');
      var el = document.createElement('div');
      div.appendChild(el);
      el.innerHTML = xhr.responseText;
      el.className = 'container__preview';   

    }

    xhr.open('POST','server/response.php',true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send("name="+img[0]+"&img="+img[1]);

  }

  function scaleImage(img){
    
    var canvas = document.createElement('canvas');

    var ctx = canvas.getContext('2d');  
    
    if(img.width > max_width  || img.height > max_height){
      
      if(img.width > img.height){
        
        canvas.height = img.height * max_width/ img.width;
        canvas.width = max_width;
        
      }
      else{
        
        canvas.width = img.width * max_height / img.height;
        canvas.height = max_height;
        
      }
      
    }
    else{
      
      canvas.width = img.width;
      canvas.height = img.height;
      
    }   
    
      console.log(img.width);
      console.log(img.height);

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    //document.forms[0].appendChild(canvas); 
    
    return canvas.toDataURL('image/jpeg', quality);
      
  }
  
 }
 

function deletePreviewOnServer(){
  
  var xhr = new XMLHttpRequest();

  xhr.onload = function(){

    var div = document.getElementById('image');
    var el = document.createElement('div');
    div.appendChild(el);
    el.innerHTML = xhr.responseText;
    el.className = 'container__preview';   

  }

  xhr.open('GET','server/clearpreview.php?erase=1',true);  
  xhr.send(); 
  
}


var frm_remove_images = document.getElementById("frm_remove_images");

if(frm_remove_images){

  var btn_remove_goods = document.getElementById("btn_remove_goods");
  var txt_remove_goods = document.getElementById("txt_remove_goods");

  btn_remove_goods.addEventListener("click", function(){
    
    var arr_goods = txt_remove_goods.value.replace(/[^,|\d]/g,'');
    //console.log(arr_goods);
    if(confirm("Подтвердите удаление изображений")){
      deleteImagesToServer(arr_goods);
      deletePreviewOnServer();    
    }

  });
  
  function deleteImagesToServer(images){

    var xhr = new XMLHttpRequest();

    xhr.onload = function(){

      var div = document.getElementById('image');
      var el = document.createElement('div');
      div.appendChild(el);
      el.innerHTML = xhr.responseText;
      el.className = 'container__preview';   

    }

    xhr.open('POST','server/deleteimages.php',true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send("images="+images);
      
  }  

}