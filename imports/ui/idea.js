import { Template } from 'meteor/templating';

import { Ideas } from '../api/ideas.js';

import './idea.html';

Template.idea.events({
    'click .toggle-checked'() {
        // Set the checked property to the opposite of its current value
        Ideas.update(this._id, {
            $set: { checked: ! this.checked },
        });
    },
    'click .delete'() {
        Ideas.remove(this._id);
    },
});