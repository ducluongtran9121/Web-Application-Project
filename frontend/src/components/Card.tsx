import * as React from 'react'
import { Box, useStyleConfig } from '@chakra-ui/react'
import type { BoxProps } from '@chakra-ui/react'

interface CardProps extends BoxProps {
  variant?: 'hoverable'
}

function Card({ variant, ...rest }: CardProps): JSX.Element {
  const styles = useStyleConfig('Card', { variant })

  return <Box __css={styles} {...rest} />
}

export default Card
export type { CardProps }
