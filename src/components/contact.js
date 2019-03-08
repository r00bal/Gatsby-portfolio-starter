import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'

const Contact = () => (
  <StaticQuery
    query={graphql`
      query {
        markdownRemark(frontmatter: { slug: { eq: "/contact" } }) {
          frontmatter {
            title
          }
          html
        }
      }
    `}
    render={({ markdownRemark }) => (
      <>
        <div
          dangerouslySetInnerHTML={{
            __html: markdownRemark.html,
          }}
        />
        <form
          name="contact"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <input name="name" placeholder="Your Name" type="text" />
          <button>Send</button>
        </form>
      </>
    )}
  />
)

export default Contact
