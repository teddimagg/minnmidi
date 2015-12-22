Template.bioevent.onRendered(function() {
	Session.set('biocont1', 0);
});

Template.bioevent.events({
	'click .biolys': function(event)
	{		
		$('.bioeventright ul li').removeClass("active");
		$('.biolys').addClass("active");
		Session.set('biocont1', 0);
	},
	'click .biotrail': function(event)
	{
		$('.bioeventright ul li').removeClass("active");
		$('.biotrail').addClass("active");
		Session.set('biocont1', 1);
	}
});

Template.bioevent.helpers({
	'desc': function()
	{
		return Session.get('biocont1');
	},
	'biohus': function()
	{
		return biohus.find().fetch();
	}
});