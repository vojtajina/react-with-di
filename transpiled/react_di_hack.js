define(['di/injector'], function($__0) {
  "use strict";
  var __moduleName = (void 0);
  var Injector = ($__0).Injector;
  var currentInjector;
  var getInjector = function() {
    if (!currentInjector) {
      currentInjector = new Injector();
    }
    return currentInjector;
  };
  var originalCreateClass = React.createClass;
  window.React.createClass = function(spec) {
    var clazz = originalCreateClass.apply(React, arguments);
    var UserConstructor = clazz.componentConstructor.prototype.__construct;
    if (typeof UserConstructor !== 'function') {
      return clazz;
    }
    UserConstructor.prototype = clazz.componentConstructor.prototype;
    UserConstructor.prototype.constructor = UserConstructor;
    var ConvenienceConstructor = function(props, children) {
      var instance = getInjector().get(UserConstructor);
      instance.construct.apply(instance, arguments);
      return instance;
    };
    ConvenienceConstructor.componentConstructor = UserConstructor;
    UserConstructor.ConvenienceConstructor = ConvenienceConstructor;
    ConvenienceConstructor.originalSpec = clazz.originalSpec;
    ConvenienceConstructor.type = UserConstructor;
    return ConvenienceConstructor;
  };
  return {};
});
