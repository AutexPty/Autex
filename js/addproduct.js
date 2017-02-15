var products;
var colourfile;

function addproduct() {
  alert('confirm pressed');
}

function selectproduct() {
  document.getElementById("dproduct").hidden = true;
  document.getElementById("dvariant").hidden = false;   
  selectedproduct = document.getElementById('product').selectedOptions;
  variants = products[0].getElementsByTagName("variants")[0].getElementsByTagName('variant')
  select = document.getElementById('variant');
  colourfile = products[0].getElementsByTagName("colours")[0].textContent
  
  for (var i = 0; i < variants.length; i++) {  
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = "<option value="+variants[i].getElementsByTagName("code")[0].textContent+">"+variants[i].getElementsByTagName("description")[0].textContent+"</option>";
        select.appendChild(opt);
  }    
}

function selectvariant() {
  document.getElementById("dvariant").hidden = true;   
  document.getElementById("dcolour").hidden = false;
  selvar = document.getElementById("variant").value;
  
  if (selvar) {
    if (window.XMLHttpRequest) {
      xhttp = new XMLHttpRequest();
    } else {
      xhttp = new ActiveXObject("Microsoft.XMLHTTP");  
    }
    xhttp.open("GET", "./colours/" +  colourfile.toLowerCase() + ".xml", false);
    xhttp.send(null);
    xmlDoc = xhttp.responseXML; 
    debugger;
      select = document.getElementById('colour');    
      colours = xmlDoc.getElementsByTagName("colours")[0].getElementsByTagName("colour")
      for (var i = 0; i < colours.length; i++) {        
        var opt = document.createElement('option');
        opt.value = colours[i].getElementsByTagName("code")[0].textContent;
        opt.innerHTML = "<option value="+opt.value+">"+colours[i].getElementsByTagName("description")[0].textContent+"</option>";
        select.appendChild(opt);
      } //end of for loop    
  }
}


function selectcategory() {
 colourfile = "";
 document.getElementById("dproductcat").hidden = true;
 document.getElementById("dproduct").hidden = false; 
 selcat =  document.getElementById("category").value;

  if (selcat) {
    if (window.XMLHttpRequest) {
      xhttp = new XMLHttpRequest();
    } else {    // IE 5/6
      xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET", "./products/" +  selcat.toLowerCase() + ".xml", false);
    xhttp.send(null);
    //xhttp.onreadystatechange = function(){
    //if (xhttp.status == "200") 
      xmlDoc = xhttp.responseXML; 
      select = document.getElementById('product');
      products = xmlDoc.getElementsByTagName("products")[0].getElementsByTagName("product")
      for (var i = 0; i < products.length; i++) {        
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = "<option value="+i+">"+products[i].getElementsByTagName("description")[0].textContent+"</option>";
        select.appendChild(opt);
      } //end of for loop
    //} //end of onstate change disabled
    }   //end of if selcart
  }     //end of function 
