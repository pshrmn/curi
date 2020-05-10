let preferDefault = (module: any): Promise<any> => {
  return module.default ? module.default : module;
};

export default preferDefault;
