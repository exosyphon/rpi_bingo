source 'https://rubygems.org'

ruby '2.0.0'

gem 'rails', '~> 4.0.0'

gem 'thin'
gem 'websocket-rails', git: 'git://github.com/DanKnox/websocket-rails.git'

group :assets do
  gem 'sass-rails',   '~> 4.0.0'
  gem "therubyracer"
  gem 'uglifier', '>= 1.0.3'
  gem 'coffee-rails', '~> 4.0.0'
end

group :development do
  gem 'tilt'
end

gem 'jquery-rails'

group :development do
  gem 'sqlite3'
end

group :production do
  gem 'pg', '0.17.1'
  gem 'rails_12factor', '0.0.2'
end