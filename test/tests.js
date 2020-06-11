
// tests.js

// https://www.npmjs.com/package/config-file-helper

const configHelper = require('config-file-helper');

// flat object, working fine.
const configFileObject = configHelper.initConfigObject('./configFileObject.js', { name: 'some name', val: 5 });

// not working! complex nested objects
//const configFileObjectComplex = configHelper.initConfigObject('./configFileObjectComplex.js', { name: 'some name', array: [{ innerName: 'some inner name' }] });

console.log('print configFileObject.name: ', configFileObject.name);

console.log('print configFileObject.val: ', configFileObject.val);
configFileObject.val+=5;
console.log('after update print configFileObject.val: ', configFileObject.val);

