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
        <div>
          <form
            name="contact-form"
            method="post"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <input name="name" placeholder="Your Name" type="text" />
            <input name="email" placeholder="name@name.com" type="email" />
            <textarea name="message" />
            <button>Send</button>
          </form>
        </div>
      </>
    )}
  />
)

export default Contact
