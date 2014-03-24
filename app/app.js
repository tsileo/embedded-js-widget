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
      this.ractive.on({
        mwClick: function(ev) {
          ev.original.preventDefault()
          this.set('cnt', this.get('cnt') + 1);
          var that = this;
          $.ajax({
            url: "http://date.jsontest.com/",
            dataType: "jsonp"
          }).then(function(resp) {
            that.set("ts", resp.time);
          }, function(resp) {
            that.set("ts", "Something bad happened");
          });
        }
      });
    }
  };

  return app;

});
