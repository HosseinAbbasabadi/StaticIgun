window.addEventListener('load', function() {
  FastClick.attach(document.body);
}, false);

new UISearch( document.getElementById( 'sb-search' ) );
new UISearch( document.getElementById( 'sb-search-due' ) );

jQuery('.menuTrigger').on('click', function(e) {
	if (jQuery(this).hasClass('gototop')){
		e.preventDefault();
		jQuery('.altrimenu').removeClass('open');
		jQuery('#menu').removeClass('open');
		jQuery('#menu').addClass('open');
        jQuery('html, body').animate({
			scrollTop: 0
		}, 500);
    } else {
        e.preventDefault();
		jQuery('.altrimenu').removeClass('open');
		jQuery('#menu').toggleClass('open');
    }
});

jQuery('#fixedmenu .newmenuheader a').on('click', function(e) {
	jQuery('html, body').animate({
		scrollTop: 0
	}, 500);
});

jQuery('li.aprimenuicone a').on('click', function(e) {
	e.preventDefault();
	var qualemenu = jQuery(this).attr('rel');
	//jQuery('.altrimenu').removeClass('open');
	jQuery('#menu').removeClass('open');
  jQuery('#menu'+qualemenu).toggleClass('open');
  
});

jQuery('.togglemoreinfo').on('click', function(e) {
  e.preventDefault();
  jQuery('#infoprodbox').toggleClass('open');
  jQuery('.trnths').toggleClass('turned');
});

jQuery(".bigbollo").hover(function(){
   jQuery(this).parent().find('a.bigbollotxt').addClass('hover');
}, function(){
   jQuery(this).parent().find('a.bigbollotxt').removeClass('hover');
});
jQuery(".smallbollo").hover(function(){
   jQuery(this).next().addClass('hover');
}, function(){
   jQuery(this).next().removeClass('hover');
});
jQuery(".bigbollotxt").hover(function(){
   jQuery(this).parent().find('a.bigbollo').addClass('hover');
}, function(){
   jQuery(this).parent().find('a.bigbollo').removeClass('hover');
});
jQuery(".smallbollotxt").hover(function(){
   jQuery(this).prev().addClass('hover');
}, function(){
   jQuery(this).prev().removeClass('hover');
});
    

var w = jQuery(window).width();
if(w > 1024) {
  jQuery("#home2 .round").hoverIntent(function() {
    var target = jQuery(this).attr('data-target');
    if(!jQuery('#home3 #carousel-' + target).is(':visible')) {
      jQuery('#home3 .carousel').fadeOut(500);
      setTimeout(function() {
        jQuery('#home3 #carousel-' + target).fadeIn(500);
      }, 525);
    }
  },
  function() {
  });
}
else {
  adjustSlidesHeights();
  jQuery("#home2 .round").on('click', function(e) {
    if(!jQuery(this).hasClass('hover')) {
      e.preventDefault();
      jQuery("#home2 .round").removeClass('hover');
      jQuery(this).addClass('hover');
      var target = jQuery(this).attr('data-target');
      if(!jQuery('#home3 #carousel-' + target).is(':visible')) {
        jQuery('#home3 .carousel').fadeOut(500);
        setTimeout(function() {
          jQuery('#home3 #carousel-' + target).fadeIn(500);
        }, 525);
      }
    }
  });
}

jQuery('#home2-mobile .bar').on('click', function() {
  jQuery('#home2-mobile .bar.barLeft').removeClass('barLeft');
  jQuery('#home2-mobile .barOff.barIn').removeClass('barIn');
  jQuery(this).addClass('barLeft');
  jQuery(this).next('.barOff').addClass('barIn');
});

jQuery('.hover-trigger').hover(function() {
  jQuery(this).find('.lens-tooltip').tooltip({placement: 'top', trigger: 'manual'}).tooltip('show');
},
function() {
  jQuery(this).find('.lens-tooltip').tooltip('hide');
});
jQuery('.hover a:not(.lens-tooltip)').hover(function() {
  jQuery('.hover-trigger').find('.lens-tooltip').tooltip('hide');
},
function() {
  jQuery('.hover-trigger').find('.lens-tooltip').tooltip({placement: 'top', trigger: 'manual'}).tooltip('show');
});
jQuery('.hover a:not(.lens-tooltip)').tooltip();

jQuery(".share a").jqSocialSharer();
jQuery(".newshare a").jqSocialSharer();

jQuery('#filtri input[type="checkbox"]').on('change', function() {
  var filtri = "";
  var preventFinitureAll = false;
  var parentobj;
  if(jQuery(this).hasClass('parent')) {
    parentobj = jQuery(this);
    if(jQuery(parentobj).prop('checked') && (jQuery(parentobj).val() == 81 || jQuery(parentobj).val() == 156)) {
      jQuery(parentobj).prop('checked', false);
      preventFinitureAll = true;
    }
    if(jQuery(this).is(":checked")) {
      jQuery.each(jQuery(this).parent().parent().children(), function(index, elem) {
        jQuery(elem).find('input[type="checkbox"][class!=parent]').prop('checked', true);
      });
      jQuery.each(jQuery(this).parent().parent().parent().children(), function(index, elem) {
        if(jQuery(elem).find('input[type="checkbox"][class=parent]').prop('checked') && jQuery(elem).find('input[type="checkbox"][class=parent]').val() != jQuery(parentobj).val() && jQuery(elem).find('input[type="checkbox"][class=parent]').val() != 81 && jQuery(elem).find('input[type="checkbox"][class=parent]').val() != 156 && jQuery(parentobj).val() != 81 && jQuery(parentobj).val() != 156) {
          jQuery(elem).find('input[type="checkbox"]').prop('checked', false);
        }
      });
    }
    else {
      jQuery.each(jQuery(this).parent().parent().children(), function(index, elem) {
        jQuery(elem).find('input[type="checkbox"][class!=parent]').prop('checked', false);
      });
    }
  }
  else {
    parentobj = jQuery(this).parent().parent().find('input[type="checkbox"][class=parent]');
    var childrenobj = jQuery(this);
    if(jQuery(this).is(":checked")) {
      jQuery.each(jQuery(this).parent().parent().children(), function(index, elem) {
        if(!jQuery(elem).find('input[type="checkbox"][class=parent]').prop('checked')) {
          jQuery(elem).find('input[type="checkbox"][class=parent]').prop('checked', true);
        }
      });
      if(jQuery(parentobj).val() == 81 || jQuery(parentobj).val() == 156) {
        jQuery.each(jQuery(this).parent().parent().children(), function(index, elem) {
          if(jQuery(elem).find('input[type="checkbox"][class!=parent]').prop('checked') && jQuery(elem).find('input[type="checkbox"][class!=parent]').val() != jQuery(childrenobj).val()) {
            jQuery(elem).find('input[type="checkbox"][class!=parent]').prop('checked', false);
          }
        });
      }
      jQuery.each(jQuery(this).parent().parent().parent().children(), function(index, elem) {
        if(jQuery(elem).find('input[type="checkbox"][class=parent]').prop('checked') && jQuery(elem).find('input[type="checkbox"][class=parent]').val() != jQuery(parentobj).val() && jQuery(elem).find('input[type="checkbox"][class=parent]').val() != 81 && jQuery(elem).find('input[type="checkbox"][class=parent]').val() != 156 && jQuery(parentobj).val() != 81 && jQuery(parentobj).val() != 156) {
          jQuery(elem).find('input[type="checkbox"]').prop('checked', false);
        }
      });
    }
    else {
      var found = false;
      jQuery.each(jQuery(this).parent().parent().children(), function(index, elem) {
        if(jQuery(elem).find('input[type="checkbox"][class!=parent]').prop('checked')) {
          found = true;
        }
      });
      if(!found) {
        jQuery.each(jQuery(this).parent().parent().children(), function(index, elem) {
          jQuery(elem).find('input[type="checkbox"][class=parent]').prop('checked', false);
        });
      }
    }
  }
  if(!preventFinitureAll) {
    jQuery.each(jQuery('#filtri input:checked'), function(index, elem) {
      filtri += jQuery(elem).val() + ",";
    });
    jQuery('#filtri-result').css({opacity: 0.5});
    jQuery('#filtri input').prop('disabled', true);
    jQuery('#cerca').prop('disabled', true);
    jQuery('#cerca').val("");
    filtri = filtri.substring(0, filtri.length - 1);
    if(filtri === "") {
      do_ajax('reset');
    }
    else {
      do_ajax('filter', filtri);
    }
  }
});

key_count_global = 0;
jQuery('#cerca').on('keypress', function() {
  key_count_global++;
  setTimeout("lookup(" + key_count_global + ")", 500);
});

function lookup(key_count) {
  if(key_count == key_count_global) {
    var search = jQuery('#cerca').val();
    jQuery('#filtri-result').css({opacity: 0.5});
    jQuery('#filtri input').prop('disabled', true);
    jQuery('#cerca').prop('disabled', true);
    jQuery.each(jQuery('#filtri input'), function(index, elem) {
      if(jQuery(elem).is(":checked")) {
        jQuery(elem).prop("checked", false);
      }
    });
    if(search !== "") {
      do_ajax('search', search);
    }
    else {
      do_ajax('reset');
    }
  }
}

function do_ajax(type, query) {
  var data = {
    'action': 'filter_prodotti',
    'type': type,
    'query': query,    
    'catalogo': jQuery('#catalogo').val(),
    'nice_name': jQuery('#nice_name').val(),
    'url': document.URL
  };
  jQuery.ajax("/wp-admin/admin-ajax.php", {
    type: 'post',
    dataType: 'html',
    data: data,
    timeout: 20000,
    success: function(result, status, xhrRequest) {
      jQuery('#filtri-result').css({opacity: 0});
      jQuery('#filtri input').prop('disabled', false);
      jQuery('#cerca').prop('disabled', false);
      setTimeout(function() {
        jQuery('#filtri-result').html(result);
        jQuery('#filtri-result').css({opacity: 1});
        jQuery('.hover-trigger').hover(function() {
          jQuery(this).find('.lens-tooltip').tooltip({placement: 'top', trigger: 'manual'}).tooltip('show');
        },
        function() {
          jQuery(this).find('.lens-tooltip').tooltip('hide');
        });
        jQuery('.hover a:not(.lens-tooltip)').hover(function() {
          jQuery('.hover-trigger').find('.lens-tooltip').tooltip('hide');
        },
        function() {
          jQuery('.hover-trigger').find('.lens-tooltip').tooltip({placement: 'top', trigger: 'manual'}).tooltip('show');
        });
        jQuery('.hover a:not(.lens-tooltip)').tooltip();
        jQuery(".share a").jqSocialSharer();
        loadModalImages();
        window.scrollTo(0, 0);
      }, 250);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      jQuery('#filtri-result').html("");
      jQuery('#filtri-result').css({opacity: 1});
      jQuery('#filtri input').prop('disabled', false);
      jQuery('#cerca').prop('disabled', false);
      window.scrollTo(0, 0);
      //window.console&&console.log(textStatus + " - " + errorThrown);
    }
  });
}

if(window.location.href.indexOf("gallery") > -1 && window.location.href.indexOf("item") == -1) {
  var item = jQuery('#carousel-show .carousel-inner').children('.active').find('h1.name').text();
  updateUrl(item);
}

jQuery('#carousel-show').on('slide.bs.carousel', function(event) {
  var item = "";
  if(event.direction == 'left') {
    item = jQuery('#carousel-show .carousel-inner').children('.active').next().find('h1.name').text();
  }
  else if(event.direction == 'right') {
    item = jQuery('#carousel-show .carousel-inner').children('.active').prev().find('h1.name').text();
  }
  updateUrl(item);
});

function updateUrl(item) {
  item = item.split(' ').join('-');
  item = item.toLowerCase();
  window.history.replaceState("", "", "?mode=gallery&item=" + item);
}

function adjustModalMaxHeightAndPosition(obj) {
  if(jQuery(obj).hasClass('in') === false){
    jQuery(obj).show();
  }
  var contentHeight = jQuery(window).height() - 60;
  var headerHeight = jQuery(obj).find('.modal-header').outerHeight() || 2;
  var footerHeight = jQuery(obj).find('.modal-footer').outerHeight() || 2;

  jQuery(obj).find('.modal-content').css({
    'max-height': function () {
      return contentHeight;
    }
  });

  jQuery(obj).find('.modal-body').css({
    'max-height': function () {
      return (contentHeight - (headerHeight + footerHeight));
    }
  });

  jQuery(obj).find('.modal-dialog').css({
    'margin-top': function () {
      return -(jQuery(this).outerHeight() / 2);
    },
    'margin-left': function () {
      return -(jQuery(this).outerWidth() / 2);
    }
  });
  if(jQuery(obj).hasClass('in') === false){
    jQuery(obj).hide();
  }
}

jQuery('#map-continents').cssMap({
  'size': 650
});

function showTarget(elem) {
  var target = jQuery(elem).attr('data-target');
  jQuery('#map-targets .target').fadeOut(250);
  setTimeout(function() {
    jQuery('#map-targets #' + target).fadeIn(250);
  }, 250);
}

function adjustSlidesHeights() {
  var masterHeight = jQuery("#home1 .carousel .item.active img").height();
  jQuery("#home1").height(masterHeight);
  jQuery("#home3").height(masterHeight);
  jQuery('.custom-carousel').height(masterHeight);
}

function loadModalImages() {
  jQuery(".modal-trigger").on('click', function() {
    var obj = jQuery(this);
    var oldurl = jQuery(obj).find('img').attr('src');
    if(oldurl) {
      var newurl = oldurl.substring(0, oldurl.indexOf('colombo/')) + 'colombo/svg/loading-bubbles-2.svg';
      jQuery(obj).find('img').attr('src', newurl);
    }
    var modal = jQuery(this).attr('data-target');
    jQuery(modal + ' img[class!="carouselcontrol"]').each(function(index, elem) {
      jQuery(elem).attr('src', jQuery(this).attr('data-src'));
    });
    jQuery(modal).waitForImages(function() {
      adjustModalMaxHeightAndPosition(modal);
      jQuery(modal).modal();
      if(oldurl) {
        jQuery(obj).find('img').attr('src', oldurl);
      }
    });
  });
}

loadModalImages();

// jQuery(document).ready(function() {
//    jQuery(".carousel").swiperight(function() {
//       jQuery(this).carousel('prev');
//     });
//    jQuery(".carousel").swipeleft(function() {
//       jQuery(this).carousel('next');
//    });
//    jQuery('.carousel').carousel({pause: "false"});
// });

jQuery(window).scroll(function() {    
    var scroll = jQuery(window).scrollTop();
    if (scroll >= 200) {
        jQuery("#fixedmenu").addClass("active");
    }
    if (scroll < 200) {
        jQuery("#fixedmenu").removeClass("active");
    }
});

jQuery(window).load(function() {
  if(w <= 1024) {
    adjustSlidesHeights();
  }/*
  jQuery('#loader').fadeOut(500);
  jQuery('body').css({overflowY: 'auto'});
  jQuery('#wrapper').css({overflowY: 'auto'});*/
  jQuery(".boxbolli").css("opacity", 1);
});

jQuery(window).resize(function () {
  w = jQuery(window).width();
  if(w <= 1024) {
    adjustSlidesHeights();
  }
});

jQuery(document).ready(function() {
	jQuery('.fade-area-1').children().hover(function() {
		jQuery(this).siblings().stop().addClass('nothover');
	}, function() {
		jQuery(this).siblings().stop().removeClass('nothover');
	});
	
});

      jQuery('#filtri input[type="checkbox"]').on('change', function() {
        var checkboxValues = {};
        jQuery('#filtri input[type="checkbox"]').each(function(){
          checkboxValues[this.id] = this.checked;
        });
        jQuery.cookie('checkboxValues', checkboxValues, { expires: 7, path: '/' })
      });

      function repopulateCheckboxes(){
        var checkboxValues = jQuery.cookie('checkboxValues');
        if(checkboxValues){
          Object.keys(checkboxValues).forEach(function(element) {
            var checked = checkboxValues[element];
            jQuery("#" + element).prop('checked', checked);
          });
        }
      }

      /*jQuery.cookie.json = true;
      repopulateCheckboxes()*/



