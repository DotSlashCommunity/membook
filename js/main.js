/*
	the mainjs file for the app,
	It actually bridges the gap between sytuff
	@author ksdme
*/
var ProfileTemplates;

var ProfilesContainerMap = {
	core: {
		sel: "#core-team-container",
		beforeInsert: function() {
			$("#core-team-label").show()
		}
	},
	
	community: {
		sel: "#members-container",
		beforeInsert: function() {
			$("#members-label").show()
		}
	}
}

function buildTemplates() {
	ProfileTemplates = Pseudo.fromGroup("#profile-card")
}

function buildCard(member) {
	/* to avoid reflecting hacks */
	member = jQuery.extend(true, {}, member);

	var socialUrlHTML = "";
	for (var nmType in member.profile_social) {
		
		/*
			you need build a params
			dictionary from a dynamic var
		*/
		var params = {}
		params[nmType] = member.profile_social[nmType]

		socialUrlHTML += ProfileTemplates[nmType].render(params)
	}

	/* avoid possible side effects */
	delete member.profile_social

	/*
		render out the base profile along with
		the the social links HTML
	*/
	return ProfileTemplates.base_profile.render(
		jQuery.extend({
			profile_social_links: socialUrlHTML
		}, member)
	)
}

/* render an entire community */
function buildCommunity(community) {
	for (var listType in community) {
		var subCommunityMembers = community[listType].members
		var subCommunityHTML = ""
		
		for (var member in subCommunityMembers) {
			subCommunityHTML += buildCard(subCommunityMembers[member])
		}

		if (subCommunityHTML === "")
			continue

		/* init containers to accept */
		var htmlContainerRoute = ProfilesContainerMap[listType]
		htmlContainerRoute.beforeInsert()

		var htmlContainer = $(htmlContainerRoute.sel)
		htmlContainer.html(htmlContainer.html()+subCommunityHTML)
	}
}

$(function() {
	buildTemplates();

	Fetch.all(function(community) {
		buildCommunity(community)
	})
}) 
