var t = TrelloPowerUp.iframe();
function showlist(){
  t.lists('all')
   .then(function(promiseResult) {
   for (l=0; l<promiseResult.length;l++) {
     var currentlist = promiseResult[l];
     alert (currentlist.name);
   }   
  });        
  alert('done');
};

