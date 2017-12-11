function showlist(){
    var products = {};
       
    t.lists("all").then(function(promiseResult) {        
      for (l=0; l<promiseResult.length;l++)
      {
        var currentlist = promiseResult[0]
        console.log('LIST:' +currentlist["name"]);
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
                                if (ccao.url.indexOf('http://product?') == 0) {
				var newurl = 'http://product.io/?' + ccao.url.substring(15, 999);
				var newurl = newurl.replace(/[^\w\s\\\/\:_\=\?\.]/gi, '').split(' ').join('_');
				ccao.url = newurl;
				deletecard(currentcard.id,ccao.id);
                                console.log(newurl);
                                };
								};
						}
			}	
		 };
	}});
}

function deletecard(idcard,idattachment) {
var data = JSON.stringify(false);
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});
	
xhr.open("DELETE", "https://api.trello.com/1/cards/"+idcard+"/attachments/"+idattachment);
xhr.send(data);	

}

var t = TrelloPowerUp.iframe();
//updatelist();
//using the function:
//removeOptions(document.getElementById("mySelectObject"));
