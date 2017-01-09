'use strict';

(function($){
  $.fn.imgPresenter = function(){
    var imgPresenter = this,
      textWrappeer = $(imgPresenter).find('.story__text-wrapper');

      $(textWrappeer).unbind("mousewheel DOMMouseScroll onmousewheel touchmove scroll", handleImgsOpacity)
      .on("mousewheel DOMMouseScroll onmousewheel touchmove scroll", handleImgsOpacity);

      function handleImgsOpacity(){
        var scroll = $(textWrappeer).scrollTop(),
        img1 = $(imgPresenter).find('.story__img').eq(0),
        img2 = $(imgPresenter).find('.story__img').eq(1),
        img3 = $(imgPresenter).find('.story__img').eq(2),
        opacityImg1 = parseFloat(img1.css('opacity')),
        opacityImg2 = parseFloat(img2.css('opacity')),
        opacityImg3 = parseFloat(img3.css('opacity')),
        scrollPercent = 100 * $(textWrappeer).scrollTop() / (textWrappeer[0].scrollHeight - $(textWrappeer).outerHeight());

        if(scrollPercent <= 50){
          img3.css('opacity', 0);
          if(opacityImg1 >= 0){
            opacityImg1 =  1 - (2 * scrollPercent * 0.01);
            img1.css('opacity', opacityImg1);
          };
          if(opacityImg2 < 1){
            opacityImg2 = 2 * scrollPercent * 0.01;
            img2.css('opacity', opacityImg2);
          }
        }else{
          img1.css('opacity', 0);
          if(opacityImg2 >= 0){
            opacityImg2 =  1 - (2 * (scrollPercent - 50) * 0.01);
            img2.css('opacity', opacityImg2);
          };
          if(opacityImg3 <= 1){
            opacityImg3 = 2 * (scrollPercent - 50) * 0.01;
            img3.css('opacity', opacityImg3);
          }
        }
      }
  }
})(jQuery);
