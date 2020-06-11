// configHelper.ts

// file object handle single object in file (flat object - no complex prop)
import * as filesHelper from "./filesHelper";

// create proxie object from file handler
import { getProxiedFileObject } from "./proxyHelper";

export type PathLike = filesHelper.PathLike;

export function initConfigObject<ProxyTyp extends object>(configFileName: filesHelper.PathLike, defaultConfigObject: ProxyTyp): ProxyTyp {
	const fileObjectHandler = filesHelper.FileObjectHandler._<ProxyTyp>(configFileName, defaultConfigObject);

	const configObject: ProxyTyp = getProxiedFileObject<ProxyTyp>(fileObjectHandler);
	return configObject;
}


/* ----- flat example ----- */
/*
// No complex child, need different Proxy, can be in a different file (linked with new proxy to same object).
interface ConfigType {
	configFileName: string;
	//init: any;
	//(logName: string): string;
	someConfigProp: string;

}

// private, Not to be changed, saved as default and backup for file.
const _configObject: ConfigType = {
	configFileName: "configObject.js",
	//init: undefined,
	someConfigProp: 'some',
};

const configObject: ConfigType = initConfigObject<ConfigType>(_configObject.configFileName, _configObject);
*/
