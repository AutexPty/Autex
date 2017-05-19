var t = TrelloPowerUp.iframe();

function tabledata() {
  alert('hi');
  t.cards('id', 'name', 'desc', 'due').get('name').then(function(name){
  var n = name;
    
  });
  t.closePopup();
}
