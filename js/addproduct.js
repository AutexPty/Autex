function addproduct() {
  debugger;
  alert('confirm pressed');

}

function selectcategory() {
 document.getElementById("dproductcat").hidden = true;
 document.getElementById("dproduct").hidden = false; 
  
 debugger;
 selcat =  document.getElementById("category").value;

  if (selcat) {
    if (window.XMLHttpRequest) {
      xhttp = new XMLHttpRequest();
    } else {    // IE 5/6
      xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET", "./" +  selcat + ".xml", false);
    xhttp.send(null);
    xhttp.onreadystatechange = function(){
    if (xhttp.status == "200")
      xmlDoc = xhttp.responseXML; 
      select = document.getElementById('product');

      var products = xmlDoc.getElementsByTagName("products")[0].getElementsByTagName("product")
      debugger;   
      for (var i = 0; i < products.length; i++) {        
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = "<option value="+i+">"+products[i].getElementsByTagName("Description").childNodes[0].textContent+"</option>";
        select.appendChild(opt);
      }
    }
  }
 debugger;
  
  }
