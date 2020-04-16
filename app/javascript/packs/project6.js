class Plan{
    constructor(planName, major, studentName, year){
        this.planName = planName;
        this.years = [];
        this.major = major;
        this.studentName = studentName;
        this.courses = [];
        this.catalogYear = year;
    }
}

class Course{
    constructor(name, designator, description, credits, semester = null, year = null){
        this.name = name;
        this.designator = designator;
        this.description = description;
        this.credits = credits;
        this.semester = semester;
        this.year = year;
    }
}

class Year{
    constructor(name){
        this.name = name;
        this.semesters = [new Semester("Fall", this), 
                          new Semester("Spring", this), 
                          new Semester("Summer", this)];
    }
}

class Semester{
    constructor(name, year){
        this.name = name;
        this.year = year;
        this.courses = [];
    }
}

function getCourseById(id){
    // Search the course array for the course
    for(course of plan.courses){
        if(course.designator == id){
            return course;
        }
    }
    return null;
}

function getCredits(semester){
    let credits = 0;
    for(course of semester.courses){
        credits += course.credits;
    }
    return credits;
}

function getSemester(termName, yearName){
    matchingYear = null;

    for(year of plan.years){
        if(year.name == yearName){
            matchingYear = year;
        }
    }

    if(termName.includes("Fall")){
        return matchingYear.semesters[0];
    }
    else if(termName.includes("Spring")){
        return matchingYear.semesters[1];
    }
    else if(termName.includes("Summer")){
        return matchingYear.semesters[2];
    }
    return null;
}

function hasYear(yearName){
    for(year of plan.years){
        if(year.name == yearName){
            return true;
        }
    }
    return false;
}

function updatePlan(){
    var html = "";
    let totalCredits = 0;

    // Generate a row for each year
    for (year of plan.years){
        html += "<div class='row year'>";

        // Generate a semester div for each semester
        for (semester of year.semesters){
            let yearName = semester.year.name;
            if(semester.name !== "Fall"){
                yearName++;
            }
            html += "<div class='section semester'><div class='row'>" + 
                    "<div class='col-6 no-padding'><h4>" + semester.name + " " +
                    yearName + "</h4></div>" + 
                    "<div class='col-6 align-right no-padding'>Credits: " +
                    getCredits(semester) + "</div></div><hr>" +
                    "<div class='dropArea' id='" + semester.name + yearName +
                    "' ondrop='drop(event)' ondragover='allowDrop(event)'>";
            totalCredits += getCredits(semester);

            // List the courses for each semester
            for (course of semester.courses){
                html += "<div id='" + course.designator +
                        "' class='slight-padding' draggable='true' ondragstart='drag(event)'>" +
                        course.designator + " " + course.name + "</div>";
            }
            html += "</div></div>";
        }
        html += "</div>";
    }
    $("#plan").html(html);
    $("#major").html("Major: " + plan.major);
    $("#catalogYear").html("Catalog Year: " + plan.catalogYear);
    $("#catalogHours").html("Catalog Hours: " + totalCredits);
}

function generateAccordion(){
    /*
    $.getJSON("/~gallaghd/cs3220/termProject/getRequirements.php", function(data){
        $.each(data.categories, function(idx, val){
            let html = "<h3>" + idx + "</h3><div>";
            $.each(val.courses, function(idx, val){
                let name = getCourseById(val).name;
                html += "<div class='slight-padding'>" + val + " " + name + "</div>";
            });
            $("#accordion").append(html + "</div>");
        });
        $("#accordion").accordion();
    });
    */
}

function getCombined(planId){
    if($.fn.DataTable.isDataTable("#catalog")){
        datatable.destroy();
    }
    $("#catalog").html("<thead><tr><th>ID</th><th>Name</th><th>Description</th><th>Credits</th></tr></thead><tbody id='catalogBody'></tbody>");
    datatable = $("#catalog").DataTable();

    /*
    $.getJSON("/~miller/TermProject/getCombined.php", {id: planId}, function(data){
        plan = new Plan(data.plan.name, data.plan.major, data.plan.student, data.plan.catYear);
        // Add courses to catalog
        $.each(data.catalog.courses, function(idx, val){
            $("#catalog").DataTable().row.add([val.id, val.name, val.description, val.credits]).draw(false);
            plan.courses.push(new Course(val.name, val.id, val.description, val.credits));
        });
        // Add years, semesters, and courses to plan
        $.each(data.plan.courses, function(idx, val){
            let year = val.year;
            if(!val.term.includes("Fall")){
                year -= 1;
            }
            if(!hasYear(year)){
                plan.years.push(new Year(year));
            }
            let semester = getSemester(val.term, year);
            let course = getCourseById(val.id);
            semester.courses.push(course);
        });
        updatePlan();
        generateAccordion();
    });
    */
}

var plan = null;
var datatable = null;

if($("#planSelect").children().length != 0){
    getCombined($("#planSelect > option").val());
}