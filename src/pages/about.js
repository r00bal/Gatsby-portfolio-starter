import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const AboutPage = () => (
  <>
    <SEO title="About" />
    <h1>Hi from about page</h1>
    <p>Somthing about me</p>
    <Link to="/">Go back to the homepage</Link>
  </>
)

export default AboutPage
