define(['jquery', 'Ractive', 'rv!templates/template', 'text!css/my-widget_embed.css'], function ($, Ractive, mainTemplate, css) {

  'use strict';
  
  var app = {
    init: function () {

    var $style = $("<style></style>", {type: "text/css"});
    $style.text(css);
    $("head").append($style);
    
      // render our main view
      this.ractive = new Ractive({
        el: 'myWidget',
        template: mainTemplate,
        data: {
          cnt: 0,
          ts: 'never',
        }
      });
      _ractive = this.ractive;
      this.ractive.on({
        mwClick: function(ev) {
          ev.original.preventDefault()
          _ractive.set('cnt', _ractive.get('cnt') + 1);
          $.ajax({
            url: "http://date.jsontest.com/",
            dataType: "jsonp"
          }).then(function(resp) {
            _ractive.set("ts", resp.time);
          }, function(resp) {
            _ractive.set("ts", "Something bad happened");
          });
        }
      });
    }
  };

  return app;

});
