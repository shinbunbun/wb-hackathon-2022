import { style } from "@vanilla-extract/css";

export const gallery = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, calc(calc(100% - 32) / 3))"
})

export const galleryItem = style({
  objectFit: 'cover',
  aspectRatio: '1 / 1',
})