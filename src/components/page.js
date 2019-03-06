import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'

import Img from 'gatsby-image'
import { groupBy } from '../utils/func.js'
// Static query
//cqn be used anywhere, doesn't accept variable, can't use context

// Page query
// Must be used on pages
// Array.prototype.groupBy = function(prop) {
//   return this.reduce(function(groups, item) {
//     const val = item[prop]
//     groups[val] = groups[val] || []
//     groups[val].push(item)
//     return groups
//   }, {})
// }

const PageWrapper = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: 50px 1fr 1fr 50px;
  grid-template-rows: 500px 100px;
  grid-template-areas:
    'prev image descrption next'
    '....  backPage backPage ....';
  grid-gap: 1rem;
  align-items: center;
  justify-items: center;

  button {
    font-size: 3rem;
    margin: 0;
    padding: 0;
    color: black;
    border: none;
    outline: none;
    background: none;
  }

  .descrption {
    grid-area: descrption;
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
      'descrption  descrption'
      'prev  next  '
      'backPage  backPage';
  }
`

const ImageWrapper = styled.div`
  width: 100%;
  height: auto;
  grid-area: image;
`

class Page extends Component {
  state = {
    counter: 0,
  }

  handleNext = e => {
    e.preventDefault()
    this.setState({
      counter: this.state.counter + 1,
    })
  }

  handlePrev = e => {
    e.preventDefault()
    this.setState({
      counter: this.state.counter - 1,
    })
  }

  render() {
    const { counter } = this.state
    const max = this.props.data.markdownRemark.frontmatter.projects.length
    const {
      title,
      alt,
      description,
      image,
    } = this.props.data.markdownRemark.frontmatter.projects[counter]

    return (
      <PageWrapper>
        {console.log(title, alt, description, image, max)}
        {counter > 0 ? (
          <button className="prev" onClick={this.handlePrev}>
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

        {counter < max - 1 ? (
          <button className="next" onClick={this.handleNext}>
            <span>▶️</span>
          </button>
        ) : (
          <div className="next" />
        )}
        <div className="descrption">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>

        <Link className="backPage" to={`/projects`}>
          Back to project list
        </Link>
        {/*  {counter > 0  ? (
          <button className="prev" onClick={this.handlePrev}>
            <span>◀️</span>
          </button>
        ) : (
          <div className="prev" />
        )}

        {images.map((image, index) => {
          if (index === counter) {
            return (
              <ImageWrapper>
                <Img
                  key={image.src}
                  fluid={image}
                  style={{
                    width: '100%',
                    maxWidth: '300px',
                    height: '100%',
                    margin: '0 auto',
                  }}
                />
              </ImageWrapper>
            )
          }
        })}
        <div className="descrption">{this.contentToHtml(content[counter])}</div>

        <Link className="backPage" to={`/projects`}>
          Back to project list
        </Link>
        {counter < max ? (
          <button className="next" onClick={this.handleNext}>
            <span>▶️</span>
          </button>
        ) : (
          <div className="next" />
        )} */}
      </PageWrapper>
    )
  }
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
