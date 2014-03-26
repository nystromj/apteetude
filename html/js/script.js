jQuery(document).ready(function($) {
	// Set the current state.
	//history.pushState({view: 'store'}, 'Store front', '?view=store');
	// Push the current state.
	history.replaceState({
		view: 'store'
	}, 'Store front', '?view=store');
	$('.item-panel-clickable').click(function() {
		// Hide all other item panels
		$('.store-primary-col').hide('slow');
		$(this).removeClass('item-panel-clickable');
		$('.buy-now').hide();
		$('#editing-screen #edit-template').html($(this).parent().html());
		$('#editing-screen').show();
		// Now, push a new browser state into history.
		var designID = 'ID-1'; // just an example; update with real #todo
		var state = {
			view: 'design',
			designID: designID
		};
		history.pushState(state, 'Edit Design', '?view=edit&item=' + designID);
	});
	// On browser changing states:
	window.addEventListener("popstate", function(e) {
		var state = e.state;
		if (state.view == 'store') {
			$('#editing-screen').hide();
			$('.store-primary-col').show();
			$('.buy-now').show();
			$('.item-panel').addClass('item-panel-clickable');
		}
	});
}); // jquery