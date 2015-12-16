Meteor.methods({
		fetchFromService: function(name, year) {
			name = name.replace(/\s/g, "+");
			if(year === undefined)
			{
				year = "";
			}

			var url = "http://www.omdbapi.com/?t="+name+"&y="+year+"&plot=short&r=json";
			console.log(url);
			//synchronous GET
			var result = Meteor.http.get(url, {timeout:30000});
			if(result.statusCode==200) {
				var respJson = JSON.parse(result.content);
				console.log("response received.");
				return respJson;
			} else {
				console.log("Response issue: ", result.statusCode);
				var errorJson = JSON.parse(result.content);
				throw new Meteor.Error(result.statusCode, errorJson.error);
			}
		}
	});