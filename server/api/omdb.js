Meteor.methods({
		fetchFromService: function(name) {
			name = name.replace(/\s/g, "+");
			var url = "http://www.omdbapi.com/?t="+name+"&y=&plot=short&r=json";
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