/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

const { registerResolvers } = require('gatsby-source-prismic-graphql');
const { linkResolver } = require('./src/prismic/linkResolver');

const componentResolver = (doc) => {
  console.log('component resolver')
  if(doc.type === 'blogpos') return require('./src/components/blogpost')
}

registerResolvers(linkResolver, componentResolver);