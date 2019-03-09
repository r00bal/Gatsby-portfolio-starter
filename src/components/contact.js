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
<<<<<<< HEAD
            method="post"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <input name="name" placeholder="Your Name" type="text" />
            <input name="email" placeholder="name@name.com" type="email" />
            <textarea name="message" />
            <button>Send</button>
=======
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
>>>>>>> ac7f7902de86af740f23def295b7d4cbc197c81e
          </form>
        </div>
      </>
    )}
  />
)

export default Contact
