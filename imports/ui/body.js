import { Template } from 'meteor/templating';

import { Ideas } from '../api/ideas.js';

import './body.html';
import './idea.js';


Template.body.helpers({
    ideas() {
        return Ideas.find({}, { sort: { createdAt: -1 } });
    },
});


Template.body.events({
    'submit .new-idea'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const text = target.text.value;

        // Insert a task into the collection
        Ideas.insert({
            text,
            createdAt: new Date(), // current time
        });

        // Clear form
        target.text.value = '';
    },
});