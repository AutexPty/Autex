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
var slccode;
var slccode1;
var ptr = 0;
var t = TrelloPowerUp.iframe();

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
      prset = xmlDoc.getElementsByTagName("products");
      fprset = prset[0];	  
      products = fprset.getElementsByTagName("product");
      for (var i = 0; i < products.length; i++) {        
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = "<option value="+i+">"  + products[i].getElementsByTagName("description")[0].textContent+"</option>";
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
        document.getElementById("dspec").hidden = true; 
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
    Qty.value = (parseFloat(msq.value)/parseFloat(m2u.value)).toFixed(3);
    } else {
    Qty.value = 0;     
    }
}

function recalcm2(){
    m2u = document.getElementById('m2u');
    Qty = document.getElementById("Quantity");
    msq = document.getElementById("m2");
    if(parseFloat(Qty.value)>0 && parseFloat(m2u.value) >0) {
    msq.value = (parseFloat(Qty.value)*parseFloat(m2u.value)).toFixed(3);
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
        getproductstr();
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

function todesc(){
  nextpage();
};

function getproductstr() {
  var productstr = "";
  if (selvar) {productstr = productstr + variantdetail}
  if (colour) {productstr = productstr + " " + colour}
  document.getElementById("custom").value = productstr;
  document.getElementById("custom2").value = productstr;

}

function addproduct() {
  var comment =  document.getElementById('description').value;
  var pcode = products[item.value].getElementsByTagName("productcode")[0].textContent 
  var mqty = document.getElementById("Quantity").value; 
  var cat=  document.getElementById("product").value; 
  var productstr = "";
  var productname = ""
  var m2 = document.getElementById('m2').value;
  var w = document.getElementById('Width').value;
  var l = document.getElementById('Length').value;
  var u = document.getElementById('Units').value;
 
 if (selvar) {
              productstr = productstr + "?variant=" + variantdetail;
              productname = variantdetail;
              slccode= selvar.slice(-3);
               if (slccode == "BLK" || slccode == "WHI" )
               { slccode1= selvar.substring(0, selvar.length - 3)
                pcode= pcode + slccode1;
               }
               else
               { pcode = pcode + selvar ;}
              }
	
var code= document.getElementById('product').value;
	
switch(code) {
    	case '0':
        productname= "Verfiface";
	case '1':
	productname= "Etch";
    	case '7':
        productname= "Symphony";
	case '9':
	productname= "Peel n stick Tiles";	
	case '10':
        productname= "Accent Ceiling Tiles";
	
	}
	
	

	
if (colour)  {
               productstr = productstr + "?colour="  + colour;
               productname =  productname + " " + colour;
               if (slccode == "BLK")
               { if (pcode.substring(0,3)=="QSP")
			              {pcode = pcode + colourcode + "K";}
				             else
			              {pcode = pcode + colourcode + "BLK";}
			           	}
               else if (slccode == "WHI")
               { if (pcode.substring(0,3)=="QSP")
			              {pcode = pcode + colourcode;}
				             else
                 {pcode = pcode + colourcode+ "WHI"; }
               }
               else
               { pcode = pcode + colourcode;}
               } 
 
 if (ptr==1 && cat<6 && cat!=1)
 {pcode= "PCS"+ pcode;
  productname = "precision Cut "+productname;
  }

  if (mqty) {productstr = productstr + "?Qty=" + mqty;};
  if (unit) {productstr = productstr + "?UOM=" + unit;};
  if (u)  {productstr = productstr + "?PPK=" + u;};
  if (w)  {productstr = productstr + "?w=" + w;};
  if (l)  {productstr = productstr + "?l=" + l;};
  if (m2)  {productstr = productstr + "?m2=" + m2;};
  if (comment) {
     var gc = comment.replace(/[^a-z\d\s]+/gi, "");
     productstr = productstr + "?comments=" + gc;
  };
  var url = "http://product.io/?productcode=" + pcode + productstr
  t.attach({ url: url.split(' ').join('_'), name: productname })
  t.closePopup();
}

function selectcolour() {
  col = document.getElementById('colour');
  colourcode = col.options[col.selectedIndex].value;
  colour =  col.options[col.selectedIndex].textContent;
  nextpage();
 };

function selectproduct() {
  po = document.getElementById('product');
  // IE Changes
  spi = po.selectedIndex;
  item = po.options[spi];	
  //selectedproduct = po.selectedOptions;
  //item = selectedproduct[0].value;
  product = products.item(Number(item.value));
  productcode = product.getElementsByTagName("productcode")[0].textContent
  
  if (productcode == "QSF") {
   lblwidth = document.getElementById('lblwidth');
   lblwidth.textContent = "Fin Height (m)";
  }
  
  description = product.getElementsByTagName("description")[0].textContent
  checkVariants = product.getElementsByTagName("variants")[0];
  unit = product.getElementsByTagName("unit")[0].textContent;
  document.getElementById('Unit').innerHTML = unit;
  document.getElementById('Unit2').innerHTML = unit;
  document.getElementById('Unit3').innerHTML = unit;
 
  
  if (product.getElementsByTagName("colours")[0]) {
  colourfile = product.getElementsByTagName("colours")[0].textContent
  }
  
  if (checkVariants) {
    variants = checkVariants.getElementsByTagName('variant')
    select = document.getElementById('variant');
    for (var i = 0; i < variants.length; i++) {  
        var opt = document.createElement('option');
        opt.value = variants[i].getElementsByTagName("code")[0].textContent;
        opt.innerHTML = variants[i].getElementsByTagName("description")[0].textContent;     
        opt.setAttribute('dw',variants[i].getElementsByTagName("width")[0].textContent);      
        opt.setAttribute('dl',variants[i].getElementsByTagName("length")[0].textContent);
        opt.setAttribute('du',variants[i].getElementsByTagName("units")[0].textContent);            
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
  ptr=1;
};

function selectvariant() {
  selvar = document.getElementById("variant").value;
  var v = document.getElementById("variant");
  var selected = v.options[v.options.selectedIndex];
  variantdetail = selected.textContent;
  var dw = selected.getAttribute('dw');
  var dl = selected.getAttribute('dl');
  var du = selected.getAttribute('du');
  document.getElementById('Width').value = dw;
  document.getElementById('Length').value = dl;
  document.getElementById('Units').value = du;
  updatem2();
  updatecolour();
}
