// @TODO
// Validation
// Function to add attributes
// Improve code

// Fix multiple instances
// Comments
// Testing
// Setup for html
// Setup for video

(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["adverscroll"], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory(require("adverscroll"));
  } else {
    window.Adverscroll = factory();
  }
})(window, function() {
  var Adverscroll = function(config) {
    // Accept only string values for config
    for (const conf in config) {
      if (typeof config[conf] !== "string") {
        throw "Only strings are accepted in configuration.";
      }
    }
    // Insure img and url are set
    if (
      typeof config.image === "undefined" ||
      config.image.length <= 0 ||
      (typeof config.url === "undefined" || config.url.length <= 0)
    ) {
      throw "Configuration requires image and URL";
    }

    return new Adverscroll.init(config);
  };

  Adverscroll.init = function(config) {
    this.id = config.id || "adverscroll";
    this.image = config.image || "";
    this.url = config.url || "";
    this.topLabelText = config.topLabelText || "ADVERTISEMENT";
    this.bottomLabelText = config.bottomLabelText || "SCROLL TO CONTINUE";
    this.labelBgColour = config.labelBgColour || "#222";
    this.labelColour = config.labelColour || "#fff";
    this.marginTop = config.marginTop || 0;
  };

  Adverscroll.prototype = {
    createElements: function() {
      this.container = document.getElementById(this.id);

      var inner = document.createElement("div");
      inner.setAttribute("class", "isb-banner-core");
      this.inner = inner;

      var advert = document.createElement("div");
      advert.setAttribute("class", "isb-banner-advert");
      if (this.marginTop !== 0) {
        advert.style.marginTop = this.marginTop + "px";
      }
      this.advert = inner;

      var topLabel = document.createElement("div");
      topLabel.setAttribute("class", "isb-label isb-label-top");
      topLabel.style.backgroundColor = this.labelBgColour;
      topLabel.style.color = this.labelColour;
      topLabel.appendChild(document.createTextNode(this.topLabelText));

      var bottomLabel = document.createElement("div");
      bottomLabel.setAttribute("class", "isb-label isb-label-bottom");
      bottomLabel.style.backgroundColor = this.labelBgColour;
      bottomLabel.style.color = this.labelColour;
      bottomLabel.appendChild(document.createTextNode(this.bottomLabelText));

      this.container.appendChild(topLabel);
      this.container.appendChild(inner);
      inner.appendChild(advert);
      this.container.appendChild(bottomLabel);
    },
    addMedia: function() {
      var container = document.getElementById("inscroll-banner");
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
    },
    appendMedia: function() {
      this.advert.appendChild(this.media);
      this.enableScrollEvent();
      this.render();
    },
    enableScrollEvent: function() {
      document.body.onscroll = function() {
        this.render();
      }.bind(this);
    },
    render: function() {
      var pos = this.container.getBoundingClientRect();
      this.inner.style.clip =
        "rect(" + pos.top + "px,100vw," + pos.bottom + "px,0)";
    },
    apply: function() {
      this.createElements();
      this.addMedia();
      this.addUrl();
    }
  };

  Adverscroll.init.prototype = Adverscroll.prototype;

  return Adverscroll;
});
