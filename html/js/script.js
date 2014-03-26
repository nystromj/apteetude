jQuery(document).ready(function($) {
	
	var draggie = new Draggabilly( document.getElementById('editing-pane'), {
		handle: '.panel-heading'
	} );
	
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
		$('.buy-now').hide();
		$('#editing-screen #edit-template').html($(el).parent().html());
		$('#editing-options').html('');
		$('#editing-screen').show();
	
		
		/* Create the editing area */
		fields = $(el).find('.template').attr('data-fields');
		if (fields != 'undefined')
		{
			fields = fields.split(',');
			var elementsWrap, newEl, elWrap, label, defText;
			// Remove all previous elements that have been added
			
			
			$.each(fields, function (index, field)
			{
    			
    			elementsWrap = document.createElement('div');
    			defText = $('.' + field).html();
    			
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
    			appendUsualSuspects(field, elementsWrap);
    			
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
	
	function appendUsualSuspects(field, elWrap)
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
		
		/* This is super confusing. Basically, it's:
			<div>
				<label></div>
				<div>
					<input..
					<div.. (slider)
				</div>
			</div>
		*/
		
		$(sizeElWrap).append(sizeLabel);
		$(sizeInWrap).append(sizeEl);
		$(sizeEl).addClass('form-control');
		$(sizeElWrap).addClass('form-group');
		
		$(sizeElWrap).append(sizeInWrap);
		$(sizeElWrap).addClass('size-edit-wrapper');
		
		
		$(sizeEl).css({
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
		
		$(sizeInWrap).append(sl);
		sizeEl.value = $('.' + field).css('font-size');
		
		$(elWrap).append(sizeElWrap);
		
		$(sl).slider({
			value: $('.' + field).css('font-size').replace('px', ''),
			min: 0,
			max: 50,
			slide: function(event, ui) {
				$('.' + field).css('font-size', ui.value + 'px');
				sizeEl.value = ui.value + 'px';
			}
		}); // turn it into a slider.

		
		// Finally (this might be ironic in the future), add a position customizer
		// Btw, this is kind of spagetti right now
		var posEl = document.createElement('input');
		posEl.type = 'text';
		var posElWrap = document.createElement('div');
		var posLabel = document.createElement('label');
		posLabel.innerHTML = 'Vertical Position';
		
		var sizeInWrap = document.createElement('div');
		
		createSlider(field, posLabel, posElWrap, sizeInWrap, posEl, 'padding-top', elWrap);
		
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
	
	function createSlider(field, label, wrap, inWrap, el, attr, allWrap)
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
				$('.' + field).css(attr, ui.value + 'px');
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