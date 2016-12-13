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

        console.log(Meteor.user());

        Ideas.insert({
            text,
            createdAt: new Date(), // current time
            owner: Meteor.userId(),
            username: Meteor.user().username,
            profile: {
                firstname: Meteor.user().profile.firstname,
                lastname: Meteor.user().profile.lastname
            }
        });

        // Clear form
        target.text.value = '';
    },
});