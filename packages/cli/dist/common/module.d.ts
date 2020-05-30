/// <reference types="node" />
import { Stream } from "stream";
export declare function getInfo(name: string): Promise<any>;
export declare function getVersionInfo(name: string, version: string): Promise<any>;
export declare function saveFile(filename: string, readStream: Stream): Promise<unknown>;
export declare function createStream(url: string): Promise<NodeJS.ReadableStream>;
export declare function download(name: string, version?: string): Promise<string>;
export declare function extract(filename: string, dist: string, upIndex: number): Promise<any>;
export declare function initTemplate(name: string, dist: string): Promise<void>;
