const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const withPWA = require('next-pwa')
module.exports = withPlugins(
  [ 
    [withCSS,{}],
    [withSass, {}],
    [withPWA, {
      pwa: {
        dest: 'public'
      }
    }]
  ],
  {
    /* global config */
  }
)