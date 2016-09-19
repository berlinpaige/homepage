/*
Javascript-video-scrubber Demo
Created by Gary Hepting and the Dev Team at Emerge Interactive
Fork, follow and watch on Github at https://github.com/ghepting/javascript-video-scrubber
Visit Emerge Interctive at http://emergeinteractive.com/
*/

var step = 1; // visible frame
var targetStep = 1; // frame to animate to
var images = new Array; // stores all of the frames for quick access
var scrollPos; // scroll position of the window
var totalFrames = 91; // the number of images in the sequence of JPEG files (this could be calculated server-side by scanning the frames folder)

window.requestAnimFrame = (function(){ // reduce CPU consumption, improve performance and make this possible
  return  window.requestAnimationFrame       || 
      window.webkitRequestAnimationFrame || 
      window.mozRequestAnimationFrame    || 
      window.oRequestAnimationFrame      || 
      window.msRequestAnimationFrame     || 
      function( callback ){
      window.setTimeout(callback, 1000 / 60);
      };
})();

(function animloop(){ // the smoothest animation loop possible
  requestAnimFrame(animloop);
  if (window.innerWidth > 736) {
    var scrollTop = $('.main-content').height() - 365 + window.innerHeight*2;
  }
  else {
    var scrollTop = $('.main-content').height() - 365;
  }
  targetStep = Math.max( Math.round( (getYOffset() - scrollTop) / 30 ) , 1 ); // what frame to animate to
  if(targetStep != step ) { step += (targetStep - step) / 5; } // increment the step until we arrive at the target step
  changeFrame();
})();

function changeFrame() {
  var thisStep = Math.round(step); // calculate the frame number
  if(images.length > 0 && images[thisStep]) { // if the image exists in the array
    if(images[thisStep].complete) { // if the image is downloaded and ready
      $('#video').attr('src',images[thisStep].src); // change the source of our placeholder image
    }
  }
}

function resizeAdjustments() { // fit everything to the screen
  var windowWidth = window.innerWidth,
      windowHeight = window.innerHeight,
      scrollExtraHeight = 30 * totalFrames,
      mainContentHeight = $('.main-content').height(),
      scrollTop = $('.main-content').height() - 365,
      videoHeight = 395,
      imageWidth = 1000,
      imageHeight = 563;

  $('.video--container').css({"height": videoHeight + 'px', "width": windowWidth}); 
  $('.video--wrapper').css({"padding-top": ((videoHeight/windowWidth)*100) + '%'});
  $('.scroll-extra-height').css({"height": scrollExtraHeight + mainContentHeight + videoHeight + 'px'});

  if (imageWidth/imageHeight > window.innerWidth/videoHeight) {
    $('#video').css({"height": videoHeight + 'px', "width": "auto"});
  }
  else {
    $('#video').css({"height": "auto", "width": window.innerWidth}); 
  }

  $(document).scroll(function() {
    if($(window).scrollTop() > scrollTop) {
      $('.video--container').css({"position": "fixed", "bottom": "0"});
      $('.main-content').css({"position": "fixed", "bottom": '0', "padding-bottom": "24rem"});
    }
    else {
      $('.video--container').css({"position": "relative", "bottom": "auto"});
      $('.main-content').css({"position": "relative", "bottom": "auto", "padding-bottom": "0"});
    }
  });


  if (window.innerWidth > 736) {
    var heroHeight = $('.hero').height(),
        scrollTop = $('.main-content').height() - 365 + windowHeight*2;

    $('.main-content').css({"padding-bottom": "0"});

    $('.scroll-extra-height').css({"height": scrollExtraHeight + mainContentHeight + videoHeight + windowHeight*2 + 'px'});

    $('.section').css({"height": window.innerHeight});

    $(document).scroll(function() {
      if($(window).scrollTop() > heroHeight) {
        $('.work').addClass("fixed");
        $('.about, .contact, .video--container').css({"margin-top": window.innerHeight});;
      }
      else {
        $('.about, .contact, .video--container').css({"margin-top": "-4px"});;
        $('.work').removeClass("fixed");
      }

      if($(window).scrollTop() > heroHeight + window.innerHeight) {
        $('.about').addClass("fixed").css({"margin-top": "0"});
        $('.work').removeClass("fixed");
        $('.work, .contact, .video--container').css({"margin-top": window.innerHeight});;
      }
      else {
        $('.work, .contact, .video--container').css({"margin-top": "-4px"});;
        $('.about').removeClass("fixed");
      }

      if($(window).scrollTop() > heroHeight + window.innerHeight*3) {
        $('.contact').addClass("fixed").css({"margin-top": "0"});
        $('.about').removeClass("fixed");
        $('.work, .about, .video--container').css({"margin-top": window.innerHeight});;
      }
      else {
        $('.contact').removeClass("fixed");
      }

      if($(window).scrollTop() > heroHeight + window.innerHeight*4) {
        $('.about').css({'background': 'transparent'});
      }
      else {
        $('.about').css({'background': '#C5E6EF'});
      }

      if($(window).scrollTop() > heroHeight + window.innerHeight*4 + videoHeight) {
        $('.contact').removeClass("fixed");
        $('.work, .about, .video--container').css({"margin-top":"-4px"});
      }
    });
  }
}

function getYOffset() { // get distance scrolled from the top
    var pageY;
  if(typeof(window.pageYOffset)=='number') {
    pageY=window.pageYOffset;
  }else{
    pageY=document.documentElement.scrollTop; // IE
  }
  return pageY;
}

function pad(number, length) { // pad numbers with leading zeros for JPEG sequence file names
  var str = '' + number; while (str.length < length) { str = '0' + str; } return str;
}