$(document).foundation();


jQuery(document).ready(function($){


  $('a[href=#top]').click(function(){
    $('html, body').animate({scrollTop:0}, 'slow');
    return false;
  });

  var links = $('.navigation').find('li');
  slide = $('.slide');
  button = $('.button');
  mywindow = $(window);
  htmlbody = $('html,body');

//waypoint 1 for offsetting scroll down
  slide.waypoint(function (direction) {

  dataslide = $(this).attr('data-slide');
  if (direction === 'down') {
    $('.navigation li[data-slide="' + dataslide + '"]').addClass('active').prev().removeClass('active');
    }
  }, {
  offset: function() {
    return $("#navigation").outerHeight(true)+1;
    }
  });

  //waypoint 2 for offsetting scroll up
  slide.waypoint(function (direction) {
   dataslide = $(this).attr('data-slide');
   if (direction === 'up') {
      $('.navigation li[data-slide="' + dataslide + '"]').addClass('active').next().removeClass('active');
    }
  }, {
    offset: function() {
      return $("#navigation").outerHeight(true)-2; // -1px to pass the waypoint, then another pixel as the jquery animate offset needs -1 to compensate for browser rounding differences 
    }

  });

  mywindow.scroll(function () {
    if (mywindow.scrollTop() == 0) {
      $('.navigation li[data-slide="1"]').addClass('active');
      $('.navigation li[data-slide="2"]').removeClass('active');
    }
  });


  function goToByScroll(dataslide, menuHeight) {
    htmlbody.animate({
      scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top - menuHeight
    }, 2000, 'easeInOutQuint');        
  }

  function goTotoByScroll(dataslide, menuHeight) {
    htmlbody.animate({
      scrollLeft: $('.slide[data-slide="' + dataslide + '"]').offset().left - menuHeight
    }, 2000, 'easeInOutExpo');        
  }

  links.click(function (e) {
    e.preventDefault();
    dataslide = $(this).attr('data-slide');
      menuHeight = $("#navigation").outerHeight(true)-1; // Calculate #navigation height and then subtract by 1px to compensate for browser rounding (when the slide heights aren't whole numbers).
      goToByScroll(dataslide, menuHeight);
    });

  button.click(function (e) {
    e.preventDefault();
    dataslide = $(this).attr('data-slide');
    menuHeight = $("#navigation").outerHeight(true)-1; // Calculate #navigation height and then subtract by 1px to compensate for browser rounding (when the slide heights aren't whole numbers Chrome rounds the Opposite way to FF and can leave a 1px gap between the slide and head).
    goToByScroll(dataslide, menuHeight);
  });

});



$(window).load(function() {

  function fadeIt(){
    $(".fadeIn").each(function(index) {
      $(this).delay(200*index).fadeIn(1500);
    });
  }

  $(function() {
    setTimeout(fadeIt, 1000);
  });

  function EasyPeasyParallax() {
    scrollPos = $(this).scrollTop();
    $('.homeContainer').css({
      'opacity': 1-(scrollPos/650)
    });
  }
  $(window).scroll(function() {
    EasyPeasyParallax();
  });

  var offset = 200; // some offset value for which when the header becomes hidden
  $(window).scroll(function() { //also an option: jQuery .on('scroll') method
    if($('#navigation').is(':visible') && $(window).scrollTop() < offset) {
      $('#navigation').fadeOut(100);
    } else if(!$('#navigation').is(':visible') && $(window).scrollTop() > offset) {
      $('#navigation').fadeIn(400);
    }    
  });

  var adjust_size = function() {
    $(".row_v_align").each(function(){
      var rowHeight = $(this).height();
      var newHeight = rowHeight;
      $(".column_v_align", this).height(newHeight);
      $(".v_align", this).height(newHeight);
    });
  }
  adjust_size();
  $(window).resize(adjust_size);

});





