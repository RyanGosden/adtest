// @TODO

// Fix multiple instances
// Testing

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['adverscroll'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('adverscroll'));
  } else {
    window.Adverscroll = factory();
  }
})(window, function() {
  var Adverscroll = function(config) {

    // Validation before creating object
    // Accept only string values for config
    for (const conf in config) {
      if (typeof config[conf] !== 'string') {
        throw 'Only strings are accepted in configuration.';
      }
    }

    // Insure mediaUrl, mediaType, and url are set
    if (
      typeof config.mediaUrl === 'undefined' ||
             config.mediaUrl.trim().length === 0 ||
      typeof config.mediaType === 'undefined' ||
             config.mediaType.trim().length === 0 ||
      typeof config.url === 'undefined' ||
             config.url.trim().length === 0
    ) {
      throw 'MediaUrl, MediaType and URL are required';
    }

    return new Adverscroll.init(config);
  };

  Adverscroll.init = function(config) {
    this.id = config.id || 'adverscroll';
    this.mediaUrl = config.mediaUrl || '';
    this.mediaType = config.mediaType || '';
    this.url = config.url || '';
    this.topLabelText = config.topLabelText || 'ADVERTISEMENT';
    this.bottomLabelText = config.bottomLabelText || 'SCROLL TO CONTINUE';
    this.labelBgColour = config.labelBgColour || '#222';
    this.labelColour = config.labelColour || '#fff';
    this.marginTop = config.marginTop || 0;
  };

  Adverscroll.prototype = {
    createContainer: function() {
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
    checkMediaType: function() {
      switch(this.mediaType) {
        case 'image':
          this.addImage();
          break;
        case 'video':
          this.addVideo();
          break;
        case 'iframe':
          this.addIframe();
          break;
      }
    },
    addImage: function() {
      var media = document.createElement('img');
      media.src = this.mediaUrl;
      media.addEventListener('load', this.appendMedia(media));
      this.addUrl();
    },
    addVideo: function() {
      var media = document.createElement('video'),
          source = document.createElement('source');

      source.type = 'video/mp4';
      source.src = this.mediaUrl;
      media.appendChild(source);
      media.setAttribute('controls', 'controls');
      media.addEventListener('load', this.appendMedia(media));
    },
    addIframe: function() {
      var media = document.createElement('iframe');
      media.src = this.mediaUrl;
      media.setAttribute('scrolling', 'no');
      media.addEventListener('load', this.appendMedia(media));
    },
    addUrl: function() {
      var url = document.createElement('a');
      url.href = this.url;
      url.target = '_blank';
      url.setAttribute('class', 'isb-link');
      this.advert.appendChild(url);
    },
    appendMedia: function(media) {
      this.advert.appendChild(media);
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
        'rect(' + pos.top + 'px,100vw,' + pos.bottom + 'px,0)';
    },
    apply: function() {
      this.createContainer();
      this.createLabels();
      this.checkMediaType();
    }
  };

  Adverscroll.init.prototype = Adverscroll.prototype;

  return Adverscroll;
});
