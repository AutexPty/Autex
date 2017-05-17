/* global TrelloPowerUp */

var WHITE_ICON = './images/icon-white.svg';
var GRAY_ICON = './images/icon-gray.svg';
var AUTEX_ICON = './images/autex.svg';

// This is the script for the Overhead menu.
//
//
var boardButtonCallback = function(t){
  return t.popup({
    title: 'AUtex Trello EXtensions',
    items: [
      {
        text: 'Help',
        callback: function(t){
          return t.boardBar({
            url: './help.html',
            height: 200
          })
          //.then(function(){
          //  return t.closePopup();
          //});
        }
      },{
        text: '-------------',		  
	  },{
        text: 'About.',
        callback: function(t){
          return t.overlay({
            url: './about.html'
			})
          .then(function(){
            return t.closePopup();
          });
        }
      }

    ]
  });
};


var oldmapAddCallback = function(t) {
  return t.overlay({
    url: './addmap.html'
  }) 
	  .then(function(){
	  return t.closeOverlay();
  });
}

var mapAddCallback = function(t){
          return t.overlay({
            url: './addmap.html',
          })
          .then(function(){
            return t.closePopup();
          });
        }

var productAddCallback = function(t){
  t.popup({
	  title: 'Add Product',
	  url:"./addproduct.html",
	  height: 450
  });
};

var documentAddCallback = function(t){
  t.popup({
	  title: 'Add Document',
	  url:"./adddocument.html",
	  height: 450
  });
};

var menu = function(t) {
return t.popup({
	title: 'Menu',
	items: [
		{
			text: "Add Autex Products",
			callback:  productAddCallback
		},
		{
			text: "Add Project Regions",
			callback:  mapAddCallback
		},
		{
			text: "Add Document Number (V-Number)",
			callback:  documentAddCallback
		}
		]
})
		
}



TrelloPowerUp.initialize({
  'attachment-sections': function(t, options){
    // options.entries is a list of the attachments for this card
    // you can look through them and 'claim' any that you want to
    // include in your section.

    // we will just claim urls for Yellowstone
    var claimed = options.entries.filter(function(attachment){
      return attachment.url.indexOf('http://product?') == 0;
    });

    // you can have more than one attachment section on a card
    // you can group items together into one section, have a section
    // per attachment, or anything in between.
    if(claimed && claimed.length > 0){
      // if the title for your section requires a network call or other
      // potentially length operation you can provide a function for the title
      // that returns the section title. If you do so, provide a unique id for
      // your section
      return [{
        id: 'Products', // optional if you aren't using a function for the title
        claimed: claimed,
        icon: GRAY_ICON,
        title: 'Products Required',
        content: {
          type: 'iframe',
          url: t.signUrl('./section.html', { arg: 'you can pass your section args here' }),
          height: 230
        }
      }];
    } else {
      return [];
    }
  },
  'board-buttons': function(t, options){
    return [{
      icon: AUTEX_ICON,
      text: 'AUTEX',
      callback: boardButtonCallback
    }];
  },
  'card-buttons': function(t, options) {
    return [{
      icon: GRAY_ICON,
      text: 'Add Items',
      callback: menu
      //cardButtonCallback
    }];
  }
});
