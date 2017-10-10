function removeOptions(selectbox)
{
    var i;
    for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
    {
        selectbox.remove(i);
    }
}

function opencardid()
{
   var id = this.getAttribute('id');
   var t = TrelloPowerUp.iframe();
   t.showCard(id);
}

function addsumline(parent,header,body)
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
    var products = {};
    selected = list[list.selectedIndex];   
    tbl = document.getElementById('table');
    tbl.tBodies[0].innerHTML = "";
       
    t.lists("all").then(function(promiseResult) {
         
         for (l=0; l<promiseResult.length;l++)
         {
             if (promiseResult[l].id == selected.value){
                var currentlist = promiseResult[l];  
             }
         }        

         for (c=0; c<currentlist.cards.length;c++) 
           {
           var currentcard = currentlist.cards[c];           
           if (currentcard.attachments.length > 0) 
              {
              for (ii=0; ii<currentcard.attachments.length;ii++) 
                 {
                   var currentattachment = currentcard.attachments[ii];
                   //if (currentattachment.url.indexOf('http://region') == 0 ) 
                     //{
                     //var curnams = list.item(list.selectedIndex).text
                     //var curnam = curnams.slice(curnams.indexOf("/")+1)
                     //if (curnam == currentattachment.name) 
                     //   {
                        var row  = tbl.tBodies[0].insertRow(0);
                        // inserted cells are backwards (last first) because of reasons..
                        var cardproducts = row.insertCell(0);
                        var carddue = row.insertCell(0); 
                        var cardname = row.insertCell(0);
                        var cardstage = row.insertCell(0);

                        //cardname.innerHTML = '<a href="#" onlick="loadid(' + "'"+ currentcard["id"] +"'"+');">'+ currentcard["name"]+'</a>';
                        var ank = document.createElement('a');
                        var linkText = document.createTextNode(currentcard["name"]);
                        ank.appendChild(linkText);
                        //var acid = currentcard["id"];
                        ank.id = currentcard["id"];
                        ank.onclick= function() {opencardid()};
                        //function(){t.showCard(acid)};
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
                            if (m2) {
                                     addline(sublist,"Meters Squared:",m2);
                                     if (pcode) {
                                        if (products[pcode])
                                           {products[pcode] += parseFloat(m2)}
                                        else 
                                           {products[pcode] = parseFloat(m2)}
                                    }};
                            if (w&&lx) {addline(sublist,"Dimensions:",w+' x '+lx);};
                            if (cmnt) {addline(sublist,"Comments:",cmnt);};
                            li.appendChild(sublist);                           
                          }
                        }
                        
                        //};                                                             
                     //};
                 };   //end of attachment loop
              }; // end if attachment length > 0 
           }; //loop cards.
     tbls = document.getElementById('summary');
     tbls.tBodies[0].innerHTML = "";        
     for (keyno = 0; keyno < Object.keys(products).length - 1; keyno++) {
         var rows = tbls.tBodies[0].insertRow(0);
         var curcode = Object.keys(products)[keyno];
         var qty = products[curcode];
         var cpq = rows.insertCell(0);
         var cpc = rows.insertCell(0);
         cpc.innerText = curcode;
         cpq.innerText = qty.toFixed(2);
     }        
     //alert(JSON.stringify(products) );
     tbls.hidden = false;  
     }); //end loop of cards.
     tbl.hidden = false;                 
    //t.list(selected.value).then(function(list) {        
    //alert (JSON.stringify(list, null, 2));
    //});
};


var t = TrelloPowerUp.iframe();
updatelist();
//using the function:
//removeOptions(document.getElementById("mySelectObject"));


