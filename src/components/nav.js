import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { rhythm } from '../utils/typography'
const NavStyles = styled.nav`
  grid-area: Sidebar;
  width: 60%;
  height: 100%;
  background: lightcyan;
  margin: 0;
  padding: ${rhythm(1)};
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 11;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    margin-top: 100px;
  }
  li {
    font-size: ${rhythm(1)};
    font-weight: 500;
    padding-bottom: ${rhythm(1)};
  }

  a {
    color: #797979;
    text-decoration: none;

    &:hover {
      color: salmon;
    }
  }
`
const PAGE_TITLE_QUERY = graphql`
  query PageTitleQuery {
    allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___id] }) {
      edges {
        node {
          frontmatter {
            title
            slug
            id
          }
        }
      }
    }
  }
`

const Nav = ({ style, click }) => (
  <StaticQuery
    query={PAGE_TITLE_QUERY}
    render={({ allMarkdownRemark }) => (
      <NavStyles style={style}>
        <ul>
          {allMarkdownRemark.edges.map(edge => (
            <li key={edge.node.frontmatter.slug}>
              <Link onClick={click} to={`${edge.node.frontmatter.slug}`}>
                {edge.node.frontmatter.title}
              </Link>
            </li>
          ))}
        </ul>
      </NavStyles>
    )}
  />
)

export default Nav
