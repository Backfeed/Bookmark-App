Feature: Adding a link
	In order to contribute to the library
	As a Qrator
	I want to add links to the library

	I need to also evaluate and tag a link when I post it. 

	Background:
		Given I'm logged into Qrate
		When I open the Add Link form

	Scenario: I submit a valid link
		Given "http://example.com" doesn't exist in the library
		When I enter link "http://example.com" into the form
		And give it a rating and tags
		When I submit it
		Then it should be added to the library 