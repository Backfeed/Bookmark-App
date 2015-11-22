require 'selenium-webdriver'
require 'rspec'
include RSpec::Matchers

module HasBrowser
  print "\nSetting everything up..."

  wait = Selenium::WebDriver::Wait.new(:timeout=>10)
  
  begin
  	$driver = Selenium::WebDriver.for :remote, :url => "http://localhost:9515"
  rescue Exception => e
    puts e
  	puts "\n\nDid you forget to run Chromedriver again?"
  	puts "Go. Don't let me catch you make mistakes like that again."
    puts "(Psst, it's in the support folder)"
  	exit
  end
  
  $driver.manage.timeouts.page_load = 30
  at_exit {$driver.quit}

  puts '......Complete!'

  print 'Loading Qrate up...'
  $driver.get 'http://qrate.backfeed.cc/'
  puts '...........Complete!'

  puts "\nSuccess!\n"
end

World(HasBrowser)
