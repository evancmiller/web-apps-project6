class Catalog < ApplicationRecord
    has_many(:plans)
    has_many :catalog_courses
    has_many :courses, through: :catalog_courses
    has_many :requirements
    has_many :categories, through: :requirements
end
