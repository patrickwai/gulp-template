!function u(i,f,c){function l(r,n){if(!f[r]){if(!i[r]){var e="function"==typeof require&&require;if(!n&&e)return e(r,!0);if(s)return s(r,!0);var o=new Error("Cannot find module '"+r+"'");throw o.code="MODULE_NOT_FOUND",o}var t=f[r]={exports:{}};i[r][0].call(t.exports,function(n){return l(i[r][1][n]||n)},t,t.exports,u,i,f,c)}return f[r].exports}for(var s="function"==typeof require&&require,n=0;n<c.length;n++)l(c[n]);return l}({1:[function(o,n,r){(function(n,r){var e=o("uniq");o("./mymodule"),o("jquery");console.log(e([1,2,2,3,4,5,5,5,6])),console.log(n),console.log(r)}).call(this,"/app/js/index.js","/app/js")},{"./mymodule":2,jquery:"jquery",uniq:3}],2:[function(n,r,e){},{}],3:[function(n,r,e){"use strict";r.exports=function(n,r,e){return 0===n.length?n:r?(e||n.sort(r),function(n,r){for(var e=1,o=n.length,t=n[0],u=n[0],i=1;i<o;++i)if(u=t,r(t=n[i],u)){if(i===e){e++;continue}n[e++]=t}return n.length=e,n}(n,r)):(e||n.sort(),function(n){for(var r=1,e=n.length,o=n[0],t=n[0],u=1;u<e;++u,t=o)if(t=o,(o=n[u])!==t){if(u===r){r++;continue}n[r++]=o}return n.length=r,n}(n))}},{}]},{},[1]);
//# sourceMappingURL=index.js.map