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
    var urls = yellowstoneAttachments.map(
      function(a){ 
        ir = tb.insertRow();
        c = ir.insertCell();
        c = ir.insertCell();
        c.textContent=a.name;
        c = ir.insertCell();        
        //return a.url; 
      });
    //document.getElementById('urls').textContent = urls.join(', ');
    //debugger;
  })
  .then(function(){
    return t.sizeTo('#content');
  });
});
