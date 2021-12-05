import * as React from 'react'
import { Box, useStyleConfig } from '@chakra-ui/react'
import type { BoxProps } from '@chakra-ui/react'

interface CardProps extends BoxProps {
  variant?: 'hoverable' | 'clickable' | 'search'
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card({ variant, ...rest }, ref) {
  const styles = useStyleConfig('Card', { variant })

  return <Box __css={styles} {...rest} ref={ref} />
})

export default Card
export type { CardProps }
