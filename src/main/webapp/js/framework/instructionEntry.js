$("#instructions").textcomplete([
    {
        words:   ['sc','ch','chup'],
        match:   /\b(\w{2,})$/,
        search:  function (term, callback)
        {
            callback($.map(this.words, function (word)
            {
                console.log("search");
                return word.indexOf(term) === 0 ? word : null;
            }));
        },
        index:   1,
        replace: function (word)
        {
            console.log("replace");
            return word + ' ';
        }
    }
]);