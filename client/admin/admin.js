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
	}
})