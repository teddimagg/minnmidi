Session.set('login', false);
Session.set('register', false);

Template.nav.events({
	'click .navprofile': function(event){
		var log = Session.get('login');
		var reg = Session.get('register');
		if(log || reg)
		{
			Session.set('login', false);
			Session.set('register', false);
		}
		else
		{
			Session.set('login', true);
		}
	}
});

Template.nav.helpers({
	'isLogin': function(){
		return Session.get('login');
	}
});

Template.nav.helpers({
	'isRegister': function(){
		return Session.get('register');
	}
});

Template.navLogin.events({
	'click .regbtn': function(event){
		Session.set('register', true);
		Session.set('login', false);
	},
	'click .loginbtn': function(event){
		event.preventDefault();
		var emailVar = $('[name=email]').val();
		var passwordVar = $('[name=pass]').val();
		Meteor.loginWithPassword(emailVar, passwordVar);
	},
	'click .logoutbtn': function(event){
		event.preventDefault();
		Meteor.logout();
	}
});

Template.navRegister.events({
	'submit form': function(event){
		event.preventDefault();
		var emailVar = $('[name=email]').val();
		var passwordVar = $('[name=pass]').val();
		Accounts.createUser({
			email: emailVar,
			password: passwordVar
		});
	}
});
