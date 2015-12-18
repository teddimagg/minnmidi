Session.set('genreView', true);

if($(window).width() < 800)
{
	Session.set('genreView', false);
}

Template.nav.onRendered(function() {
	Session.set('sortType', 1);
	Session.set('genreType', "");
	Session.set('biohus', "");
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
		var bio = Session.get('biohus');
		var ret;
		switch(sort){
			case 0:
				if(bio == "")
				{
					ret = movieEvents.find({'tegund': {'$regex' : '.*' + gen + '.*'}},{sort:{nafn: 1}}).fetch();
				}
				else
				{
					ret = movieEvents.find({'tegund': {'$regex' : '.*' + gen + '.*'}, 'syningar.bio': bio},{sort:{nafn: 1}}).fetch();
				}
			break;
			case 1:
				if(bio == "")
				{
					ret = movieEvents.find({'tegund': {'$regex' : '.*' + gen + '.*'}}).fetch();
				}
				else
				{
					ret = movieEvents.find({'tegund': {'$regex' : '.*' + gen + '.*'}, 'syningar.bio': bio}).fetch();
				}
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
			var y = tomorrow.format(".YYYY");
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
			var tom = {dd:st,dn:tomorrow,y:y}
			week[i] = tom;
		}
		var y = today.format(".YYYY");
		today = today.format("DD.MM");
		var tod = {dd:'Í dag',dn:today,y:y};
		week[0] = tod;
		
		return week;
	},
	'isGenreView': function()
	{
		return Session.get('genreView');
	},
	'biohus': function()
	{
		return biohus.find().fetch();
	},
	'biogenre': function()
	{
		return biogenre.find().fetch();
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
		$(".biotegund button").removeClass("bactive");
		var genre = event.currentTarget.innerHTML;
		if(genre == Session.get('genreType'))
		{
			Session.set('genreType', "");
		}
		else
		{
			$("."+ this._id).addClass("bactive");
			Session.set('genreType', genre);
		}
	},
	'click .biodagur': function(event){		
		console.log(this.dn + this.y);
		//movieEvents.find({'syningar.timi': this}).fetch();
	},
	'click .biohus ul li': function(event){
		$('.biohus ul li').removeClass("active");
		var cur = Session.get('biohus');
		if(cur == this.nm)
		{	
			Session.set('biohus', "");
		}
		else
		{
			$("."+ this.nm).addClass("active");
			Session.set('biohus', this.nm);
		}
	}
});

function remSortClasses(){
	$(".byname").removeClass("active inactive");
	$(".bydate").removeClass("active inactive");
	$(".byaird").removeClass("active inactive");
}