import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'

const ProjectLayout = styled.main`
  max-width: 100%;
  margin: 1rem auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 40px;
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
        file(relativePath: { regex: "/project_astronaut/" }) {
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    `}
    render={data => {
      console.log(data)
      return (
        <ProjectLayout>
          <Img fluid={data.file.childImageSharp.fluid} />
        </ProjectLayout>
      )
    }}
  />
)

export default Projects
