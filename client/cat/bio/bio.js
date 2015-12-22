Session.set('genreView', true);

if($(window).width() < 800)
{
	Session.set('genreView', false);
}

Template.nav.onRendered(function() {
	Session.set('sortType', 1);
	Session.set('genreType', "");
	Session.set('biohus', "");
	Session.set('biodagur', "");
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
		var dagur = Session.get('biodagur');
		var ret;
		switch(sort){
			case 0:
				if(dagur == "")
				{
					if(bio == "")
					{
						ret = movieEvents.find({'tegund': {'$regex' : '.*' + gen + '.*'}},{sort:{nafn: 1}}).fetch();
					}
					else
					{
						ret = movieEvents.find({'tegund': {'$regex' : '.*' + gen + '.*'}, 'syningar.bio': bio},{sort:{nafn: 1}}).fetch();
					}
				}
				else
				{
					if(bio == "")
					{
						ret = movieEvents.find({'tegund': {'$regex' : '.*' + gen + '.*'}, 'syningar.time': {'$regex' : '.*' + dagur + '.*'}},{sort:{nafn: 1}}).fetch();
					}
					else
					{
						ret = movieEvents.find({'tegund': {'$regex' : '.*' + gen + '.*'}, 'syningar.time': {'$regex' : '.*' + dagur + '.*'}, 'syningar.bio': bio},{sort:{nafn: 1}}).fetch();
					}
				}
			break;
			case 1:
				if(dagur == "")
				{
					if(bio == "")
					{
						ret = movieEvents.find({'tegund': {'$regex' : '.*' + gen + '.*'}}).fetch();
					}
					else
					{
						ret = movieEvents.find({'tegund': {'$regex' : '.*' + gen + '.*'}, 'syningar.bio': bio}).fetch();
					}
				}
				else
				{
					if(bio == "")
					{
						ret = movieEvents.find({'tegund': {'$regex' : '.*' + gen + '.*'}, 'syningar.time': {'$regex' : '.*' + dagur + '.*'}}).fetch();
					}
					else
					{
						ret = movieEvents.find({'tegund': {'$regex' : '.*' + gen + '.*'}, 'syningar.time': {'$regex' : '.*' + dagur + '.*'}, 'syningar.bio': bio}).fetch();
					}
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
			var tom = {c:i,dd:st,dn:tomorrow,y:y};
			week[i] = tom;
		}
		var y = today.format(".YYYY");
		today = today.format("DD.MM");
		var tod = {c:'0',dd:'Í dag',dn:today,y:y};
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
	'click .biodags ul li': function(event){		
		$('.biodags ul li').removeClass("active");
		var cur = Session.get('biodagur');
		if(cur == (this.dn + this.y))
		{
			Session.set('biodagur', "");
		}
		else
		{
			$("." + this.c).addClass("active");
			Session.set('biodagur', this.dn + this.y);
		}
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