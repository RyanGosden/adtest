// @TODO
// Fix multiple instances
// Testing
(function (root, factory) {
    if(typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if(typeof define === 'function' && define.amd)
        define("adverscroll", [], factory);
    else if(typeof exports === 'object')
        exports["adverscroll"] = factory();
    else
        root["Adverscroll"] = factory();
})(window, function() {

    var Adverscroll = function(config) {
        // Validation before creating object
        // Accept only string values for config
        for (var conf in config) {
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

            var inner = document.createElement('div');
            inner.setAttribute('class', 'isb-inner');

            var clipper = document.createElement('div');
            clipper.setAttribute('class', 'isb-clipper');

            var content = document.createElement('div');
            content.setAttribute('class', 'isb-content');
            this.content = content;

            this.container.appendChild(inner);
            inner.appendChild(clipper);
            clipper.appendChild(this.content);
        },
        createLabels: function() {
            var topLabel = document.createElement('div'),
                bottomLabel = document.createElement('div'),
                labels = [
                    {
                        el: topLabel,
                        class: 'isb-label isb-label-top',
                        txt: this.topLabelText
                    },
                    {
                        el: bottomLabel,
                        class: 'isb-label isb-label-bottom',
                        txt: this.bottomLabelText
                    }
                ];

            var createLabel = function(el, cls, txt) {
                el.setAttribute('class', cls);
                el.style.backgroundColor = this.labelBgColour;
                el.style.color = this.labelColour;
                el.appendChild(document.createTextNode(txt));
                this.container.appendChild(el);
            }.bind(this);

            labels.forEach(function(label) {
                createLabel(label.el, label.class, label.txt);
            });
        },
        checkMediaType: function() {
            switch (this.mediaType) {
                case 'image':
                    this.addImage();
                    break;
                case 'iframe':
                    this.addIframe();
                    break;
            }
        },
        addImage: function() {
            var media = document.createElement('img');
            media.src = this.mediaUrl;
            if (this.marginTop !== 0) {
                media.style.marginTop = this.marginTop + 'px';
            }
            media.addEventListener('load', this.appendMedia(media));
            this.addUrl();
        },
        addUrl: function() {
            var url = document.createElement('a');
            url.href = this.url;
            url.target = '_blank';
            url.setAttribute('class', 'isb-link');
            this.content.appendChild(url);
        },
        appendMedia: function(media) {
            this.content.appendChild(media);
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
