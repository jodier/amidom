/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / CNRS
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/

$AMIClass('DomTextCtrl', {
	/*---------------------------------------------------------------------*/

	$extends: ami.Control,

	/*---------------------------------------------------------------------*/

	$init: function(parent, owner)
	{
		this.$super.$init(parent, owner);
	},

	/*---------------------------------------------------------------------*/

	onReady: function()
	{
		return amiWebApp.loadResources([
			amiWebApp.originURL + '/controls/DomText/twig/DomTextCtrl.twig',
		], {context: this}).done(function(data) {

			this.fragmentDomTextCtrl = data[0];
		});
	},

	/*---------------------------------------------------------------------*/

	render: function(selector, title, subTitle, image, text)
	{
		var dict = {
			title: title || '???',
			subTitle: subTitle || '???',
			image: image || 'question',
			text: text || '???',
			dateTime: window.moment().format('DD MMM, HH:mm:ss'),
		};

		return amiWebApp.replaceHTML(selector, this.fragmentDomTextCtrl, {dict: dict});
	},

	/*---------------------------------------------------------------------*/

	refresh: function()
	{
		console.log('DomTextCtrl');
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
