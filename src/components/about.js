import React from 'react'

import { Link, StaticQuery, graphql } from 'gatsby'

const About = () => (
  <StaticQuery
    query={graphql`
      query {
        markdownRemark(frontmatter: { slug: { eq: "/about" } }) {
          frontmatter {
            title
          }
          html
        }
      }
    `}
    render={({ markdownRemark }) => (
      <>
        <div
          dangerouslySetInnerHTML={{
            __html: markdownRemark.html,
          }}
        />
      </>
    )}
  />
)

export default About
