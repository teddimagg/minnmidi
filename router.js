Router.configure({
	layoutTemplate:'shared'
});
Router.map(function(){
	this.route('home',{path:'/'});
	this.route('/admin');
	this.route('/bio');
});
Router.onAfterAction(function() {
	Session.set('login', false);
	Session.set('register', false);
	Session.set('burgerView', false);
});