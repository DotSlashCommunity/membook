/*
	@author ksdme
	Pseudo is yet another JS Templating Engine
*/

var Template = (function() {

	return {
		fromGroup: function(groupSel) {
			var tempGroup = {}
			groupSel = $(groupSel).children().toArray()
			for(var elm in groupSel) {
				elm = groupSel[elm]
				tempGroup[elm.getAttribute("id")] = Template.from(elm)
			}

			return tempGroup
		},

		from: function(sel, muliple) {
			var templStr = $(sel).html()
			
			/*
				function that actually does
			   	the replacement
			*/
			var templRepl = function(payload, what, wyth) {
				what = "{{"+what+"}}"
				return payload.replace(what, wyth)
			};
			
			/* 
				If the string had multiple
				instances of a 'what' in it
			*/
			if(!muliple)
				templRepl = function(payload, what, wyth) {
					what = "{{"+what+"}}"
					return payload.replace(new RegExp(what, "g"), wyth)
				} 

			return {
				render: function(map) {
					templStrCpy = new String(templStr)
					for(var key in map) {
						templStrCpy = templRepl(templStrCpy, key, map[key])
					}

					return templStrCpy
				},

				renderTo: function(toSel, map) {
					toSel = $(toSel)
					toSel.html(toSel.html()+this.render(map))
				},

				raw: new String(templStr)
			}
		}
	}

})();

$(function() {
	ProfileTemplates = Template.fromGroup("#profile-card")
	ProfileTemplates.base_profile.renderTo("#members-section", {
		profile_avatar_url: "ksdme.jpg",
		profile_name: "Prashant Singh",
		social_links: ProfileTemplates.medium_url.render({
			profile_medium_url: "medium.com/@ksdme"
		})
	})
})
