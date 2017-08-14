const plugins = [
  'transform-object-rest-spread',
  'syntax-async-functions',
  'transform-regenerator'
];

const BABEL_ENV = process.env.BABEL_ENV

if (BABEL_ENV === 'build') {
  plugins.push('syntax-dynamic-import');
} else if (BABEL_ENV === 'serve') {
  plugins.push('dynamic-import-node');
}

const config = {
  presets: [
    'react',
    [
      'env',
      {
        modules: 'commonjs',
        targets: {
          browsers: ['> 1%']
        }
      }
    ]
  ],
  plugins
};

module.exports = config;
