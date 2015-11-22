Given(/^I'm logged in$/) do
	begin
		$driver.find_element(:class, "profile")
	rescue Selenium::WebDriver::Error::NoSuchElementError
		$driver.find_element(:css, 'button[ng-click="ctrl.login()"').click

    email = $driver.find_element(:css, 'input[type="email"]')
    password = $driver.find_element(:css, 'input[type="password"]')
    sign_in = $driver.find_element(:css, 'button[ng-click="ctrl.signin()"')

    email.send_keys "PLACEHOLDER"
    password.send_keys "PLACEHOLDER"
    sign_in.click
  end
end

When(/^I open the Add Link form$/) do
  $driver.find_element(:css, 'button[ng-click="ctrl.openAddLinkModal()"').click

  @@url_field = $driver.find_element(:css, 'input[type="url"]')
  @@tag_field = $driver.find_element(:css, 'input[type="text"]')
end

Given(/^link "([^"]*)" doesn't exist in the library$/) do |arg1|
  pending "need testing environment"
end

When(/^I enter(?: an?)?(?: invalid)? (?:url|link) "([^"]*)" into the form$/) do |url|
  @@url_field.send_keys(url)
end

When(/^(?:I )?give it a rating(?: of ([1-5])(?: stars?)?)?$/) do |stars|
  stars = 3 if stars === nil

  $driver.find_element("li.star:nth-child(#{stars.to_i})").click
end

When(/^(?:I )?add tags?(?: (["'][^'"]*["']))?$/) do |tags|
  tags = tags.split(/, ?/)
  pending "Input tags to form"
end

When(/^(?:I )?input metadata$/) do
  step "give it a rating of 3"
  step 'add tag "butts"'
end

When(/^I submit it$/) do
  $driver.find_element(:css, "div.modal-footer > button").click
end

Then(/^it should notify me that: (.*)$/) do
  pending "Find out how to read material design notifications"
end

Then(/^it (should|should not) be added to the library$/) do |b|
  pending "Need access to database or way to immediately see my new link"
end

After do |scenario|
  pending "Find out how to closes the modal (JavaScript?)"
end