const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const withPWA = require('next-pwa')
const withSvgr = require("next-svgr");
const { nextI18NextRewrites } = require('next-i18next/rewrites')

const localSubPaths = {
  ru:'ru'
}
module.exports = withPlugins(
  [ 
    withSvgr,
    [withCSS,{}],
    [withSass, {}],
    [withPWA, {
      pwa: {
        dest: 'public'
      }
    }]
  ],
  {
    
    rewrites:async () => nextI18NextRewrites(localSubPaths),
    env:{
      GOOGLE_ID:process.env.GOOGLE_ID,
      FACEBOOK_ID:process.env.FACEBOOK_ID
    }
  }
)