/// <reference types="node" />
import * as fs from 'fs';
import * as helper from './helper';
export declare type PathLike = fs.PathLike;
export declare function existsSync(wantedPath?: fs.PathLike): boolean;
export declare function writeJSONFileSync(fullPath: fs.PathLike, data: any): void;
export declare function getFile(fillPath: fs.PathLike): any;
export declare function getFileJSON<Typ>(fillPath: fs.PathLike): Typ;
export declare class FileObjectHandler<DefaultObjTyp extends Object> {
    static _<DefaultObjTyp>(fileName: fs.PathLike, defaultObj: DefaultObjTyp): FileObjectHandler<DefaultObjTyp>;
    private _fileName;
    get fileName(): fs.PathLike;
    private _defaultObj;
    get defaultObj(): DefaultObjTyp;
    constructor(fileName: fs.PathLike, defaultObj: DefaultObjTyp);
    private setJSON;
    private initJSON;
    private getJSON;
    private notExistInit;
    get(): DefaultObjTyp;
    getProp(property: PropertyKey): any;
    has(property: PropertyKey): boolean;
    set(action: helper.ActionFunc<DefaultObjTyp>): void;
    setProp(property: PropertyKey, value: any): void;
    deleteProperty(property: PropertyKey): void;
    ownKeys(): PropertyKey[];
    defineProperty(property: PropertyKey, attributes: PropertyDescriptor): boolean;
    getOwnPropertyDescriptor(property: PropertyKey): PropertyDescriptor | undefined;
    getPrototypeOf(): object | null;
    enumerate(): PropertyKey[];
}
