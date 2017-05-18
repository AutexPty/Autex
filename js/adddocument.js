function save() {
  var sp = document.getElementById('StatePrefix').value
  var dn = document.getElementById('DocumentNo').value
  t.attach({ url: "document?=" + sp + dn, name: "Document " + sp + dn})
  t.closePopup();
}
