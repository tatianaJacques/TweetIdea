import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import '../imports/ui/body.js';
import '../imports/api/accounts.js';
import '../imports/ui/idea.js';
import '../imports/ui/vote.js';

Meteor.startup(() => {
    var popup = (function() {
    	function init() {
    		var overlay = $('.overlay');

    		$('.popup-btn').each(function(i, el) {
    			var modal = $('#' + $(el).attr('data-modal'));
    			var close = $('.close');

    			function deleteModal() {
    				modal.removeClass('show');
    			}

    			function deleteModalHandler() {
    				deleteModal();
    			}

    			$(el).click(function() {
    				modal.addClass('show');
    				overlay.unbind("click");
    				overlay.bind("click", deleteModalHandler);
    			});

    			close.click(function(event) {
    				event.stopPropagation();
    				deleteModalHandler();
    			});
    		});
    	}
    	init();
    })();
});
