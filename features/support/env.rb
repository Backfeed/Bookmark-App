require 'selenium-webdriver'
require 'rspec'

module HasBrowser
  print "\nSetting everything up..."

  setup_url = "http://#{ENV["SAUCE_USERNAME"]}:#{ENV["SAUCE_TOKEN"]}@ondemand.saucelabs.com:80/wd/hub"
  wait = Selenium::WebDriver::Wait.new(:timeout=>10)
  
  $driver = Selenium::WebDriver.for :remote, url: setup_url#, desired_capabilities: :chrome
  
  $driver.manage.timeouts.page_load = 30
  at_exit {$driver.quit}

  puts '......Complete!'

  print 'Loading Qrate up...'
  $driver.get 'http://qrate.backfeed.cc/'
  puts '...........Complete!'

  puts "\nSuccess!\n"
end

World(HasBrowser)