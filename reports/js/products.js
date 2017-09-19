var t = TrelloPowerUp.iframe();
function showlist(){
  t.lists('all')
   .then(function(promiseResult) {
   for (l=0; l<promiseResult.length;l++) {
     var currentlist = promiseResult[l];
     opt = document.createElement("OPTION");
     opt.name = currentlist.name;
     opt.value = currentlist.id;
     list.appendChild(opt);
   }   
  });        
  alert('done');
};

