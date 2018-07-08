$(document).ready(function () {
    popCardData();
    limitToKey();
    $("#main").hide().fadeIn(1000);
    brandPos();
    launchSize();
    $(document).scroll(function () {
        var dist = $(document).scrollTop();
        if (dist > 200) {
            $(".brand").fadeOut(300);
            $(".contact_container").fadeIn(100);
        } else if (dist < 200) {
            $(".contact_container").fadeOut(300);
            $(".brand").fadeIn(300);
        }
    });

    window.onresize = function (event) {
        brandPos();
        launchSize();
    };

    $("#greeting").text(greeting());
    $(".contact_link").mouseover(function () {
        var linkOut = "#" + $(this).attr("id") + " .st0";
        var linkIn = "#" + $(this).attr("id") + " .st1";
        $(linkIn).css("fill", "#262B33");
        $(linkOut).css("fill", "#ffffff");
    });
    $(".contact_link").mouseleave(function () {
        var linkOut = "#" + $(this).attr("id") + " .st0";
        var linkIn = "#" + $(this).attr("id") + " .st1";
        $(linkIn).css("fill", "none");
        $(linkOut).css("fill", "#262B33");
    });

    $(document).on('click', ".page_link", function () {
        $(".build_item").empty();
        limitToKey($(this).attr('data-link'));
    });

    $("#exit_btn").click(function (e) {
        e.preventDefault();
        var anchor = $(this).attr('data-target');
        $("#launch").fadeOut(300, function () {
            document.querySelector('#' + anchor).scrollIntoView({
                behavior: 'smooth'
            });
        });
        $("#main").delay(300).fadeIn(300);
    });

    $(".contact_link").click(function (e) {
        e.preventDefault();
        var link = $(this).attr('id');
        switch (link) {
            case 'git_link':
            window.open('https://github.com/becoskie','_blank');
            break;
            case 'lden_link':
            window.open('https://www.linkedin.com/in/rbecoskie/','_blank');
            break;
            case 'mail_link':
            window.location.href = "mailto:ray@becoskie.com";
            break;
            
            
        }
    });

});

//need to launch
// $('a#link_id').click(function() {
//     $(this).attr('target', '_blank');
// });

function brandPos() {
    var imgWidth = Math.round($(".brand img").width());
    var imgHeight = Math.round($(".brand img").height());
    var workerHeight = Math.round($("#worker").height());
    var windowHeight = Math.round($(window).height());
    var windowWidth = $(window).width();
    if (windowWidth < 576) {
        extraSmall(imgWidth, imgHeight, workerHeight, windowHeight);
    } else if (windowWidth > 575 && $(window).width() < 768) {
        small(imgHeight, workerHeight, windowHeight);
    } else if (windowWidth > 767 && $(window).width() < 992) {
        medium(imgHeight, workerHeight, windowHeight);
    } else if (windowWidth > 991 && $(window).width() < 1200) {
        large(imgHeight, workerHeight, windowHeight);
    } else if (windowWidth > 1199) {
        extraLarge(imgWidth, imgHeight, workerHeight, windowHeight);
    }
}

function extraSmall(imgWidth, imgHeight, workerHeight, windowHeight) {
    var mgTop = marginTopMath(imgHeight, windowHeight);
    var headingMath = imgHeight * .33;
    $(".brand img").css({ 'margin-top': mgTop + "px" });
    $("#worker, #seasoned").css({ 'left': imgWidth + 18 + "px" });
    $("#worker").css({ 'top': headingMath + mgTop + "px" });
    $("#seasoned").css({ 'top': (headingMath + mgTop) + (workerHeight - 5) + "px" });
    $(".info_contain").css({ 'margin-top': windowHeight + "px" });
    //red
}

function small(imgHeight, workerHeight, windowHeight) {
    var mgTop = windowHeight * .0625;
    var totalHeight = imgHeight + mgTop;
    $(".brand img").css({ 'margin-top': mgTop + "px" });
    var medHeight = totalHeight + 3;
    var leftMargin = 35;
    $("#worker").css({ 'top': medHeight + "px", 'left': leftMargin + "px" });
    $("#seasoned").css({ 'top': (medHeight + workerHeight) - 5 + "px", 'left': leftMargin + "px" });
    $(".info_contain").css({ 'margin-top': windowHeight + "px" });
    $(".contact_container").css({ 'top': 100 + "px", 'left': 50 + "px", 'width': 200 + "px" });
    //blue
}

function medium(imgHeight, workerHeight, windowHeight) {
    var mgTop = windowHeight * .0625;
    var totalHeight = imgHeight + mgTop;
    $(".brand img").css({ 'margin-top': mgTop + "px" });
    var medHeight = totalHeight + 3;
    var leftMargin = 35;
    $("#worker").css({ 'top': medHeight + "px", 'left': leftMargin + "px" });
    $("#seasoned").css({ 'top': (medHeight + workerHeight) - 5 + "px", 'left': leftMargin + "px" });
    $(".info_contain").css({ 'margin-top': windowHeight + "px" });
    $(".contact_container").css({ 'top': 120 + "px", 'left': 70 + "px", 'width': 200 + "px" });
    //green
}

function large(imgHeight, workerHeight, windowHeight) {
    var mgTop = windowHeight * .0625;
    var totalHeight = imgHeight + mgTop;
    $(".brand img").css({ 'margin-top': mgTop + "px" });
    var medHeight = totalHeight + 3;
    var leftMargin = 35;
    $("#worker").css({ 'top': medHeight + "px", 'left': leftMargin + "px" });
    $("#seasoned").css({ 'top': (medHeight + workerHeight) - 5 + "px", 'left': leftMargin + "px" });
    $(".info_contain").css({ 'margin-top': windowHeight + "px" });
    $(".contact_container").css({ 'top': 140 + "px", 'left': 90 + "px", 'width': 200 + "px" });
    //yellow
}

function extraLarge(imgWidth, imgHeight, workerHeight, windowHeight) {
    var mgTop = windowHeight * .0625;
    var totalHeight = imgHeight + mgTop;
    var topSpacing = (totalHeight / 2) + 15;
    $(".brand img").css({ 'margin-top': mgTop + "px" });
    $("#worker, #seasoned").css({ 'left': imgWidth + 3 + "px" });
    $("#worker").css({ 'top': topSpacing + "px" });
    $("#seasoned").css({ 'top': topSpacing + workerHeight - 5 + "px" });
    $(".info_contain").css({ 'margin-top': windowHeight + "px" });
    $(".contact_container").css({ 'top': 140 + "px", 'left': 180 + "px", 'width': 200 + "px" });
    //pink
}

function greeting() {
    var result;
    var hour = new Date().getHours();
    if (hour < 12) {
        result = "Good morning, my name is";
    } else if (hour > 11 && hour < 17) {
        result = "Good afternoon, my name is";
    } else if (hour > 16) {
        result = "Good evening, my name is";
    }

    return result;
}

function marginTopMath(windowHeight, imgHeight) {
    var margTop = Math.round((imgHeight - windowHeight) * .33);
    return margTop;
}

function launchSize() {
    var windowHeight = Math.round($(window).height());
    var windowWidth = $(window).width();
    $("#launch").css({ "width": windowWidth + "px", "height": windowHeight + "px" });
};

