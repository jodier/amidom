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

$AMIClass('UserDashboardApp', {
	/*---------------------------------------------------------------------*/

	$extends: ami.SubApp,

	/*---------------------------------------------------------------------*/

	onReady: function(userdata)
	{
		var result = $.Deferred();

		amiWebApp.loadResources([
			'subapps/UserDashboard/css/UserDashboardApp.css',
			'subapps/UserDashboard/twig/UserDashboardApp.twig',
			/**/
			amiWebApp.originURL + '/js/3rd-party/jquery-ui.min.js',
			/**/
			amiWebApp.originURL + '/subapps/UserDashboard/js/gridstack.min.css',
			amiWebApp.originURL + '/subapps/UserDashboard/js/gridstack.all.js',
		]).done((data) => {

			amiWebApp.replaceHTML('#ami_main_content', data[1]).done(() => {

				/*---------------------------------------------------------*/

				const opts = {
					float: true,
					cellHeight: 36,
					verticalMargin: 12,
					width: 12,
				};

				this.grid = $('#F251696F_D42E_F7FF_86F7_2E6B4F2E8F74').gridstack(opts).data('gridstack');

				this.cnt = 0;

				/*---------------------------------------------------------*/

				$('#ADADA8BA_794E_4AA3_BE47_E214554931FC').click(() => {

					this.addWidget();
				});

				$('#BC0C838B_4E57_5E35_C76D_923F8B5B98D7').click(() => {

					this.refresh();
				});

				/*---------------------------------------------------------*/

				result.resolve();
			});

		}).fail((data) => {

			result.reject(data);
		});

		return result;
	},
	/*---------------------------------------------------------------------*/

	onLogin: function()
	{
		this.refresh();
	},

	/*---------------------------------------------------------------------*/

	_refresh: function(result, rows)
	{
		if(rows.length === 0)
		{
			return result.resolve();
		}

		/*-----------------------------------------------------------------*/

		const row = rows.shift();

		/*-----------------------------------------------------------------*/

		var control = amiWebApp.jspath('..field{.@name==="control"}.$', row)[0] || '';
		var params = amiWebApp.jspath('..field{.@name==="params"}.$', row)[0] || '';
		var x = amiWebApp.jspath('..field{.@name==="x"}.$', row)[0] || '';
		var y = amiWebApp.jspath('..field{.@name==="y"}.$', row)[0] || '';
		var width = amiWebApp.jspath('..field{.@name==="width"}.$', row)[0] || '';
		var height = amiWebApp.jspath('..field{.@name==="height"}.$', row)[0] || '';

		/*-----------------------------------------------------------------*/

		var id = 'EB4DF671_2C31_BED0_6BED_44790525F28F_' + (this.cnt++);

		this.grid.addWidget($('<div><div class="grid-stack-item-content" id="' + id + '"></div></div>'), x, y, width, height).promise().done(() => {

			amiWebApp.createControl(this, this, control, ['#' + id].concat(JSON.parse(params)), {}).done(() => {

				this._refresh(result, rows);

			}).fail((message) => {

				result.reject(message);
			});
		});

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	refresh: function()
	{
		amiWebApp.lock();

		var result = $.Deferred();

		amiCommand.execute('GetDashboardInfo').done((data) => {

			$('#F251696F_D42E_F7FF_86F7_2E6B4F2E8F74').find('div').remove();

			this._refresh(result, amiWebApp.jspath('..row', data));

			result.done(() => {

				amiWebApp.unlock();

			}).fail((message) => {

				amiWebApp.error(message);
			});

		}).fail((data, message) => {

			amiWebApp.error(message);
		});

		return result;
	},

	/*---------------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
/* GLOBAL INSTANCE                                                         */
/*-------------------------------------------------------------------------*/

var userDashboardApp = new UserDashboardApp();

/*-------------------------------------------------------------------------*/
