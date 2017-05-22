// // FIRST ATTEMPT
// require('babel-register')();

// let jsdom = require('jsdom');

// let JSDOMFunc = jsdom.JSDOM;
// // console.log('JSDOMFunc: ', JSDOMFunc)
// // import JSDOM from 'jsdom';
// // let jsdom = JSDOM.jsdom;

// let exposedProperties = ['window', 'navigator', 'document'];

// global.document = new jsdom.JSDOM('');
// global.window = document.defaultView;

// console.log(global);

// // console.log(global.window);
// // console.log(Object.keys(global.window))

// // Object.keys(document.defaultView).forEach((property) => {
// //   if (typeof global[property] === 'undefined') {
// //     exposedProperties.push(property);
// //     global[property] = document.defaultView[property];
// //   }
// // });

// global.navigator = {
//   userAgent: 'node.js'
// };

// documentRef = document;


// SECOND ATTEMPT

// var jsdom = require('jsdom').jsdom;

// global.document = jsdom('');
// global.window = document.defaultView;
// Object.keys(document.defaultView).forEach((property) => {
//   if (typeof global[property] === 'undefined') {
//     global[property] = document.defaultView[property];
//   }
// });

// global.navigator = {
//   userAgent: 'node.js'
// };

// THIRD ATTEMPT

// var jsdom = require('jsdom')
// import jsdom from 'jsdom';

// console.log(jsdom.JSDOM);

// // setup the simplest document possible
// var doc = jsdom('<!doctype html><html><body></body></html>')

// // get the window object out of the document
// var win = doc.defaultView

// // set globals for mocha that make access to document and window feel 
// // natural in the test environment
// global.document = doc
// global.window = win

// // take all properties of the window object and also attach it to the 
// // mocha global object
// propagateToGlobal(win)

// // from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
// function propagateToGlobal (window) {
//   for (let key in window) {
//     if (!window.hasOwnProperty(key)) continue
//     if (key in global) continue

//     global[key] = window[key]
//   }
// }


//     "test": "mocha --require client/tests/setup.js --compilers js:babel-register --watch-extensions js client/tests/**/*.spec.js",

// require('babel-register')();

// // const canvas = require('canvas');

// const jsdom = require('jsdom');
// console.log(jsdom);
// const document = new jsdom.JSDOM();
// console.log(document.defaultView);
// const window = document.defaultView;

// // const canvasMethods = ['HTMLCanvasElement'];

// Object.keys(window).forEach(property => {
//   if (typeof global[property] === 'undefined') {
//     global[property] = window[property];
//   }
// });

// // canvasMethods.forEach(method =>
// //   global[method] = window[method]
// // );

// // global['CanvasRenderingContext2D'] = canvas.Context2d;

// global.navigator = {
//  userAgent: 'node.js'
// };

// FOURTH ATTEMPT

// require('babel-register')();

// var jsdom = require('jsdom').JSDOM;

// console.log(jsdom);

// // import { jsdom } from 'jsdom';

// var exposedProperties = ['window', 'navigator', 'document'];

// const dom = new jsdom('<html><body></body></html>');
// // "Hello world"
// // console.log(dom.defaultView);
// // console.log('^^^ dom.default view\n vvvv dom.window');
// // console.log(dom.window);

// // global.document = new jsdom('<html><body></body></html>');
// global.window = dom.window;
// global.document = dom.document;

// // Object.keys(document.defaultView).forEach((property) => {
// //   if (typeof global[property] === 'undefined') {
// //     exposedProperties.push(property);
// //     global[property] = document.defaultView[property];
// //   }
// // });

// global.navigator = {
//   userAgent: 'node.js'
// };

// // FIFTH ATTEMPT

// console.log('\n\n\n\n\nin setup\n\n\n\n\n\n\n');

// import mochaJsdom from 'mocha-jsdom';

// export const mockDOM = () => {
// 	console.log('before if\n\n\n\n')
//   if (typeof document !== 'undefined') return;

//   const jsdom = require('jsdom').jsdom;

//   global.document = jsdom('<html><body></body></html>');
//   global.window = document.defaultView;
//   global.navigator = { userAgent: 'node.js' };
//   console.log('\n\n\nsometext\n\n\n', window);
// }

// export const setupDOM = () => {
//   mochaJsdom({ skipWindowCheck: true });
// }

// SIXTH ATTEMPT

const { JSDOM } = require('jsdom');
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js'
};
copyProps(window, global);