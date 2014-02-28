define(['./local_storage', 'di/annotations'], function($__0,$__1) {
  "use strict";
  var __moduleName = (void 0);
  var Storage = ($__0).Storage;
  var Inject = ($__1).Inject;
  function __construct(storage) {
    this.storage = storage;
  }
  __construct.parameters = [[Storage]];
  var CounterComponent = React.createClass({
    __construct: __construct,
    getInitialState: function() {
      return {count: this.storage.get('count') || 0};
    },
    setCount: function(value) {
      this.setState({count: value});
      this.storage.set('count', value);
    },
    handleIncrement: function(event) {
      this.setCount(this.state.count + 1);
    },
    handleDecrement: function(event) {
      this.setCount(this.state.count - 1);
    },
    render: function() {
      var classes = 'counter ' + (this.state.count >= 0 ? 'positive' : 'negative');
      return (React.DOM.div({className: classes}, React.DOM.button({onClick: this.handleDecrement}, "-"), React.DOM.div(null, this.state.count), React.DOM.button({onClick: this.handleIncrement}, "+")));
    }
  });
  ;
  return {
    get CounterComponent() {
      return CounterComponent;
    },
    __transpiledModule: true
  };
});
