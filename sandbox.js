$( function() {
    
    $( ".droppable" ).droppable({
        classes: {
            "ui-droppable-active": "ui-state-active",
            "ui-droppable-hover": "ui-state-hover"
        },
        drop: function( event, ui ) {
            $( this )
                .droppable("disable");
                ui.draggable.appendTo($(this));
                ui.draggable.addClass("OnSlot");
                ui.draggable.css("top", "0px");
                ui.draggable.css("left", "0px");
                courses.find(ui.draggable.context.id).setState("OnSandbox");
                
        }
    });
});

function MakePanel(course)
{
    var panel = $("<div class='draggable' id='"+course.id+"'/>").html(GetHtml(course, DeleteBtn(course.id)));
    panel.courseID = course.id;
    panel.draggable({ 
        revert: "invalid", 
        appendTo : "body",

        start: function() 
        {
            $('.slot.unuse').droppable("disable");
            $('.slot.unuse.'+course.time).droppable("enable");

        }
    });

    if(typeof course.parent!= "undefined" &&course.parent.state != "OnSandbox")
    {
        panel.draggable("disable");
    }

    
    course.draggablePanel = panel;
    return panel;
}

function DeleteBtn(id)
{
    return "<button onclick='deleteCourse("+id+")' class='btnInPanel deleteBtn'>delete</button>";
}

function ShowTreeDiagram()
{
    $('#treeDiagram').show();
    $('#coursePool').addClass('coursePoolOnRight');
    $('#coursePool').removeClass('coursePoolOnLeft');
    $('#sandBox').hide();
    console.log("ShowTreeDiagram");
    
}

function ShowSandBox()
{
    $('#treeDiagram').hide();
    $('#coursePool').addClass('coursePoolOnLeft');
    $('#coursePool').removeClass('coursePoolOnRight');
    $('#sandBox').show();
}