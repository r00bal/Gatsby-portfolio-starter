import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Image from './Image'
import Img from 'gatsby-image'

const ProjectLayout = styled.div`
  padding: 1rem;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1rem;
  justify-content: center;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const Projects = () => (
  <StaticQuery
    query={graphql`
      query {
        ProjectPage: markdownRemark(
          frontmatter: { slug: { eq: "/projects" } }
        ) {
          frontmatter {
            title
          }
          html
        }
        allProjects: allFile(
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
                  img {
                    childImageSharp {
                      sizes(maxWidth: 500) {
                        ...GatsbyImageSharpSizes
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={({ allProjects }) => {
      console.log(allProjects)
      return (
        <ProjectLayout>
          {allProjects.edges.map(({ node }) => (
            <div
              style={{
                width: '100%',
                display: 'grid',
                alignContent: 'center',
              }}
            >
              <Link
                key={node.childMarkdownRemark.frontmatter.slug}
                to={`projects${node.childMarkdownRemark.frontmatter.slug}`}
              >
                <Img
                  src={
                    node.childMarkdownRemark.frontmatter.img.childImageSharp
                      .sizes.src
                  }
                  sizes={
                    node.childMarkdownRemark.frontmatter.img.childImageSharp
                      .sizes
                  }
                  style={{
                    width: 'auto',
                    // maxWidth: '300px',
                    height: 'auto',
                    // maxHeight: '300px',
                  }}
                />
              </Link>
            </div>
          ))}
        </ProjectLayout>
      )
    }}
  />
)

// <ProjectLayout>
//   {allProjects.edges.map(({ node }) => (
//     <Img
//       fluid={node.childMarkdownRemark.frontmatter.img.childImageSharp.fluid}
//       style={{ display: `block`, height: `auto` }}
//       imgStyle={{ height: `auto` }}
//     />
//   ))}
// </ProjectLayout>
export default Projects
