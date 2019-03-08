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
          method="POST"
          netlify-honeypot="bot-field"
          data-netlify="true"
        >
          <p class="hidden">
            <label>
              Don’t fill this out if you're human: <input name="bot-field" />
            </label>
          </p>
          <p>
            <label>
              Email: <input type="text" name="email" />
            </label>
          </p>
          <p>
            <label>
              Message: <textarea name="message" />
            </label>
          </p>
          <p>
            <button type="submit">Send</button>
          </p>
        </form>
      </>
    )}
  />
)

export default Contact
