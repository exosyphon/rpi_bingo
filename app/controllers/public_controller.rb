class PublicController < ApplicationController
  VOCABULARY = [
      'java', 'ummm', 'ruby', 'array', 'string',
      'spring', 'stuff', 'rails', 'count', 'tuple',
      'orm', 'well', 'thing', 'experience', 'rpi',
      'haskell', 'pairing', 'years', 'sad', 'enjoy',
      'go', 'people', 'like', 'happy', 'dislike',
      'active record', 'python', 'angularjs', 'programming',
      'iterate', 'container', 'database', 'postgres',
      'javascript', 'pivotal', 'ATHN', 'competitive',
  ]

  def index
    @options = VOCABULARY.sample(25)
  end
end