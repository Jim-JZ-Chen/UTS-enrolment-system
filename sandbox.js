$( function() {
    
    $( ".droppable" ).droppable({
        classes: {
            "ui-droppable-active": "ui-state-active",
            "ui-droppable-hover": "ui-state-hover"
        },
        drop: function( event, ui ) {
            
            $( this ).addClass('used').removeClass('unuse');
            ui.draggable.appendTo($(this));
            ui.draggable.addClass("OnSlot");
            ui.draggable.css("top", "0px");
            ui.draggable.css("left", "0px");
            courses.find(ui.draggable.context.id).setState("OnSandbox"); 
            courses.find(ui.draggable.context.id).slot = $(this);
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
            $('.slot').droppable("disable");
            $('.slot.unuse.'+course.time).droppable("enable");
            if(typeof course.slot != "undefined")
            {
                course.slot.addClass('unuse').removeClass('used');
            }
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
    //$('#treeDiagram').show();
    $('#sandBox').addClass('onHideAin');
    $('#sandBox').removeClass('onShowAin');

    $('#treeDiagram').removeClass('onHideAin');
    $('#treeDiagram').addClass('onShowAin');

    $('#coursePool').addClass('coursePoolOnRight');
    $('#coursePool').removeClass('coursePoolOnLeft');
    //$('#sandBox').hide();
    console.log("ShowTreeDiagram");
    
}

function ShowSandBox()
{
    //$('#treeDiagram').hide();
    $('#sandBox').removeClass('onHideAin');
    $('#sandBox').addClass('onShowAin');

    $('#treeDiagram').addClass('onHideAin');
    $('#treeDiagram').removeClass('onShowAin');

    $('#coursePool').addClass('coursePoolOnLeft');
    $('#coursePool').removeClass('coursePoolOnRight');
    //$('#sandBox').show();
}