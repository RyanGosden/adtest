(function() {

  var Adverscroll = function(id, img, url){
    return new Adverscroll.init(id, img, url);
  }

  Adverscroll.init = function(id, img, url){
    this.id = id || '';
    this.image = img || '';
    this.url = url || '';

    this.createElements();
    this.addMedia();
    this.addUrl();

  };

  Adverscroll.init.prototype = Adverscroll.prototype;

    Adverscroll.prototype.createElements = function(){
      this.container = document.getElementById('inscroll-banner');

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
    };
    Adverscroll.prototype.addMedia = function(){
      var container = document.getElementById("inscroll-banner");
      this.media = document.createElement("img");
      this.media.setAttribute("src", this.image);
      this.media.addEventListener("load", this.appendMedia.bind(this));
    }
    Adverscroll.prototype.addUrl = function(){
      this.mediaUrl = document.createElement("a");
      this.mediaUrl.setAttribute("href", this.url);
      this.mediaUrl.setAttribute("target", "_blank");
      this.mediaUrl.setAttribute("class", "isb-link");
      this.advert.appendChild(this.mediaUrl);
    },
    Adverscroll.prototype.appendMedia = function(){
        this.advert.appendChild(this.media);
        this.enableScrollEvent();
        this.render();
    },
    Adverscroll.prototype.enableScrollEvent = function(){
      document.body.onscroll = function() {
        this.render();
      }.bind(this);
    },
    Adverscroll.prototype.render = function(){
      var pos = this.container.getBoundingClientRect();
      this.inner.style.clip =
        "rect(" + pos.top + "px,100vw," + pos.bottom + "px,0)";
    }

    var advert1 = Adverscroll("id1", "images/adverscroll.jpg", "www.google.com.mt");

})();
