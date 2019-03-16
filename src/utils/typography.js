import Typography from 'typography'
import bootstrapTheme from 'typography-theme-bootstrap'
// import githubTheme from 'typography-theme-github'

bootstrapTheme.baseFontSize = '13px'
// githubTheme.baseFontSize = '13px'
const typography = new Typography(bootstrapTheme)
// const typography = new Typography(githubTheme)

export default typography
export const rhythm = typography.rhythm
