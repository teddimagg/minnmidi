Session.set('genreView', true);

if($(window).width() < 800)
{
	Session.set('genreView', false);
}

Template.nav.onRendered(function() {
	Session.set('sortType', 1);
	Session.set('genreType', "");
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
		var gen = Session.get('genreType');
		var ret;
		switch(sort){
			case 0:
				ret = movieEvents.find({"tegund": {'$regex' : '.*' + gen + '.*'}},{sort:{nafn: 1}}).fetch();;
				break;
			case 1:
				ret = movieEvents.find({"tegund": {'$regex' : '.*' + gen + '.*'}}).fetch();
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
	},
	'click .biotegund button': function(event){
		var buttons = document.getElementsByClassName("gen");
		for(i = 0; i < buttons.length; i++)
		{
			buttons[i].style.backgroundColor = "#1a1d28";
		}
		var genre = event.currentTarget.innerHTML;
		if(genre == Session.get('genreType'))
		{
			Session.set('genreType', "");	
		}
		else
		{
			event.currentTarget.style.backgroundColor = "rgba(255,255,255,0.3)";
			Session.set('genreType', genre);
		}

	}
});

function remSortClasses(){
	$(".byname").removeClass("active inactive");
	$(".bydate").removeClass("active inactive");
	$(".byaird").removeClass("active inactive");
}