export default function preferDefault(module: any): Promise<any> {
  return module.default ? module.default : module;
}
