Router.configure({
	layoutTemplate:'shared'
});
Router.map(function(){
	this.route('home',{path:'/'});
	this.route('/admin');
	this.route('/bio');
});