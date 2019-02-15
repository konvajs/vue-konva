module.exports = {
  type: 'web-module',
  npm: {
    cjs: false,
    esModules: false,
    umd: {
      global: 'VueKonva',
      externals: {
        vue: 'Vue',
        konva: 'Konva'
      }
    }
  },
  // may be useful for debugging tests
  karma: {
    browsers: ['Chrome']
  }
};
