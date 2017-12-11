(function() {
  var adverscroll = {
    init: function() {
      this.cacheDom();
      this.addMedia();
      this.addUrl();
    },
    cacheDom: function() {
        (this.container = document.getElementById("inscroll-banner")),
        (this.inner = document.getElementById("banner-core")),
        (this.advert = document.getElementById("inscroll-advert")),
        (this.image = this.advert.getAttribute("data-image")),
        (this.url = this.advert.getAttribute("data-url"));
    },

    appendMedia: function() {
      this.advert.appendChild(this.media);
      this.enableScrollEvent();
      this.render();
    },
    enableScrollEvent: function() {
      document.body.onscroll = function() {
        adverscroll.render();
      };
    },
    render: function() {
      var pos = this.container.getBoundingClientRect();
      this.inner.style.clip =
        "rect(" + pos.top + "px,100vw," + pos.bottom + "px,0)";
    },
    addMedia: function() {
      this.media = document.createElement("img");
      this.media.setAttribute("src", this.image);
      this.media.addEventListener("load", this.appendMedia.bind(this));
    },
    addUrl: function() {
      this.mediaUrl = document.createElement("a");
      this.mediaUrl.setAttribute("href", this.url);
      this.mediaUrl.setAttribute("target", "_blank");
      this.mediaUrl.setAttribute("class", "isb-link");
      this.advert.appendChild(this.mediaUrl);
    }
  };

  adverscroll.init();
})();
