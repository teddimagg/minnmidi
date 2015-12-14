Router.configure({
	layoutTemplate:'shared'
});

Router.map(function(){
	this.route('home',{path:'/'});
	this.route('/admin');
	this.route('/bio');
});

Router.route('/admin/:_id', {
	template: 'editmovie',
	data: function(){
		var currentEvent = this.params._id;
		return movieEvents.findOne({ _id: currentEvent});
	}
});

Router.route('/bio/:_id', {
	template: 'bioevent',
	data: function(){
		var currentEvent = this.params._id;
		return movieEvents.findOne({ _id: currentEvent});
	}
});

Router.onAfterAction(function() {
	Session.set('login', false);
	Session.set('register', false);
	Session.set('burgerView', false);
});