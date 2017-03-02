/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();
var tb = document.getElementById('producttable').createTBody();

// you can access arguments passed to your iframe like so
var arg = t.arg('arg');

t.render(function(){
  // make sure your rendering logic lives here, since we will
  // recall this method as the user adds and removes attachments
  // from your section
  tb.innerHTML = "";
  t.card('attachments')
  .get('attachments')
  .filter(function(attachment){
    return attachment.url.indexOf('http://product?') == 0;
  })
  .then(function(yellowstoneAttachments){
    var pcode = "";
    var qty = "";
    var uom = "";
    var m2 = "";
    var w = "";
    var l = "";
    var u = "";
    var cmnt = "";
    
    var urls = yellowstoneAttachments.map(
      function(a){ 
        b = a.url.split('?'); //divide the url into portions
        for (i = 0; i < b.length; i++) {
          if (b[i].indexOf("productcode=")==0) {pcode = b[i].slice(12);};
          if (b[i].indexOf("Qty=")==0) {qty = b[i].slice(4);};
          if (b[i].indexOf("UOM=")==0) {uom = b[i].slice(4);};   
          if (b[i].indexOf("PPK=")==0) {u  =  b[i].slice(4);};   
          if (b[i].indexOf("m2=")==0)  {m2 =  b[i].slice(3);};   
          if (b[i].indexOf("w=")==0)   {w =   b[i].slice(2);};   
          if (b[i].indexOf("l=")==0)   {l =   b[i].slice(2);};             
          if (b[i].indexOf("comments=")==0)   {cmnt =   b[i].slice(9);};             
        }
        
        ir = tb.insertRow();
        c = ir.insertCell();
        c.textContent=pcode;
        c = ir.insertCell();
        c.textContent=a.name;
        c = ir.insertCell();        
        c.textContent=qty +" "+uom;
        c = ir.insertCell();
        if (u==1) {
        c.textContent=w+" x " + l;    
        } else {
        c.textContent=w+" x " + l + " x " + u;    
        }
        c = ir.insertCell();        
        c.textContent=m2;
       
      });
  })
  .then(function(){
    return t.sizeTo('#content');
  });
});
