$(document).ready(function ()
{

    var instructionsTitle = $("#instructions-title");

    instructionsTitle.empty();
    instructionsTitle.append("Untitled pattern");

    instructionsTitle.tooltip({
        placement : 'bottom'
    });

    instructionsTitle.bind({

        click: function ()
        {
            console.log("title clicked");
        }
    });
});
