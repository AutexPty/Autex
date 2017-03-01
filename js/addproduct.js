var products;
var colourfile;
var page = 0;
var item;
var productcode;
var description;
var selvar;
var variantdetail;
var colour;
var colourcode;
var quantity;
var unit;

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
      select.innerHTML = "";
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




function nextpage(){
  page = page + 1;
  changepage();
}

function hidepages(){
        document.getElementById("dproductcat").hidden = true;
        document.getElementById("dproduct").hidden = true; 
        document.getElementById("dvariant").hidden = true;
        document.getElementById("dcolour").hidden = true;
        document.getElementById("dquantity").hidden = true;     
        document.getElementById("ddescription").hidden = true; 
}

function toquantity(){
   page = 5;
  changepage();
}

function recalcQuantity(){
    m2u = document.getElementById('m2u');
    Qty = document.getElementById("Quantity");
    msq = document.getElementById("m2");
    if(parseFloat(msq.value)>0 && parseFloat(m2u.value) >0) {
    Qty.value = parseFloat(msq.value)/parseFloat(m2u.value);
    } else {
    Qty.value = 0;     
    }
}

function recalcm2(){
    m2u = document.getElementById('m2u');
    Qty = document.getElementById("Quantity");
    msq = document.getElementById("m2");
    if(parseFloat(Qty.value)>0 && parseFloat(m2u.value) >0) {
    msq.value = parseFloat(qty)*parseFloat(m2u);
    } else {
    msq.value = 0;
    }

}

    
function changepage(){
  switch(page) {
    case 0:
        // select category
        hidepages();     
        document.getElementById("dproductcat").hidden = false;
    break;
    case 1:
        // select product group
        hidepages();     
        document.getElementById("dproduct").hidden = false; 
        break;
    case 2:
        // select variant
        hidepages();     
        document.getElementById("dvariant").hidden = false;
        break;
    case 3:
        // select colour
        hidepages();     
        document.getElementById("dcolour").hidden = false;
        break;
    case 4:
        // select specs
        hidepages();     
        document.getElementById("dspec").hidden = false;    
        break;
    case 5:
        // select quantity
        hidepages();     
        document.getElementById("dquantity").hidden = false;     
      break;
   case 6:
        // enter description
        hidepages();     
        document.getElementById("ddescription").hidden = false;    
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
  var pcode = products[item].getElementsByTagName("productcode")[0].textContent 
  var productstr = "";
  var productname = ""
  if (selvar) {
               productstr = productstr + "?variant=" + variantdetail;
               pcode = pcode +selvar;
               productname = variantdetail;
              };
  if (colour) {
               productstr = productstr + "?colour="  + colour;
               pcode = pcode + colourcode;
               productname =  productname + " " + colour;
               };
  if (quantity) {productstr = productstr + "?Qty=" + quantity;};
  if (unit) {productstr = productstr + "?UOM=" + unit;};
  if (comment) {productstr = productstr + "?comments=" + comment;};
  
  t.attach({ url: "product?productcode=" + pcode + productstr, name: productname })
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

function updatem2() {
  w = parseFloat(document.getElementById('Width').value); 
  l = parseFloat(document.getElementById('Length').value); 
  u = parseFloat(document.getElementById('Units').value);
  document.getElementById('m2u').value = w*l*u;
}

function editspecs() {
  document.getElementById('Width').disabled = false; 
  document.getElementById('Length').disabled = false; 
  document.getElementById('Units').disabled = false; 
};

function selectvariant() {
  selvar = document.getElementById("variant").value;
  var v = document.getElementById("variant");
  variantdetail = v.options[v.options.selectedIndex].textContent
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
