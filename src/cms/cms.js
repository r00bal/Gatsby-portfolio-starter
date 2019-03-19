import React from 'react'
import CMS from 'netlify-cms'

import Page from '../components/page'

CMS.registerPreviewTemplate('projects', ({ entry }) => (
  <Page {...entry.toJS().data} />
))
