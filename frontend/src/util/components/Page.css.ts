import { style } from '@vanilla-extract/css'

export const page = style({
  display: 'flex',
  alignItems: 'center',
  maxWidth: '500px',
  height: '100vh',
  margin: 'auto',
  padding: '0 24px',
  boxSizing: 'border-box',
})
export const pageInner = style({
  margin: 'auto',
})
