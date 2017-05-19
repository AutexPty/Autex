var t = TrelloPowerUp.iframe();

function processrecord(data) {
    var output = {}
    var v = data.filter(function(text){ return text.indexOf('variant=') == 0 })[0];
    var p = data.filter(function(text){ return text.indexOf('productcode=') == 0 })[0];
    var q = data.filter(function(text){ return text.indexOf('Qty=') == 0 })[0];
    var c = data.filter(function(text){ return text.indexOf('colour=') == 0 })[0];  
        if (v) {output.variant = v.split('=')[1];};
    if (p) {output.productcode = p.split('=')[1];};
    if (q) {output.qty = q.split('=')[1];};
    if (c) {output.colour = c.split('=')[1];};
    return output; 
};

function tabledata() {
  t.cards('id', 'name', 'url','due','attachments')
   .then(function(promiseResult) {
    
     //alasql("CREATE TABLE data (due DATETIME, url STRING,name STRING)");
     for (i=0; i<promiseResult.length;i++) {    
         if (promiseResult[i].attachments.length > 0) {
            for (ii=0; ii<promiseResult[i].attachments.length;ii++) {
                if (promiseResult[i].attachments[ii].url.indexOf('http://product?') == 0 ) 
                {
                   var data = promiseResult[i].attachments[ii].url.split('?');
                   var pdata = processrecord(data);                    
                   console.log(pdata);                          
                };
                //var sql="INSERT INTO data VALUES (" & promiseResult[i].due & "," & promiseResult[i].attachments[ii].url & "," & promiseResult[i].name & ");"
            //    alasql(sql);
             };   //end of attachment loop
            }; // end if attachment length > 0 
              console.log(i);       
     }; //end loop of cards.
         console.log('ok');
    
    //console.log( alasql("SELECT * FROM data ORDER BY due") );
    
    //alert('hi');
});
};
