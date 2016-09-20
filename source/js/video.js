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
    var videoTop = $('.main-content').height() - 365 + window.innerHeight*2;
  }
  else {
    var videoTop = $('.main-content').height() - 365;
  }
  targetStep = Math.max( Math.round( (getYOffset() - videoTop) / 30 ) , 1 ); // what frame to animate to
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
  var windowWidth = window.innerWidth, //yes I'm using this
      windowHeight = window.innerHeight,  //yes, I'm using this
      scrollExtraHeight = 30 * totalFrames,
      mainContentHeight = $('.main-content').height(),
      videoTop = $('.main-content').height() - 365,
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

  });


  if (window.innerWidth > 736) {

    $('.section--heading').css({'width': windowWidth/2, 'height': windowHeight, 'line-height': '699px'}) 
    $('.section').css({'min-height': windowHeight})
    $('.video--container').css({'padding-top': windowHeight - 395, 'margin-top': -(windowHeight - 395) -18})
 

    $(document).scroll(function() {
    var $scrollTop = $(window).scrollTop(),
        $workTop = $('.work').offset().top,
        $aboutTop = $('.about').offset().top,
        $contactTop = $('.contact').offset().top,
        $videoContainerTop = $('.video--container').offset().top,
        $work = $('.heading--work'),
        $about = $('.heading--about'),
        $contact = $('.heading--contact'),
        $sectionHeading = $('.section--heading'),
        $videoContain = $('.video--container'); 

    if($scrollTop < $workTop) {
      $sectionHeading.removeClass('fixed')
    }    

    if($scrollTop > $workTop && $scrollTop < $aboutTop - windowHeight) {
      $work.addClass('fixed')
      $work.removeClass('absolute--bottom')
    }

    if ($scrollTop > $aboutTop - windowHeight) {
      $about.removeClass('fixed')
      $work.removeClass('fixed')
      $work.addClass('absolute--bottom')
    }

    if ($scrollTop > $aboutTop && $scrollTop< $contactTop - windowHeight) {
      $about.removeClass('absolute--bottom')
      $about.addClass('fixed')
    }

    if ($scrollTop > $contactTop - windowHeight) {
      $contact.removeClass('fixed')
      $about.removeClass('fixed')
      $about.addClass('absolute--bottom')
    }

    if ($scrollTop > $contactTop) {
      $contact.removeClass('absolute--bottom')
      $contact.addClass('fixed')
    }

    if ($scrollTop > $videoContainerTop -395) {
      console.log('hit it')
      $contact.removeClass('fixed')
      $contact.addClass('absolute--bottom')
    }

    if ($scrollTop < 4553) {
      $videoContain.removeClass('fixed')
      $contact.removeClass('fixedForVideo')
    }

    if ($scrollTop > $videoContainerTop) {
      $videoContain.addClass('fixed')
      $contact.addClass('fixedForVideo')
    }


    // //video starts
    // if($scrollTop > $videoContainer - 365) {
    //   if (!$videoContain.hasClass('fixed')) {
    //     $videoContain.addClass('fixed')
    //   }
    //   // else {
    //   //   $videoContain.removeClass('fixed')
    //   // }
    // }

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