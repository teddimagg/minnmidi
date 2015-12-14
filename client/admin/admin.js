Template.admin.events({
	'click button': function(event)
	{
		event.preventDefault();
		var nafn = $('[name="nafn"]').val();
		var mynd = $('[name="mynd"]').val();
		var lysing = $('[name="lysing"]').val();
		var trailer = $('[name="trailer"]').val();
		var lengd = $('[name="lengd"]').val();
		var tungumal = $('[name="tungumal"]').val();
		var tegund = $('[name="tegund"]').val();

		movieEvents.insert({
			nafn: nafn,
			mynd: mynd,
			lysing: lysing,
			trailer: trailer,
			lengd: lengd,
			tungumal: tungumal,
			tegund: tegund
		});
		Router.current().render(Template.yourMainTemplateName).data();
	}
});

Template.admin.helpers({
	'movieEvents': function()
	{
		return movieEvents.find().fetch();
	}
});

Template.editmovie.events({
	'click .editbtn': function(event){
		event.preventDefault();
		var nafn = $('[name="nafn"]').val();
		var mynd = $('[name="mynd"]').val();
		var lysing = $('[name="lysing"]').val();
		var trailer = $('[name="trailer"]').val();
		var lengd = $('[name="lengd"]').val();
		var tungumal = $('[name="tungumal"]').val();
		var tegund = $('[name="tegund"]').val();
		movieEvents.update(this._id, { $set:{
			nafn: nafn,
			mynd: mynd,
			lysing: lysing,
			trailer: trailer,
			lengd: lengd,
			tungumal: tungumal,
			tegund: tegund
		}});
		Router.go('/admin');
	},
	'click .rembtn': function(event){
		event.preventDefault();
		var name = this.nafn;
		var r = confirm("Ertu viss um að þú viljir eyða " + name + "?");
		if (r == true) {
		    movieEvents.remove(this._id);
		    Router.go('/admin');
		} else {
		    
		}
		
	}
});