function saveInstructions()
{
    var instructions = $("#instructions").val().split("\n");

    $.ajax({
        type:    'POST',
        url:     window.location.href.split("#")[0] + 'save',
        dataType: "json",
        data: { instructions: JSON.stringify(instructions) },
        success: function (result)
        {
            console.log('save response: ' + result);
        },
        error:   function (e)
        {
            console.log(e);
        }
    });
}
