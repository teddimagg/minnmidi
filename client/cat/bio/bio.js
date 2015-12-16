Template.bio.helpers({
	'movieEvent': function()
	{
		return movieEvents.find().fetch();
	},
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
});