var t = TrelloPowerUp.iframe();

function tabledata() {
t.cards('id', 'name', 'url')
.then(function(promiseResult) {
  console.log(promiseResult);
});
}
