Feature: Adding a link
	In order to contribute to the library
	As a Qrator
	I want to add links to the library

	When posting a link, I need to evaluate and tag it as well.

	Background:
		Given I'm logged in
		When I open the Add Link form

	Scenario: I submit a valid link
		Given link "http://example.com" doesn't exist in the library
		When I enter link "http://example.com" into the form
		And give it a rating
		And add tags
		When I submit it
		Then it should be added to the library 