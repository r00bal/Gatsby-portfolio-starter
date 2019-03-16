import React from 'react'
import Me from './me'
import useMousePosition from './mouse'
import { Link, useStaticQuery, StaticQuery, graphql } from 'gatsby'

const About = () => {
  const { markdownRemark } = useStaticQuery(graphql`
    query {
      markdownRemark(frontmatter: { slug: { eq: "/about" } }) {
        frontmatter {
          title
        }
        html
      }
    }
  `)
  const { x, y } = useMousePosition()
  return (
    <div>
      <div
        dangerouslySetInnerHTML={{
          __html: markdownRemark.html,
        }}
      />
      <div style={{ width: '100%', height: '100%' }}>
        x : {x}, y: {y}
      </div>

      <div css={{ maxWidth: '500px', margin: '0 auto' }}>
        <Me mouse={useMousePosition()} />
      </div>
    </div>
  )
}

export default About
