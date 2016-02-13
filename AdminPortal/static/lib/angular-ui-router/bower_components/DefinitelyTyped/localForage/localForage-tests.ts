﻿/// <reference path="localForage.d.ts" />

declare var localForage: lf.ILocalForage<string>;
declare var callback: lf.ICallback<string>;
declare var iterateCallback: lf.IIterateCallback<string>;
declare var errorCallback: lf.IErrorCallback;
declare var keyCallback: lf.IKeyCallback;
declare var keysCallback: lf.IKeysCallback;
declare var numberCallback: lf.INumberCallback;
declare var promise: lf.IPromise<string>;

() => {
    localForage.clear((err: any) => {
        var newError: any = err;
    });

    localForage.iterate((str: string, key: string, num: number) => {
        var newStr: string = str;
        var newKey: string = key;
        var newNum: number = num;
    });

    localForage.length((err: any, num: number) => {
        var newError: any = err;
        var newNumber: number = num;
    });

    localForage.key(0,(err: any, value: string) => {
        var newError: any = err;
        var newValue: string = value;
    });

    localForage.keys((err: any, keys: Array<string>) => {
        var newError: any = err;
        var newArray: Array<string> = keys;
    });

    localForage.getItem("key",(err: any, str: string) => {
        var newError: any = err;
        var newStr: string = str
    });

    localForage.getItem("key").then((err: any, str: string) => {
        var newError: any = err;
        var newStr: string = str
    });
  
    localForage.setItem("key", "value",(err: any, str: string) => {
        var newError: any = err;
        var newStr: string = str
    });

    localForage.setItem("key", "value").then((err: any, str: string) => {
        var newError: any = err;
        var newStr: string = str;
    });
  
    localForage.removeItem("key",(err: any) => {
        var newError: any = err;
    });

    localForage.removeItem("key").then((err: any, str: string) => {
        var newError: any = err;
        var newStr: string = str
    });
  
    promise.then(callback);
}