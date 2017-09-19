var t = TrelloPowerUp.iframe();
updatelist();


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

function updatelist(){
  if (list) {removeOptions(list);};
  opt = document.createElement("OPTION");
  opt.text = "Please Select";
  list.appendChild(opt);  
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

function showlist(){
    selected = list[list.selectedIndex];   
    t.list(selected.id).then(function(list) {        
    alert (JSON.stringify(list, null, 2));
    });
};
