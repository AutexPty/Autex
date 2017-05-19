var t = TrelloPowerUp.iframe();

function tabledata() {
t.cards('id', 'name', 'url','due','attachments')
.then(function(promiseResult) {
  console.log(promiseResult);
    alasql("CREATE TABLE test (language INT, hello STRING)");
    alasql("INSERT INTO test VALUES (1,'Hello!')");
    alasql("INSERT INTO test VALUES (2,'Aloha!')");
    alasql("INSERT INTO test VALUES (3,'Bonjour!')");
    console.log( alasql("SELECT * FROM test WHERE language > 1") );
});
}
