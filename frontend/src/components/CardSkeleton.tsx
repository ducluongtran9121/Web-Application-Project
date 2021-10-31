import { Container, Flex, Skeleton } from '@chakra-ui/react'
import type { StackProps } from '@chakra-ui/react'

interface Props extends StackProps {
  cardNumber: string
}

function CardSkeleton({ cardNumber, ...rest }: Props): JSX.Element {
  const heights: string[] = ['1rem', '1.5rem', '2rem', '2.5rem']
  const cardNum = Number(cardNumber)
  const heightsNumber = heights.length
  const skeletonNumber = Math.floor(Math.random() * 4) + 1
  const skeletons: JSX.Element[] = []
  const cards: JSX.Element[] = []

  for (let i: number = 0, height: string; i < skeletonNumber * cardNum; i++) {
    height = heights[Math.floor(Math.random() * heightsNumber)]
    skeletons.push(<Skeleton key={i} h={height} />)
  }

  for (let i: number = 0; i < cardNum; i += skeletonNumber) {
    cards.push(
      <Container key={i} variant="card">
        <Flex flexDirection="column">
          {skeletons.slice(i, i + skeletonNumber)}
        </Flex>
      </Container>,
    )
  }

  return (
    <Flex flexDirection="column" gridGap="0.5rem" {...rest}>
      {cards}
    </Flex>
  )
}

export default CardSkeleton
