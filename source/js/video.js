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

$(document).scroll(function(){
  
    (function animloop(){ // the smoothest animation loop possible
      if (window.innerWidth > 736) {
        if ($(window).scrollTop() > $('.main-content').height() - 300) {
          requestAnimFrame(animloop);
        }
        else if ($(window).scrollTop() < $('.main-content').height() - 300) {
          window.cancelAnimationFrame(animloop)
        }
        var videoTop = $('.main-content').height() - 300;
      }
      else {
        if ($(window).scrollTop() > $('.main-content').height() + 900) {
          requestAnimFrame(animloop);
        }
        else if ($(window).scrollTop() < $('.main-content').height() + 900) {
          window.cancelAnimationFrame(animloop)
        }
        var videoTop = $('.main-content').height() + 900;
      }

      targetStep = Math.max( Math.round( ($(window).scrollTop() - videoTop) / 30 ) , 1 ); // what frame to animate to
      if(targetStep != step ) { step += (targetStep - step) / 5; } // increment the step until we arrive at the target step
      changeFrame();
    // console.log($(window).scrollTop())
    })();
});


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
      videoTop = $('.main-content').height() - 300,
      videoHeight = 395,
      imageWidth = 1000,
      imageHeight = 563;   

  $('.video--container').css({"height": videoHeight + 'px', "width": windowWidth}); 
  $('.video--wrapper').css({"padding-top": ((videoHeight/windowWidth)*100) + '%'});
  
  if (imageWidth/imageHeight > window.innerWidth/videoHeight) {
    $('#video').css({"height": videoHeight + 'px', "width": "auto"});
  }
  else {
    $('#video').css({"height": "auto", "width": window.innerWidth}); 
  }
    $('.video--container').css({'padding-top': windowHeight - 395, 'margin-top': -(windowHeight - 395) -18})

  if (window.innerWidth > 736) {
    $('.scroll-extra-height').css({"height": scrollExtraHeight + videoHeight + 'px'});

    $('.section--heading').css({'width': windowWidth/2, 'height': windowHeight, 'line-height': '699px'}) 
    $('.section').css({'min-height': windowHeight})
 

    $(document).scroll(function() {
    var $scrollTop = $(window).scrollTop(),
        $workTop = $('.work').offset().top,
        $aboutTop = $('.about').offset().top,
        $contactTop = $('.contact').offset().top,
        $videoContainerTop = $('.video--container').offset().top,
        $work = $('.work'),
        $about = $('.about'),
        $contact = $('.contact'),
        $sectionHeading = $('.section--heading'),
        $videoContain = $('.video--container'),
        scrollDownDistance = $('.main-content').height() - $('.content-contact').height() -300;

        console.log('$scrollTop', $scrollTop)
        console.log('$videoContainerTop', $videoContainerTop)

    if($scrollTop < $workTop) {
      // $sectionHeading.removeClass('fixed');
      $work.removeClass('fixed');
    }    

    if($scrollTop > $workTop && $scrollTop < $aboutTop - windowHeight) {
      $work.addClass('fixed');
      $work.removeClass('absolute--bottom');
    }

    if ($scrollTop > $aboutTop - windowHeight) {
      $about.removeClass('fixed');
      $work.removeClass('fixed');
      $work.addClass('absolute--bottom');
    }

    if ($scrollTop > $aboutTop && $scrollTop< $contactTop - windowHeight) {
      $about.removeClass('absolute--bottom');
      $about.addClass('fixed');
    }

    if ($scrollTop > $contactTop - windowHeight) {
      $contact.removeClass('fixed');
      $about.removeClass('fixed');
      $about.addClass('absolute--bottom');
    }

    if ($scrollTop > $contactTop) {
      $contact.removeClass('absolute--bottom');
      $contact.addClass('fixed');
    }

    if ($scrollTop > $videoContainerTop -300) {
      $contact.removeClass('fixed');
      $contact.addClass('absolute--bottom');
    }

    if ($scrollTop < scrollDownDistance) {
      $videoContain.removeClass('fixed');
      $contact.removeClass('fixedForVideo');
    }

    if ($scrollTop > $videoContainerTop) {
      $videoContain.addClass('fixed');
      $contact.addClass('fixedForVideo');
    }

  });

  }
  else {
    $('.scroll-extra-height').css({"height": scrollExtraHeight + videoHeight*4 + 'px'});

    $('.section--heading').css({'width': 'auto', 'height': 'auto', 'line-height': 'inherit'}) 
    $('.section').css({'min-height': 'auto'})

    $(document).scroll(function() {

      var $scrollTop = $(window).scrollTop(),
        $videoContainerTop = $('.video--container').offset().top,
        $videoContain = $('.video--container'),
        $contactContent = $('.content--contact'),
        scrollDownDistance = $('.main-content').height() - $('.content-contact').height() + 837

       if ($scrollTop < scrollDownDistance) {
          $videoContain.removeClass('fixed');
          $contactContent.removeClass('fixedForVideo');
        }

        if ($scrollTop >= $videoContainerTop) {
          $videoContain.addClass('fixed');
          $contactContent.addClass('fixedForVideo');
        }
    });
  }
}

function pad(number, length) { // pad numbers with leading zeros for JPEG sequence file names
  var str = '' + number; while (str.length < length) { str = '0' + str; } return str;
}