$(window).resize(function () {
	var leftsidebarwidth=$('.editor_leftside').width() + $('.v_scale').width() ;
    $(".editor_leftside").css("height", $(window).height());
    $(".module_sidebar_wrap").css("height", $(window).height());
    $(".editor_rightside").css("min-height", $(window).height());

    $(".editor_rightside").css("width", $(window).width() - leftsidebarwidth-5);
});


$(window).ready(function () {
	var leftsidebarwidth=$('.editor_leftside').width() + $('.v_scale').width() ;
	$(".editor_leftside").css("height", $(window).height());
    $(".module_sidebar_wrap").css("height", $(window).height());
	$(".editor_rightside").css("min-height", $(window).height());
	//$(".editor_rightside").css({"width": "700px"});//hack to maintain width
	//$(".editor_rightside").animate({"width": $(window).width() - leftsidebarwidth-100});//hack to maintain width
	$(".editor_rightside").css({"width": $(window).width() - leftsidebarwidth-5});//hack to maintain width



});


//module quick add button
$('.quickaddmodule').click(function(event){
	var tables=$(this).parents('.module').find('.view').html();
	var divstart='<div class="module ui-draggable" style="display: block;"><div class="view">';
	var divend='</div></div>';
	// alert (tables);
	($(this).parents('.module').find('.view')).clone().appendTo('.emailrender').wrap('<div class="module ui-draggable" />');
	  dragactions();
	  tinymcereload();
	  move_up_down();

});



// function move_up_dowsn() {
//         $('.emailrender .move_up').click(function(e) {
//         	e.preventDefault();
//             var parent = $(this).parents(".view").closest('.module');
//             parent.insertBefore(parent.prev());
            
//         });
//         $('.emailrender .move_down').click(function(e) {
//         	e.preventDefault();
//             var parent = $(this).parents(".view").closest('.module');
//             parent.insertAfter(parent.next());
//         });
//     }





    function moveUp(item) {
    var prev = item.prev();
    if (prev.length == 0)
        return;
    prev.css('z-index', '').css('position','relative').animate({ top: item.height() }, 250);
    item.css('z-index', '').css('position', 'relative').animate({ top: '-' + prev.height() }, 300, function () {
    	item.insertBefore(prev);
        prev.css('z-index', '').css('top', '').css('position', '');
        item.css('z-index', '').css('top', '').css('position', '');
        
    });
}
function moveDown(item) {
    var next = item.next();
    if (next.length == 0)
        return;
    next.css('z-index', 999).css('position', 'relative').animate({ top: '-' + item.height() }, 250);
    item.css('z-index', 1000).css('position', 'relative').animate({ top: next.height() }, 300, function () {
        next.css('z-index', '').css('top', '').css('position', '');
        item.css('z-index', '').css('top', '').css('position', '');
        item.insertAfter(next);
    });
}
function move_up_down() {
$('.move_up').click(function(event) { 
	//$(this).unbind();
        moveUp($(this).parents('.module'));
        $(this).parents('.module').css('-webkit-animation-duration','0s');
        
});

$('.move_down').click(function(event) { 
	//$(this).unbind();
        moveDown($(this).parents('.module'));
        $(this).parents('.module').css('-webkit-animation-duration','0s');
        
});
}



///create new template form center
$(window).ready(function () {
    var window_width= $(window).width();
    var newtempform= $('.newtemplate_form').width();
    $('.newtemplate_form').css({marginLeft: window_width/2 - newtempform/2 });
});

//DISABLE TEXT SELECTON
$(window).ready(function () {
$(".modules_scroll")
.attr('unselectable', 'on')
.css('user-select', 'none')
.css('MozUserSelect', 'none')
.on('selectstart', false)
.on('mousedown', false);

});

$(document).bind("contextmenu", function (e) {
    //e.preventDefault();
    });
