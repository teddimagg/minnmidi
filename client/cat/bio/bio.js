Session.set('genreView', true);
Session.set('sortType', 1);

if($(window).width() < 800)
{
	Session.set('genreView', false);
}

Template.nav.onRendered(function() {
  $(window).resize(function() {
  	if($(window).width() < 800)
  	{
  		Session.set('genreView', false);
  	}
  	else
  	{
  		Session.set('genreView', true);
  	}
  });
});

Template.bio.helpers({
	'movieEvent': function()
	{
		var sort = Session.get('sortType');
		var ret;
		switch(sort){
			case 0:
				ret = movieEvents.find({},{sort:{nafn: 1}});
				break;
			case 1:
				ret = movieEvents.find().fetch();
				break;
			case 2:
				sortString = "title: 1";
		}
		return ret;
	}
});

Template.filter.helpers({
	'getWeek': function()
	{
		var today = moment();
		var week = [];
		var vikan = ['Sunnudaginn','Mánudaginn','Þriðjudaginn','Miðvikudaginn','Fimmtudaginn','Föstudaginn','Laugardaginn'];
		for(i = 1; i < 7; i++)
		{
			var tomorrow = moment(today).add(i,'days');
			var st = '';
			if(i == 1)
			{
				st = 'Á morgun';
			}
			else
			{
				var dow = tomorrow.day();
				st = vikan[dow];
			}
			tomorrow = tomorrow.format("DD.MM");
			var tom = {dd:st,dn:tomorrow}
			week[i] = tom;
		}
		today = today.format("DD.MM");
		var tod = {dd:'Í dag',dn:today};
		week[0] = tod;
		
		return week;
	},
	'isGenreView': function()
	{
		return Session.get('genreView');
	}

});

Template.filter.events({
	'click .byname': function(event){
		Session.set('sortType', 0);
		remSortClasses();
		$(".byname").addClass("active");
		$(".bydate").addClass("inactive");
		$(".byaird").addClass("inactive");

	},
	'click .bydate': function(event){
		Session.set('sortType', 1);
		remSortClasses();
		$(".byname").addClass("inactive");
		$(".bydate").addClass("active");
		$(".byaird").addClass("inactive");
	},
	'click .byaird': function(event){
		Session.set('sortType', 2);
		remSortClasses();
		$(".byname").addClass("inactive");
		$(".bydate").addClass("inactive");
		$(".byaird").addClass("active");
	}
});

function remSortClasses(){
	$(".byname").removeClass("active inactive");
	$(".bydate").removeClass("active inactive");
	$(".byaird").removeClass("active inactive");
}