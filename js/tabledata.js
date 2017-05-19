var t = TrelloPowerUp.iframe();

function processrecord(data) {
    var v = data.filter(function(text){ return text.indexOf('variant=') == 0 })[0];
    var p = data.filter(function(text){ return text.indexOf('productcode=') == 0 })[0];
    var q = data.filter(function(text){ return text.indexOf('qty=') == 0 })[0];
    var c = data.filter(function(text){ return text.indexOf('colour=') == 0 })[0];  
    return { variant: v.split('=')[1] , productcode: p.split('=')[1] ,qty: q.split('=')[1],colour: c.split('=')[1] } 
};

function tabledata() {
  t.cards('id', 'name', 'url','due','attachments')
   .then(function(promiseResult) {
    
     //alasql("CREATE TABLE data (due DATETIME, url STRING,name STRING)");
     for (i=0; i<promiseResult.length;i++) {    
         if (promiseResult[i].attachments.length > 0) {
            for (ii=0; ii<promiseResult[i].attachments.length;ii++) {
              var data = promiseResult[i].attachments[ii].url.split('?');
              var pdata = processrecord(data);
                //var sql="INSERT INTO data VALUES (" & promiseResult[i].due & "," & promiseResult[i].attachments[ii].url & "," & promiseResult[i].name & ");"
            //    alasql(sql);
                console.log(pdata);                          
             };   //end of attachment loop
            }; // end if attachment length > 0 
              console.log(i);       
     }; //end loop of cards.
         console.log('ok');
    
    //console.log( alasql("SELECT * FROM data ORDER BY due") );
    
    //alert('hi');
});
};
