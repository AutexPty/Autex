var t = TrelloPowerUp.iframe();

function save() {
  var sp = document.getElementById('StatePrefix').value
  t.attach({ url: "http://classification.io/?" + sp, name: "Estimated Project Cost: " + sp })
  t.closePopup();
}
