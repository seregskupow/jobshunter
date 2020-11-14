const NextI18Next = require('next-i18next').default
const path = require('path')

module.exports = new NextI18Next({
  defaultLanguage:'ua',
  otherLanguages: ['ru'],
  defaultNS:'common',
  localeSubpaths:{
      ru:'ru'
  },
  localePath: path.resolve('./public/static/locales')
})