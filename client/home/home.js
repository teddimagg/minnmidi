Template.home.events({
    'click .lauga': function(event)
    {
        Meteor.call('scrape', function (error, result) {
            if (error) {
                console.log("error", error);
            };
            Session.set('bio', result);
        });
        var smegma = Session.get('bio');

        console.log(smegma);
    }
});

/**
 *
 *         var movies = [];

        var s = smegma.length;
        console.log(smegma.length);

        for(i = 0; i < s; i++){
            console.log(smegma[i]);
            Meteor.call('fetchFromService', smegma[i], function(err, respJson) {
                if(err) {
                    window.alert("Error: " + err.reason);
                    console.log("error occured on receiving data on server. ", err );
                } else {
                    event.preventDefault();
                    Session.set('movie', respJson);
                }
            });
            var mov = Session.get('movie');
            var movie = {
                title: mov.Title,
                rate: mov.Rated,
                time: mov.Runtime,
                dir: mov.Director,
                gen: mov.Genre,
                lang: mov.Language,
                post: mov.Poster,
                act: mov.Actors,
                wri: mov.Writers,
                rat: mov.imdbRating
            }
            movies[i] = movie;
        }

        console.log(movies);
 *
 */