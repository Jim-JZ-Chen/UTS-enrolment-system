

downloadData(build);

function build()
{
	setToFriendPlan(32547);
	setToFriendPlan(32524);
	setToFriendPlan(32520);
	setToFriendPlan(32011);

	setToMyPlan(32606);
	setToMyPlan(95566);
}

function setToFriendPlan(id)
{
	let course = courses.find(id);
	var div = document.createElement("div");
	div.innerHTML = GetHtml(course, ToghtherBtn(course.id));
	course.friend = div;
	$(".Friendslot.unuse."+ course.time).slice( 0, 1 )
		.html(course.friend)
		.addClass('used')
		.removeClass('unuse');
}

function setToMyPlan(id)
{
	let course = courses.find(id);
	let panel = $('<div>').html(GetHtml(course, DeleteBtn(course.id)));
	let slot = $(".myslot.unuse."+ course.time).slice( 0, 1 );
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
    let course = courses.find(id);
    course.setState("Together");

}