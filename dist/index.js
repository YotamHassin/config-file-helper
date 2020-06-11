"use strict";
// configHelper.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.initConfigObject = void 0;
// file object handle single object in file (flat object - no complex prop)
var filesHelper = require("./filesHelper");
// create proxie object from file handler
var proxyHelper_1 = require("./proxyHelper");
function initConfigObject(configFileName, defaultConfigObject) {
    var fileObjectHandler = filesHelper.FileObjectHandler._(configFileName, defaultConfigObject);
    var configObject = proxyHelper_1.getProxiedFileObject(fileObjectHandler);
    return configObject;
}
exports.initConfigObject = initConfigObject;
// private, Not to be changed, saved as default and backup for file.
var _configObject = {
    configFileName: "configObject.js",
    //init: undefined,
    someConfigProp: 'some',
};
var configObject = initConfigObject(_configObject.configFileName, _configObject);
