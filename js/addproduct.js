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
    }
 debugger;  
 var uurloon = xmlDoc.getElementsByTagName("uurloon")[0].childNodes[0].textContent;
 var setloon = xmlDoc.getElementsByTagName("setloon")[0].childNodes[0].textContent;  
  
  }
 debugger;
  
  }
