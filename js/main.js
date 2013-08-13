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
			url : '',
			shortMessage : '',
			longMessage : ''
		},
		$codeHtml = $('#code-html'),
		$codeJs = $('#code-js'),
		$url = $('#url'),
		$textShort = $('#text-short'),
		$textLong = $('#text-long');

	function renderNetworkCode(networkString) {
		var networkItem = networks[networkString],
			codeHtmlText = $codeHtml.text(),
			codeJsText = $codeJs.text();

		codeHtmlText += networkItem.html(content);
		codeJsText += networkItem.js(content);

		$codeHtml.text(codeHtmlText);
		$codeJs.text(codeJsText);
	}

	function updateCode() {
		$codeHtml.text('');
		$codeJs.text('');
		_.each(content.networks, renderNetworkCode);
	}

	function getData() {
		var $selectedNetworks = $('input[name=network]:checked');
		content.networks = [];
		$selectedNetworks.each(function() {
			content.networks.push( $(this).val() );
		});

		content.url = encodeURI( $url.val() );
		content.shortMessage = encodeURI( $textShort.val() );
		content.longMessage = encodeURI( $textLong.val() );
	}

	// Get data and update code when page first loads
	getData();
	updateCode();
	
	$('input, textarea').on('keyup change', function() {
		getData();
		updateCode();
	});

	// networks.facebook.js.template = _.template(networks.facebook.js.string);
	// console.log(networks.facebook.js.template({url : "ryan"}) );
});