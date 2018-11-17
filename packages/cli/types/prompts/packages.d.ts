export default function packagesPrompts(): Promise<{
    deps: {
        ui: string;
        history: string;
        interactions: string[];
        sideEffects: string[];
    };
    install: {
        deps: string[];
        devDeps: string[];
    };
}>;
