import {Injector} from 'di/injector';


// This is super lame. We should at least:
// - allow passing additional providers, so that the developer can override bindings,
// - manage child injectors to allow multiple instances ot the same class.
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

  // A component does not define __construct method,
  // no need to monkey-patch anything.
  if (typeof UserConstructor !== 'function') {
    return clazz;
  }

  // This is basically copy/pasted from React.createClass,
  // we give the real constructor back to the developer
  // and also inject the arguments.
  UserConstructor.prototype = clazz.componentConstructor.prototype;
  UserConstructor.prototype.constructor = UserConstructor;

  var ConvenienceConstructor = function(props, children) {
    // TODO(vojta):
    // It would be probably better to implement Injector.invoke()
    // and call constuct() first, so that all the stuff defined inside
    // construct() is already available in __construct().
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
