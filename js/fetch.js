/*
	Simple fetches the Store,
	the reason this is a separate module is to
	help keep the expanability of the features
	@author ksdme
*/
var ProfileStoreUrl = "http://127.0.0.1:8000/store.json"

var Fetch = (function(){

	return {
		all: function(callback, url) {
			if (!url)
				url = ProfileStoreUrl

			/* callback(success_or_undefined) */
			$.ajax({
				url: url,
				async: true,
				dataType: 'json',

				error: function() {
					callback()
				},

				success: callback
			})
		}
	}

})()
