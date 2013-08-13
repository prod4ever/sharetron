$(function() {
	"use strict";
	var networks = {
		'facebook' : {
			js : {
				string : 'Facebook JS: <%= url %>',
				template : function() {}
			},
			html : {
				string : 'Facebook HTML: <%= url %>',
				template : function() {}
			}
		},
		'twitter' : {
			js : {
				string : 'Twitter JS: <%= url %>',
				template : function() {}
			},
			html : {
				string : 'Twitter HTML: <%= url %>',
				template : function() {}
			}
		},
		'email' : {
			js : {
				string : '',
				template : function() {}
			},
			html : {
				string : '<a href="mailto:?subject=<%- shortMessage %>&body=<%- longMessage %>\n\n<%= url %>">Email</a>',
				template : function() {}
			}
		}
	},
	content = {
		networks : [],
		url : '',
		shortMessage : '',
		longMessage : ''
	};

	function initNetwork(networkItem) {
		// Create templates for JavaScript and HTML.
		networkItem.js.template = _.template(networkItem.js.string);
		networkItem.html.template = _.template(networkItem.html.string);
		console.log(networkItem.html.template({
			url : "http://www.google.com/",
			shortMessage : "Hello!",
			longMessage : "Hello everyone!"
		}));
	}

	_.each(networks, initNetwork);

	// networks.facebook.js.template = _.template(networks.facebook.js.string);
	// console.log(networks.facebook.js.template({url : "ryan"}) );
});