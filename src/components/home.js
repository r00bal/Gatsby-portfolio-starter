import React from 'react'
import { Link } from 'gatsby'
import SEO from '../components/seo'

const Home = () => (
  <>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1 className="BFG">
      HELLO <br />
      WORLD .
    </h1>
    <Link to="/page-2/">Go to page 2</Link>
  </>
)

export default Home
