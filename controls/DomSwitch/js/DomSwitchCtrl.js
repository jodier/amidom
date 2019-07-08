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

$AMIClass('DomSwitchCtrl', {
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
			amiWebApp.originURL + '/controls/DomSwitch/twig/DomSwitchCtrl.twig',
		], {context: this}).done(function(data) {

			this.fragmentDomSwitchCtrl = data[0];
		});
	},

	/*---------------------------------------------------------------------*/

	render: function(selector, title, state, image, text)
	{
		var dict = {
			title: title || '???',
			state: state || false,
			image: image || 'question',
			text: text || '???',
		};

		var that = this;

		return this.replaceHTML(selector, this.fragmentDomSwitchCtrl, {dict: dict}).done(function() {

			$(that.patchId('#FD9E5D77_B30C_082A_A3DE_07C8DB8ED4A6')).change(function(e) {

				$(that.patchId('#C4A7C26B_5438_ACD6_78AF_7502D3267245')).text($(e.currentTarget).prop('checked') ? 'On' : 'Off');
			});
		});
	},

	/*---------------------------------------------------------------------*/

	refresh: function()
	{
		console.log('DomSwitchCtrl');
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
