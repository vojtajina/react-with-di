### Using [React] with [di.js]

The point of this example is the [CounterComponent](https://github.com/vojtajina/react-with-di/blob/6b9b01a65233f4855c9fc6837f7bde152c52875d/src/counter_component.js#L15) and how it gets [LocalStorage](https://github.com/vojtajina/react-with-di/blob/6b9b01a65233f4855c9fc6837f7bde152c52875d/src/local_storage.js) injected based on an annotation.


The code is written in ES6 and transpiled with [Traceur]. There are also some additional (non-ES6) features of Traceur that I used, such as type annotation which is used by the Dependency Injection framework to figure out what to inject (it can also be used with [assert] library to do a runtime type checking). You could however write it in regular ES5, the only reason why I used ES6 was because I had gotten spoiled by having modules, classes, annotations and all the nice syntactic sugar...

```bash
# install all the deps
npm install

# transpile ES6
gulp build

# run the example
gulp serve
```


-------------------


Yesterday, I saw a presentation about React and I finally got to play with it a little bit. I think it's an interesting framework. I really like some of the concept such as:
- separating the state and treating it as immutable,
- good encapsulation of the components,
- strict separation of rendering.

At first I was terrified by JSX (it reminded me PHP+HTML) and also the need to learn/remember all the methods and syntax. Pretty soon I however realized that it was actually not that bad and after a while I felt pretty comfortable with it. I think it's good to think of React components as a sort of view controllers, I wouldn't put much logic in there, just the "view" logic.

It's a lot of typing and not as descriptive as I would like it to be. In fact, it feels very close to writing UI components with good old jQuery. I'd like to describe my app in a more declarative way, without the boilerplate to please the browser, language, framework or whateva. Besides that, I can see how I would write UI components with React and I can see why it works well for Facebook.

The main issue that was bothering me was the way all the pieces are wired together. The UI components are composed declaratively in HTML/JSX and communicate through passing props (parent->children) and events (children->parent). But if a component needs some JS service (let's say it wants to communicate with the server), there is no good solution. Most of the examples I saw  used shared global state or a RequireJS module with state in the module (which is global state too). Just look at the "A Component Using External Plugins" example at the [homepage] and how it uses Showdown. This is really hard to maintain and test. Yes, it's JavaScript, so you can monkey-patch everything, but you also need to cleanup between after every test and it will get really painful. 

Anyway, that's why I [hacked] this prototype of [React] with [di.js]. Now, each component just declares its dependencies and the injector takes care of instantiating everything:

- you don't need global state and therefore testing does not suck (easy mocking; no need to reset state and rather new instances of everything are created),
- you don't need to pass dependencies through your entire app.

I tried to explain why I think Dependency Injection makes sense in JavaScript in my [ng-conf talk] (in the first part, the rest is about Angular and di.js).

React is a view layer, not full-blown framework. There is no routing, storage, forms, blahblabla... but I don't think that's bad. It just means you can use other tools with React. For instance, one could use Backbone model with it pretty easily. Or maybe once we modularize Angular better (it's coming in v2), one could any of the Angular services and React as the view layer, if you like. Anyway, the point is that wiring it up with DI would make this much simpler...

Some more ideas to do:
- allow passing additional providers to override default bindings,
- use child injectors, so that it's possible to have instances "per component".


[React]: http://facebook.github.io/react/
[homepage]: http://facebook.github.io/react/
[ng-conf talk]: http://www.youtube.com/watch?v=_OGGsf1ZXMs
[di.js]: https://github.com/angular/di.js
[Traceur]: https://github.com/google/traceur-compiler
[assert]: https://github.com/angular/assert
[hacked]: https://github.com/vojtajina/react-with-di/blob/master/src/react_di_hack.js
