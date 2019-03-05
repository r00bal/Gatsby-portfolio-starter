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
    content: [],
    images: [],
    counter: 0,
  }
  static getDerivedStateFromProps(props, state) {
    console.log(props)
    const { data } = props
    const { children } = data.markdownRemark.htmlAst
    let header = undefined
    console.log(children)
    const remarkHtml = children
      .map(({ tagName, children: val }) => {
        if (tagName === 'h2') {
          header === undefined ? (header = 0) : header++
          return {
            header,
            tagName,
            text: val[0].value,
          }
        }
        if (tagName === 'p') {
          return {
            header,
            tagName,
            text: val[0].value,
          }
        }
      })
      .filter(element => element !== undefined)
    console.log(remarkHtml)
    const content = groupBy(remarkHtml, 'header')

    const images = data.markdownRemark.frontmatter.projectImages
      ? data.markdownRemark.frontmatter.projectImages.map(
          ({ childImageSharp }) => childImageSharp.fluid
        )
      : []
    return {
      content,
      images,
    }
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

  contentToHtml = element => {
    return (
      element &&
      element.map(({ tagName, text }) => {
        if (tagName == 'h2') {
          return <h2>{text}</h2>
        }
        if (tagName == 'p') {
          return <p>{text}</p>
        }
      })
    )
  }

  render() {
    const { counter, images, content } = this.state

    return (
      <PageWrapper>
        {counter > 0 && images.length ? (
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
        {counter < images.length - 1 && images.length ? (
          <button className="next" onClick={this.handleNext}>
            <span>▶️</span>
          </button>
        ) : (
          <div className="next" />
        )}
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
        projectImages {
          childImageSharp {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
