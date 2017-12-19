var t = TrelloPowerUp.iframe();

function save() {
  var sp = document.getElementById('timeframe').value
  t.attach({ url: "http://timeframe.io/?" + sp, name: "#" + sp })
  t.closePopup();
}