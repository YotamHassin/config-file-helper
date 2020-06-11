import * as filesHelper from "./filesHelper";
export declare type PathLike = filesHelper.PathLike;
export declare function initConfigObject<ProxyTyp extends object>(configFileName: filesHelper.PathLike, defaultConfigObject: ProxyTyp): ProxyTyp;
