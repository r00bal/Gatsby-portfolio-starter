import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Image from './Image'
import Img from 'gatsby-image'

const ProjectLayout = styled.div`
padding:1rem
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  justify-content: center;
`

const Projects = () => (
  <StaticQuery
    query={graphql`
      query {
        markdownRemark(frontmatter: { slug: { eq: "/projects" } }) {
          frontmatter {
            title
          }
          html
        }
        allFile(filter: { relativePath: { regex: "/project_/" } }) {
          edges {
            node {
              childImageSharp {
                fluid(maxWidth: 500) {
                  ...GatsbyImageSharpFluid
                  presentationWidth
                }
              }
            }
          }
        }
      }
    `}
    render={({ allFile }) => {
      console.log(allFile)
      return (
        <ProjectLayout>
          {allFile.edges.map(({ node }) => (
            <Img
              fluid={node.childImageSharp.fluid}
              style={{ display: `block`, height: `auto` }}
              imgStyle={{ height: `auto` }}
            />
          ))}
        </ProjectLayout>
      )
    }}
  />
)

export default Projects
