(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{22:function(e,n,t){"use strict";var r=t(4),a=t(12),c=(t(15),t(10)),o=t(0),l=t.n(o),i={title:"On GitHub",hash:"source"};function d(e){var n=e.path,t=e.repo,a=void 0===t||t?"https://github.com/pshrmn/curi/tree/master/examples/".concat(n):n;return l.a.createElement(r.a,{meta:i,tag:"h2"},l.a.createElement("p",null,"If you want to run this code locally, the source code is available"," ",l.a.createElement("a",{href:a},"on GitHub"),"."))}var u=t(24),s=t(2);t(26),t(29);var f=0,b=function(){var e=Object(o.useState)(null),n=e[0],t=e[1];return Object(o.useEffect)(function(){return t(++f)},[]),n},p=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e};function h(e,n){var t={};for(var r in e)n.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}var _=Object(o.forwardRef)(function(e,n){var t=e.children,r=e.as,a=void 0===r?"div":r,c=e.onChange,i=e.index,d=void 0===i?void 0:i,u=e.readOnly,s=void 0!==u&&u,f=e.defaultIndex,_=h(e,["children","as","onChange","index","readOnly","defaultIndex"]),m=Object(o.useRef)(null!=d).current,v=b(),y=Object(o.useRef)(!1),O=Object(o.useRef)(null),R=Object(o.useState)(f||0),w=R[0],E=R[1],j=l.a.Children.map(t,function(e){return"string"==typeof e.type?e:Object(o.cloneElement)(e,{selectedIndex:m?d:w,_id:v,_userInteractedRef:y,_selectedPanelRef:O,_onFocusPanel:function(){return O.current&&O.current.focus()},_onSelectTab:s?function(){}:function(e){y.current=!0,c&&c(e),m||E(e)}})});return l.a.createElement(a,p({"data-reach-tabs":"",ref:n},_,{children:j}))}),m=Object(o.forwardRef)(function(e,n){var t,r,a=e.children,c=e.as,i=void 0===c?"div":c,d=e.onKeyDown,u=h(e,["children","as","onKeyDown"]),s=u.selectedIndex,f=u._onSelectTab,b=u._userInteractedRef,_=u._onFocusPanel,m=(u._selectedPanelRef,u._id),v=h(u,["selectedIndex","_onSelectTab","_userInteractedRef","_onFocusPanel","_selectedPanelRef","_id"]),y=l.a.Children.map(a,function(e,n){return Object(o.cloneElement)(e,{isSelected:n===s,_id:R(m,n),_userInteractedRef:b,_onSelect:function(){return f(n)}})}),O=(t=d,r=function(e){var n=l.a.Children.map(a,function(e,n){return!0===e.props.disabled?null:n}).filter(function(e){return null!=e}),t=n.indexOf(s);switch(e.key){case"ArrowRight":var r=n[(t+1)%n.length];f(r);break;case"ArrowLeft":var c=n.length,o=n[(t-1+c)%c];f(o);break;case"ArrowDown":e.preventDefault(),_();break;case"Home":f(0);break;case"End":f(l.a.Children.count(a)-1)}},function(e){if(t&&t(e),!e.defaultPrevented)return r(e)});return l.a.createElement(i,p({"data-reach-tab-list":"",ref:n,role:"tablist",onKeyDown:O,children:y},v))}),v=Object(o.forwardRef)(function(e,n){var t,r,a,c=e.children,i=e.as,d=void 0===i?"button":i,u=h(e,["children","as"]),s=u.isSelected,f=u._userInteractedRef,b=u._onSelect,_=u._id,m=h(u,["isSelected","_userInteractedRef","_onSelect","_id"]),v=Object(o.useRef)(null),y=n||v;return t=function(){s&&y.current&&f.current&&(f.current=!1,y.current.focus())},r=[s],a=Object(o.useRef)(!1),Object(o.useEffect)(function(){a.current?t():a.current=!0},r),l.a.createElement(d,p({"data-reach-tab":"",ref:y,role:"tab",id:"tab:"+_,tabIndex:s?0:-1,"aria-selected":s,"aria-controls":"panel:"+_,"data-selected":s?"":void 0,onClick:b,children:c},m))}),y=Object(o.forwardRef)(function(e,n){var t=e.children,r=e.as,a=void 0===r?"div":r,c=h(e,["children","as"]),i=c.selectedIndex,d=c._selectedPanelRef,u=(c._userInteractedRef,c._onFocusPanel,c._onSelectTab,c._id),s=h(c,["selectedIndex","_selectedPanelRef","_userInteractedRef","_onFocusPanel","_onSelectTab","_id"]),f=l.a.Children.map(t,function(e,n){return Object(o.cloneElement)(e,{isSelected:n===i,_selectedPanelRef:d,_id:R(u,n)})});return l.a.createElement(a,p({"data-reach-tab-panels":"",ref:n},s,{children:f}))}),O=Object(o.forwardRef)(function(e,n){var t=e.children,r=e.as,a=void 0===r?"div":r,c=h(e,["children","as"]),o=c.isSelected,i=c._selectedPanelRef,d=c._id,u=h(c,["isSelected","_selectedPanelRef","_id"]);return l.a.createElement(a,p({"data-reach-tab-panel":"",ref:o?i:void 0,role:"tabpanel",tabIndex:-1,"aria-labelledby":"tab:"+d,hidden:!o,id:"panel:"+d,children:t},u))});var R=function(e,n){return e+":"+n},w=Object(s.a)(_,{target:"eljl82w0",label:"StyledTabs"})({name:"y5qusc",styles:"[data-reach-tab-panel]{outline:none;}[data-reach-tab-list]{display:flex;background:hsla(0,0%,0%,0.05);}[data-reach-tab]{display:inline-block;border:none;padding:0.25em 0.5em;margin:0;background:none;color:inherit;font:inherit;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;border-bottom:solid 1px transparent;}[data-reach-tab]:active{background:hsla(0,0%,0%,0.05);}[data-reach-tab]:disabled{opacity:0.25;cursor:default;}[data-reach-tab][data-selected]{border-bottom-color:inherit;}"});function E(e){var n=e.sandboxes;return l.a.createElement(w,null,l.a.createElement(m,null,n.map(function(e){return l.a.createElement(v,{key:e.name},e.name)})),l.a.createElement(y,null,n.map(function(e){return l.a.createElement(O,{key:e.id},l.a.createElement(u.a,e))})))}t.d(n,"d",function(){return r.a}),t.d(n,"b",function(){return a.a}),t.d(n,"e",function(){return c.b}),t.d(n,"a",function(){return c.a}),t.d(n,"c",function(){return u.a}),t.d(n,"f",function(){return E}),t.d(n,"g",function(){return d}),t.d(n,"h",function(){return i})},26:function(e,n,t){e.exports=t(27)()},27:function(e,n,t){"use strict";var r=t(28);function a(){}function c(){}c.resetWarningCache=a,e.exports=function(){function e(e,n,t,a,c,o){if(o!==r){var l=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw l.name="Invariant Violation",l}}function n(){return e}e.isRequired=e;var t={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:n,element:e,elementType:e,instanceOf:n,node:e,objectOf:n,oneOf:n,oneOfType:n,shape:n,exact:n,checkPropTypes:c,resetWarningCache:a};return t.PropTypes=t,t}},28:function(e,n,t){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},29:function(e,n,t){"use strict";var r=function(){};e.exports=r}}]);