module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*', '!font-size*'],
      mediaQuery: false,
      minPixelValue: 12,
      selectorBlackList: ['unrem', 'mu', 'van']
    },
  }
}
