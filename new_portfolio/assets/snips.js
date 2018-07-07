function brandPos() {
    var imgWidth = Math.round($(".brand img").width());
    var imgHeight = Math.round($(".brand img").height());
    // var workerHeight = Math.round($("#worker").height());
    // var workerWidth = Math.round($("#worker").width());
    //var imTopMarg = parseInt($(".brand img").css("margin-top"));
    if ($(window).width() < 576) {
        small(imgWidth);
    } else if ($(window).width() > 575 && $(window).width() < 768) {
        med(imgHeight);
    } else if ($(window).width() > 767 && $(window).width() < 992) {
        medLarge(imgHeight, workerHeight);
    } else if ($(window).width() > 991 && $(window).width() < 1200) {
        largeSmall(imgHeight, workerHeight,workerWidth,imTopMarg);
    }
    
    
}

function small(imgWidth) {
    $("#worker, #seasoned").css({'left': imgWidth + 8 +"px"});
    $("#worker").css({'top': 112 +"px"});
    $("#seasoned").css({'top': 146 +"px"});
    //red
}

function med(imgHeight) {
    var workerHeight = Math.round($("#worker").height());
    $("#worker").css({'top': imgHeight + 58 + "px", 'left':29 + "px"});
    $("#seasoned").css({'top': imgHeight + 58 + workerHeight + "px", 'left':29 + "px"});
    //blue
}

function medLarge(imgHeight) {
    var workerHeight = Math.round($("#worker").height());
    var imTopMarg = parseInt($(".brand img").css("margin-top"));
    var totalImgHeight = imgHeight + imTopMarg - 10;
    $("#worker").css({'top': totalImgHeight + "px", 'left':40 + "px"});
    $("#seasoned").css({'top': totalImgHeight + workerHeight + "px", 'left':40 + "px"});
    //green
}

function largeSmall(imgHeight, workerHeight,workerWidth,imTopMarg) {
    var totalImgHeight = imgHeight + imTopMarg;
    console.log(workerWidth);
    $("#worker").css({'top':totalImgHeight + "px", 'left':40 + "px"});
    $("#seasoned").css({'top':totalImgHeight + "px", 'left': workerWidth + "px"});
    //yellow
}


<p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam molestiae, aut beatae ratione delectus minus, ex illo facilis tempora at deserunt accusamus error autem consequatur vel aliquam? Velit, est itaque!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam molestiae, aut beatae ratione delectus minus, ex illo facilis tempora at deserunt accusamus error autem consequatur vel aliquam? Velit, est itaque!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam molestiae, aut beatae ratione delectus minus, ex illo facilis tempora at deserunt accusamus error autem consequatur vel aliquam? Velit, est itaque!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam molestiae, aut beatae ratione delectus minus, ex illo facilis tempora at deserunt accusamus error autem consequatur vel aliquam? Velit, est itaque!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam molestiae, aut beatae ratione delectus minus, ex illo facilis tempora at deserunt accusamus error autem consequatur vel aliquam? Velit, est itaque!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam molestiae, aut beatae ratione delectus minus, ex illo facilis tempora at deserunt accusamus error autem consequatur vel aliquam? Velit, est itaque!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam molestiae, aut beatae ratione delectus minus, ex illo facilis tempora at deserunt accusamus error autem consequatur vel aliquam? Velit, est itaque!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam molestiae, aut beatae ratione delectus minus, ex illo facilis tempora at deserunt accusamus error autem consequatur vel aliquam? Velit, est itaque!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam molestiae, aut beatae ratione delectus minus, ex illo facilis tempora at deserunt accusamus error autem consequatur vel aliquam? Velit, est itaque!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam molestiae, aut beatae ratione delectus minus, ex illo facilis tempora at deserunt accusamus error autem consequatur vel aliquam? Velit, est itaque!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam molestiae, aut beatae ratione delectus minus, ex illo facilis tempora at deserunt accusamus error autem consequatur vel aliquam? Velit, est itaque!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam molestiae, aut beatae ratione delectus minus, ex illo facilis tempora at deserunt accusamus error autem consequatur vel aliquam? Velit, est itaque!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam molestiae, aut beatae ratione delectus minus, ex illo facilis tempora at deserunt accusamus error autem consequatur vel aliquam? Velit, est itaque!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam molestiae, aut beatae ratione delectus minus, ex illo facilis tempora at deserunt accusamus error autem consequatur vel aliquam? Velit, est itaque!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam molestiae, aut beatae ratione delectus minus, ex illo facilis tempora at deserunt accusamus error autem consequatur vel aliquam? Velit, est itaque!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam molestiae, aut beatae ratione delectus minus, ex illo facilis tempora at deserunt accusamus error autem consequatur vel aliquam? Velit, est itaque!
            </p>