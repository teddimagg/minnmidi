Session.set('login', false);

Template.nav.events({
	'click .navprofile': function(event){
		var smegma = Session.get('login');
		if(smegma)
		{
			Session.set('login', false);
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