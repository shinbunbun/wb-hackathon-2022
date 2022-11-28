import { style } from '@vanilla-extract/css'

export const gallery = style({
  display: 'grid',
  gridTemplateRows: 'repeat(3, calc(calc(100% - 32) / 3)))',
  gap: "16px",
})

export const galleryItem = style({
  objectFit: 'cover',
  aspectRatio: '1 / 1',
  width: 'calc(calc(100% - 32) / 3)'
})
