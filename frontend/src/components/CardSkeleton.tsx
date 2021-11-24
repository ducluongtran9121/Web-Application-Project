import * as React from 'react'
import { Flex, Skeleton } from '@chakra-ui/react'
import Card from './Card'
import type { StackProps } from '@chakra-ui/react'

interface CardSkeletonProps extends StackProps {
  cardNumber: string
}

function CardSkeleton({ cardNumber, ...rest }: CardSkeletonProps): JSX.Element {
  const heights: string[] = ['1rem', '1.5rem', '2rem', '2.5rem']
  const cardNum = Number(cardNumber)
  const heightsNumber = heights.length
  const skeletonNumber = Math.floor(Math.random() * 4) + 1
  const skeletons: JSX.Element[] = []
  const cards: JSX.Element[] = []

  for (let i = 0, height: string; i < skeletonNumber * cardNum; i++) {
    height = heights[Math.floor(Math.random() * heightsNumber)]
    skeletons.push(<Skeleton key={i} h={height} />)
  }

  for (let i = 0; i < cardNum; i += skeletonNumber) {
    cards.push(
      <Card key={i}>
        <Flex flexDirection="column">{skeletons.slice(i, i + skeletonNumber)}</Flex>
      </Card>
    )
  }

  return (
    <Flex flexDirection="column" gridGap="0.5rem" {...rest}>
      {cards}
    </Flex>
  )
}

export default CardSkeleton
