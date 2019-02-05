import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'

const HomeStyles = styled.section`
  margin: 0 auto;
`

const Home = () => (
  <StaticQuery
    query={graphql`
      query {
        markdownRemark(frontmatter: { slug: { eq: "/" } }) {
          frontmatter {
            title
            subtitle
            img {
              childImageSharp {
                fluid(maxWidth: 500) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}
    render={({ markdownRemark }) => {
      console.log(markdownRemark)
      return (
        <HomeStyles>
          <Img
            fluid={markdownRemark.frontmatter.img.childImageSharp.fluid}
            style={{
              margin: `0 auto`,
              maxWidth: `300px`,
              display: `block`,
              height: `auto`,
            }}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: markdownRemark.html,
            }}
          />
        </HomeStyles>
      )
    }}
  />
)

export default Home
