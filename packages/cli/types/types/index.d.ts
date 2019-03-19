export interface CuriDependencies {
    ui: string | void;
    history: string;
    interactions: Array<string>;
    sideEffects: Array<string>;
}
export interface CuriConfigFiles {
    src: string;
    router: string;
    routes: string;
    components: string;
}
export interface CuriConfigStatic {
    output: string;
    scripts: string;
    copy: Array<string>;
}
export interface CuriConfig {
    files: CuriConfigFiles;
    static?: CuriConfigStatic;
    async: boolean;
}
