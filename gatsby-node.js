const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)

  return result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `/test${node.frontmatter.slug}`,
      component: path.resolve(`./src/components/page.js`),
      context: {
        slug: node.frontmatter.slug,
      },
    })
  })
}
