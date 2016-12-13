
if (Meteor.isClient) {
  Template.signup.events({
    'submit form': function(event) {
      event.preventDefault();

      var firstnameVar = event.target.signupFirstname.value;
      var lastnameVar = event.target.signupLastname.value;
      var pseudoVar = event.target.signupPseudo.value;
      var emailVar = event.target.signupEmail.value;
      var passwordVar = event.target.signupPassword.value;

      Accounts.createUser({
        username: pseudoVar,
        email: emailVar,
        password: passwordVar,
        profile: {
            firstname: firstnameVar,
            lastname: lastnameVar
        }
      });
    }
  });

  Template.login.events({
    'submit form': function(event) {
      event.preventDefault();

      var emailVar = event.target.loginEmail.value;
      var passwordVar = event.target.loginPassword.value;

      Meteor.loginWithPassword(emailVar, passwordVar);
    }
  });

  Template.settings.events({
    'click .logout': function(event) {
      event.preventDefault();

      Meteor.logout();
    }
  });

}
