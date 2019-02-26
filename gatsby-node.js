const path = require('path')

// gatsby-node.js
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.onCreateNode = ({ node }) => {
  fmImagesToRelative(node)
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allFile(
        filter: {
          internal: { mediaType: { eq: "text/markdown" } }
          sourceInstanceName: { eq: "projects" }
        }
      ) {
        edges {
          node {
            childMarkdownRemark {
              frontmatter {
                slug
              }
            }
          }
        }
      }
    }
  `)
  console.log(result)
  return result.data.allFile.edges.forEach(({ node }) => {
    console.log(node)
    createPage({
      path: `/projects${node.childMarkdownRemark.frontmatter.slug}`,
      component: path.resolve('./src/components/page.js'),
      context: {
        slug: node.childMarkdownRemark.frontmatter.slug,
      },
    })
  })
}
