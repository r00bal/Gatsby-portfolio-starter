import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

const HomeStyles = styled.section`
  .BFG {
    font-size: 7rem;
  }
`

const Home = () => (
  <StaticQuery
    query={graphql`
      query {
        markdownRemark(frontmatter: { slug: { eq: "/" } }) {
          frontmatter {
            title
            subtitle
          }
          html
        }
      }
    `}
    render={({ markdownRemark }) => (
      <HomeStyles>
        <h1 className="BFG">{markdownRemark.frontmatter.subtitle}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: markdownRemark.html,
          }}
        />
      </HomeStyles>
    )}
  />
)

export default Home
