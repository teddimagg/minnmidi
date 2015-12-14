Session.set('login', false);
Session.set('register', false);
Session.set('burger', false);
Session.set('burgerView', false);

if($(window).width() < 800)
{
	Session.set('burger', true);
}

Template.nav.onRendered(function() {
  $(window).resize(function() {
  	if($(window).width() < 800)
  	{
  		console.log("BURGER");
  		Session.set('burger', true);
  	}
  	else
  	{
  		Session.set('burger', false);
  	}
  });
});

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
			Session.set('burgerView', false);
			Session.set('login', true);
		}
	},
	'click .navBurger': function(event){
		var bur = Session.get('burgerView');
		if(bur)
		{
			Session.set('burgerView', false);	
		}
		else
		{
			Session.set('login', false);
			Session.set('register', false);
			Session.set('burgerView', true);
		}
	}
});

Template.nav.helpers({
	'isLogin': function(){
		return Session.get('login');
	},
	'isBurger': function(){
		return Session.get('burger');
	},
	'isBurgerView':function(){
		return Session.get('burgerView');
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
