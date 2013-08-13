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
		},
		$codeHtml = $('#code-html'),
		$codeJs = $('#code-js'),
		$url = $('#url'),
		$textShort = $('#text-short'),
		$textLong = $('#text-long');

	function renderNetworkCode(networkItem) {
		var codeHtmlText = $codeHtml.text(),
			codeJsText = $codeJs.text();

		codeHtmlText += networkItem.html(content);
		codeJsText += networkItem.js(content);

		$codeHtml.text(codeHtmlText);
		$codeJs.text(codeJsText);
	}

	function updateCode() {
		$codeHtml.text('');
		$codeJs.text('');
		_.each(networks, renderNetworkCode);
	}

	function getData() {
		// TODO: URL encode
		content.url = $url.val();
		content.shortMessage = $textShort.val();
		content.longMessage = $textLong.val();
	}

	// Get data and update code when page first loads
	getData();
	updateCode();
	
	$('input, textarea').on('keyup', function() {
		getData();
		updateCode();
	});

	// networks.facebook.js.template = _.template(networks.facebook.js.string);
	// console.log(networks.facebook.js.template({url : "ryan"}) );
});