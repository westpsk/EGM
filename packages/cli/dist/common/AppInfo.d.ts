export interface IAppInfoOptions {
    env?: string;
    $1?: string;
}
export declare class AppInfo {
    private options;
    constructor(options?: IAppInfoOptions);
    get startPoint(): string;
    get env(): string;
    private isSystemRootDir;
    private existsPackage;
    private __root;
    get root(): string;
    get config(): any;
    protected load(filename: string, defaultValue?: any): any;
    get package(): any;
    get tsConfig(): any;
    get tsConfigFile(): string;
    get name(): any;
    get jsEntry(): string;
    get tsEntry(): string;
    get srcPath(): any;
    get distPath(): any;
}
