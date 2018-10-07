

downloadData(build);

function build()
{
	$(".Friendslot" ).get(4).innerHTML = GetHtml(courses.find(32547), ToghtherBtn(32547));
	$(".Friendslot" ).get(5).innerHTML = GetHtml(courses.find(32524), ToghtherBtn(32524));
	$(".Friendslot" ).get(1).innerHTML = GetHtml(courses.find(32520), ToghtherBtn(32520));
	$(".Friendslot" ).get(0).innerHTML = GetHtml(courses.find(32011), ToghtherBtn(32011));

	setToMyPlan(32606);
	setToMyPlan(95566);
}


function setToMyPlan(id)
{
	let course = courses.find(id);
	let panel = $('<div>').html(GetHtml(course, DeleteBtn(course.id)));
	let slot = $(".unuse."+ course.time).slice( 0, 1 );
	slot.html(panel);
	course.draggablePanel = panel;
	course.draggablePanel.slot = slot
	slot.addClass('used').removeClass('unuse');
}


function ToghtherBtn(id)
{
	return "<button onclick='Together("+id+")' class='btnInPanel togetherBtn'>Together</button>";
}


function Together(id)
{
    setToMyPlan(id);
}