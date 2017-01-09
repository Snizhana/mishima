$(document).ready(function(){
  /* cash the DOM */
  let heroSection = $('#heroSection'),
    body = $('body'),
    height = $(window).height(),
    width = $(window).width(),
    lifePic = $('.life-bg img'),
    deathPic = $('.death-bg img'),
    lifeBtn = $('.life-bg input'),
    deathBtn = $('.death-bg input'),
    abstract = $('#abstract > div:first-child'),
    fullpage = $('#fullpage'),
    textWrapper = $('.story__text-wrapper-scollable'),
    timer;
  /* cash the DOM */

  /* bind event handlers */
  $(body).unbind('mousemove', trackMouseMoove).on('mousemove', trackMouseMoove);
  $(lifeBtn).on('click', showStory);
  $(textWrapper).unbind("mousewheel DOMMouseScroll onmousewheel touchmove scroll", storyScrollHandler)
  .on("mousewheel DOMMouseScroll onmousewheel touchmove scroll", storyScrollHandler);
  /* bind event handlers */

  $(fullpage).fullpage({
       scrollingSpeed: 3000,
       afterRender: function () {

      }
  });

  function bgMotion(e){
    let fluctuation = 25,
      heightFluctuation = fluctuation / height,
      widthFluctuation = fluctuation / width,
      pageX = e.pageX - (width / 2),
      pageY = e.pageY - (height / 2),
      coordX = widthFluctuation * pageX * -1 - 25,
      coordY = heightFluctuation * pageY * -1 - 50;

    $(heroSection).css("background-position", coordX + "px " + coordY + "px");
  }

  function togglePic(e){
    let divOffset = {
      top: $(abstract).position().top,
      left: $(abstract).position().left,
      right: $(abstract).position().left + $(abstract).width(),
      bottom: $(abstract).position().top + $(abstract).height(),
      isOver: false
    }
    if (e.pageX >= divOffset.left && e.pageX <= divOffset.right &&
      e.pageY >= divOffset.top && e.pageY <= divOffset.bottom){
      if (!divOffset.isOver){
        divOffset.isOver = true;
        $(deathPic).add(deathBtn).fadeOut(300);
        $(lifePic).add(lifeBtn).fadeOut(300);
        return;
      }
    }
    if(e.pageX >= ($(body).offset().left + $(window).width()/2)){
      $(deathPic).add(deathBtn).fadeIn(300);
      $(lifePic).add(lifeBtn).fadeOut(300);
    }else{
      $(deathPic).add(deathBtn).fadeOut(300);
      $(lifePic).add(lifeBtn).fadeIn(300);
    }
    divOffset.isOver = false;
  }

  function trackMouseMoove(e){
    bgMotion(e);
    clearTimeout(timer);
    timer = setTimeout(() => {
      togglePic(e);
    }, 100);
  }

  function showStory(){
    $(heroSection).fadeOut(1000);
    $(fullpage).fadeIn(1000);

    $('.story').imgPresenter()
  }

  // TODO: change when other screens will be added
  function storyScrollHandler(){
    let scroll = $(this).scrollTop(),
      div = $(this);
      if (div[0].scrollHeight - div.scrollTop() < div.outerHeight() + 10) {
        setTimeout(() => { $.fn.fullpage.setAllowScrolling(true)}, 500 );
      }else{
        $.fn.fullpage.setAllowScrolling(false);
      }
  }
});
