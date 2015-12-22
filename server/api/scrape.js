Meteor.startup(function(){
	var cheerio = Meteor.npmRequire('cheerio');

	Meteor.methods({
		scrape: function() {
			result = Meteor.http.get("http://www.laugarasbio.is/?p=listing&show=showing&mode=posters");
	        $ = cheerio.load(result.content);
	        
	        //var body = $('div.posters > div:nth-child(n) > div > div.lowerHalf > a > h2').text();
	        var body = $('div.posters > div:nth-child(n) > div > div.lowerHalf > a > h2').text();
	        var count = body.split('...').length - 1; //Fjöldi mynda í dag hjá laugarásbíó.

	        var movies = [];
	        for(i = 2; i < count + 2; i++)
	        {
	        	var path = 'div.posters > div:nth-child(' + i + ') > div > div.upperHalf > div.left > div.title > a'
	        	var title = $(path).text();
	        	movies.push(title);
	        }
        	
	        return movies;
		},
		trailer: function(name) {
			name = name.split(' ').join('+');
			url = 'https://www.youtube.com/results?search_query=' + name + '+trailer'
			console.log(url);
			result = Meteor.http.get(url);
	        $ = cheerio.load(result.content);

	        var a = $('.yt-thumb-simple').html();
	        a = a.substring(27);
	        a = a.slice(0, -48);
	        console.log(a);
	        return a;
		}
	})
});

/**
var s = $('div.posters > div:nth-child(3)').html();
s = s.substring(0, s.indexOf('">'));
s = s.split("id=").pop();
**/
