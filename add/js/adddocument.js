var t = TrelloPowerUp.iframe();

function save() {
  var sp = document.getElementById('StatePrefix').value
  var dn = document.getElementById('DocumentNo').value
  t.attach({ url: "http://document?" + sp + dn, name: "#" + sp + dn})
  t.closePopup();
}
