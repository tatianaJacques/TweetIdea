
Template.login.onRendered(function () {
  this.myRevealInstance = new Foundation.Reveal($('#login'));
  this.myRevealInstance = new Foundation.Reveal($('#signup'));
});

Template.login.onDestroyed(function () {
  let reveal = this.myRevealInstance;
  if (reveal) {
    reveal.destroy();
  }
});

Template.signup.onDestroyed(function () {
  let reveal = this.myRevealInstance;
  if (reveal) {
    reveal.destroy();
  }
});
