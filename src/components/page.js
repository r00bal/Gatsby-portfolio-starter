import React, { useState } from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'

import Img from 'gatsby-image'
// Static query
//cqn be used anywhere, doesn't accept variable, can't use context

// Page query
// Must be used on pages

const PageWrapper = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: 50px 1fr 1fr 50px;
  grid-template-rows: 500px 100px;
  grid-template-areas:
    'prev image description next'
    '....  backPage backPage ....';
  grid-gap: 1rem;
  align-items: center;
  justify-items: center;

  button {
    font-size: 3rem;
    margin: 0;
    padding: 0;
    color: inherit;
    border: none;
    outline: none;
    background: none;
  }

  .description {
    grid-area: description;
  }

  .next {
    grid-area: next;
  }

  .prev {
    grid-area: prev;
  }

  .backPage {
    grid-area: backPage;
    align-self: center;
  }
  @media (max-width: 631px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr auto auto;
    row-gap: 1rem;
    grid-template-areas:
      'image  image'
      'description  description'
      'prev  next  '
      'backPage  backPage';
  }
`

const ImageWrapper = styled.div`
  width: 100%;
  height: auto;
  grid-area: image;
`

const Page = ({ data }) => {
  const [count, setCount] = useState(0)
  const max = data.markdownRemark.frontmatter.projects.length
  const {
    title,
    alt,
    description,
    image,
  } = data.markdownRemark.frontmatter.projects[count]

  return (
    <PageWrapper>
      {console.log(data)}
      {count > 0 ? (
        <button className="prev" onClick={() => setCount(count - 1)}>
          <span>◀️</span>
        </button>
      ) : (
        <div className="prev" />
      )}
      <ImageWrapper>
        <Img
          key={image.childImageSharp.fluid.src}
          fluid={image.childImageSharp.fluid}
          style={{
            width: '100%',
            maxWidth: '300px',
            height: '100%',
            margin: '0 auto',
          }}
          alt={alt}
        />
      </ImageWrapper>
      {count < max - 1 ? (
        <button className="next" onClick={() => setCount(count + 1)}>
          <span>▶️</span>
        </button>
      ) : (
        <div className="next" />
      )}
      <div className="description">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <Link className="backPage" to={`/projects`}>
        Back to project list
      </Link>
    </PageWrapper>
  )
}

export default Page

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      htmlAst
      frontmatter {
        title
        slug
        description
        projects {
          alt
          title
          description
          image {
            childImageSharp {
              fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
