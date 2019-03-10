import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

const FormWrapper = styled.div`
  margin: 0 auto;
  h1 {
    margin: 0 0 30px 0;
    text-align: center;
  }
  form {
    max-width: 500px;
    margin: 10px auto;
    padding: 10px 20px;
    background: #f4f7f8;
    border-radius: 8px;
  }
  input[type='text'],
  input[type='email'],
  input[type='message'],
  textarea {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    font-size: 16px;
    height: auto;
    margin: 0;
    outline: 0;
    padding: 15px;
    width: 100%;
    background-color: #e8eeef;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03) inset;
    margin-bottom: 30px;
  }
  button {
    padding: 19px 39px 18px 39px;
    color: #fff;
    /* background-color: #4bc970; #4bc970; */
    background-color: ${props => props.theme.BgDarkSky};
    font-size: 18px;
    text-align: center;
    font-style: normal;
    border-radius: 5px;
    width: 100%;
    /* border: 1px solid #3ac162; */
    border: none;
    border-width: 1px 1px 3px;
    box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.1) inset;
    margin-bottom: 10px;
    &:hover {
      background-color: #8dffc3;
      color: #263f40;
    }
  }

  fieldset {
    margin-bottom: 30px;
    border: none;
  }
  label {
    display: block;
    margin-bottom: 8px;
    text-align: left;
  }
`

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
      <FormWrapper>
        {console.log(markdownRemark)}
        <form
          name="contact"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <h1
            dangerouslySetInnerHTML={{
              __html: markdownRemark.html,
            }}
          />

          <fieldset>
            <input type="hidden" name="form-name" value="contact" />
            <p>
              <label for="name">Your Name: </label>
              <input type="text" name="name" />
            </p>
            <p>
              <label for="email">Your Email: </label>
              <input type="email" name="email" />
            </p>
            <p>
              <label for="message">Message: </label>
              <textarea name="message" />
            </p>
            <p>
              <button type="submit">Send</button>
            </p>
          </fieldset>
        </form>
      </FormWrapper>
    )}
  />
)

export default Contact
