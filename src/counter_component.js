import {Storage} from './local_storage';
import {Inject} from 'di/annotations';


// This is hack, because Traceur currently does not support annotations
// for inlined functions.
// We should use ES6 instead of `React.class()` anyway. Should be easy to do...
function __construct(storage: Storage) {
  // An instance of Storage is injected based on the type annotation.
  this.storage = storage;
}


var CounterComponent = React.createClass({
  __construct: __construct,

  getInitialState: function() {
    return {
      count: this.storage.get('count') || 0
    };
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

    // Not using JSX, because I wanna use ES6, transpiled with Traceur.
    // JSX supports some parts of ES6, but I wanna use Traceur because it supporsts ES6 modules
    // and also stuff like annotations and run-time type assertions.
    // Again, this could be figured out.
    return (
      React.DOM.div( {className: classes},
        React.DOM.button( {onClick:this.handleDecrement}, "-"),
        React.DOM.div(null, this.state.count),
        React.DOM.button( {onClick:this.handleIncrement}, "+")
      )
    );
  }
});

export {CounterComponent};
