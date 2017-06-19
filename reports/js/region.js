var t = TrelloPowerUp.iframe();

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
                        var carddue = row.insertCell(0); 
                        var cardname = row.insertCell(0);
                        var cardstage = row.insertCell(0); 

                        //cardname.innerHTML = '<a href="#" onlick="loadid(' + "'"+ currentcard["id"] +"'"+');">'+ currentcard["name"]+'</a>';
                        var ank = document.createElement('a');
                        var linkText = document.createTextNode(currentcard["name"]);
                        ank.appendChild(linkText);
                        ank.onclick=function(){t.showCard(currentcard["id"])};
                        cardname.appendChild(ank);                          
                        carddue.innerHTML = currentcard["due"];
                        cardstage.innerHTML = currentlist.name;
                        };                                                             
                     };
                 };   //end of attachment loop
              }; // end if attachment length > 0 
           }; //loop cards.
     }; //end loop of cards.
     tbl.hidden = false;    
});
};
