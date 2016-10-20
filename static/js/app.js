function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

$(function() {
    $("#YTsearch-form").on("submit", function(e) {
       e.preventDefault();
       // prepare the request
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search-terms").val()).replace(/%20/g, "+"),
            maxResults: 8,
            order: "relevance",
            //publishedAfter: "2015-01-01T00:00:00Z"
       }); 
       // execute the request
       request.execute(function(response) {
          var results = response.result;

          $("#results").empty();
          console.log(results);
          
          searchterm($("#search-terms").val());
          $("#search-terms").val("");
          $.each(results.items, function(index, item) {
            makeResult(item);

          $(".thumbnail-loadvids").unbind("click");

          $(".thumbnail-loadvids").click(function() {
              newYT($(this).data("vidId"));

          });
            //$.get("tpl/item.html", function(data) {
                //$("#results").append(tplawesome(data, [{"title":item.snippet.title + "<br>" + item.id.videoId, "videoid":item.id.videoId}]));
            //});
          });
          resetVideoHeight();
       });
    });
    
    $(window).on("resize", resetVideoHeight);
});

function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}

function searchterm(term) {
  var search = document.createElement('h3');
  $(search).html("You searched: " + term);
  $(search).addClass("searchterm");
  $("#results").append(search);
}

function makeResult(item) {
    var title = makeTitle(item);
    var thumbnail = makeThumbnail(item);
    var div = document.createElement('div');
    $(div).addClass("resultDiv");
    $(div).append(title);
    $(div).append(thumbnail);
    $("#results").append(div);
}

function makeTitle(item) {
    var title = document.createElement('div');
    $(title).html(item.snippet.title);
    $(title).addClass("createdDiv");
    var tooltipTitle = (item.snippet.publishedAt).slice(0,10);
    $(title).prop("title", tooltipTitle);
    //'<div class="createdDiv" title="title">' + item.snippet.title + '</div>'
    return title;
}

function makeThumbnail(item) {
    var thumbnail = document.createElement('img');
    thumbnail.src = item.snippet.thumbnails.medium.url;
    thumbnail.dataset.vidId = item.id.videoId;
    $(thumbnail).addClass("thumbnail-loadvids")
    return thumbnail;
}


function init() {
    gapi.client.setApiKey("AIzaSyC31RbR9LW1olvzMj4RJ9MiiToSSkWNs0g");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
    });
}
