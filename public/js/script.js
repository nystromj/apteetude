/*
	#Todo:
	
	foreach of the customizable divs:
		while width > 150:
			font-size--;
*/

jQuery(document).ready(function($) {
	
	// template is a html object, not jquery
	function wrapTemplate(template)
	{
    	var templateWrapper = document.createElement('div');
    	templateWrapper.className = "item-panel-wrapper";
		$(templateWrapper).append(template);
    	return templateWrapper;
    	
		
	} // wrapTemplate ()
	
	function createTemplate(templateData)
	{
		/* Create a template */
		var template = document.createElement('div');
		var templateBg = document.createElement('div');
		var priceTag = document.createElement('div');
		priceTag.className = "buy-now";
		priceTag.innerHTML = 'buy now $20';
		
		templateBg.className = "item-panel item-panel-clickable " + templateData.background;
		template.id = 'template-' + templateData.id;
		$(template).attr('data-fields', templateData.fields);
		template.className = 'template';
		template.innerHTML = templateData.html;
		$(templateBg).append(template);
		$(templateBg).append(priceTag);
		return templateBg;
	} // createTemplate ()
	
	var templates = [
		{
			id: 1,
			fields: "first-name",
			html: '<div style="transform:rotate(-9deg);-ms-transform:rotate(-9deg);-webkit-transform:rotate(-9deg);"><div class="img" style="background-image: url(\'../../img/hello-name.png\');height:70px;"><div class="first-name" style="padding-top:28px;font-size:18px;font-family:\'Permanent Marker\', cursive;">Paul</div></div></div>',
			background: "panel-red item-white",
			price: 20
		},
		{
			id: 2,
			fields: "profession",
			html: '<div style="padding-top:12px;color:white;font-family:\'Roboto\', sans-serif;font-size:16px;font-weight:700"><div>trust me,</div><div>i\'m an <span class="profession">engineer</span></div></div>',
			background: "panel-blue item-blue",
			price: 20
		},
		{
			id: 3,
			fields: "last-name",
			html: '<div style="font-family:\'Droid Sans\',sans-serif;color:#ffffff;font-weight:700;line-height:27px;"><div class="img" style="background-image:url(\'../../img/crown.png\');height:20px"></div><div style="font-size:25px;">PROUD</div><div style="font-size:21px;word-spacing:1px">TO BE A</div><div class="last-name uppercase" style="font-size:22px;line-height:30px">Graham</div></div>',
			background: "panel-blue item-black",
			price: 20
		},
		{
			id: 4,
			fields: "hobbie",
			html: '<div class="uppercase" style="font-size: 58px;line-height:60px;font-family: \'Francois One\', sans-serif;"><div>I <span class="img" style="display:inline-block;background-image: url(\'../../img/heart.png\');height:50px;width:57px"></span></div><div class="hobbie">Yoga</div></div></div>',
			background: "panel-green item-white",
			price: 20
		},
		{
			id: 5,
			fields: "place",
			html: '<div class="uppercase" style="padding-top:7px;font-size:23px;line-height:25px;font-family: \'Indie Flower\', cursive;"><div>Daydreaming</div><div>of</div><div class="place place-recent uppercase strong">Sydney</div></div>',
			background: "panel-purple item-white",
			price: 20
		},
		{
			id: 6,
			fields: "major",
			html: '<div class="uppercase strong" style="padding-top:10px;font-size: 28px;line-height:30px;color:#ffffff;font-family:\'Droid Sans\', sans-serif;text-shadow: 1px 1px 0 #c6a018;"><div class="major">Math</div><div>Nerd</div></div>',
			background: "panel-yellow item-blue",
			price: 20
		}
	];
	
	var count = 0;
	var wrappedTemplate;
	
	$.each(templates, function (index, templateData)
	{
		wrappedTemplate = wrapTemplate(createTemplate(templateData));
		if (count < 2)
		{
			$('#col-first').append(wrappedTemplate);
			count++;
		}
		else if (count < 4)
		{
			$('#col-second').append(wrappedTemplate);
			count++;
		}
		else if (count < 6)
		{
			$('#col-third').append(wrappedTemplate);
			count++;
		}
		else
		{
			count = 0;
		}
		
	});
	
	
	var draggie = new Draggabilly( document.getElementById('editing-pane'), {
		handle: '.panel-heading'
	});
	var draggie2 = new Draggabilly( document.getElementById('checkout-pane'), {
		handle: '.panel-heading'
	});
	
	var fields, designID, state;
	// Replace the current state.
	history.replaceState({
		view: 'store'
	}, 'Store front', '?view=store');
	$('.item-panel-clickable').click(function() {
		// Hide all other item panels
		showEditing(this);
	});
	// On browser changing states:
	window.addEventListener("popstate", function(e) {
		state = e.state;
		if (state.view && state.view == 'store') {
			$('#editing-screen').hide();
			$('.store-primary-col').show('medium');
			$('.buy-now').show();
			$('.item-panel').addClass('item-panel-clickable');
		}
	});
	
	function showEditing(el)
	{
		/* Hide and Show the appropriate elements */
		$('.store-primary-col').hide('slow');
		$(el).removeClass('item-panel-clickable');
		// Move some things around, change some colors:
		$('.editing-container').css('backgroundColor', $(el).css('backgroundColor'));
		
		$('.buy-now').hide();
		$('#editing-screen #edit-template').html($(el).parent().html());
		$('#editing-options').html('');
		$('#editing-screen').show();
	
		
		/* Create the editing area */
		var template = $(el).find('.template');
		var templateId = $(template).attr('id');
		fields = template.attr('data-fields');
		if (fields != 'undefined')
		{
			fields = fields.split(',');
			var elementsWrap, newEl, elWrap, label, defText;
			// Remove all previous elements that have been added
			
			
			$.each(fields, function (index, field)
			{
    			
    			elementsWrap = document.createElement('div');
    			
    			// This default text is going to be incorrect if there are overlaps.
    			// E.g. if there is "place" for home and college, they will override.
    			// Therefore, it must be within the template that it finds the default text only.
    			defText = template.find('.' + field).html();
    			
				newEl = document.createElement('input');
				newEl.type = 'text';
				elWrap = document.createElement('div');
				label = document.createElement('label');
				label.innerHTML = field.charAt(0).toUpperCase() + field.slice(1);;
				newEl.value = defText;
				
				// Use jQuery from here, because they didn't teach me JS properly.
				$(newEl).addClass('form-control customizer');
				$(newEl).attr('data-model', field);
				$(elWrap).addClass('form-group');
				$(elWrap).append(label);
    			$(elWrap).append(newEl);
    			
    			$(elementsWrap).append(elWrap);
    			// Now we append all the usual suspects, too.
    			appendUsualSuspects(field, elementsWrap, templateId);
    			
				// Append the new element to the editing panel
				$('#editing-options').append(elementsWrap);
				
				
				addTextCustomizeListeners();
			});
		} // if
		// Otherwise, would be weird.
		
		
		/* Modify browser state */
		designID = 'ID-1'; // just an example; update with real #todo
		state = {
			view: 'design',
			designID: designID
		};
		history.pushState(state, 'Edit Design', '?view=edit&item=' + designID);
	} // showEditing(element)
	
	function appendUsualSuspects(field, elWrap, templateId)
	{
		// Craete a color customizer
		var colorEl = document.createElement('input');
		colorEl.type = 'text';
		var colorElWrap = document.createElement('div');
		var colorLabel = document.createElement('label');
		colorLabel.innerHTML = 'Font Color';
		
		$(colorElWrap).append(colorLabel);
		$(colorElWrap).append(colorEl);
		$(colorEl).addClass('form-control color-picker');
		$(colorElWrap).addClass('form-group');
		
		colorEl.value = rgb2hex($('.' + field).css('color'));
		
		$(colorEl).iris({
			change: function(event, ui) {
				$('.' + field).css('color', ui.color.toString());
			}
		});
		$(elWrap).append(colorElWrap);
		
		// Create a font-size customizer
		var sizeEl = document.createElement('input');
		sizeEl.type = 'text';
		var sizeElWrap = document.createElement('div');
		var sizeLabel = document.createElement('label');
		sizeLabel.innerHTML = 'Font Size';
		
		var sizeInWrap = document.createElement('div');
		
		createSlider(field, sizeLabel, 
			sizeElWrap, sizeInWrap, sizeEl, 'font-size', elWrap, templateId)
		
		
		// Finally (this might be ironic in the future), add a position customizer
		// Btw, this is kind of spagetti right now
		var posEl = document.createElement('input');
		posEl.type = 'text';
		var posElWrap = document.createElement('div');
		var posLabel = document.createElement('label');
		posLabel.innerHTML = 'Vertical Position';
		
		var posInWrap = document.createElement('div');
		
		createSlider(field, posLabel, posElWrap, 
			posInWrap, posEl, 'padding-top', elWrap, templateId);
		
		addStyleCustomizeListeners();
	}
	
	function addStyleCustomizeListeners()
	{
		$('#editing-screen').click(function(e) {
			if (!$(e.target).is('input[type="submit"]')) 
			{
				if (!$(e.target).is(".color-picker, .iris-picker, .iris-picker-inner")) {
					$('.color-picker').iris('hide');
					return false;
				} // if
				$('.color-picker').click(function() {
					console.log("clickOn");
					$('.color-picker').iris('hide');
					$(this).iris('show');
					return false;
				}); // .color-picker click
			} // if
		}); // document.click

		
	}
	
	function createSlider(field, label, wrap, inWrap, el, attr, allWrap, templateId)
	{
		$(wrap).append(label);
		$(inWrap).append(el);
		$(el).addClass('form-control');
		$(wrap).addClass('form-group');
		
		$(wrap).append(inWrap);
		$(wrap).addClass(attr + '-wrapper');
		
		
		$(el).css({
			'width': '65px', 
			'float': 'left'
		});
		
		sl = document.createElement('div'); // slider element
		
		$(sl).css({
			'display':'inline-block', 
			'width': '150px', 
			'float': 'left;',
			'margin-left': '15px',
			'margin-top': '10px',
		});
		
		$(inWrap).append(sl);
		el.value = $('.' + field).css(attr);
		
		$(wrap).append(inWrap);
		
		$(sl).slider({
			value: $('.' + field).css(attr).replace('px', ''),
			min: -10,
			max: 125,
			slide: function(event, ui) {
				$('#' + templateId + ' .' + field).css(attr, ui.value + 'px');
				el.value = ui.value + 'px';
			}
		}); // turn it into a slider.
		$(inWrap).append(sl);
		
		$(allWrap).append(wrap);
	}
	
	function addTextCustomizeListeners()
	{
		$('.customizer').keyup(function ()
		{
			// Update the text
			$('.' + $(this).attr('data-model'))
				.text($(this).val());
		}); // keyup
	} // addCustomizeListeners
	
	var hexDigits = new Array
        ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 

	//Function to convert hex format to a rgb color
	function rgb2hex(rgb) {
		rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
	}
	
	function hex(x) {
		return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
	}
	
}); // jquery