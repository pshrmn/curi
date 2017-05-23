import Link from './Link';
import Redirect from './Redirect';

const CuriPlugin = {
  install: function(_Vue, options) {
    _Vue.component(Link.name, Link);
    _Vue.component(Redirect.name, Redirect);

    _Vue.mixin({
      created: function() {
        this.$curi = options.config;
      }
    });
  }
};

export default CuriPlugin;
