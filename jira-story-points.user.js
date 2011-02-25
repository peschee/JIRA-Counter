// ==UserScript==
// @name           JIRA Story Points
// @namespace      http://pesche.name
// @description    Counts the number of story points in a JIRA filter.
// @include        https://jira.liip.ch/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js
// @version        1.0.2
// @icon           http://f.cl.ly/items/122R0b1n3Q1w1j0A2o3S/text_list_numbers.png
// ==/UserScript==

// debug/logging function
// if (unsafeWindow.console)
// {
// 	var GM_log = unsafeWindow.console.log;
// }

// check for story points column
(function ($)
{
	// labels
	var label_sp     = 'Story Points';
	var label_est    = 'Original Estimate';
	var label_spent  = 'Story Points';

	// label elements
	var $label_sp    = $("#issuetable th span:contains('" + label_sp + "')");
	var $label_est   = $("#issuetable th span:contains('" + label_est + "')");
	var $label_spent = $("#issuetable th span:contains('" + label_spent + "')");

	// if we have story points
	if ($label_sp.length > 0)
	{
		// count vars
		var index_sp    = -1;
		var index_est   = -1;
		var index_spent = -1;

		// totals
	 	var total_sp    = 0;
		var total_est   = 0;
		var total_spent = 0;

		// DOM shit
		var $headings = $('#issuetable th');

		// go get column indices
		//
		// var $heading_sp = $label_sp.parent();
		// $heading_sp.index() did not work
		//
		// tried many flavours, reverting to just looping over the elements
		// and getting the index in this fashion
		$headings.each(function(i) {
			var $sp    = $(this).find("span:contains('" + label_sp + "')");
			var $est   = $(this).find("span:contains('" + label_est + "')");
			var $spent = $(this).find("span:contains('" + label_spent + "')");

			index_sp    = ($sp.length > 0) ? i : index_sp;
			index_est   = ($est.length > 0) ? i : index_est;
			index_spent = ($spent.length > 0) ? i : index_spent;
		});

		// story point index found
		if (index_sp > -1)
		{
			var $rows = $("#issuetable tbody tr");
			$rows.each(function(i) {
				var $sp_cell = $(this).find("td:eq(" + index_sp + ")");
				var sp_count = parseInt($sp_cell.html(), 10);
				if ( ! isNaN(sp_count))
				{
					total_sp += sp_count;
				}
			});
		}

		// display computed totals
		if (total_sp > 0)
		{
			var $results = $('.results-count');
			$results.append(' Total <strong>' + total_sp + '</strong> story points.');
		}

		// mapping from time periods (weeks, days, etc)
		// to the number of hours
		var unit_factors = {
			h: 1,
			d: 8,
			w: 5 * 8
		};

		// Loops over all rows converting the strange
		// week and day values at the given column index
		// to hours, returning the total.
		function get_total_hours(index)
		{
			var total = 0;
			var $rows = $("#issuetable tbody tr");

			$rows.each(function(i) {

				var $est_cell = $(this).find("td:eq(" + index + ")");
				var value = $est_cell.html();

				if (value !== '')
				{
					var re = /(\d+)\s{1}(\w+)/;
					var parts = value.split(',');

					// loop through times
					for (var j = 0; j < parts.length; j++)
					{
						var part = parts[j];

						if (re.test(part))
						{
							var items = part.match(re);
							var count = parseInt(items[1], 10);
							var unit  = items[2].charAt(0);

							var hours = count * unit_factors[unit];
							total += hours;
						}
					}
				}
			});

			return total;
		}

		// original estimate index found
		if (index_est > -1)
		{
			var total_est = get_total_hours(index_est);

			if (total_est > 0)
			{
				var $results = $('.results-count');
				$results.append(' Total <strong>' + total_est + '</strong> hours estimated.');
			}
		}

		// time spent index found
		if (index_spent > -1)
		{
			var total_spent = get_total_hours(index_spent);

			if (total_spent > 0)
			{
				var $results = $('.results-count');
				$results.append(' Total <strong>' + total_est + '</strong> hours spent.');
			}
		}

	}

})(jQuery);