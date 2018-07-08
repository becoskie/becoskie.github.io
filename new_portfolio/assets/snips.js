<svg class="contact_link" version="1.1" id="git_hub_img" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
              <g id="Layer_2_1_">
                <circle class="st1" cx="25" cy="25" r="23.8" />
              </g>
              <g id="Layer_1_1_">
                <path class="st0" d="M29.6,35.9v-4.3c0-1.5-0.5-2.4-1-2.9c3.5-0.4,7.2-1.7,7.2-7.7c0-1.7-0.6-3.1-1.6-4.2c0.2-0.4,0.7-2-0.2-4.1
             c0,0-1.3-0.4-4.2,1.6c-1.3-0.3-2.7-0.6-4-0.6c-1.3,0-2.7,0.2-4,0.6c-3-2-4.2-1.6-4.2-1.6c-0.9,2.2-0.3,3.7-0.2,4.1
             c-1,1.1-1.6,2.5-1.6,4.2c0,6,3.7,7.3,7.2,7.7c-0.4,0.4-0.9,1.1-1,2.1c-0.9,0.4-3.2,1.1-4.6-1.3c0,0-0.8-1.5-2.4-1.6
             c0,0-1.6,0-0.1,1c0,0,1,0.5,1.7,2.3c0,0,1,3,5.3,2.1v2.7c0,0.4-0.3,0.8-0.9,0.8c1.5,0.5,3.1,0.7,4.8,0.7c1.6,0,3.2-0.3,4.7-0.7
             C29.9,36.7,29.6,36.3,29.6,35.9z" />
              </g>
            </svg>










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