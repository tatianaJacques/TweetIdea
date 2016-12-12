import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.myReveal.onRendered(function () {
  this.myRevealInstance = new Foundation.Reveal($('#myReveal'));
});

Template.myReveal.onDestroyed(function () {
  let reveal = this.myRevealInstance;
  if (reveal) {
    reveal.destroy();
  }
});