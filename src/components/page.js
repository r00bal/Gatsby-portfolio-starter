import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import Image from './Image'
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
  grid-template-columns: 1fr 3fr 2fr 1fr;
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
  }
`
class Page extends Component {
  state = {
    content: [],
    images: [],
    counter: 0,
  }

  componentDidMount() {
    const { data } = this.props
    const { children } = data.markdownRemark.htmlAst
    let header = 0
    const remarkHtml = children
      .map(({ tagName, children: val }) => {
        if (tagName === 'h1' || tagName === 'h2') {
          header++
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

    const content = groupBy(remarkHtml, 'header')
    console.log(content)
    const images = data.markdownRemark.frontmatter.projectImages
      ? data.markdownRemark.frontmatter.projectImages.map(
          ({ childImageSharp }) => childImageSharp.fluid
        )
      : []
    this.setState({
      content,
      images,
    })
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

  contentToHtml = objectHtml => {
    return objectHtml.map(
      ({ tagName, text }) => `<${tagName}>${text}</${tagName}>`
    )
  }

  render() {
    const { counter, images, content } = this.state
    const html = content[counter]
    console.log(content[counter])
    return (
      <PageWrapper>
        {counter > 0 && images.length ? (
          <button onClick={this.handlePrev}>
            <span>◀️</span>
          </button>
        ) : (
          <div />
        )}

        {images.map((image, index) => {
          if (index === counter) {
            console.log(counter)
            return (
              <Img
                key={image.src}
                fluid={image}
                style={{
                  width: '100%',
                  maxWidth: '300px',
                  height: '100%',
                }}
              />
            )
          }
        })}
        {}
        <Link to={`/projects`}> Back to project list</Link>
        {counter < images.length - 1 && images.length ? (
          <button onClick={this.handleNext}>
            <span>▶️</span>
          </button>
        ) : (
          <div />
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
