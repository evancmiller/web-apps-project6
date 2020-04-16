json.plan do
    json.id @plan.id
    json.courses @plan.plan_courses do |planCourse|
        json.designator planCourse.course.designator
        json.year planCourse.year
        json.term planCourse.term
    end
end

json.planList do
    json.plans @plans do |plan|
        json.id plan.id
        json.name plan.name
    end
end

json.courses do
    json.courses @courses do |course|
        json.designator course.designator
        json.name course.name
        json.credits course.credits
    end
end