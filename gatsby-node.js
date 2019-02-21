/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)

const { registerResolvers } = require('gatsby-source-prismic-graphql');
const { linkResolver } = require('./src/prismic/linkResolver');
const { graphql } = require('gatsby')
const gql = require('graphql-tag')

const componentResolver = (doc) => {
  if(doc.type === 'blogpos') return require('./src/components/blogpost')
}


exports.createPages = async ({ graphql, actions }) => {

  registerResolvers(linkResolver, componentResolver);

  const { createPage } = actions;

  const pages = await graphql(`
  query {
    prismic {
      allBlogposs {
        edges {
          node {
            _meta {
              uid
            }
            title
            body
          }
        }
      }
    }
  }
  `);

  const previewQuery = (uid) => gql(`
  query {
    allBlogposs(uid: "${uid}") {
      edges {
        node {
          title
          body
        }
      }
    }
  }`)

  pages.data.prismic.allBlogposs.edges.forEach(edge => {
    createPage({
      path: `/${edge.node._meta.uid}`,
      component: path.resolve('./src/components/blogpost.js'),
      context: {
        data: edge.node,
        previewQuery: previewQuery(edge.node._meta.uid),
      },
    });
  });
};