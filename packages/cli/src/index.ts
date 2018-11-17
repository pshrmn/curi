import commander from "commander";
import init from "./commands/init";
import install from "./commands/install";
import staticCommand from "./commands/static";

commander
  .command("init")
  .description("Create a Curi config module")
  .action(init);

commander.command("install").action(install);

commander
  .command("static <command>")
  .description("Static file generation")
  .action(staticCommand);

commander.parse(process.argv);
