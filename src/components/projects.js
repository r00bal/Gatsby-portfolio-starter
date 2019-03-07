import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'

const ProjectLayout = styled.div`
  max-width: 93.5rem;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
  grid-gap: 2rem;

  @media (max-width: 40rem) {
  }
`
const ImgInfo = styled.div`
  display: none;
`
const ImgWrapper = styled.div`
  width: auto;
  height: 100%;
  margin: 0;
  position: relative;

  &:hover ${ImgInfo} {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
    margin: 0 auto;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
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
          } sort: {fields: [birthTime], order: DESC}
        ) {
          edges {
            node {
              childMarkdownRemark {
                frontmatter {
                  title
                  description
                  slug
                  front {
                    childImageSharp {
                      fluid(maxWidth: 500, maxHeight: 500, cropFocus: CENTER) {
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
                style={{}}
              >
                <Img
                  fluid={
                    node.childMarkdownRemark.frontmatter.front.childImageSharp
                      .fluid
                  }
                  style={{}}
                />
                <ImgInfo>
                  <h3>{node.childMarkdownRemark.frontmatter.title}</h3>

                  <p>{node.childMarkdownRemark.frontmatter.description}</p>
                </ImgInfo>
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
