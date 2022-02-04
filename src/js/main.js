$(document).ready(function(){
    if($('.slider').length){
        $('.slider').each(function(){
            initslider($(this));
        })
    }
    

})

function initslider(element){
    let container = $('<div/>')
    .addClass('slides-container')
    .html(element.html());
    element.html(container);
    element.find('img').addClass('slide');
    
    let nav = $('<nav/>')
    .append('<button class="prev">précedent</button>')
    .append('<button class="next">suivant</button>');
    element.append(nav);
    
    element.attr('data-currentSlide',0);
    element.find('.prev').click(function(){
        prev(element)
    });
    element.find('.next').click(function(){
        next(element)
    });
}

function prev(slider){
    let attrValue = Number(slider.attr('data-currentSlide'));
    slider.attr('data-currentSlide',Number(attrValue) -1);
    slide(slider);
}

function next(slider){
    let attrValue = Number(slider.attr('data-currentSlide'));
    slider.attr('data-currentSlide',attrValue +1);
    slide(slider);
}

function slide(slider){
    let attrValue =  Number(slider.attr('data-currentSlide'));
    let leftValue = attrValue * (-100);
    let container = slider.find('.slides-container');
    let slideTotal = '';

    if(attrValue === container.find('.slide').length){
        let clone = container.find('.slide:first-child').clone();
        container.append(clone);
        container.on('transitionend',function(){
            container.off('transitionend');
            container.css('transition','none');
            container.css('left',0);
            slider.attr('data-currentSlide',0);
            container.find('.slide:last-child').remove();
            setTimeout(function(){
                container.css('transition','left 1s');
            },20);
        })
    
    }
    
    if(attrValue == -1){
        let clone = container.find('.slide:last-child').clone();
        clone.css({
        'position':'absolute',
        'left':'0',
        'top':'0',
        'transform':'translateX(-100%)'
        })
        container.prepend(clone);
        container.on('transitionend',function(){
            $(this).off('transitionend');
            container.css('transition','none');
            container.css('left', (slideTotal - 1) * -100 + '%');
            slider.attr('data-currentSlide', slideTotal - 1 );
            container.find('.slide:first-child').remove();

            setTimeout(function(){
                container.css('transition','left 1s');
            },20);
        })
    }
    container.css("left",leftValue + '%');
    container.on('transitionend',function(){
        $(this).off('transionend');
        enableNav(slider);
    });
}

function disableNav(slider){
    slider.find('nav button').attr('disabled','true');
}

function enableNav(slider){
    slider.find('nav button').removeAttr('disabled');
}
