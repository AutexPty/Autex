var t = TrelloPowerUp.iframe();

function removeOptions(selectbox)
{
    var i;
    for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
    {
        selectbox.remove(i);
    }
}
//using the function:
removeOptions(document.getElementById("mySelectObject"));

function showlist(){
  removeOptions(list);
  t.lists('all')
   .then(function(promiseResult) {
   for (l=0; l<promiseResult.length;l++) {
     var currentlist = promiseResult[l];
     opt = document.createElement("OPTION");
     opt.text = currentlist.name;
     opt.value = currentlist.id;
     list.appendChild(opt);
   }   
  });        
  //alert('done');
};

