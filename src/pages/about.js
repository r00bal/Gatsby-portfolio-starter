import React from 'react'
import About from '../components/about'
import SEO from '../components/seo'

const AboutPage = ({ location }) => (
  <>
    <SEO title="About" />
    <About location={location} />
  </>
)

export default AboutPage
