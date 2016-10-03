$(function(){
  var href = document.location.href;

  var editor = new RegExp('\/editor\/');

  var isEditor = editor.test(href);
  if (isEditor){
    var data = {
      "Builder used": true
    };
    analytics.identify(data);
    analytics.page("Editor");
  }

  $('.darkoverlay_download').on('click', 'a', function(){
    var dataTracking = {
      "download type": $(this).attr('data-type'),
      "template name": "Custom by builder"
    };
    analytics.identify({
      "Download": true
    });
    analytics.track("Download Template", dataTracking);
  });

});
