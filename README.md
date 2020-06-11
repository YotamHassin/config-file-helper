
# config-file-helper
Config File That Helper, Take default object, Save it to the wanted file, and let you Change the file programmatically.

### [npmjs/config-file-helper](https://www.npmjs.com/package/config-file-helper)

### [github/YotamHassin/config-file-helper](https://github.com/YotamHassin/config-file-helper)


## Installation 
```sh
cd <my_location>
npm install config-file-helper --save
```

## Usage

Flat Object Only

### TypeScript
```typescript
import * as configHelper from 'config-file-helper';

// No complex child, need different Proxy, can be in a different file (linked with new proxy to same object).
interface ConfigType {
	name: string;
	val: number;
}

// Not to be changed, saved as default and backup for file.
const _configObject: ConfigType = {
	name: "some name",
	val: 5,
};

// flat object, working fine.
const configFileObject: ConfigType = configHelper.initConfigObject<ConfigType>('configObject.js', _configObject);

// not working! complex nested objects
//const configFileObjectComplex = configHelper.initConfigObject('./configFileObjectComplex.js', { name: 'some name', array: [{ innerName: 'some inner name' }] });

console.log('print configFileObject.name: ', configFileObject.name);

console.log('print configFileObject.val: ', configFileObject.val);
configFileObject.val+=5;
console.log('after update print configFileObject.val: ', configFileObject.val);

```



### JavaScript
```javascript
const configHelper = require('config-file-helper');

// flat object, working fine.
const configFileObject = configHelper.initConfigObject('./configFileObject.js', { name: 'some name', val: 5 });

// not working! complex nested objects
//const configFileObjectComplex = configHelper.initConfigObject('./configFileObjectComplex.js', { name: 'some name', array: [{ innerName: 'some inner name' }] });

console.log('print configFileObject.name: ', configFileObject.name);

console.log('print configFileObject.val: ', configFileObject.val);
configFileObject.val+=5;
console.log('after update print configFileObject.val: ', configFileObject.val);

```

## Join me on the quest to make Computer, Software and Development Simple.

## [Patreon/YotamHassin](https://www.patreon.com/YotamHassin)