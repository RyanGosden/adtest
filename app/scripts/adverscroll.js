// @TODO

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
    // Validation before creating object
    // Accept only string values for config
    for (const conf in config) {
      if (typeof config[conf] !== "string") {
        throw "Only strings are accepted in configuration.";
      }
    }
    // Insure img and url are set
    if (
      typeof config.image === "undefined" ||
      config.image.trim().length === 0 ||
      typeof config.url === "undefined" ||
      config.url.trim().length === 0
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
    createLabels: function() {
      var topLabel = document.createElement("div"),
          bottomLabel = document.createElement("div"),
          labels = [
          {
            el: topLabel,
            class: "isb-label isb-label-top",
            txt: this.topLabelText
          },
          {
            el: bottomLabel,
            class: "isb-label isb-label-bottom",
            txt: this.bottomLabelText
          }
      ];

      var createLabel = function(el, cls, txt) {
        el.setAttribute("class", cls);
        el.style.backgroundColor = this.labelBgColour;
        el.style.color = this.labelColour;
        el.appendChild(document.createTextNode(txt));
        this.container.appendChild(el);
      }.bind(this);

      labels.forEach(function(label){
          createLabel(label.el, label.class, label.txt);
      });
    },
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
      this.advert = advert;
      this.container.appendChild(inner);
      inner.appendChild(advert);
    },
    checkMediaType: function() {
      this.addImage();
    },
    addImage: function() {
      this.media = document.createElement("img");
      this.media.setAttribute("src", this.image);
      this.media.addEventListener("load", this.appendMedia.bind(this));
    },
    addHtml: function() {},
    addVideo: function() {},
    addUrl: function() {
      var mediaUrl = document.createElement("a");
      mediaUrl.setAttribute("href", this.url);
      mediaUrl.setAttribute("target", "_blank");
      mediaUrl.setAttribute("class", "isb-link");
      this.advert.appendChild(mediaUrl);
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
      this.createLabels();
      this.checkMediaType();
      this.addUrl();
    }
  };

  Adverscroll.init.prototype = Adverscroll.prototype;

  return Adverscroll;
});
