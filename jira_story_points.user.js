// ==UserScript==
// @name           JIRA Story Points
// @namespace      http://pesche.name
// @description    Counts the number of story points in a JIRA filter.
// @include        https://jira.liip.ch/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js
// ==/UserScript==

// debug/logging function
// if (unsafeWindow.console)
// {
// 	var GM_log = unsafeWindow.console.log;
// }

// check for story points column
var $label_sp = $("#issuetable th span:contains('Story Points')");

// if we have story points
if ($label_sp.length > 0)
{
	// count vars
	var sp_index = -1;
 	var sp_total = 0;

	// DOM shit
	var $headings = $('#issuetable th');

	// go get sp index
	// var $heading_sp = $label_sp.parent();
	// $heading_sp.index() did not work
	// tried many flavours, reverting to just looping over the elements
	// and getting the index in this fashion
	$headings.each(function(i) {
		var $sp = $(this).find("span:contains('Story Points')")
		if ($sp.length > 0)
		{
			sp_index = i;
		}
	});

	// index found
	if (sp_index > -1)
	{
		var $rows = $("#issuetable tbody tr");
		$rows.each(function(i) {
			var $sp_cell = $(this).find("td:eq(" + sp_index + ")");
			var sp_count = parseInt($sp_cell.html());
			if ( ! isNaN(sp_count))
			{
				sp_total += sp_count;
			}
		});
	}

	// display computed totals
	if (sp_total > 0)
	{
		var $results = $('.results-count');
		$results.append('Total <strong>' + sp_total + '</strong> story points.');
	}
}