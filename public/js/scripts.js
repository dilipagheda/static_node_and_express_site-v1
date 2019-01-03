$(document).foundation()

$('article .cell img').on('mouseenter',function(e){
    let target = e.target;
    $(target).addClass('animated swing');
});

$('article .cell img').on('mouseleave',function(e){
    let target = e.target;
    $(target).removeClass('animated swing');
});
