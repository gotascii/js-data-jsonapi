﻿
declare module JsonApiAdapter {

    export interface DSJsonApiAdapterOptions extends JSData.DSHttpAdapterOptions {
        log?: (message?: any, ...optionalParams: any[]) => void;
        error?: (message?: any, ...optionalParams: any[]) => void;

        http?: any;
        headers?: any;

        // If required pass json api specific options on here
        jsonApi?: any,

        // We can pass in an existing adapter rather than creating internally.
        // This can work better with js-data-angular
        adapter?: JSData.DSHttpAdapter
    }

    export interface DSJsonApiAdapter extends JSData.IDSAdapter {
        new (options: DSJsonApiAdapterOptions): DSJsonApiAdapter;

        // DSHttpAdapter uses axios so options are axios config objects.
        HTTP(options?: Object): JSData.JSDataPromise<JSData.DSHttpAdapterPromiseResolveType>;
        //DEL(url: string, data?: Object, options?: Object): JSData.JSDataPromise<JSData.DSHttpAdapterPromiseResolveType>;
        //GET(url: string, data?: Object, options?: Object): JSData.JSDataPromise<JSData.DSHttpAdapterPromiseResolveType>;
        //POST(url: string, data?: Object, options?: Object): JSData.JSDataPromise<JSData.DSHttpAdapterPromiseResolveType>;
        //PUT(url: string, data?: Object, options?: Object): JSData.JSDataPromise<JSData.DSHttpAdapterPromiseResolveType>;
    }

    export interface MetaLinkData {
        type: string;
        url: string;
    }

    export interface MetaLink {
        [relatioType: string]: MetaLinkData;
    }

    export interface JsonApiMetaData {
        isJsonApiReference: boolean;
        selfLink: string;
        relationships: { [relation: string]: MetaLink };
        relatedLink(relationName: string): JsonApiAdapter.MetaLinkData;
    }
}