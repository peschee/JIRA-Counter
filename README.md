JIRA-Counter
============

Introduction
------------

This is a small [Greasemonkey](http://wiki.greasespot.net) script along with
the corresponding Chrome extension which parses, converts where necessary and
sums up values from certain columns shown in a JIRA filter.

Precisely, the script counts the totals across the values in the columns
**"Story Points"**, **"Estimated Hours"** and the **"Time Spent"** displayed
in a list of tickets in JIRA.

![Configure JIRA columns](https://github.com/peschehimself/JIRA-Counter/raw/master/img/configure_columns.png)

![Add JIRA columns](https://github.com/peschehimself/JIRA-Counter/raw/master/img/add_column.png)

![Display totals](https://github.com/peschehimself/JIRA-Counter/raw/master/img/totals.png)

Installation
------------

### Firefox ###

- Install the [Greasemonkey extension](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)
- Open the `jira-counter.user.js` userscript from within the browser (File → Open)
- Navigate to the list of issues in JIRA you want the values computed for
	- Do not forget to enable at least one of the appropriate columns if not
	  shown already (Story Points, Estimated Hours, Time Spent)

### Safari ###

- Install [Greasekit](http://8-p.info/greasekit/) to enable Greasemonkey scripts
  in webkit applications
- Setup the script and JIRA according to the instructions for Firefox

### Chrome ###

- Download `jira-counter_chrome.x.x.crx` extension from the list of downloads
- Open it in Chrome (File → Open) and follow the instructions to install


Caveats
-------

- As of now, the script only parses columns that are named properly. Consequently,
  the script will only work when your JIRA language setting is *English* and
  the columns are named *"Story Points"*, *"Estimated Hours"* or *"Time Spent"*

  Feel free to fork and change the column names and/or add settings for this.
