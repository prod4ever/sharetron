$(function() {
	"use strict";
	var networks = {
		'facebook' : {
			js : _.template( $('#tpl-fb-js').text() ), // TODO: create this template
			html : _.template( $('#tpl-fb-html').text() )
		},
		'twitter' : {
			js : _.template( $('#tpl-twitter-js').text() ),
			html : _.template( $('#tpl-twitter-html').text() )
		},
		'email' : {
			js : function () { return ''; }, // No JS for email
			html : _.template( $('#tpl-email-html').text() )
		}
	},
	content = {
		networks : [],
		url : 'http://www.google.com/',
		shortMessage : 'Hello!',
		longMessage : 'Hello, everyone!'
	};

	function outputCode(networkItem) {
		var $codeHtml = $('#code-html'),
			$codeJs = $('#code-js'),
			codeHtmlText = $codeHtml.text(),
			codeJsText = $codeJs.text();

		codeHtmlText += networkItem.html(content);
		codeJsText += networkItem.js(content);

		$codeHtml.text(codeHtmlText);
		$codeJs.text(codeJsText);
	}

	// Render
	$('#code-js').text('');
	$('#code-html').text('');
	_.each(networks, outputCode);

	// networks.facebook.js.template = _.template(networks.facebook.js.string);
	// console.log(networks.facebook.js.template({url : "ryan"}) );
});