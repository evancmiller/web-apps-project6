class Plan{
    constructor(id, planName, major, studentName, year){
        this.id = id;
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
    let totalCredits = 0;

	$("#plan").html("");
    // Generate a row for each year
	var planDiv = document.createElement('div');
    for (year of plan.years){
		var yearDiv = document.createElement('div');
		yearDiv.className = 'row year';
        
		for (semester of year.semesters){
			var semesterDiv = document.createElement('div');
			semesterDiv.className = 'section semester';
			
			let yearName = semester.year.name;
            if(semester.name !== "Fall"){
                yearName++;
            }
			
			semesterDiv.innerHTML = "<div class='row'>" + 
                    "<div class='col-6 no-padding'><h4>" + semester.name + " " +
                    yearName + "</h4></div>" + 
                    "<div class='col-6 align-right no-padding'>Credits: " +
                    getCredits(semester) + "</div></div><hr>";
			let term = semester.name;	
			let year = yearName;
					
			for (course of semester.courses){
                var divCourse = document.createElement('div');
				divCourse.id = course.designator;
				divCourse.className = 'slight-padding';
				divCourse.className += ' course_name';
                let name = course.name;
				
				let designator = course.designator;
				
				var divCourseName = document.createElement('div');
				divCourseName.innerHTML = designator + " " + name;
				
				var divCourseX = document.createElement('button');
				divCourseX.innerHTML = "X";
				divCourseX.className = "course_delete";
				$(divCourseX).click(function(){
						$.ajax({
							type: "POST",
							url: '/plans/remove_course',
							data: { "id": plan.id, "course": designator, "term": term, "year": year}
						}).done(function( msg )
						{
							reloadCurrentPlan();
						});
				});
				
				divCourse.appendChild(divCourseName);
				divCourse.appendChild(divCourseX);
				semesterDiv.appendChild(divCourse);
            }
			$(semesterDiv).droppable({
			  drop: function( event, ui ) {
				var id = ui.draggable.attr("id");			
				
				console.log(term);
				
				$.ajax({
					type: "POST",
					url: '/plans/add_course',
					data: { "id": plan.id, "course": id, "term": term, "year": year}
				}).done(function( msg )
				{
					reloadCurrentPlan();
				});
			  }
			});		
					
			yearDiv.appendChild(semesterDiv);
			totalCredits += getCredits(semester);
		}
		
		planDiv.appendChild(yearDiv);
    }
	$("#plan").append(planDiv);
	
    $("#major").html("Major: " + plan.major);
    $("#catalogYear").html("Catalog Year: " + plan.catalogYear);
    $("#catalogHours").html("Catalog Hours: " + totalCredits);
}

function doesPlanHaveCourse(desig){
	for (year of plan.years){
		for (semester of year.semesters){
			for (course of semester.courses){
				if(course.designator == desig){
					return true;
				}
			}
		}
	}
	return false;
}

function generateAccordion(planId){
    $.getJSON("plans/" + planId + ".json", function(data){
        if($("#accordion").accordion("instance") !== undefined){
            $("#accordion").accordion("destroy");
        }
        $("#accordion").empty();
        $.each(data.categories, function(idx, val){
            var div = document.createElement('div');
			div.innerHTML = "<h3>" + val.name + "</h3>";
			
			var divCourses = document.createElement('div');		
			$.each(val.courses, function(idx, val){
				var divCourse = document.createElement('div');
				
				divCourse.className = 'slight-padding';
				divCourse.className += ' course_name';
				
				var divCourseCheck = document.createElement('div');
				var inPlan = doesPlanHaveCourse(val.id);
				
				if(inPlan){
					divCourseCheck.className = 'course_check_c';
					divCourseCheck.innerHTML = "✓";
				}
				else{
					divCourseCheck.className = 'course_check_x';
					divCourseCheck.innerHTML = "X";
				}
				
				var divCourseName = document.createElement('div');
                let name = getCourseById(val.id).name;
				divCourseName.innerHTML = val.id + " " + name;
				divCourseName.id = val.id;
				$(divCourseName).draggable({ revert: "invalid", helper: "clone"  });
				
				divCourse.appendChild(divCourseCheck);
				divCourse.appendChild(divCourseName);
				
				divCourses.appendChild(divCourse);
            });
			
			div.appendChild(divCourses);
			$("#accordion").append(div);
        });
        $("#accordion").accordion();
		
    });
}

function reloadCurrentPlan(){
	$.getJSON("plans/" + plan.id + ".json", function(data){
        plan = new Plan(plan.id, data.plan.name, data.plan.major, data.plan.student, data.plan.catYear);
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
		
		if($("#accordion").accordion("instance") !== undefined){
            $("#accordion").accordion("destroy");
        }
        $("#accordion").empty();
        $.each(data.categories, function(idx, val){
            var div = document.createElement('div');
			div.innerHTML = "<h3>" + val.name + "</h3>";
			
			var divCourses = document.createElement('div');		
			$.each(val.courses, function(idx, val){
				var divCourse = document.createElement('div');
				
				divCourse.className = 'slight-padding';
				divCourse.className += ' course_name';
				
				var divCourseCheck = document.createElement('div');
				var inPlan = doesPlanHaveCourse(val.id);
				
				if(inPlan){
					divCourseCheck.className = 'course_check_c';
					divCourseCheck.innerHTML = "✓";
				}
				else{
					divCourseCheck.className = 'course_check_x';
					divCourseCheck.innerHTML = "X";
				}
				
				var divCourseName = document.createElement('div');
                let name = getCourseById(val.id).name;
				divCourseName.innerHTML = val.id + " " + name;
				divCourseName.id = val.id;
				$(divCourseName).draggable({ revert: "invalid", helper: "clone"  });
				
				divCourse.appendChild(divCourseCheck);
				divCourse.appendChild(divCourseName);
				
				divCourses.appendChild(divCourse);
            });
			
			div.appendChild(divCourses);
			$("#accordion").append(div);
        });
        $("#accordion").accordion();
		
    });
    
}

function editPlans(){
	$("#editPlan_dialog").dialog({
	  autoOpen: false,
	  draggable: false,
	  closeText: "X",
	  width: "50%",
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "blind",
        duration: 1000
      }
    });
	
	$( "#editPlans" ).click(function() {
      $( "#editPlan_dialog" ).dialog( "open" );
    });
}

function addPlans(){
	$("#addPlan_dialog").dialog({
	  autoOpen: false,
	  draggable: false,
	  closeText: "X",
	  width: "30%",
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "blind",
        duration: 1000
      },
	  buttons: {
        "Add Plan": submitPlan,
        Cancel: function() {
          $("#addPlan_dialog").dialog( "close" );
        }
      },
      close: function() {
        //allFields.removeClass( "ui-state-error" );
      }
    });
	
	$.ajax({
		type: "GET",
		cache: false,
		url: '/get_majors'
	}).done(function( msg )
	{
		var html ="";
		$.each(msg.majors, function(idx, val){
			html += "<option value='" + val.id + "'>" + val.name + "</option>";
		});
		$("#form_major").html(html);
		
		html ="";
		$.each(msg.catalogs, function(idx, val){
			html += "<option value='" + val.id + "'>" + val.year + "</option>";
		});
		$("#form_catalog").html(html);
	});
	
	$( "#add_plan" ).click(function() {
      $( "#addPlan_dialog" ).dialog( "open" );
    });
}

function submitPlan(){
	var valid = true;
	
	if(valid && $("#form_name").val().length == 0){
		valid = false;
	} 
	
	if(valid && $("#form_major").val() == ""){
		valid = false;
	} 
	
	if(valid && $("#form_catalog").val() == ""){
		valid = false;
	} 
	
	if(valid){
		let name = $("#form_name").val();
		var majorSelection = document.getElementById("form_major");
		var major = majorSelection[majorSelection.selectedIndex].value;
		console.log(major);
		let catalog = $("#form_catalog").val();
		$.ajax({
			type: "POST",
			url: '/addplan',
			data: { "name": name, "major": major, "catalog": catalog}
		}).done(function( msg )
		{
			$("#addPlan_dialog").dialog( "close" );
			reloadEditList();
		});
	}
	
	return valid;
}

function reloadEditList(){
	$.getJSON("plans/1.json", function(data){
		buildEditList(data.planList.plans);
	});
}

function buildEditList(data){
	var table = document.getElementById("plan_list");
	for(var i = 1;i<table.rows.length;){
		table.deleteRow(i);
	}
	//$("#plan_list tbody tr").remove(); //Clear data for update
	$.each(data, function(idx, val){
		var planId = val.id;
		var row = table.insertRow(-1);
		$.getJSON("plans/" + planId + ".json", function(data){
			var cellName = row.insertCell(-1);
			cellName.innerHTML = data.plan.name;
			var cellMajor = row.insertCell(-1);
			cellMajor.innerHTML = data.plan.major;
			var cellCatalog = row.insertCell(-1);
			cellCatalog.innerHTML = data.plan.catYear;
			
			var cellCopy = row.insertCell(-1);
			var copyButton = document.createElement("button");
			copyButton.innerHTML = "Copy";
			copyButton.className = "plan_copy";
			cellCopy.appendChild(copyButton);
			
			var cellDelete = row.insertCell(-1);
			var deleteButton = document.createElement("button");
			deleteButton.innerHTML = "X";
			deleteButton.className = "course_delete";
			$(deleteButton).click(function(){
					$.ajax({
						type: "POST",
						url: '/plans/remove_plan',
						data: { "id": planId, "plan_id": planId}
					}).done(function( msg )
					{
						reloadEditList();
					});
			});
			
			cellDelete.appendChild(deleteButton);
		});
	});
}

window.getCombined = function(planId){
    if($.fn.DataTable.isDataTable("#catalog")){
        datatable.destroy();
    }
    $("#catalog").html("<thead><tr><th>ID</th><th>Name</th><th>Description</th><th>Credits</th></tr></thead><tbody id='catalogBody'></tbody>");
    datatable = $("#catalog").DataTable();

    $.getJSON("plans/" + planId + ".json", function(data){
        plan = new Plan(planId, data.plan.name, data.plan.major, data.plan.student, data.plan.catYear);
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
        generateAccordion(planId);
    });
}

$(document).ready(function(){
    // If the plan select box exists, we're on the main page, so populate it and list the courses
    if($("#planSelect").length){
        $.getJSON("plans/1.json", function(data){
            let html = "";
            $.each(data.planList.plans, function(idx, val){
                html += "<option value='" + val.id + "'>" + val.name + "</option>";
            });
            $("#planSelect").html(html);
            getCombined($("#planSelect > option").val());
			buildEditList(data.planList.plans);
        });
    }
	
	document.getElementById("editPlans").addEventListener("click", editPlans());
	
	document.getElementById("add_plan").addEventListener("click", addPlans());
});

var plan = null;
var datatable = null;