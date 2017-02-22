var products;
var colourfile;
var page = 0;
var item;
var productcode;
var description;
var selvar;
var colour;
var colourcode;
var quantity;
var unit;

function nextpage(){
  page = page + 1;
  changepage();
}

function changepage(){
  switch(page) {
    case 0:
        // select category
        document.getElementById("dproductcat").hidden = false;
        document.getElementById("dproduct").hidden = true; 
        document.getElementById("dvariant").hidden = true;
        document.getElementById("dcolour").hidden = true;
        document.getElementById("dquantity").hidden = true; 
        document.getElementById("ddescription").hidden = true;      
      break;
    case 1:
        // select product group
        document.getElementById("dproductcat").hidden = true;
        document.getElementById("dproduct").hidden = false; 
        document.getElementById("dvariant").hidden = true;
        document.getElementById("dcolour").hidden = true;
        document.getElementById("dquantity").hidden = true;    
        document.getElementById("ddescription").hidden = true;      
        break;
    case 2:
        // select variant
        document.getElementById("dproductcat").hidden = true;
        document.getElementById("dproduct").hidden = true; 
        document.getElementById("dvariant").hidden = false;
        document.getElementById("dcolour").hidden = true;
        document.getElementById("dquantity").hidden = true;     
        document.getElementById("ddescription").hidden = true;      
        break;
    case 3:
        // select colour
        document.getElementById("dproductcat").hidden = true;
        document.getElementById("dproduct").hidden = true; 
        document.getElementById("dvariant").hidden = true;
        document.getElementById("dcolour").hidden = false;
        document.getElementById("dquantity").hidden = true;     
        document.getElementById("ddescription").hidden = true;         
        break;
    case 4:
        // select quantity
        document.getElementById("dproductcat").hidden = true;
        document.getElementById("dproduct").hidden = true; 
        document.getElementById("dvariant").hidden = true;
        document.getElementById("dcolour").hidden = true;
        document.getElementById("dquantity").hidden = false;    
        document.getElementById("ddescription").hidden = true;      
        break;
    case 5:
        // enter description
        document.getElementById("dproductcat").hidden = true;
        document.getElementById("dproduct").hidden = true; 
        document.getElementById("dvariant").hidden = true;
        document.getElementById("dcolour").hidden = true;
        document.getElementById("dquantity").hidden = true;     
        document.getElementById("ddescription").hidden = false;
      break;
     default:
        break;
  }
}

function todescription(){
  quantity = document.getElementById('Quantity').value;
  nextpage();
};

function addproduct() {
  var comment =  document.getElementById('description').value;
  var pcode = products[item].getElementsByTagName("productcode")[0].textContent + selvar + colour
  var productstr = "product?productcode="+pcode;
  if (selvar) {productstr = productstr + "?variant=" + selvar;};
  if (colour) {productstr = productstr + "?colour="  + colour;};
  if (quantity) {productstr = productstr + "?Qty=" + quantity;};
  if (unit) {productstr = productstr + "?UOM=" + unit;};
  
  t.attach({ url: productstr, name: comment })
  t.closePopup();
}

function selectcolour() {
  colourcode = document.getElementById('colour').selectedOptions[0].value;
  colour = document.getElementById('colour').selectedOptions[0].textContent;
  nextpage();
 };

function selectproduct() {
  selectedproduct = document.getElementById('product').selectedOptions;
  item = selectedproduct[0].value;
  productcode = products[item].getElementsByTagName("productcode")[0].textContent
  description = products[item].getElementsByTagName("description")[0].textContent
  checkVariants = products[item].getElementsByTagName("variants")[0];
  unit = products[item].getElementsByTagName("unit")[0].textContent;
  document.getElementById('Unit').innerHTML = unit;
  
  if (products[item].getElementsByTagName("colours")[0]) {
  colourfile = products[item].getElementsByTagName("colours")[0].textContent
  }
  
  if (checkVariants) {
    variants = checkVariants.getElementsByTagName('variant')
    select = document.getElementById('variant');
    for (var i = 0; i < variants.length; i++) {  
        var opt = document.createElement('option');
        opt.value = variants[i].getElementsByTagName("code")[0].textContent;
        opt.innerHTML = "<option value="+variants[i].getElementsByTagName("code")[0].textContent+">"+variants[i].getElementsByTagName("description")[0].textContent+"</option>";
        select.appendChild(opt);  
    }
    nextpage();
  } else {
      if (colourfile) {
      updatecolour();
      } else {
        
      }
  }    
}

function updatecolour() {
  if (colourfile) {
    if (window.XMLHttpRequest) {
      xhttp = new XMLHttpRequest();
    } else {
      xhttp = new ActiveXObject("Microsoft.XMLHTTP");  
    }
    xhttp.open("GET", "./colours/" +  colourfile.toLowerCase() + ".xml", false);
    xhttp.send(null);
    xmlDoc = xhttp.responseXML; 
      select = document.getElementById('colour');    
      colours = xmlDoc.getElementsByTagName("colours")[0].getElementsByTagName("colour")
      for (var i = 0; i < colours.length; i++) {        
        var opt = document.createElement('option');
        opt.value = colours[i].getElementsByTagName("code")[0].textContent;
        opt.innerHTML = "<option value='"+colours[i].getElementsByTagName("code")[0].textContent+"'>"+colours[i].getElementsByTagName("description")[0].textContent+"</option>";
        select.appendChild(opt);
        page = 3;
        changepage();
      } //end of for loop    
  } else {
    page = 4;
    changepage();
  }
}

function selectvariant() {
  selvar = document.getElementById("variant").value;
  updatecolour();
}

function selectcategory() {
 colourfile = "";
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
    nextpage();
    }   //end of if selcart
  }     //end of function 
