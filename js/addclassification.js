var t = TrelloPowerUp.iframe();

function save() {
  var sp = document.getElementById('StatePrefix').value
  var firstletter= sp.substring(0,1)
  t.attach({ url: "http://classification.io/?" + firstletter, name: "Estimated Project Cost: " + sp.substring(2,sp.length-1) })
  t.closePopup();
}
