module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/PokemonArgWeb/'
    : '/',

  transpileDependencies: [
    'vuetify'
  ]
}
