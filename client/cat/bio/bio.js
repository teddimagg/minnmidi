Template.bio.helpers({
	'movieEvent': function()
	{
		return movieEvents.find().fetch();
	}
})