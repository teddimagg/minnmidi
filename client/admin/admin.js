Template.admin.events({
	'click .addbtn': function(event)
	{
		event.preventDefault();
		var nafn = $('[name="nafn"]').val();
		var mynd = $('[name="mynd"]').val();
		var lysing = $('[name="lysing"]').val();
		var trailer = $('[name="trailer"]').val();
		var lengd = $('[name="lengd"]').val();
		var tungumal = $('[name="tungumal"]').val();
		var tegund = $('[name="tegund"]').val();
		var leikarar = $('[name="leikarar"]').val();
		var leikstjori = $('[name="leikstjori"]').val();

		movieEvents.insert({
			nafn: nafn,
			mynd: mynd,
			lysing: lysing,
			trailer: trailer,
			lengd: lengd,
			tungumal: tungumal,
			tegund: tegund,
			leikarar: leikarar,
			lekstjori: leikstjori
		});
		Router.go('/bio');
	},
	'click .autobtn': function(event)
	{
		event.preventDefault();
		var name = $('[name="nafn"]').val();
		var year = $('[name="year"]').val();
		Meteor.call('fetchFromService', name, year, function(err, respJson) {
			if(err) {
				window.alert("Error: " + err.reason);
				console.log("error occured on receiving data on server. ", err );
			} else {
				event.preventDefault();
				$('[name="nafn"]').val(respJson.Title);
				$('[name="mynd"]').val(respJson.Poster);
				$('[name="lysing"]').val(respJson.Plot);
				$('[name="lengd"]').val(respJson.Runtime);
				$('[name="leikarar"]').val(respJson.Actors);
				$('[name="leikstjori"]').val(respJson.Director);
				var genres = respJson.Genre.split(",");
				for(i = 0; i < genres.length;  i++)
				{
					genres[i] = genres[i].trim();
					genres[i] = genreTrans(genres[i]);
				}
				$('[name="tegund"]').val(genres);
			}
		});
	}
});

function genreTrans(genre)
{
	switch(genre){
		case "Adventure":
			genre = "Ævintýra";
			break;
		case "Action":
			genre = "Hasar";
			break;
		case "Comedy":
			genre = "Gaman";
			break;		
		case "Animation":
			genre = "Teikni";
			break;
		case "Horror":
			genre = "Hryllings";
			break;
		case "Thriller":
			genre = "Spennu";
			break;
	}

	return genre;
}

Template.admin.helpers({
	'movieEvents': function()
	{
		return movieEvents.find().fetch();
	},
	'getYear': function()
	{
		var date = new Date();
		var year = moment(date).format("YYYY");
		return year;
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
		var leikarar = $('[name="leikarar"]').val();
		var leikstjori = $('[name="leikstjori"]').val();
		movieEvents.update(this._id, { $set:{
			nafn: nafn,
			mynd: mynd,
			lysing: lysing,
			trailer: trailer,
			lengd: lengd,
			tungumal: tungumal,
			tegund: tegund,
			leikarar: leikarar,
			lekstjori: leikstjori
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
	},
	'click .addTime': function(event){
		var m = moment("2015-12-18 19:50");
		m = m.format("DD.MM.YYYY HH:mm");
		var syning = {time: m, bio: "laugaras"};
		movieEvents.update(this._id, { $push:{
			syningar: syning
		}});
		console.log(this.nafn);
	}
});