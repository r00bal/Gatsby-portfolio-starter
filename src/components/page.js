import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'

// Static query
//cqn be used anywhere, doesn't accept variable, can't use context

// Page query
// Must be used on pages
class Page extends Component {
  render() {
    const { data } = this.props
    return (
      <>
        {console.log(data)}
        {console.log(data.markdownRemark.html)}
        <h1>{data.markdownRemark.frontmatter.title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: data.markdownRemark.html,
          }}
        />
        {data.markdownRemark.frontmatter.projectImages &&
          data.markdownRemark.frontmatter.projectImages.map(
            ({ childImageSharp }) => (
              <img
                style={{
                  width: 'auto',
                  maxWidth: '300px',
                  height: 'auto',
                  maxHeight: '300px',
                  padding: '1rem',
                }}
                src={childImageSharp.fluid.src}
              />
            )
          )}
        <Link to={`/projects`}> Back to project list</Link>
      </>
    )
  }
}

export default Page

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        slug
        projectImages {
          childImageSharp {
            fluid {
              src
            }
          }
        }
      }
    }
  }
`
