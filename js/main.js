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
			},
			'googlePlus' : {
				js : _.template( $('#tpl-googlePlus-js').text() ), // TODO: create this template
				html : _.template( $('#tpl-googlePlus-html').text() )
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
		$textLong = $('#text-long'),
		$charsLeft = $('#charsLeft'),
		$textShortArea = $('#text-short-area'),
		textShortMax = 118; // 140 chars - 22 char of shortened link

	function renderNetworkCode(networkString) {
		var networkItem = networks[networkString],
			codeHtmlText = $codeHtml.text(),
			codeJsText = $codeJs.text();

		codeHtmlText += networkItem.html(content);
		codeJsText += networkItem.js(content);

		$codeHtml.text(codeHtmlText);
		$codeJs.text(codeJsText);
	}

	function getData() {
		var $selectedNetworks = $('input[name=network]:checked'),
			numCharsLeft;
		content.networks = [];
		$selectedNetworks.each(function() {
			content.networks.push( $(this).val() );
		});

		content.url = encodeURI( $url.val() );
		content.shortMessage = encodeURI( $textShort.val() );
		content.longMessage = encodeURI( $textLong.val() );
		numCharsLeft = textShortMax - content.shortMessage.length;
		$charsLeft.text( numCharsLeft );
		if (numCharsLeft < 0) {
			$textShortArea.addClass('has-error');
		} else {
			$textShortArea.removeClass('has-error');
		}
	}

	function refresh() {
		getData();
		$codeHtml.text('');
		$codeJs.text('');
		_.each(content.networks, renderNetworkCode);
	}

	// Get data and update code when page first loads
	refresh();
	
	$('textarea, input').on('keyup change', function() {
		// TODO: Avoid running this code twice.
		refresh();
	});
});