var products;
var colourfile;

function addproduct() {
  debugger;
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
        debugger;
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = "<option value="+variants[0].getElementsByTagName("code")[i].textContent+">"+variants[i].getElementsByTagName("description")[0].textContent+"</option>";
        debugger;
        select.appendChild(opt);
  }    
}

function selectvariant() {
  document.getElementById("dvariant").hidden = true;   
  document.getElementById("dcolour").hidden = false;   
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
