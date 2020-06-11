"use strict";
// filesHelper.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileObjectHandler = exports.getFileJSON = exports.getFile = exports.writeJSONFileSync = exports.existsSync = void 0;
var fs = require("fs");
function existsSync(wantedPath) {
    if (wantedPath === void 0) { wantedPath = '.'; }
    return fs.existsSync(wantedPath);
}
exports.existsSync = existsSync;
// write | override file with string
function writeJSONFileSync(fullPath, data) {
    var str = JSON.stringify(data);
    fs.writeFileSync(fullPath, str);
}
exports.writeJSONFileSync = writeJSONFileSync;
//var fileName = "foo.txt";
function getFile(fillPath) {
    var data = fs.readFileSync(fillPath, "utf8");
    return data;
}
exports.getFile = getFile;
function getFileJSON(fillPath) {
    var fileData = getFile(fillPath);
    //console.log('fileData', fileData);
    return JSON.parse(fileData);
}
exports.getFileJSON = getFileJSON;
// file object handle single object in file (flat object - no complex prop)
//import { FileObjectHandler } from "../wrapper/files";
// Handle file object, object neets to be flat, no complex property
var FileObjectHandler = /** @class */ (function () {
    function FileObjectHandler(fileName, defaultObj) {
        this._fileName = fileName;
        this._defaultObj = defaultObj;
    }
    FileObjectHandler._ = function (fileName, defaultObj) {
        return new FileObjectHandler(fileName, defaultObj);
    };
    Object.defineProperty(FileObjectHandler.prototype, "fileName", {
        get: function () {
            return this._fileName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileObjectHandler.prototype, "defaultObj", {
        get: function () {
            return this._defaultObj;
        },
        enumerable: false,
        configurable: true
    });
    FileObjectHandler.prototype.setJSON = function (objFromFile) {
        writeJSONFileSync(this.fileName, objFromFile);
    };
    FileObjectHandler.prototype.initJSON = function () {
        this.setJSON(this.defaultObj);
    };
    // pure, can return undefined if parse failed
    FileObjectHandler.prototype.getJSON = function () {
        return getFileJSON(this.fileName);
    };
    FileObjectHandler.prototype.notExistInit = function () {
        // if not exist, init file
        if (!existsSync(this.fileName)) {
            this.initJSON();
        }
    };
    FileObjectHandler.prototype.get = function () {
        var fileJSON;
        // if not exist, init file
        this.notExistInit();
        // exist, take and parse.
        // can return undefined if parse failed
        fileJSON = this.getJSON();
        // if undefined(exist but not parse), set file to be default and get again
        if (fileJSON == undefined) {
            this.initJSON();
            // exist after init, get
            fileJSON = this.getJSON();
        }
        return fileJSON;
    };
    FileObjectHandler.prototype.getProp = function (property) {
        var objFromFile = this.get();
        //console.log('A value has been accessed', [objFromFile, property]);
        // Return the value stored in the key being accessed,
        var valFromFile = Reflect.get(objFromFile, property);
        // if undefined
        if (valFromFile == undefined) {
            // get-set from backup config file.
            var valFromBackup = Reflect.get(this.defaultObj, property);
            this.setProp(property, valFromBackup);
            valFromFile = valFromBackup;
        }
        return valFromFile;
    };
    FileObjectHandler.prototype.has = function (property) {
        var objFromFile = this.get();
        return Reflect.has(objFromFile, property);
    };
    FileObjectHandler.prototype.set = function (action) {
        var objFromFile = this.get();
        //action(objFromFile);
        Reflect.apply(action, objFromFile, [objFromFile]);
        this.setJSON(objFromFile);
    };
    FileObjectHandler.prototype.setProp = function (property, value) {
        this.set(function (objFromFile) {
            Reflect.set(objFromFile, property, value);
        });
    };
    FileObjectHandler.prototype.deleteProperty = function (property) {
        // delete only config file
        var err = this.set(function (objFromFile) {
            Reflect.deleteProperty(objFromFile, property);
        });
        return err;
    };
    FileObjectHandler.prototype.ownKeys = function () {
        var objFromFile = this.get();
        return Reflect.ownKeys(objFromFile);
    };
    FileObjectHandler.prototype.defineProperty = function (property, attributes) {
        var booly = false;
        this.set(function (objFromFile) {
            booly = Reflect.defineProperty(objFromFile, property, attributes);
        });
        return booly;
    };
    FileObjectHandler.prototype.getOwnPropertyDescriptor = function (property) {
        var objFromFile = this.get();
        var propertyDescriptor = Reflect.getOwnPropertyDescriptor(objFromFile, property);
        if (propertyDescriptor) {
            propertyDescriptor.value = this.getProp(property);
        }
        return propertyDescriptor;
    };
    FileObjectHandler.prototype.getPrototypeOf = function () {
        var objFromFile = this.get();
        return Reflect.getPrototypeOf(objFromFile);
    };
    FileObjectHandler.prototype.enumerate = function () {
        var objFromFile = this.get();
        return Reflect.ownKeys(objFromFile);
    };
    return FileObjectHandler;
}());
exports.FileObjectHandler = FileObjectHandler;
