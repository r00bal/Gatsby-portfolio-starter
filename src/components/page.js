import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'

// Static query
//cqn be used anywhere, doesn't accept variable, can't use context

// Page query
// Must be used on pages

const page = ({ data }) => (
  <>
    <h1>{data.markdownRemark.frontmatter.title}</h1>
    <div
      dangerouslySetInnerHTML={{
        __html: data.markdownRemark.html,
      }}
    />
    <Link to={`/projects`}> Back to project list</Link>
  </>
)

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        slug
      }
    }
  }
`

export default page
