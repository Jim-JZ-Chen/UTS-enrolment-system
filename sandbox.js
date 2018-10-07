$( function() {
    $(".draggable").draggable({ 
        revert: "invalid", 
        appendTo : "body",
        start: function(event, ui ) 
        {

        }
    });
    
    $( ".droppable" ).droppable({
        classes: {
            "ui-droppable-active": "ui-state-active",
            "ui-droppable-hover": "ui-state-hover"
        },
        drop: function( event, ui ) {
            $( this )
                .removeClass("droppable")
                .removeClass("ui-droppable");

                ui.draggable.appendTo($(this));
                ui.draggable.addClass("OnSlot");
                ui.draggable.css("top", "0px");
                ui.draggable.css("left", "0px");
                //console.log(ui);
                //console.log($( this ));
                
        }
    });
});

function MakePanel(course)
{
    var panel = $('<div class="draggable"/>').html(GetHtml(course, DeleteBtn(course.id)));
    panel.draggable({ 
        revert: "invalid", 
        appendTo : "body",
    });
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