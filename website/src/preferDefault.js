const preferDefault = importPromise =>
  importPromise.then(module => (module.default ? module.default : module));

export default preferDefault;
