export default function prefer_default(module: any): Promise<any> {
  return module.default ? module.default : module;
}
