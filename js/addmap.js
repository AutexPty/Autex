
/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

// you can access arguments passed to your iframe like so
var num = t.arg('rand');

t.render(function(){
  // this function we be called once on initial load
  // and then called each time something changes that
  // you might want to react to, such as new data being
  // stored with t.set()
});

// Important! If you are using the overlay, you should implement
// the following two methods to ensure that closing the overlay
// is simple and consistent for the Trello user

// close overlay if user clicks outside our content
document.addEventListener('click', function(e) {
  if(e.target.tagName == 'BODY') {
    t.closeOverlay().done();
  }
});

// close overlay if user presses escape key
document.addEventListener('keyup', function(e) {
  if(e.keyCode == 27) {
    t.closeOverlay().done();
  }
});

function close(){
t.closeOverlay().done();
}


function addregion(region)
{
	reg= document.getElementById('regionsel');
	 for (var i = 0; i < reg.length; i++) 
	 {  
		if ((reg.options[i].value) == region)
		 
		 {
		 reg.value= region;
		 }
	 }
}

function save() {
  var reg= document.getElementById('regionsel');
  var selected = reg.options[reg.selectedIndex];
  if(selected.value=="0") {
	  t.closeOverlay().done();
  } else {
    t.attach({ url: "http://region?" + selected.text, name: selected.text})
    t.closeOverlay().done();  
  }
}

