# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
course0 = Course.new
course0.name = "C++ Programming"
course0.designator = "CS-1210"
course0.description = "How to code"
course0.credits = 2
course0.save!

course1 = Course.new
course1.name = "Object-Oriented Design with C++"
course1.designator = "CS-1220"
course1.description = "Advanced coding"
course1.credits = 3
course1.save!

course2 = Course.new
course2.name = "Data Structures Using Java"
course2.designator = "CS-2210"
course2.description = "Coffee not included"
course2.credits = 3
course2.save!

course3 = Course.new
course3.name = "Operating Systems"
course3.designator = "CS-3310"
course3.description = "How computers work"
course3.credits = 3
course3.save!

course4 = Course.new
course4.name = "Foundations of Computer Security"
course4.designator = "CS-3350"
course4.description = "How Windows Defender works"
course4.credits = 3
course4.save!

course5 = Course.new
course5.name = "Chemistry for Engineers"
course5.designator = "CHEM-1050"
course5.description = "Why do we take this?"
course5.credits = 4
course5.save!

course6 = Course.new
course6.name = "Calculus I"
course6.designator = "MATH-1710"
course6.description = "Math"
course6.credits = 5
course6.save!

course7 = Course.new
course7.name = "Calculus II"
course7.designator = "MATH-1720"
course7.description = "Advanced math"
course7.credits = 5
course7.save!

course8 = Course.new
course8.name = "General Physics I"
course8.designator = "PHYS-2110"
course8.description = "Gravity and mass"
course8.credits = 4
course8.save!

course9 = Course.new
course9.name = "General Physics II"
course9.designator = "PHYS-2120"
course9.description = "Electricity"
course9.credits = 4
course9.save!

catalog0 = Catalog.new
catalog0.year = 2018
catalog0.save!

catalog1 = Catalog.new
catalog1.year = 2019
catalog1.save!

catalog2 = Catalog.new
catalog2.year = 2020
catalog2.save!

catalog3 = Catalog.new
catalog3.year = 2021
catalog3.save!

catalogCourse0 = CatalogCourse.new
catalogCourse0.catalog_id = catalog0.id
catalogCourse0.course_id = course0.id
catalogCourse0.save!

catalogCourse1 = CatalogCourse.new
catalogCourse1.catalog_id = catalog0.id
catalogCourse1.course_id = course1.id
catalogCourse1.save!

catalogCourse2 = CatalogCourse.new
catalogCourse2.catalog_id = catalog0.id
catalogCourse2.course_id = course2.id
catalogCourse2.save!

catalogCourse3 = CatalogCourse.new
catalogCourse3.catalog_id = catalog0.id
catalogCourse3.course_id = course3.id
catalogCourse3.save!

catalogCourse4 = CatalogCourse.new
catalogCourse4.catalog_id = catalog0.id
catalogCourse4.course_id = course4.id
catalogCourse4.save!

catalogCourse5 = CatalogCourse.new
catalogCourse5.catalog_id = catalog0.id
catalogCourse5.course_id = course5.id
catalogCourse5.save!

catalogCourse6 = CatalogCourse.new
catalogCourse6.catalog_id = catalog0.id
catalogCourse6.course_id = course6.id
catalogCourse6.save!

catalogCourse7 = CatalogCourse.new
catalogCourse7.catalog_id = catalog0.id
catalogCourse7.course_id = course7.id
catalogCourse7.save!

catalogCourse8 = CatalogCourse.new
catalogCourse8.catalog_id = catalog0.id
catalogCourse8.course_id = course8.id
catalogCourse8.save!

catalogCourse9 = CatalogCourse.new
catalogCourse9.catalog_id = catalog0.id
catalogCourse9.course_id = course9.id
catalogCourse9.save!

category0 = Category.new
category0.name = "Core"
category0.save!

category1 = Category.new
category1.name = "Electives"
category1.save!

category2 = Category.new
category2.name = "Cognitives"
category2.save!

categoryCourse0 = CategoryCourse.new
categoryCourse0.category_id = category0.id
categoryCourse0.course_id = course0.id
categoryCourse0.save!

categoryCourse1 = CategoryCourse.new
categoryCourse1.category_id = category0.id
categoryCourse1.course_id = course1.id
categoryCourse1.save!

categoryCourse2 = CategoryCourse.new
categoryCourse2.category_id = category0.id
categoryCourse2.course_id = course2.id
categoryCourse2.save!

categoryCourse3 = CategoryCourse.new
categoryCourse3.category_id = category0.id
categoryCourse3.course_id = course3.id
categoryCourse3.save!

categoryCourse4 = CategoryCourse.new
categoryCourse4.category_id = category0.id
categoryCourse4.course_id = course4.id
categoryCourse4.save!

categoryCourse5 = CategoryCourse.new
categoryCourse5.category_id = category2.id
categoryCourse5.course_id = course5.id
categoryCourse5.save!

categoryCourse6 = CategoryCourse.new
categoryCourse6.category_id = category2.id
categoryCourse6.course_id = course6.id
categoryCourse6.save!

categoryCourse7 = CategoryCourse.new
categoryCourse7.category_id = category2.id
categoryCourse7.course_id = course7.id
categoryCourse7.save!

categoryCourse8 = CategoryCourse.new
categoryCourse8.category_id = category2.id
categoryCourse8.course_id = course8.id
categoryCourse8.save!

categoryCourse9 = CategoryCourse.new
categoryCourse9.category_id = category2.id
categoryCourse9.course_id = course9.id
categoryCourse9.save!

major0 = Major.new
major0.name = "Computer Science"
major0.save!

major1 = Major.new
major1.name = "Computer Engineering"
major1.save!

user0 = User.new
user0.login = "Alec"
user0.email = "alec@email.com"
user0.password = "password"
user0.password_confirmation = "password"
user0.save!

user1 = User.new
user1.login = "Evan"
user1.email = "evan@cedarville.edu"
user1.password = "password"
user1.password_confirmation = "password"
user1.save!

plan0 = Plan.new
plan0.name = "Default"
plan0.user_id = user0.id
plan0.major_id = major0.id
plan0.catalog_id = catalog0.id
plan0.save!

plan1 = Plan.new
plan1.name = "CpE Plan"
plan1.user_id = user1.id
plan1.major_id = major1.id
plan1.catalog_id = catalog0.id
plan1.save!

plan2 = Plan.new
plan2.name = "CS Plan"
plan2.user_id = user1.id
plan2.major_id = major0.id
plan2.catalog_id = catalog0.id
plan2.save!

planCourse0 = PlanCourse.new
planCourse0.plan_id = plan0.id
planCourse0.course_id = course0.id
planCourse0.term = "Fall"
planCourse0.year = 2018
planCourse0.save!

planCourse1 = PlanCourse.new
planCourse1.plan_id = plan0.id
planCourse1.course_id = course1.id
planCourse1.term = "Spring"
planCourse1.year = 2019
planCourse1.save!

planCourse2 = PlanCourse.new
planCourse2.plan_id = plan0.id
planCourse2.course_id = course2.id
planCourse2.term = "Fall"
planCourse2.year = 2019
planCourse2.save!

planCourse3 = PlanCourse.new
planCourse3.plan_id = plan0.id
planCourse3.course_id = course3.id
planCourse3.term = "Spring"
planCourse3.year = 2020
planCourse3.save!

planCourse4 = PlanCourse.new
planCourse4.plan_id = plan0.id
planCourse4.course_id = course4.id
planCourse4.term = "Fall"
planCourse4.year = 2020
planCourse4.save!

planCourse5 = PlanCourse.new
planCourse5.plan_id = plan0.id
planCourse5.course_id = course5.id
planCourse5.term = "Spring"
planCourse5.year = 2021
planCourse5.save!

planCourse6 = PlanCourse.new
planCourse6.plan_id = plan0.id
planCourse6.course_id = course6.id
planCourse6.term = "Fall"
planCourse6.year = 2019
planCourse6.save!

planCourse7 = PlanCourse.new
planCourse7.plan_id = plan0.id
planCourse7.course_id = course7.id
planCourse7.term = "Spring"
planCourse7.year = 2020
planCourse7.save!

planCourse8 = PlanCourse.new
planCourse8.plan_id = plan0.id
planCourse8.course_id = course8.id
planCourse8.term = "Spring"
planCourse8.year = 2020
planCourse8.save!

planCourse9 = PlanCourse.new
planCourse9.plan_id = plan0.id
planCourse9.course_id = course9.id
planCourse9.term = "Fall"
planCourse9.year = 2020
planCourse9.save!

planCourse10 = PlanCourse.new
planCourse10.plan_id = plan1.id
planCourse10.course_id = course0.id
planCourse10.term = "Fall"
planCourse10.year = 2016
planCourse10.save!

planCourse11 = PlanCourse.new
planCourse11.plan_id = plan2.id
planCourse11.course_id = course0.id
planCourse11.term = "Fall"
planCourse11.year = 2018
planCourse11.save!

planCourse12 = PlanCourse.new
planCourse12.plan_id = plan2.id
planCourse12.course_id = course1.id
planCourse12.term = "Spring"
planCourse12.year = 2019
planCourse12.save!

planCourse13 = PlanCourse.new
planCourse13.plan_id = plan2.id
planCourse13.course_id = course2.id
planCourse13.term = "Fall"
planCourse13.year = 2019
planCourse13.save!

planCourse14 = PlanCourse.new
planCourse14.plan_id = plan1.id
planCourse14.course_id = course6.id
planCourse14.term = "Fall"
planCourse14.year = 2016
planCourse14.save!

planCourse15 = PlanCourse.new
planCourse15.plan_id = plan1.id
planCourse15.course_id = course5.id
planCourse15.term = "Spring"
planCourse15.year = 2017
planCourse15.save!

planCourse16 = PlanCourse.new
planCourse16.plan_id = plan1.id
planCourse16.course_id = course7.id
planCourse16.term = "Spring"
planCourse16.year = 2017
planCourse16.save!

requirement0 = Requirement.new
requirement0.category_id = category0.id
requirement0.catalog_id = catalog0.id
requirement0.save!

requirement1 = Requirement.new
requirement1.category_id = category2.id
requirement1.catalog_id = catalog0.id
requirement1.save!