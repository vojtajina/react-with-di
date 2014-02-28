define([], function() {
  "use strict";
  var __moduleName = (void 0);
  var windowLocalStorage = window.localStorage;
  var Storage = function Storage() {};
  ($traceurRuntime.createClass)(Storage, {
    get: function(key) {
      return JSON.parse(windowLocalStorage.getItem(key));
    },
    set: function(key, value) {
      return windowLocalStorage.setItem(key, JSON.stringify(value));
    }
  }, {});
  ;
  return {
    get Storage() {
      return Storage;
    },
    __transpiledModule: true
  };
});
