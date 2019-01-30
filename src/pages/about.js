import React from 'react'
import About from '../components/about'
import { StaticQuery, graphql } from 'gatsby'

export const LISTING_QUERY = graphql`
  query BlogPostListing {
    allMarkdownRemark(
      limit: 10
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            title
            slug
            date(formatString: "MMM DD, YYYY")
          }
        }
      }
    }
  }
`

const AboutPage = ({ location }) => (
  <StaticQuery
    query={graphql`
      query {
        markdownRemark(frontmatter: { slug: { eq: "/about" } }) {
          excerpt
        }
      }
    `}
    render={data => (
      <>
        {console.log(data)}
        <About />
      </>
    )}
  />
)

export default AboutPage
