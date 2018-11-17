export interface CuriDependencies {
  ui: string | void;
  history: string;
  interactions: Array<string>;
  sideEffects: Array<string>;
}

export interface CuriConfigFiles {
  // name of directory for src files (relative to project root)
  src: string;
  // name of file where router is created (relative to src)
  router: string;
  // name of file where routes array is created (relative to src)
  routes: string;
  // name of directory where route components are stored (relative to src)
  components: string;
}

export interface CuriConfigStatic {
  output: string;
  scripts: string;
  copy: Array<string>;
}

export interface CuriConfig {
  files: CuriConfigFiles;
  static?: CuriConfigStatic;
  async: boolean;
}
