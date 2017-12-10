function showlist(){
    var products = {};
       
    t.lists("all").then(function(promiseResult) {
         
         /*
         for (l=0; l<promiseResult.length;l++)
         {
             if (promiseResult[l].id == selected.value){
             var currentlist = promiseResult[l];  
             }
         } 
         */
        var currentlist = promiseResult[0]
         for (c=0; c<currentlist.cards.length;c++) 
           {
           var currentcard = currentlist.cards[c];           
           if (currentcard.attachments.length > 0) 
              {
                  console.log('CARD:('+currentcard["id"]+') ' + currentcard["name"]);                 
                    for (ii=0; ii<currentcard.attachments.length;ii++) 
                        {
                            var currentattachment = currentcard.attachments[ii];
                            var ccao = currentcard.attachments[ii];
                            if (ccao.url.indexOf('http://product') == 0) {
                                console.log(ccao.name);
                                };
                        };
              }
           }
    });
}


var t = TrelloPowerUp.iframe();
//updatelist();
//using the function:
//removeOptions(document.getElementById("mySelectObject"));
