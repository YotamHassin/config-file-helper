"use strict";
// proxyHelper.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProxiedFileObject = void 0;
//export {  }
// ------------ ***** specified ***** ------------
/*
export interface initialObjType {
    //(logName: string): string;
    id: number;
    name: string;
}

const initialObj: initialObjType = {
    id: 1,
    name: 'Foo Bar'
}

const handler: ProxyHandler<initialObjType> = {
    get: function (obj, property) {
        console.log('A value has been accessed', [obj, property]);

        // Return the value stored in the key being accessed.
        //return obj[property];
        return 'some string not relevent to obj, property: ' + property.toString();
    }
}

export const proxiedObject: initialObjType = new Proxy(initialObj, handler);

//console.log(proxiedObject.name);
*/
// ------------ ***** generic file ***** ------------
// File Object Handler
function getFileProxyHandler(fileObjectHandler) {
    var handler = {
        get: function (obj, property, receiver) {
            var valFromFile = fileObjectHandler.getProp(property);
            //console.log('in get, ' + property.toString(), [valFromFile]);
            return valFromFile;
        },
        set: function (obj, property, value, receiver) {
            // set only config file
            var err = fileObjectHandler.setProp(property, value);
            if (err == undefined) {
                return true;
            }
            else {
                return false;
            }
            // we don't want to edit backup object anyway, only config file.
            //obj[property] = value;
        },
        has: function (obj, property) {
            return fileObjectHandler.has(property);
        },
        enumerate: function (obj) {
            //return oTarget.keys();
            return fileObjectHandler.enumerate();
        },
        deleteProperty: function (obj, property) {
            // delete only config file
            var err = fileObjectHandler.deleteProperty(property);
            if (err == undefined) {
                return true;
            }
            else {
                return false;
            }
        },
        defineProperty: function (obj, property, attributes) {
            return fileObjectHandler.defineProperty(property, attributes);
        },
        ownKeys: function (obj) {
            return fileObjectHandler.ownKeys();
        },
        getOwnPropertyDescriptor: function (obj, property) {
            var propertyDescriptor = fileObjectHandler.getOwnPropertyDescriptor(property);
            /* if (propertyDescriptor) {
                propertyDescriptor.value = fileObjectHandler.getProp(property);
            } */
            return propertyDescriptor;
        },
        getPrototypeOf: function (obj) {
            return fileObjectHandler.getPrototypeOf();
        },
    };
    return handler;
}
// File Object Proxy
function getProxiedFileObject(fileObjectHandler) {
    var handler = getFileProxyHandler(fileObjectHandler);
    var proxiedObject = new Proxy(fileObjectHandler.defaultObj, handler);
    return proxiedObject;
}
exports.getProxiedFileObject = getProxiedFileObject;
