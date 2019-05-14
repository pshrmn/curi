(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{44:function(e,t,n){"use strict";n.r(t),n.d(t,"component",function(){return d}),n.d(t,"contents",function(){return u});var o=n(0),a=n.n(o),l=n(22),r={title:"Code Splitting"},i={title:"An app without code splitting",hash:"no-split"},c={title:"import() in resolve",hash:"import"},s={title:"Other Approaches",hash:"other"},u=[i,c,s];function d(){return a.a.createElement(a.a.Fragment,null,a.a.createElement(l.f,null,a.a.createElement("h1",null,r.title),a.a.createElement("p",null,"If you are bundling an application with a lot of routes, users of your application may be downloading a lot of unnecessary content for the initial page render. Using code splitting, you can reduce the initial download size for your application by splitting code that is conditionally loaded into a separate bundle that is only downloaded when it is needed."),a.a.createElement(l.e,null,a.a.createElement("p",null,"This guide assumes that you are using Webpack 2+ to bundle your application."))),a.a.createElement(l.c,{meta:i},a.a.createElement("p",null,"Let's start out by describing our application's routes without code splitting. We will import each route's component from the files where they are defined."),a.a.createElement(l.b,null,"import Home from './components/Home';\nimport Contact from './components/Contact';\nimport ContactMethod from './components/ContactMethod';\n\nconst routes = prepareRoutes([\n  {\n    name: 'Home',\n    path: '',\n    respond: () => {\n      return {\n        body: Home\n      };\n    }\n  },\n  {\n    name: 'Contact',\n    path: 'contact',\n    respond: () => {\n      return {\n        body: Contact\n      };\n    },\n    children: [\n      {\n        name: 'Contact Method',\n        path: ':method',\n        respond: () => {\n          return {\n            body: ContactMethod\n          };\n        }\n      }\n    ]\n  }\n]);")),a.a.createElement(l.c,{meta:c},a.a.createElement("p",null,"Instead of having static imports, we will use the dynamic"," ",a.a.createElement(l.d,null,"import")," function to import our modules. We will import our components using a route's ",a.a.createElement(l.d,null,"resolve")," object."),a.a.createElement("p",null,"A route's ",a.a.createElement(l.d,null,"resolve")," function is called every time it matches. However, ",a.a.createElement(l.d,null,"import")," calls automatically re-use the results of a previous call, so we do not have to worry about extra network requests."),a.a.createElement("p",null,"A route's ",a.a.createElement(l.d,null,"resolve")," function should return a Promise;"," ",a.a.createElement(l.d,null,"import"),", conveniently, returns a Promise. In our"," ",a.a.createElement(l.d,null,"respond")," function, instead of referencing values imported at the top of the file, we can reference the result of the"," ",a.a.createElement(l.d,null,"resolve")," function using the ",a.a.createElement(l.d,null,"resolved")," property passed to the ",a.a.createElement(l.d,null,"respond")," function."),a.a.createElement("p",null,a.a.createElement(l.d,null,"import")," resolves with a module object. If the component is a default export (",a.a.createElement(l.d,null,"export default MyComponent"),"), we can access the component through the imported module object's ",a.a.createElement(l.d,null,"default")," ","property."),a.a.createElement(l.b,null,"const routes = prepareRoutes([\n  {\n    name: 'Home',\n    path: '',\n    resolve() {\n      return import('./components/Home')\n        .then(module => module.default);\n    },\n    respond: ({ resolved }) => {\n      return {\n        body: resolved\n      };\n    }\n  },\n  {\n    name: 'Contact',\n    path: 'contact',\n    resolve() {\n      return import('./components/Contact')\n        .then(module => module.default);\n    },\n    respond: ({ resolved }) => {\n      return {\n        body: resolved\n      };\n    },\n    children: [\n      {\n        name: 'Contact Method',\n        path: ':method',\n        resolve() {\n          return import('./components/ContactMethod')\n            .then(module => module.default);\n        },\n        respond: ({ resolved }) => {\n          return {\n            body: resolved\n          };\n        }\n      }\n    ]\n  }\n]);")),a.a.createElement(l.c,{meta:s},a.a.createElement("p",null,"The approaches taken here are not the only way to do code splitting. Another approach is to skip the ",a.a.createElement(l.d,null,"resolve")," method and do code splitting at other points in your application (e.g.",a.a.createElement("a",{href:"https://reactjs.org/docs/react-api.html#reactlazy"},a.a.createElement(l.d,null,"React.lazy")),")."),a.a.createElement("p",null,"Whatever path you decide to go, hopefully this has shown you that setting up code splitting with a ",a.a.createElement(l.d,null,"resolve")," function is fairly simple to do. If you are using Webpack and want to reduce your initial bundle size, using dynamic ",a.a.createElement(l.d,null,"import")," calls in a"," ",a.a.createElement(l.d,null,"resolve")," functions is a good way to accomplish this.")))}}}]);