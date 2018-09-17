var ajax = new JimAjax();
var courses;
var highLightedCourses = [];

ajax.get("./UTScourseDetail_lite.json", function()
{

	courses = ajax.getJson();
	console.log(courses);

	courses.find = function(myid)
	{
		for (let i = 0; i < this.length; i++) 
		{
			if(this[i].id == myid){return this[i];}
		}
		return "null";
	}

	console.log(courses.find(32998));

	var chart = 
	{
		chart: 
		{
			container: "#treeDiagram",
			hideRootNode: true,
		}
	};

	chart.nodeStructure = {children:[]};

	for (let i = 0; i < courses.length; i++) 
	{
		courses[i].children = [];
		courses[i].innerHTML = buildPanel(courses[i]);
		if(typeof courses[i].Requisite == "undefined")
		{
			courses[i].Requisite = {a:[]};
		}
		else if(typeof courses[i].Requisite.a == "string")
		{
			courses[i].Requisite.a = [courses[i].Requisite.a];
		}
	}
	
	for (let i = 0; i < courses.length; i++) 
	{
		//for (let j = 0; j < courses[i].Requisite.a.length; j++) 
		//{
			let c = courses.find(courses[i].Requisite.a[0]);
			
			if(c != "null")
			{
				c.children.push(courses[i]);
				courses[i].parent = c;
			}
		//}
	}
	console.log(courses);
	var rootCourses = [];
	for (let i = 0; i < courses.length; i++) 
	{
		if(courses[i].Requisite.a.length==0)
		{
			rootCourses.push(courses[i]);	
		}
	}

  
	chart.nodeStructure.children = rootCourses;


	new Treant(chart);
	
});


function buildPanel(course)
{
	return '<div class="courseSelect" onmouseover="OnBtnCourse(id)" onmouseout="OnBtnCourseOut(id)" id="'+course.id+'">'+
	GetHtml(course)+'</div>';
}

function GetHtml(course)
{
	var a =  
		`<div  class="cssMainContent  cssMainContent_SspStts_PASS ">
			<div  class="cssMainContentRight">
				<div  class="cssContentTop cssH1_CompntType_C cssH1_SspStts_PASS cssH1_SpkCat_SJ cssH1_SpkCatType_SJ">
					<span class="cssSpkCd">`+course.id+`</span>
					<span class="cssSspStts">
						<a href="http://handbook.uts.edu.au/subjects/details/`+course.id+`.html">Info</a>
					</span>
				</div>
				<div  class="cssContentMiddle">
					<div  class="cssMiddleLeftPartBTop cssContent_CompntType_C cssContent_SspStts_PASS cssContent_SpkCat_SJ cssContent_SpkCatType_SJ">
						<span class="cssSpkName">`+course.name+`</span>
					</div>
					<div  class="cssStudyMeasureInfo">
						(Credit Points:`+course.cp+`)
					</div>
				</div>
				<button onclick="enrollCourse()" class="btnInPanel enrollBtn" id="`+course.id+`enroll">enroll</button>
				<button onclick="deleteCourse(`+course.id+`)" class="btnInPanel deleteBtn" id="delete">delete</button>
				<div class="cssMainContentBottom" style="position:relative; overflow: hidden;">
					<span style="left: 4px;padding-left:3px">`+course.time+`</span>
				</div>
			</div>
		</div>`;
		return a;
}


function OnBtnCourse(id)
{
	$("#"+id+'enroll').show();
	highLight(id);
}

function highLight(id)
{
	let course = courses.find(id);
	highLightedCourses.push(course);
	$("#"+course.id +" div").addClass("onChild");
	if(typeof course.parent != "undefined")
	{
		let parent = courses.find(course.parent.id);

		highLight(parent.id);
	}
}

function unHighLight(id)
{
	let course = courses.find(id);
	$("#"+course.id +" div").removeClass("onChild");
	if(typeof course.parent != "undefined")
	{
		let parent = courses.find(course.parent.id);
		unHighLight(parent.id);
	}
}

function OnBtnCourseOut(id)
{
	highLightedCourses = [];
	$("#"+id+'enroll').hide();
	unHighLight(id);
}

function enrollCourse()
{
	for (let i = 0; i < highLightedCourses.length; i++) {
		const course = highLightedCourses[i];
		MakePanel(course);
	}
}

function deleteCourse(id)
{
	let course = courses.find(id);
	course.draggablePanel.remove();
}





/*
ajax.get("./list_of_subjects.xml", function()
{
	console.log("hell0");
	//console.log( ajax.getResponseArray());
	var list = ajax.getResponseArray();
	var simple_chart_config= 
	{
		chart: 
		{
			container: "#OrganiseChart-simple",
			connectors:{type:"straight"},
			hideRootNode: true,
		}
	};

	simple_chart_config.nodeStructure = {children:[]};
	var s = "";
	for (var i = 0; i < list.length; i+=2) 
	{
		s+='http://handbook.uts.edu.au/subjects/'+list[i+1]+".html\n";
		simple_chart_config.nodeStructure.children.push({innerHTML:'<div id="draggable">'+
			'<div  class="cssMainContent cssMainContent_CompntType_C cssMainContent_SspStts_PASS cssMainContent_SpkCat_SJ cssMainContent_SpkCatType_SJ" style="width: 200px;">'+
			'<div  class="cssMainContentRight"><div  class="cssContentTop cssH1_CompntType_C cssH1_SspStts_PASS cssH1_SpkCat_SJ cssH1_SpkCatType_SJ"><span class="cssSpkCd">'+
			list[i+1]+'</span><span class="cssSspStts">Passed</span></div><div  class="cssContentMiddle">'+
			'<div  class="cssMiddleLeftPartBTop cssContent_CompntType_C cssContent_SspStts_PASS cssContent_SpkCat_SJ cssContent_SpkCatType_SJ"><span class="cssSpkName">'+
			list[i]+'</span></div><div  class="cssStudyMeasureInfo">(Credit Points:6)</div></div><div class="cssMainContentBottom" style="position:relative; overflow: hidden;">'+
			'<span style="left: 4px;padding-left:3px">2018, Autumn Session, </span></div></div></div></div>'
		});
	}
	console.log(s);

	//new Treant( simple_chart_config );
});
*/







/*
var simple_chart_config = {
	chart: {
		container: "#OrganiseChart-simple",
		connectors:{type:"straight"}
	},
	
	nodeStructure: {
		innerHTML:'<div id="draggable"><div  class="cssMainContent cssMainContent_CompntType_C cssMainContent_SspStts_PASS cssMainContent_SpkCat_SJ cssMainContent_SpkCatType_SJ" style="width: 200px;"><div  class="cssMainContentRight"><div  class="cssContentTop cssH1_CompntType_C cssH1_SspStts_PASS cssH1_SpkCat_SJ cssH1_SpkCatType_SJ"><span class="cssSpkCd">31264</span><span class="cssSspStts">Passed</span></div><div  class="cssContentMiddle"><div  class="cssMiddleLeftPartBTop cssContent_CompntType_C cssContent_SspStts_PASS cssContent_SpkCat_SJ cssContent_SpkCatType_SJ"><span class="cssSpkName">Introduction to Computer Graphics</span></div><div  class="cssStudyMeasureInfo">(Credit Points:6)</div></div><div class="cssMainContentBottom" style="position:relative; overflow: hidden;"><span style="left: 4px;padding-left:3px">2018, Autumn Session, </span></div></div></div></div>'
		,children: [
			{
				innerHTML:'<div id="draggable"><div  class="cssMainContent cssMainContent_CompntType_C cssMainContent_SspStts_PASS cssMainContent_SpkCat_SJ cssMainContent_SpkCatType_SJ" style="width: 200px;"><div  class="cssMainContentRight"><div  class="cssContentTop cssH1_CompntType_C cssH1_SspStts_PASS cssH1_SpkCat_SJ cssH1_SpkCatType_SJ"><span class="cssSpkCd">31264</span><span class="cssSspStts">Passed</span></div><div  class="cssContentMiddle"><div  class="cssMiddleLeftPartBTop cssContent_CompntType_C cssContent_SspStts_PASS cssContent_SpkCat_SJ cssContent_SpkCatType_SJ"><span class="cssSpkName">Introduction to Computer Graphics</span></div><div  class="cssStudyMeasureInfo">(Credit Points:6)</div></div><div class="cssMainContentBottom" style="position:relative; overflow: hidden;"><span style="left: 4px;padding-left:3px">2018, Autumn Session, </span></div></div></div></div>'
			},
			{
				innerHTML:'<div id="draggable"><div  class="cssMainContent cssMainContent_CompntType_C cssMainContent_SspStts_PASS cssMainContent_SpkCat_SJ cssMainContent_SpkCatType_SJ" style="width: 200px;"><div  class="cssMainContentRight"><div  class="cssContentTop cssH1_CompntType_C cssH1_SspStts_PASS cssH1_SpkCat_SJ cssH1_SpkCatType_SJ"><span class="cssSpkCd">31264</span><span class="cssSspStts">Passed</span></div><div  class="cssContentMiddle"><div  class="cssMiddleLeftPartBTop cssContent_CompntType_C cssContent_SspStts_PASS cssContent_SpkCat_SJ cssContent_SpkCatType_SJ"><span class="cssSpkName">Introduction to Computer Graphics</span></div><div  class="cssStudyMeasureInfo">(Credit Points:6)</div></div><div class="cssMainContentBottom" style="position:relative; overflow: hidden;"><span style="left: 4px;padding-left:3px">2018, Autumn Session, </span></div></div></div></div>'
				,children: [
					{
						innerHTML:'<div id="draggable"><div  class="cssMainContent cssMainContent_CompntType_C cssMainContent_SspStts_PASS cssMainContent_SpkCat_SJ cssMainContent_SpkCatType_SJ" style="width: 200px;"><div  class="cssMainContentRight"><div  class="cssContentTop cssH1_CompntType_C cssH1_SspStts_PASS cssH1_SpkCat_SJ cssH1_SpkCatType_SJ"><span class="cssSpkCd">31264</span><span class="cssSspStts">Passed</span></div><div  class="cssContentMiddle"><div  class="cssMiddleLeftPartBTop cssContent_CompntType_C cssContent_SspStts_PASS cssContent_SpkCat_SJ cssContent_SpkCatType_SJ"><span class="cssSpkName">Introduction to Computer Graphics</span></div><div  class="cssStudyMeasureInfo">(Credit Points:6)</div></div><div class="cssMainContentBottom" style="position:relative; overflow: hidden;"><span style="left: 4px;padding-left:3px">2018, Autumn Session, </span></div></div></div></div>'
					},
					{
						innerHTML:'<div id="draggable"><div  class="cssMainContent cssMainContent_CompntType_C cssMainContent_SspStts_PASS cssMainContent_SpkCat_SJ cssMainContent_SpkCatType_SJ" style="width: 200px;"><div  class="cssMainContentRight"><div  class="cssContentTop cssH1_CompntType_C cssH1_SspStts_PASS cssH1_SpkCat_SJ cssH1_SpkCatType_SJ"><span class="cssSpkCd">31264</span><span class="cssSspStts">Passed</span></div><div  class="cssContentMiddle"><div  class="cssMiddleLeftPartBTop cssContent_CompntType_C cssContent_SspStts_PASS cssContent_SpkCat_SJ cssContent_SpkCatType_SJ"><span class="cssSpkName">Introduction to Computer Graphics</span></div><div  class="cssStudyMeasureInfo">(Credit Points:6)</div></div><div class="cssMainContentBottom" style="position:relative; overflow: hidden;"><span style="left: 4px;padding-left:3px">2018, Autumn Session, </span></div></div></div></div>'
					}
					,
					{
						innerHTML:'<div id="draggable"><div  class="cssMainContent cssMainContent_CompntType_C cssMainContent_SspStts_PASS cssMainContent_SpkCat_SJ cssMainContent_SpkCatType_SJ" style="width: 200px;"><div  class="cssMainContentRight"><div  class="cssContentTop cssH1_CompntType_C cssH1_SspStts_PASS cssH1_SpkCat_SJ cssH1_SpkCatType_SJ"><span class="cssSpkCd">31264</span><span class="cssSspStts">Passed</span></div><div  class="cssContentMiddle"><div  class="cssMiddleLeftPartBTop cssContent_CompntType_C cssContent_SspStts_PASS cssContent_SpkCat_SJ cssContent_SpkCatType_SJ"><span class="cssSpkName">Introduction to Computer Graphics</span></div><div  class="cssStudyMeasureInfo">(Credit Points:6)</div></div><div class="cssMainContentBottom" style="position:relative; overflow: hidden;"><span style="left: 4px;padding-left:3px">2018, Autumn Session, </span></div></div></div></div>'
				,children: [
					{
						innerHTML:'<div id="draggable"><div  class="cssMainContent cssMainContent_CompntType_C cssMainContent_SspStts_PASS cssMainContent_SpkCat_SJ cssMainContent_SpkCatType_SJ" style="width: 200px;"><div  class="cssMainContentRight"><div  class="cssContentTop cssH1_CompntType_C cssH1_SspStts_PASS cssH1_SpkCat_SJ cssH1_SpkCatType_SJ"><span class="cssSpkCd">31264</span><span class="cssSspStts">Passed</span></div><div  class="cssContentMiddle"><div  class="cssMiddleLeftPartBTop cssContent_CompntType_C cssContent_SspStts_PASS cssContent_SpkCat_SJ cssContent_SpkCatType_SJ"><span class="cssSpkName">Introduction to Computer Graphics</span></div><div  class="cssStudyMeasureInfo">(Credit Points:6)</div></div><div class="cssMainContentBottom" style="position:relative; overflow: hidden;"><span style="left: 4px;padding-left:3px">2018, Autumn Session, </span></div></div></div></div>'
					},
					{
						innerHTML:'<div id="draggable"><div  class="cssMainContent cssMainContent_CompntType_C cssMainContent_SspStts_PASS cssMainContent_SpkCat_SJ cssMainContent_SpkCatType_SJ" style="width: 200px;"><div  class="cssMainContentRight"><div  class="cssContentTop cssH1_CompntType_C cssH1_SspStts_PASS cssH1_SpkCat_SJ cssH1_SpkCatType_SJ"><span class="cssSpkCd">31264</span><span class="cssSspStts">Passed</span></div><div  class="cssContentMiddle"><div  class="cssMiddleLeftPartBTop cssContent_CompntType_C cssContent_SspStts_PASS cssContent_SpkCat_SJ cssContent_SpkCatType_SJ"><span class="cssSpkName">Introduction to Computer Graphics</span></div><div  class="cssStudyMeasureInfo">(Credit Points:6)</div></div><div class="cssMainContentBottom" style="position:relative; overflow: hidden;"><span style="left: 4px;padding-left:3px">2018, Autumn Session, </span></div></div></div></div>'
					}
				]
			}
				]
			}
			,
			{
				innerHTML:'<div id="draggable"><div  class="cssMainContent cssMainContent_CompntType_C cssMainContent_SspStts_PASS cssMainContent_SpkCat_SJ cssMainContent_SpkCatType_SJ" style="width: 200px;"><div  class="cssMainContentRight"><div  class="cssContentTop cssH1_CompntType_C cssH1_SspStts_PASS cssH1_SpkCat_SJ cssH1_SpkCatType_SJ"><span class="cssSpkCd">31264</span><span class="cssSspStts">Passed</span></div><div  class="cssContentMiddle"><div  class="cssMiddleLeftPartBTop cssContent_CompntType_C cssContent_SspStts_PASS cssContent_SpkCat_SJ cssContent_SpkCatType_SJ"><span class="cssSpkName">Introduction to Computer Graphics</span></div><div  class="cssStudyMeasureInfo">(Credit Points:6)</div></div><div class="cssMainContentBottom" style="position:relative; overflow: hidden;"><span style="left: 4px;padding-left:3px">2018, Autumn Session, </span></div></div></div></div>'
				,children: [
					{
						innerHTML:'<div id="draggable"><div  class="cssMainContent cssMainContent_CompntType_C cssMainContent_SspStts_PASS cssMainContent_SpkCat_SJ cssMainContent_SpkCatType_SJ" style="width: 200px;"><div  class="cssMainContentRight"><div  class="cssContentTop cssH1_CompntType_C cssH1_SspStts_PASS cssH1_SpkCat_SJ cssH1_SpkCatType_SJ"><span class="cssSpkCd">31264</span><span class="cssSspStts">Passed</span></div><div  class="cssContentMiddle"><div  class="cssMiddleLeftPartBTop cssContent_CompntType_C cssContent_SspStts_PASS cssContent_SpkCat_SJ cssContent_SpkCatType_SJ"><span class="cssSpkName">Introduction to Computer Graphics</span></div><div  class="cssStudyMeasureInfo">(Credit Points:6)</div></div><div class="cssMainContentBottom" style="position:relative; overflow: hidden;"><span style="left: 4px;padding-left:3px">2018, Autumn Session, </span></div></div></div></div>'
					},
					{
						innerHTML:'<div id="draggable"><div  class="cssMainContent cssMainContent_CompntType_C cssMainContent_SspStts_PASS cssMainContent_SpkCat_SJ cssMainContent_SpkCatType_SJ" style="width: 200px;"><div  class="cssMainContentRight"><div  class="cssContentTop cssH1_CompntType_C cssH1_SspStts_PASS cssH1_SpkCat_SJ cssH1_SpkCatType_SJ"><span class="cssSpkCd">31264</span><span class="cssSspStts">Passed</span></div><div  class="cssContentMiddle"><div  class="cssMiddleLeftPartBTop cssContent_CompntType_C cssContent_SspStts_PASS cssContent_SpkCat_SJ cssContent_SpkCatType_SJ"><span class="cssSpkName">Introduction to Computer Graphics</span></div><div  class="cssStudyMeasureInfo">(Credit Points:6)</div></div><div class="cssMainContentBottom" style="position:relative; overflow: hidden;"><span style="left: 4px;padding-left:3px">2018, Autumn Session, </span></div></div></div></div>'
					}
					,
					{
						innerHTML:'<div id="draggable"><div  class="cssMainContent cssMainContent_CompntType_C cssMainContent_SspStts_PASS cssMainContent_SpkCat_SJ cssMainContent_SpkCatType_SJ" style="width: 200px;"><div  class="cssMainContentRight"><div  class="cssContentTop cssH1_CompntType_C cssH1_SspStts_PASS cssH1_SpkCat_SJ cssH1_SpkCatType_SJ"><span class="cssSpkCd">31264</span><span class="cssSspStts">Passed</span></div><div  class="cssContentMiddle"><div  class="cssMiddleLeftPartBTop cssContent_CompntType_C cssContent_SspStts_PASS cssContent_SpkCat_SJ cssContent_SpkCatType_SJ"><span class="cssSpkName">Introduction to Computer Graphics</span></div><div  class="cssStudyMeasureInfo">(Credit Points:6)</div></div><div class="cssMainContentBottom" style="position:relative; overflow: hidden;"><span style="left: 4px;padding-left:3px">2018, Autumn Session, </span></div></div></div></div>'
					}
				]
			}
		]
	}
};

new Treant( simple_chart_config );
*/
// // // // // // // // // // // // // // // // // // // // // // // // 