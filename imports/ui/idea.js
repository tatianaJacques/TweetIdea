import { Template } from 'meteor/templating';

import { Ideas } from '../api/ideas.js';
import { Votes } from '../api/votes.js';


import './idea.html';

Template.idea.events({
    'click .toggle-checked'() {
        // Set the checked property to the opposite of its current value
        Ideas.update(this._id, {
            $set: { checked: ! this.checked },
        });
    },
    'click .delete'() {
        
        var votes = Votes.find({ideasId: this._id}).fetch();

        $.each(votes, function(i, vote){
            Votes.remove(vote._id);
        })

        Ideas.remove(this._id);

    }
});