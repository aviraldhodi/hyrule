
# Hyrule — Complete Project Blueprint

  

## Overview

  

Hyrule is a local-first Salesforce operations platform running inside VS Code.

  

It combines:

  

* Salesforce CLI calls

* REST/SOAP/Tooling APIs

* Persistent sessions

* Browser UI

* Modular internal apps


## Apps 

1. Query Records
	1. Query Builder
		1. Object / Tooling Query
		2. Filters and Search on Objects and Fields (Reusable Component used : Filter Type Object, Field)
		3. UI Counts additional info like Help Texts Format etc.
		4. Filters
		5. Open Object in SF
		6. Download Mdt
		7. select all/ unselect all fields (current view)
		8. Filters
		9. Manual Query Editor
		10. AND/OR builder
		11. Field Funtions
		12. GROUP BY
		13. Having
		14. ID IN Support
		15. Composite Run support ID IN (long list/excel file)
		16. Include Deleted Records
	2. Results page
		1. Row Operations
			1. View/Edit Record - Update Page
			2. Clone
			3. Delete
			4. Turn Into Apex
			5. Select check box for operations
		2. Col Operations
			1. Filters + Search () + Reset (Reusable)
		3. Cell Operations
			1. View Record in SF
			2. View / Edit Record (Reusable + Shortcut Menu)
			3. Right Click Operations
				1. Copy Cell to Keyboard
				2. Copy Row to clipboard (Excel)
				3. Copy Row to clipboard (JSON)
				4. Copy Column to clipboard (Excel)
				5. Copy Column to clipboard (JSON)
				6. Copy Column to clipboard
				7. Copy Table to clipboard (Excel) 
				8. Copy Table to clipboard (JSON)
				9. Ctrl+Right Click to skip menu
			4. Table operations
				1. Download
				2. Copy to Clipboard
					1. Copy as CSV
					2. Copy as JSON
			5. Actions
				1. Bulk Update Records (Update filters page (Reusable) + Bulk Modes (Reusable))
				2. Create New Record (Create/Edit Page reusable)
				3. Selected Record Actions
					1. Delete Selected Records
					2. Restore records from Recycle Bin
					3. Convert selected records to Apex
					4. Open selected records in Salesforce
		4. Additional Info
			1. Showing n records 
			2. Pagination (+ View All)
	3. Query History
	4. Favorite Queries
2. Load Records
	1. Load Records do diff DML in diff modes 
		1. Object Selection (Reusable) [Filters etc.]
		2. File from PC
		3. DML - Inspert/Update/Upsert/Delete/Hard Delete
		4. Mapping Page
		5. Data Load Modes (Reusable for Bulk Updates for Query Editor)
	2. Create New Records (Reusable View/Edit Page)
	3. Update Records (Reusable View/Edit Page)
3. Manage Permissions 
	1. Permission Selection Page 
		1. Select Profiles
			1. Cached + Refresh
			2. Counts + Search + Info + Standard/Custom Profile
			3. Select All
		2.  Select Permission Sets
			1. Cached + Refresh
			2. Counts + Search + Info + Standard/Custom Profile
			3. Select All
		3.  Object Selection
			1. Object Selection Filter
			2. Cached + Refresh
			3. Counts + Search + Info + Standard/Custom Profile
			4. Select All
		4. Selection Stack
			1. Show what's been selected for what
			2. Option to copy stack
			3. Remove Items from stack
	2. Edit Permissions Page
		1. Object Permissions (Sub - App (Tab in App))
			1. Table Visualization 
				1. Object, Profile 1, Profile 2..n, Permission Set 1...n
					1. Filter for Objects (Reusable)
				2. Filter Input, Edit All (Row Operation), Col Operation Buttons (Select All, Unselect All, Refresh)
				3. Field 1, Edit Row, Check box, Check box, etc.
				4. Field 2, Edit Row, Check box, Check box, etc.
			2. Col Operations - Read/Create/Edit/Delete/View All/ Modify All/View All Fields
				1. Edit to current status shows modified color to highlight cell (color from color framework)
				2. Filter on each col. True/False
				3. Buttons for Select All, Unselect All, Refresh Col
			3. Row Operations
				1. On Click of Edit Row, popup to set Create/Read/Edit/Delete/View All/Modify All/View All Fields to Row
				2. Buttons - Apply to Row and Reset Row
			4. Cell Operations
				1. Checkbox for each row and col
		2. Tab Visibility (Sub - App (Tab in App) ) 
			1. Table Visualization 
				1. Object, Profile 1, Profile 2..n, Permission Set 1...n
					1. Filter for Objects (Reusable)
				2. Filter Input, Edit All (Row Operation), Col Operation Buttons (Select All, Unselect All, Refresh)
				3. Field 1, Edit Row, Check box, Check box, etc.
				4. Field 2, Edit Row, Check box, Check box, etc.
			2. Col Operations - Available/Visible
				1. Edit to current status shows modified color to highlight cell (color from color framework)
				2. Filter on each col. True/False
				3. Buttons for Select All, Unselect All, Refresh Col
			3. Row Operations
				1. On Click of Edit Row, popup to set 
				2. All/Modify All/View All Fields to Row
				3. Buttons - Apply to Row and Reset Row
				4. If no Tab, Button to Create
			4. Cell Operations
				1. Checkbox for each row and col
4. Deploy Metadata
5. Dev Tools
6.  Org Switcher
	1. Color grading (Framework)
	2. Org Info
7. App Tools
	1. Id Lookup 
		1. 15/18 digit Id
	2. User Search
		1. View/Edit Page (Reusable)
	3. Notifications
			1. App
			2. Background Jobs with Salesforce (Framework)
	4. Extension Level History 

Base UI

List Handling
Filter Handling

Treatment of UI component
Based on Hover/Filter/Additional Attributes/Desc etc.
