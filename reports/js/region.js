var t = TrelloPowerUp.iframe();

function addline(parent,header,body)
{
  var tli = document.createElement('li');
  var h = document.createTextNode(header);
  //h.style.fontWeight = 'bold';
  tli.appendChild(h);
  var b = document.createTextNode(body);
  //b.style.fontStyle = "italic";
  tli.appendChild(b);  
  parent.appendChild(tli);
}

function loadid(id){
  t.showCard(id);
}

function getregiondata() {
  tbl = document.getElementById('table');
  tbl.tBodies[0].innerHTML = "";
  t.lists('all')
   .then(function(promiseResult) {
    
     //alasql("CREATE TABLE data (due DATETIME, url STRING,name STRING)");
     for (l=0; l<promiseResult.length;l++) {    
         var currentlist = promiseResult[l];
         for (c=0; c<promiseResult[l].cards.length;c++) 
           {
           var currentcard = currentlist.cards[c];           
           if (currentcard.attachments.length > 0) 
              {
              for (ii=0; ii<currentcard.attachments.length;ii++) 
                 {
                   var currentattachment = currentcard.attachments[ii];
                   if (currentattachment.url.indexOf('http://region') == 0 ) 
                     {
                     if (list.item(list.selectedIndex).text == currentattachment.name) 
                        {
                        var row = tbl.tBodies[0].insertRow(0);
                        // inserted cells are backwards (last first) because of reasons..
                        var cardproducts = row.insertCell(0);
                        var carddue = row.insertCell(0); 
                        var cardname = row.insertCell(0);
                        var cardstage = row.insertCell(0);

                        //cardname.innerHTML = '<a href="#" onlick="loadid(' + "'"+ currentcard["id"] +"'"+');">'+ currentcard["name"]+'</a>';
                        var ank = document.createElement('a');
                        var linkText = document.createTextNode(currentcard["name"]);
                        ank.appendChild(linkText);
                        ank.onclick=function(){t.showCard(currentcard["id"])};
                        cardname.appendChild(ank);                          
                        carddue.innerHTML = Date(currentcard["due"]).slice(0,15);
                        cardstage.innerHTML = currentlist.name;
                        
                        for (cca=0; cca < currentcard.attachments.length;cca++)
                        {
                          var ccao = currentcard.attachments[cca]
                          if (ccao.url.indexOf('http://product?') == 0) {
                            var ul = document.createElement('ul');
                            cardproducts.appendChild(ul);
                            var li = document.createElement('li');
                            li.appendChild(document.createTextNode(ccao.name));
                            ul.appendChild(li);
                            
                            var qty = null;
                            var uom = null;
                            var m2 = null;
                            var w = null;
                            var lx = null; 
                            var cmnt = null;
                            var pcode = null;
                            var u = null;
                            
                            b = ccao.url.split('?'); //divide the url into portions
                            for (i = 0; i < b.length; i++) {
                              if (b[i].indexOf("productcode=")==0) {pcode = b[i].slice(12);};
                              if (b[i].indexOf("Qty=")==0)         {qty = b[i].slice(4);};
                              if (b[i].indexOf("UOM=")==0)         {uom = b[i].slice(4);};   
                              if (b[i].indexOf("PPK=")==0)         {u  =  b[i].slice(4);};   
                              if (b[i].indexOf("m2=")==0)          {m2 =  b[i].slice(3);};   
                              if (b[i].indexOf("w=")==0)           {w =   b[i].slice(2);};   
                              if (b[i].indexOf("l=")==0)           {lx =   b[i].slice(2);};             
                              if (b[i].indexOf("comments=")==0)    {cmnt =   b[i].slice(9);};             
                            };
                            
                            // check for zeroes, remove if required.
                            if (qty=="0.00") {qty=null;};
                            if (m2=="0.00") {m2=null;};
                            
                            //generate sublist
                            sublist =  document.createElement('ul');
                            if (pcode) {addline(sublist,"Product Code:",pcode);};
                            if (qty) {addline(sublist,"Quantity:",qty + ' ' + uom);};
                            if (u) {addline(sublist,"Units Per Pack:",u);};                            
                            if (m2) {addline(sublist,"Meters Squared:",m2);};
                            if (w&&lx) {addline(sublist,"Dimensions:",w+' x '+lx);};
                            if (cmnt) {addline(sublist,"Comments:",cmnt);};
                            li.appendChild(sublist);                           
                          }
                        }
                        
                        };                                                             
                     };
                 };   //end of attachment loop
              }; // end if attachment length > 0 
           }; //loop cards.
     }; //end loop of cards.
     tbl.hidden = false;    
});
};
