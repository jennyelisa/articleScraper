//get articles as json
$.getJSON("/articles", function(data) {
    for(var i = 0; i < data.length; i++) {
        $("#articleTitle").append("<h3>data[i].title</h3>");
        $("#articleSum").append("<p>data[i].link</p>" + "<p>data.[i].summary</p>");
    }
});

