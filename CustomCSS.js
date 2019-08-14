  /**
   * Custom css inserted with js
   * @param innerCSS
   * @constructor
   */
  function CustomCSS(innerCSS) {
    if (typeof innerCSS === 'object') {
      var finalString = '';
      var keys = Object.keys(innerCSS);
      keys.forEach(function (key) {
        var properties = innerCSS[key];
        var propertyKeys = Object.keys(properties);
        var propertyKeysRenamed = propertyKeys.map(function (value) {
          return value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        });
        var temp = '';
        propertyKeys.forEach(function (value, index) {
          temp += '\t' + propertyKeysRenamed[index] + ': ' + properties[value] + ';\r\n';
        });
        var subString = key + ' {\r\n' + temp + '} \r\n';
        finalString += subString + '\r\n';
      });
      this.stringInit(finalString);
    }

    if (typeof innerCSS === 'string') {
      this.stringInit(innerCSS);
    }
  }

  CustomCSS.prototype.stringInit = function(innerCSS) {
    this.innerCSS = innerCSS;
    this.DOMElement = document.createElement('style');
    this.DOMElement.appendChild(document.createTextNode(this.innerCSS));
    var head = document.head || document.getElementsByTagName('head')[0];
    head.appendChild(this.DOMElement);
  };

  CustomCSS.prototype.add = function(css) {
    this.innerCSS += css;
  };

  CustomCSS.prototype.update = function () {
    this.DOMElement.appendChild(document.createTextNode(this.innerCSS));
  };

  CustomCSS.prototype.destroy = function () {
    this.DOMElement.parentNode.removeChild(this.DOMElement);
  };
