export declare function readDir(dir: string): Promise<string[]>;
export declare function rename(oldPath: string, newPath: string): Promise<string>;
export declare function deleteFile(dirPath: string): void;
export declare function isDirectory(dirPath: string): boolean;
export declare function deleteDir(dirPath: string): void;
