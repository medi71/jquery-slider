jquery-slider
=============

###Simple jQuery Slider v1.0

Features:
- horizontal scrolling
- autoplay true/false
- changeable duration of animation

###Demo

See the demo of this plugin: http://medynski.info/github/jquery-slider/

###How to use:

- Download the source.
- Add stylesheet and js library to head section:

```bash
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js" type="text/javascript"></script> 
	<link rel="stylesheet" href="css/slider.css" media="screen" />
	<script type="text/javascript" src="js/jquery.slider.js"></script>
```
- Add this code to body section:

```bash
<div class="wrapper">
	<div data-nav="prev">&laquo;</div>
	<div data-nav="next">&raquo;</div>
    <div class="slider">
        <div>first</div>
        <div>second</div>
        <div>third</div>
        <div>fourth</div>
        <div>fifth</div>
    </div>
	<div class="bubbles"></div>
</div>

<script type='text/javascript'>
	$(document).ready(function(){
		$('.wrapper').slide(1000,true);
	});
</script>
```
- Enjoy your slider :)

###License

This project is under GPL V3: http://www.gnu.org/licenses/gpl.html
