/**
 *
 * Simple jQuery Slider by wojciech@medynski.info
 *
 *@date: 11.2013
 *@author: Wojciech Medyński
 *
 */

(function( $ ) {
	$.fn.slide = function(speed,autostart) {
		
		
		/**
		 *
		 *default vars
		 *
		 */
		var _wrapper = this;
		var _slider = $('.slider');
		var _prev = $('*[data-nav=next]');
		var _next = $('*[data-nav=prev]');
		var _bubbles = $('.bubbles');
		var _slides = $('.slider div');
		var currentPosition = 0;
		var direction = 'next';
		var speed = speed || 5000;
		var autostart = autostart || true;
		
		
		/**
		 *
		 *fix slider width
		 *
		 */
		var sliderWidth = _wrapper.width();
		var sliderCount = $('div', _slider).length;
		_slider.width(sliderCount * sliderWidth);
		
		
		/**
		 *
		 *add bubbles to wrapper
		 *
		 */
		for(i=0; i < sliderCount; i++)
		{
			_bubbles.append('<span data-slideid="' + i + '"></span>');
		}
		
		
		/**
		 *
		 *fix bubbles left align
		 *
		 */
		var changeLeft = (sliderWidth - _bubbles.width()) / 2;
		_bubbles.css({'left' : changeLeft});
		
		/**
		 *
		 *mark current bubble
		 *
		 */
		$.markCurrentBubble = function(current) {
			var current = current || 0;
			var bubbleList = _bubbles.find('span');
			bubbleList.removeClass('current');
			bubbleList.eq(current).addClass('current');
		}
		$.markCurrentBubble();
		
		/**
		 *
		 *clear current interval function
		 *
		 */
		$.clearInterval = function() {
			if(autostart) 
			{
				clearInterval(interval);
				interval = setInterval($.autoSlide, speed);
			}
		}			
		
		/**
		 *
		 *slide to next step
		 *
		 */
		$.next = function() {
			if(currentPosition !== 0) 
			{
				$.clearInterval();
				_slider.stop(true,true).animate({left: '+=' + sliderWidth}, 500);
				currentPosition--;
				//console.log('next: ' + currentPosition);
				$.markCurrentBubble(currentPosition);
			}
			else return false;	
		}
		
		/**
		 *
		 *slide to previous step
		 *
		 */
		$.prev = function()
		{
			if(currentPosition !== sliderCount-1) 
			{
				$.clearInterval();
				_slider.stop(true,true).animate({left: '-='+sliderWidth}, 500);
				currentPosition++;
				//console.log('prev: ' + currentPosition);
				$.markCurrentBubble(currentPosition);
			}
			else return false;		
		}
		
		/**
		 *
		 *auto play
		 *
		 */
		$.autoSlide = function() {
			if(direction === 'next' && currentPosition !== 0) direction = 'next';
				else direction = 'prev';
			if(direction === 'prev' && currentPosition !== sliderCount-1) $.prev();
			else 
			{
				direction = 'next';
				$.next();
			}
		}
		
		/**
		 *
		 *switch slide
		 *
		 */
		$.jumpToStep = function(step) {
			$.clearInterval();
			_slider.stop(true,true);
			var _this = _slides.eq(step);
			var _element_left = _this.offset().left;
			var _wrapper_left =  _wrapper.offset().left;
			var _slider_left =  _slider.offset().left;
			var _left = _wrapper_left - _element_left + parseInt(_wrapper.css('borderLeftWidth'));
			_slider.animate({left: '+=' + _left});
			currentPosition = step;
			$.markCurrentBubble(currentPosition);
		}
		
		/**
		 *
		 *event listener for controllers
		 *
		 */
		_prev.click(function () { $.prev() });
		_next.click(function () { $.next() });
		$('*[data-slideid]').on('click', function()
		{
			var step = $(this).data('slideid');
			$.jumpToStep(step);
		});
		_next.on('mouseenter', function() { _next.animate({opacity: 1}) });
		_next.on('mouseleave', function() { _next.animate({opacity: 0}) });
		_prev.on('mouseenter', function() { _prev.animate({opacity: 1}) });
		_prev.on('mouseleave', function() { _prev.animate({opacity: 0}) });
		
		if(autostart) interval = setInterval($.autoSlide, speed);
	}
	
}( jQuery ));