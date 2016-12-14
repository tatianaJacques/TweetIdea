import { Template } from 'meteor/templating';

import { Ideas } from '../api/ideas.js';
import { Votes } from '../api/votes.js';

import './body.html';
import './idea.js';


Template.body.helpers({
    ideas() {
        return Ideas.find({}, { sort: { createdAt: -1 } });
    }
});

Template.idea.helpers({
    votes(votesId) {
        return Votes.find({owner: Meteor.userId()});
    }
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
            owner: Meteor.userId(),
            username: Meteor.user().username,
            profile: {
                firstname: Meteor.user().profile.lastname,
                lastname: Meteor.user().profile.firstname
            }
        });

        // Clear form
        target.text.value = '';
    },
    'click .votes .zmdi'(event) {
        var element = event.currentTarget;
        var vote = $(element).data('vote');
        var HasAlreadyVote = false;
        var currentRate = this.currentRate == undefined ? 0 : this.currentRate;
        var voteId = 0;
        var voteRate = 0;
        var votes = Votes.find({ideasId: this._id}).fetch();

        $.each(votes, function(i, vote){
            if (Meteor.userId() == vote.owner) {
                HasAlreadyVote = true;
                voteId = vote._id;
                voteRate = vote.vote;
            }
        })

        if(!HasAlreadyVote){

            currentRate = currentRate + vote;

            voteIdNew = Votes.insert({
                createdAt: new Date(), // current time
                owner: Meteor.userId(),
                vote: vote,
                ideasId: this._id
            });

            var votesId = [];
            votesId.push(voteIdNew);

            Ideas.update(this._id, {
                $set: { currentRate: currentRate, votesId : votesId },
            });
        }else{

            currentRate = currentRate  + vote - voteRate;

            if(currentRate < 0) {
                currentRate = 0;
            }

            Votes.remove(voteId);

            var voteIdNew = Votes.insert({
                createdAt: new Date(), // current time
                owner: Meteor.userId(),
                vote: vote,
                ideasId: this._id
            });

            var votesId = this.votesId;
            votesId.push(voteIdNew);

            Ideas.update(this._id, {
                $set: { currentRate: currentRate, votesId : votesId  },
            });

            console.log(this);
        }

    }
});