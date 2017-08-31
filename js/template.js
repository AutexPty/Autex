/* global TrelloPowerUp */

var WHITE_ICON = './images/icon-white.svg';
var GRAY_ICON = './images/icon-gray.svg';
var AUTEX_ICON = './images/autex.svg';
var MAP_ICON = './images/map.svg';
var ORDER_ICON = './images/order.svg';
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
        text: 'Product List',
        callback: function(t){
          return t.boardBar({
            url: './tabledata.html',
            height: 200,
	    icon: ORDER_ICON
          })
          //.then(function(){
          //  return t.closePopup();
          //});
        }
      },{
        text: 'Regional List',
        callback: function(t){
          return t.boardBar({
            url: './reports/region.html',
            height: 200,
	    icon: ORDER_ICON
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

// ----------------------------

var getBadges = function(t){
  return t.card('attachments')
  .get('attachments')
  .then(function(attachments){

    z = attachments.filter((function(attachment){
      return attachment.url.indexOf('http://product?') == 0;
    }));

    r = attachments.filter((function(attachment){
	    if (attachment.url.indexOf('http://region?') == 0) {
              return attachment.url;
	    }
       }));
	    
    d = attachments.filter((function(attachment){
	    if (attachment.url.indexOf('http://document?') == 0) {
              return attachment.url;
	    }	    
      //return attachment.url.indexOf('http://region?') == 0;
    }));
    
    var badges = [];
	  
if (z.length >0) {
    badges.push({
        title: 'Product Badge', // for detail badges only
        text: z.length,
        icon: AUTEX_ICON, // for card front badges only
        color: 'green'
      })	
}; 
if (r.length >0) {
    for(c = 0; c < r.length; c++) {
    badges.push({
        title: 'Region Badge', // for detail badges only
	icon: MAP_ICON, 
        text: r[c].name
        //,color: 'yellow'	      
      });
    };
};
if (d.length >0) {
    for(c = 0; c < d.length; c++) {
    badges.push({
        title: 'Document Badge', // for detail badges only
        text: d[c].name,
	icon: ORDER_ICON
        //,color: 'red'	      
      });
    };
};	    
    return badges;	  
})
};

// ----------------------------


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
	  title: 'Add Autex Product',
	  url:"./addproduct.html",
	  height: 410
  });
};

var documentAddCallback = function(t){
  t.popup({
	  title: 'Add Document Number',
	  url:"./adddocument.html",
	  height: 180
  });
};

var classificationAddCallback = function(t){
  t.popup({
	  title: 'Add Classification',
	  url:"./addclassification.html",
	  height: 180
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
		},
		{
			text: "Add Classification (A/B/C)",
			callback: classificationAddCallback	
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
  },
  'card-badges': function(t, options) {
    return getBadges(t);
  }
});
