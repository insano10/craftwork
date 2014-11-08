$(document).ready(function ()
{

    var instructionsTitle = $("#instructions-title");

    instructionsTitle.empty();
    instructionsTitle.append("&lt;Title&gt;");

    instructionsTitle.tooltip({
        placement : 'bottom'
    });

    instructionsTitle.bind({

        click: function ()
        {
            console.log("title clicked");
        }
    });

    $('#userNameField').tooltip({
        'show': true,
        'placement': 'bottom',
        'title': "Please remember to..."
    });

    $('#userNameField').tooltip('show');
});
