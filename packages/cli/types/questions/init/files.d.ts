import { Questions } from "inquirer";
export interface FileAnswers {
    dir: string;
    routes: string;
    components: string;
}
declare const questions: Questions;
export default questions;
