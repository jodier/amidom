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

$AMIClass('DomDashboardApp', {
	/*---------------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*---------------------------------------------------------------------*/

	onReady: function(userdata)
	{
		var result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/DomDashboard/css/DomDashboardApp.css',
			'subapps/DomDashboard/twig/DomDashboardApp.twig',
			/**/
			amiWebApp.originURL + '/subapps/DomDashboard/js/web-animations.min.js',
			amiWebApp.originURL + '/subapps/DomDashboard/js/hammer.min.js',
			amiWebApp.originURL + '/subapps/DomDashboard/js/muuri.min.js',
		], {context: this}).done(function(data) {

			amiWebApp.replaceHTML('#ami_main_content', data[1], {context: this}).done(function() {

				result.resolve();
			});

		}).fail(function(data) {

			result.reject(data);
		});

		return result;
	},

	/*---------------------------------------------------------------------*/

	onExit: function()
	{
	},

	/*---------------------------------------------------------------------*/

	onLogin: function()
	{
		var dragSortOptions = {
		  action: 'swap',
		  threshold: 50
		};

		this.grid = new Muuri('.grid', {
		  dragEnabled: true,
		  dragStartPredicate: function (item, event) {
			// Prevent first item from being dragged. 
			if (grid.getItems().indexOf(item) === 0) {
			  return false;
			}
			// For other items use the default drag start predicate.
			return Muuri.ItemDrag.defaultStartPredicate(item, event);
		  },
		  dragSortPredicate: function (item) {
			var result = Muuri.ItemDrag.defaultSortPredicate(item, dragSortOptions);
			return result && result.index === 0 ? false : result;
		  }
		});
	},

	/*---------------------------------------------------------------------*/

	onLogout: function()
	{
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

var domDashboardApp = new DomDashboardApp();

/*-------------------------------------------------------------------------*/

