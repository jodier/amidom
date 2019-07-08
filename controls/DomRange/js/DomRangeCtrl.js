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

$AMIClass('DomRangeCtrl', {
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
			amiWebApp.originURL + '/controls/DomRange/twig/DomRangeCtrl.twig',
		], {context: this}).done(function(data) {

			this.fragmentDomRangeCtrl = data[0];
		});
	},

	/*---------------------------------------------------------------------*/

	render: function(selector, title, min, max, step, value, image, text)
	{
		var dict = {
			title: title || '???',
			min: min || '0',
			max: max || '0',
			step: step || '0',
			value: value || '0',
			image: image || 'question',
			text: text || '???',
		};

		var that = this;

		return this.replaceHTML(selector, that.fragmentDomRangeCtrl, {dict: dict}).done(function() {

			$(that.patchId('#F5D2F029_12AC_1E5B_3FD6_B466587082DA')).change(function(e) {

				$(that.patchId('#C31E9D58_400D_7CF9_4CBF_D981A2DF2523')).text(e.currentTarget.value);
			});
		});
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
