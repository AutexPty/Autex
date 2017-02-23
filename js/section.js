/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();
var tb = document.getElementById('producttable').createTBody();

// you can access arguments passed to your iframe like so
var arg = t.arg('arg');

t.render(function(){
  // make sure your rendering logic lives here, since we will
  // recall this method as the user adds and removes attachments
  // from your section
  t.card('attachments')
  .get('attachments')
  .filter(function(attachment){
    return attachment.url.indexOf('http://product?') == 0;
  })
  .then(function(yellowstoneAttachments){
    var pcode = "";
    var qty = "";
    var uom = "";
    
    var urls = yellowstoneAttachments.map(
      function(a){ 
        b = a.url.split('?'); //divide the url into portions
        for (i = 0; i < b.length; i++) {
          if (b[i].indexOf("productcode=")) {;pcode = b[i].slice(12)};
          if (b[i].indexOf("Qty=")) {; = b[i].slice(4)};
          if (b[i].indexOf("UOM=")) {;uom = b[i].slice(4)};                   
        }
        
        ir = tb.insertRow();
        c = ir.insertCell();
        c.textContent=pcode;
        c = ir.insertCell();
        c.textContent=a.name;
        c = ir.insertCell();        
        c.textContent=qty;
        c = ir.insertCell();        
        c.textContent=uom;

        //return a.url; 
      });
    //document.getElementById('urls').textContent = urls.join(', ');
    //debugger;
  })
  .then(function(){
    return t.sizeTo('#content');
  });
});
