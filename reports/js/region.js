var t = TrelloPowerUp.iframe();

function getregiondata() {
  tbl = document.getElementById('table');
  t.cards('id', 'name', 'url','due','attachments')
   .then(function(promiseResult) {
    
     //alasql("CREATE TABLE data (due DATETIME, url STRING,name STRING)");
     for (i=0; i<promiseResult.length;i++) {    
         if (promiseResult[i].attachments.length > 0) {
            for (ii=0; ii<promiseResult[i].attachments.length;ii++) {
                if (promiseResult[i].attachments[ii].url.indexOf('http://region') == 0 ) 
                {
                   list = document.getElementById("list");
                   if (list.item(list.selectedIndex).text == promiseResult[i].attachments[ii].name) 
                   {
                     var row = tbl.insertRow(0);
                     var cardid = row.insertCell(0); 
                     var cardname = row.insertCell(0);
                     var cardurl = row.insertCell(0); 
                     var carddue = row.insertCell(0); 
                     var cardcl = row.insertCell(0); 
                     cardid.innerHTML = promiseResult[i]["id"];
                     cardname.innerHTML = promiseResult[i]["name"];
                     cardurl.innerHTML = promiseResult[i]["url"];
                     carddue.innerHTML = promiseResult[i]["due"];
                     cardcl.innerHTML = promiseResult[i].attachments[ii].name;
                   };                                                             
                };
              };   //end of attachment loop
            }; // end if attachment length > 0 
              console.log(i);       
     }; //end loop of cards.
         console.log('ok');
     tbl.hidden = false;    
});
};
