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

  grid-gap: 2rem;
  align-items: center;
  justify-items: center;
  justify-content: end;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const ImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: calc(100vw / 3);
  max-height: calc(100vw / 3);
  @media (max-width: 1000px) {
    max-width: calc(100vw / 2);
    max-height: calc(100vw / 2);
  }
  @media (max-width: 600px) {
    max-width: 100vw;
    max-height: 100vw;
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
                      fluid(maxWidth: 300, cropFocus: CENTER) {
                        ...GatsbyImageSharpFluid_noBase64
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
            <ImgWrapper>
              <Link
                key={node.childMarkdownRemark.frontmatter.slug}
                to={`projects${node.childMarkdownRemark.frontmatter.slug}`}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              >
                <Img
                  fluid={
                    node.childMarkdownRemark.frontmatter.img.childImageSharp
                      .fluid
                  }
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </Link>
            </ImgWrapper>
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
