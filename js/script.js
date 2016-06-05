function JPEG(fileId, canvasId, debug){    
  
  this.descr = document.getElementById(fileId);  
  this.canvas = document.getElementById(canvasId);  
  this.debug = debug;
  
  //* Проверка работы с API
  var fileAPISupport = false;
  if(window.File && window.FileReader && window.FileList && window.Blob) {
    fileAPISupport = true;
  }
  
  if(!fileAPISupport) {
    
    throw new Error("Браузер не поддерживает работу с API. Неободимо обновить браузер");
    return false;
    
  }
  
}

JPEG.prototype = {
  
  debug: 0,
  descr: '',
  config: {
    
    max_width: 800,
    max_height: 800
    
  }
  
}

JPEG.prototype.scaleImage = function(img){
  
  var max_width  = this.config.max_width;
  var max_height = this.config.max_height;
  
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


var obj = new JPEG("file1", "canvas", 0);

obj.descr.addEventListener("change", function(){

  var files = this.files;
  var length = files.length;
  var size = files.size;  
  var obj = new JPEG(null, null, 1);
   
  for(var i=0; i< length; i++){

      file = files[i];
    
      if(obj.debug){
        console.log('Имя файла : '+file.name);
        console.log('Тип файла : '+file.type);
        console.log('Размер файла : '+file.size+' bytes');       
      }

      var fr = new FileReader();        
      var arr = new Array();
      var formData = new FormData();


      fr.onload = function(event){

        var img = document.createElement('img');
        document.forms[0].appendChild(img);

        img.src = event.target.result;
        img.id = file.name;
        
        var img1 = document.createElement('img');
        document.forms[0].appendChild(img1);
        
        var imgScale = obj.scaleImage(img); 
                
        img1.src = imgScale;
        img1.id = file.name+'1';          
          
        formData.append(file.name, imgScale); // масштабированное изображение
                        
        if(obj.debug){
        
          console.log('Ширина картинки '+img.width);
          console.log('Высота картинки '+img.height);     
          console.log('Новая ширина картинки '+img.width);
          console.log('Новая высота картинки '+img.height);   

         // obj.scaleImage(img);        

          for(key of formData.keys()){          
            console.log('Ключ '+key);
            //console.log('Base 64 '+formData.get(key)); 

          }       
        
        }
          
      }

      fr.readAsDataURL(file);      

  }     
  
},false);





