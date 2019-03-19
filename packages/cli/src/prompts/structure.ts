import { prompt } from "inquirer";

import fileQuestions from "../questions/init/files";

export default async function structurePrompts() {
  console.log("\nFiles\n");
  return await prompt(fileQuestions);
}
