import { Questions } from "inquirer";
export interface UIAnswers {
    ui: string;
}
export interface InteractionAnswers {
    active: boolean;
    ancestors: boolean;
    prefetch: boolean;
}
export interface SideEffectAnswers {
    ariaLive: boolean;
    scroll: boolean;
    title: boolean;
}
export interface HistoryAnswers {
    testing: boolean;
    ssr: boolean;
}
export declare const uiQuestions: Questions<UIAnswers>;
export declare const interactionQuestions: Questions<InteractionAnswers>;
export declare const sideEffectQuestions: Questions<SideEffectAnswers>;
export declare const webHistoryQuestions: Questions<HistoryAnswers>;
