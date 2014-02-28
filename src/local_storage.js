// TODO(vojta): inject if we wanna mock it out easily
var windowLocalStorage = window.localStorage;

// A trivial wrapper around localStorage,
// just to demonstrate how an object can be injected into a component.
class Storage {
  get(key) {
    return JSON.parse(windowLocalStorage.getItem(key));
  }

  set(key, value) {
    return windowLocalStorage.setItem(key, JSON.stringify(value));
  }
}

export {Storage};
