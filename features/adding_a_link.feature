Feature: Adding a link
	In order to contribute to the library
	As a Qrator
	I want to add links to the library

	When posting a link, I need to evaluate and tag it as well (metadata).

	Background:
		Given I'm logged in
		When I open the Add Link form

	Scenario: I submit a valid link
		Given link "example.com" doesn't exist in the library
		When I enter link "example.com" into the form
		And input metadata
		When I submit it
		Then it should be added to the library

	Scenario Outline: I input an invalid link
		When I enter an invalid url <url> into the form
		And I submit it
		Then it should notify me that: <reason>
		And it should not be added to the library

		# Anything else invalidates this?
		Examples:
		|url           |reason          |
		|"fasoijdvbkmb"|input is not url|
		|"            "|no input        |

	#Scenario: Lacking metadata