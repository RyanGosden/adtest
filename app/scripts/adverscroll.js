(function() {
  var adverscroll = {
    init: function() {
      this.createElements();
      this.cacheDom();
      this.addMedia();
      this.addUrl();
    },
    createElements: function(){
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


    },
    cacheDom: function() {
        // (this.container = document.getElementById("inscroll-banner")),
        // (this.inner = document.getElementById("banner-core")),
        // (this.advert = document.getElementById("inscroll-advert")),
        // (this.image = this.advert.getAttribute("data-image")),
        // (this.url = this.advert.getAttribute("data-url"));
         this.image = '/images/adverscroll.jpg';
         this.url = '/image/adverscroll.jpg';
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


//
// <!-- <div class="isb-label isb-label-top">ADVERTISEMENT</div>
// <div class="isb-banner-core"id="banner-core">
//   <div class="isb-banner-advert"
//     id="inscroll-advert"
//     data-image="/images/adverscroll.jpg"
//     data-url="<?php echo $ad_takeover_url;?>">
//   </div>
// </div>
// <div class="isb-label isb-label-bottom">SCROLL TO CONTINUE</div> -->
