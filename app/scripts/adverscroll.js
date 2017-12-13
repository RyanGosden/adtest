(function (root, factory) {
  if(typeof define === "function" && define.amd) {
    define(["postal"], factory);
  } else if(typeof module === "object" && module.exports) {
    module.exports = factory(require("postal"));
  } else {
    window.Adverscroll = factory();
  }
}(this, function(){

      var Adverscroll = function(config){
        //validation here?
        return new Adverscroll.init(config);
      }

      Adverscroll.init = function(config){
        this.id = config.id || '';
        this.image = config.image || '';
        this.url = config.url || '';
      };

      Adverscroll.prototype = {
        createElements : function(){
          this.container = document.getElementById(this.id);

          var inner = document.createElement("div");
          inner.setAttribute("class", "isb-banner-core");
          this.inner = inner;

          var advert = document.createElement("div");
          advert.setAttribute("class", "isb-banner-advert");
          this.advert = inner;

          var topLabel = document.createElement("div");
          topLabel.setAttribute("class", "isb-label isb-label-top");
          topLabel.appendChild(document.createTextNode("ADVERTISEMENT"));

          var bottomLabel = document.createElement("div");
          bottomLabel.setAttribute("class", "isb-label isb-label-bottom");
          bottomLabel.appendChild(document.createTextNode("SCROLL TO CONTINUE"));

          this.container.appendChild(topLabel);
          this.container.appendChild(inner);
          inner.appendChild(advert);
          this.container.appendChild(bottomLabel);
        },
        addMedia : function(){
          var container = document.getElementById("inscroll-banner");
          this.media = document.createElement("img");
          this.media.setAttribute("src", this.image);
          this.media.addEventListener("load", this.appendMedia.bind(this));
        },
        addUrl : function(){
          this.mediaUrl = document.createElement("a");
          this.mediaUrl.setAttribute("href", this.url);
          this.mediaUrl.setAttribute("target", "_blank");
          this.mediaUrl.setAttribute("class", "isb-link");
          this.advert.appendChild(this.mediaUrl);
        },
        appendMedia : function(){
            this.advert.appendChild(this.media);
            this.enableScrollEvent();
            this.render();
        },
        enableScrollEvent : function(){
          document.body.onscroll = function() {
            this.render();
          }.bind(this);
        },
        render : function(){
          var pos = this.container.getBoundingClientRect();
          this.inner.style.clip =
            "rect(" + pos.top + "px,100vw," + pos.bottom + "px,0)";
          },
        apply : function(){
            this.createElements();
            this.addMedia();
            this.addUrl();
          }
      };

      Adverscroll.init.prototype = Adverscroll.prototype;

  return Adverscroll;
}));
