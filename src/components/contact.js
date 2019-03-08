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
          name="contact-form"
          method="POST"
          data-netlify-recaptcha="true"
          data-netlify="true"
        >
          <p>
            <label>
              Email: <input type="text" name="name" />
            </label>
          </p>
          <p>
            <label>
              Message: <textarea name="message" />
            </label>
          </p>
          <div data-netlify-recaptcha="true" />
          <p>
            <button type="submit">Send</button>
          </p>
        </form>
      </>
    )}
  />
)

export default Contact
