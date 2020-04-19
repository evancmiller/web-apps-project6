json.plan do
    json.name @plan.name
    json.student User.find(@plan.user_id).login
    json.major Major.find(@plan.major_id).name
    json.catYear Catalog.find(@plan.catalog_id).year
    json.courses @plan.plan_courses do |planCourse|
        json.id planCourse.course.designator
        json.year planCourse.year
        json.term planCourse.term
    end
end

json.catalog do
    json.year Catalog.find(@plan.catalog_id).year
    json.courses Catalog.find(@plan.catalog_id).courses do |course|
        json.id course.designator
        json.name course.name
        json.description course.description
        json.credits course.credits
    end
end

json.categories Catalog.find(@plan.catalog_id).categories do |category|
    json.name category.name
    json.courses category.courses do |course|
        json.id course.designator
    end
end

json.planList do
    json.plans @plans do |plan|
        json.id plan.id
        json.name plan.name
    end
end