import { useMediaQuery } from 'react-responsive'

export const MAX_XS_SIZE = 575
export const MIN_SM_SIZE = 576
export const MAX_SM_SIZE = 767
export const MIN_MD_SIZE = 768
export const MAX_MD_SIZE = 991
export const MIN_LG_SIZE = 992
export const MAX_LG_SIZE = 1199
export const MIN_XL_SIZE = 1200
export const MAX_XL_SIZE = 1599
export const MIN_XXL_SIZE = 1600

export const isMobile = `max-width: ${MAX_MD_SIZE}px`
export const isDesktop = `min-width: ${MIN_LG_SIZE}px`

export function useIsMobile() {
  return useMediaQuery({
    query: `(max-width: ${MAX_MD_SIZE}px)`,
  })
}

export function useIsDesktop() {
  return useMediaQuery({
    query: `(min-width: ${MIN_LG_SIZE}px)`,
  })
}
