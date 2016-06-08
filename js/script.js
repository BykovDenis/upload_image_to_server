var photo_preview = document.querySelector('.upload-photo__preview');
var counter_photo = document.querySelector('.upload-photo__count');
var arr_photo = []; // фото товаров

var max_width = 800;
var max_height = 800;

var debug = 1;
var formData = new FormData();

document.getElementById("files1").addEventListener("change", function(){

 var files = this.files;

  counter_photo.innerText = 'Выбрано '+files.length+' файлов';
  
  var files = this.files;
  var length = files.length;
  var size = files.size;  
  var counter = 0;
  
   
  for(var i=0; i< length; i++){

      file = files[i];
    
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
          console.log('Имя файла : '+file.name);
          console.log('Тип файла : '+file.type);
          console.log('Размер файла : '+file.size+' bytes');              
          console.log('Ширина картинки '+img.width);
          console.log('Высота картинки '+img.height);     
          console.log('Новая ширина картинки '+img1.width);
          console.log('Новая высота картинки '+img1.height);   
          console.log('Счетчик '+counter);

          }
        
        dataPreparation();
          
      },true);

      fr.readAsDataURL(file);      

  }  

}, false);

function preview(file){

  // проверка на то что файлы изображения
  if(file.type.match(/image.*/)){

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

}

function dataPreparation(){
  
  console.log("Вызов dataPreparation");
    
  for(var key of formData.keys()){  

    if(debug){            
      console.log('Вызов');    
      console.log('Ключ '+key);  
      //console.log('Изображение', formData.get(key));
    }
      sendToServer(new Array(key,formData.get(key)));
  } 
  
}

/**
 * Отправлять данные на сервер
 * @param {[image]} img Изображение
 */
function sendToServer(img){

  var xhr = new XMLHttpRequest();
  var name = "Вася";

  xhr.onload = function(){

    var div = document.getElementById('image');
    var el = document.createElement('div');
    div.appendChild(el);
    el.innerHTML = xhr.responseText;
    el.className = 'container__preview';
    el.style.backgroundColor = "rgba(0,255,0,0.4)";

  }

  xhr.open('POST','lib/response.php',true);
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
  
  return canvas.toDataURL();
    
}

document.getElementById("sbmUpload").addEventListener("click", function(){
   
   if(formData.keys()){
     
     dataPreparation();
     
   }                                                   
                                                      
},false);

