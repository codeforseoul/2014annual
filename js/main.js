var fellowshipColor = "e87d2b";
var highlightColor = "69579C";

if (typeof console === "undefined" || typeof console.log === "undefined") {
  console = {log:function(){}};
}

$(function(){
  var readytoshow = false;
  $('<img/>').attr('src', 'img/iphone.jpg').load(function() {
    if(readytoshow) {
      $("#loading").fadeOut({duration:1000});
      console.log("fadein");
    }
    readytoshow = true;
  });
  setTimeout(function(){
    if(readytoshow) {
      $("#loading").fadeOut({duration:1000});
      console.log("fadeout");
    }
    readytoshow = true;
  }, 1000);
  var usTopology;
  //shows nav when user hovers over the logo
  var height = $(window).height(),
  width = $(window).width();

  var setSize = function(){
    height = $(window).height();
    width = $(window).width();

    $(".quote").css({width:width, "min-height":height});
    $(".story").css({width:width, "min-height":height});
    $(".pagebg").css({width:width, "min-height":height});
    $(".scrollout").css({height:height});
    $(".fellowship").css({height:height});
    $(".map").css({height:height});
    $(".mapscroll").css({height:height});
    scrollEvent.onScroll();

  }

  // var tabContentWidth = $('.yeartitle').css('width')
  // console.log(tabContentWidth);
  // $('.tab-content .tab-pane').css('width', tabContentWidth)

  var scrollEvent = {
    handlers: {top:[], middle:[], bottom:[], inview:[]},
    currentElements: {top:[], middle:[], bottom:[], inview:[]},
    on:function(pos, el, addCb, removeCb){
      var elements = el.toArray();
      var i = 0;
      for(e in elements){
        if(typeof elements[e] !== "object")
          continue;
        scrollEvent.handlers[pos].push({el:elements[e], addCb:addCb, removeCb:removeCb, count:i});
        i++;
      }
    },
    onScroll:function(){
      var pos = $(window).scrollTop();
      var height = $(window).height();

      if(pos < 0)
        return;

      for(e in scrollEvent.handlers.middle){
        var el = scrollEvent.handlers.middle[e].el;
        if(typeof el !== "object")
          continue;

        // console.log(el);
        //middle
        if(($(el).offset().top <= (pos + height/2)) &&
           ($(el).offset().top + $(el).outerHeight()  >= (pos + height/2))){
          scrollEvent.setCurrentElement("middle", scrollEvent.handlers.middle[e]);
       }else{
          scrollEvent.removeCurrentElement("middle", scrollEvent.handlers.middle[e]);
        }
      }

      for(e in scrollEvent.handlers.top){
        var el = scrollEvent.handlers.top[e].el;
        if(typeof el !== "object")
          continue;

        //if the element is at the top of the page
        if(($(el).offset().top <= pos) &&
           ($(el).offset().top + $(el).outerHeight()  >= pos)){
          scrollEvent.setCurrentElement("top", scrollEvent.handlers.top[e]);

        }else{
          scrollEvent.removeCurrentElement("top", scrollEvent.handlers.top[e]);
        }
      }
      for(e in scrollEvent.handlers.bottom){
        var el = scrollEvent.handlers.bottom[e].el;
        if(typeof el !== "object")
          continue;

        //if the element is at the top of the page
        if(($(el).offset().top <= (pos+ height)) &&
           ($(el).offset().top + $(el).outerHeight()  >= (pos +height))){
          scrollEvent.setCurrentElement("bottom", scrollEvent.handlers.bottom[e]);

        }else{
          scrollEvent.removeCurrentElement("bottom", scrollEvent.handlers.bottom[e]);
        }
      }
      for(e in scrollEvent.handlers.inview){
        var el = scrollEvent.handlers.inview[e].el;
        if(typeof el !== "object")
          continue;

        //if the element is at the top of the page
        if(($(el).offset().top + $(el).outerHeight() >= pos) &&
           ($(el).offset().top   <= (pos +height))){
          scrollEvent.setCurrentElement("inview", scrollEvent.handlers.inview[e]);

        }else{
          scrollEvent.removeCurrentElement("inview", scrollEvent.handlers.inview[e]);
        }
      }
    },
    setCurrentElement:function(pos, handler){
      if(scrollEvent.currentElements[pos].indexOf(handler) === -1){
        scrollEvent.currentElements[pos].push(handler);
        handler.addCb(handler.el,handler.count);
      }
    },
    removeCurrentElement:function(pos, handler){
      if(scrollEvent.currentElements[pos].indexOf(handler) >=0 ){
        delete scrollEvent.currentElements[pos][scrollEvent.currentElements[pos].indexOf(handler)];
        handler.removeCb(handler.el,handler.count);
      }
    }
  };

  scrollEvent.on("middle", $(".page"), function(el,i){
    $($("div.pagebg")[i]).fadeIn({duration:500});
    if(($(el).attr("class").indexOf("quote") >= 0) || ($(el).attr("class").indexOf("nosidebar") >= 0))
      $("div.sidebartitle").hide();
    else{
      $($("div.sidebartitle")[i]).show();
      $($("div.sidebartitle")[i]).addClass("appear");
    }
  }, function(el, i){
    $($("div.pagebg")[i]).fadeOut({duration:700});
    $($("div.sidebartitle")[i]).removeClass("appear");

  });
  scrollEvent.on("inview", $("iframe[data-src]"), function(el,i){
    if($(el).attr("src") === undefined)
      $(el).attr("src", $(el).attr("data-src"))
    }, function(el, i, pos){
  });


  scrollEvent.onScroll();
  $(window).scroll(scrollEvent.onScroll);


  setSize();
  $(window).resize(setSize);

  $('[id^="myCarousel"]').carousel({
    interval: false,
    cycle: true
  });

  $('.captpop').popover({
    placement: 'top',
    trigger: 'hover'
  });

  $('.morefellowspop').popover({
    placement: 'top',
    trigger: 'hover',
    html: true
  });

  $('.appspop').popover({
    placement: 'top',
    trigger: 'hover',
    html: true
  });

  $('.footnote').popover({
    placement: 'top',
    trigger: 'hover'
  });

  $('.startupspop').popover({
    placement: 'top',
    trigger: 'hover',
    html: true
  });


 scrollEvent.on("top", $(".page"), function(el,i){

   $(".navbar li").removeClass("active");;
   if($(el).attr("data-section") !== "")
     $(".navbar li."+$(el).attr("data-section")).addClass("active");

 },function(){

 });
 scrollEvent.on("bottom", $(".page"), function(el,i){

   $(".navbar li").removeClass("active");;
   if($(el).attr("data-section") !== "")
     $(".navbar li."+$(el).attr("data-section")).addClass("active");

 },function(){

 });

  $(".navbar .nav li a").on("click", function(e){
    e.preventDefault();
    var section = $(e.currentTarget).parent().attr("class").split(" ")[0];
    $("body,html").animate({scrollTop: $($("div.page[data-section='"+section+"']")[0]).offset().top}, 1000);
  });

});

if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}
