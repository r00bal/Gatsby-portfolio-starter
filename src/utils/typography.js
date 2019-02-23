import Typography from 'typography'
import bootstrapTheme from 'typography-theme-bootstrap'

bootstrapTheme.baseFontSize = '13px'
const typography = new Typography(bootstrapTheme)

export default typography
export const rhythm = typography.rhythm
