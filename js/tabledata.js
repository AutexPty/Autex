var t = TrelloPowerUp.iframe();

function tabledata() {
  t.cards('id', 'name', 'url','due','attachments')
   .then(function(promiseResult) {
    
     //alasql("CREATE TABLE data (due DATETIME, url STRING,name STRING)");
     for (i=0; i<promiseResult.length;i++) {    
         if (promiseResult[i].attachments.length > 0) {
            for (ii=0; ii<promiseResult[i].attachments.length;ii++) {      
            //    var sql="INSERT INTO data VALUES (" & promiseResult[i].due & "," & promiseResult[i].attachments[ii].url & "," & promiseResult[i].name & ");"
            //    alasql(sql);
              console.log(i&"-"&ii);                          
             };   //end of attachment loop
            }; // end if attachment length > 0 
              console.log(i);       
     }; //end loop of cards.
         console.log('ok');
    
    //console.log( alasql("SELECT * FROM data ORDER BY due") );
    
    //alert('hi');
});
};
