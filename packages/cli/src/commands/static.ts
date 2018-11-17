export default function staticCommand(command: string) {
  console.warn(`The static command is currently a placeholder`);

  switch (command) {
    case "init":
      console.log("Initializing");
      break;
    case "serve":
      console.log("Serving");
      break;
    case "build":
      console.log("Building");
      break;
    default:
      console.warn(`Invalid command "${command}".`);
      return;
  }

  return;
}
