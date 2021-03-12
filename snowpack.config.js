module.exports = {
  // build options? using es build
  optimize: {
    bundle: true,
    minify: true,
    target: 'es2018',
  },

  mount: {
    public: '/',
  },

  plugins: [
    // '@snowpack/plugin-svelte',
    ['@snowpack/plugin-sass', {}],
    ['@marlonmarcello/snowpack-plugin-pug', {}],
    '@snowpack/plugin-postcss',
  ],

  devOptions: {
    port: 9001,
    open: 'none',
  },

  buildOptions: {
    baseUrl: './',
  },
}
