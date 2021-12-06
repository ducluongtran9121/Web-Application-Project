import * as React from 'react'
import { I18nContext } from '../i18n/i18n-react'
import { useInViewport } from 'react-in-viewport'
import { Box, Heading, Image, Flex, Text, SlideFade, ScaleFade, AspectRatio, useBreakpointValue, Icon, Link, Avatar } from '@chakra-ui/react'
import Card from '../components/Card'
import { ReactComponent as Logo } from '../assets/svg/logo.svg'
import AboutImage1 from '../assets/img/aboutimage1.png'
import AboutImage2 from '../assets/img/aboutimage2.png'
import AboutImage3 from '../assets/img/aboutimage3.png'
import SonImage from '../assets/img/son.png'
import ThiImage from '../assets/img/thi.jpg'
import LuongImage from '../assets/img/luong.jpg'
import { FiChevronDown, FiGithub } from 'react-icons/fi'

interface SlideElementProps {
  img: string
  content: string
  description: string
  swap?: boolean
}

interface ContributorElementProps {
  img: string
  name: string
  githubUrl: string
  role: 'Frontend' | 'Backend'
}

function IconElement(): JSX.Element {
  const ref = React.useRef(null)
  const { inViewport } = useInViewport(ref, { rootMargin: '-120px' }, { disconnectOnLeave: false }, {})

  return (
    <Box pt="7rem" ref={ref}>
      <ScaleFade initialScale={0.8} in={inViewport}>
        <Icon fontSize="3rem" as={FiChevronDown} />
      </ScaleFade>
    </Box>
  )
}

function SlideElement({ img, content, description, swap = false }: SlideElementProps): JSX.Element {
  const ref = React.useRef(null)
  const rootMargin = useBreakpointValue({ base: '-180px', lg: '-250px' })
  const offsetX = useBreakpointValue({ base: '50px', lg: '200px' })
  const { inViewport } = useInViewport(ref, { rootMargin }, { disconnectOnLeave: false }, {})

  return (
    <Flex direction={{ base: 'column', lg: 'row' }} justifyContent="center" alignItems="center" ref={ref} gridGap={{ base: '0.75rem', md: '1.5rem' }}>
      {swap ? (
        <>
          <Box order={{ base: 1, md: 0 }}>
            <SlideFade offsetX={`-${offsetX}`} in={inViewport}>
              <Flex w="fit-content" as={Card} alignItems="center" px="0.5rem">
                <AspectRatio w={{ base: '20rem', md: '30rem', lg: '50rem' }} maxW="50rem" ratio={16 / 9}>
                  <Image src={img} alt="Description about image" />
                </AspectRatio>
              </Flex>
            </SlideFade>
          </Box>
          <SlideFade offsetX={offsetX} in={inViewport}>
            <Text textAlign={{ base: 'center', lg: 'left' }} fontWeight="semibold" fontSize={{ base: '2rem', md: '3rem' }}>
              {content}
            </Text>
            <Text textAlign={{ base: 'center', lg: 'left' }} fontSize="1.5rem">
              {description}
            </Text>
          </SlideFade>
        </>
      ) : (
        <>
          <SlideFade offsetX={`-${offsetX}`} in={inViewport} transition={{ enter: { duration: 0.3, easings: 'easeInOut' } }}>
            <Text textAlign={{ base: 'center', lg: 'left' }} fontWeight="semibold" fontSize={{ base: '2rem', md: '3rem' }}>
              {content}
            </Text>
            <Text textAlign={{ base: 'center', lg: 'left' }} fontSize="1.5rem">
              {description}
            </Text>
          </SlideFade>
          <SlideFade offsetX={offsetX} in={inViewport} transition={{ enter: { duration: 0.3, easings: 'easeInOut' } }}>
            <Flex w="fit-content" as={Card} alignItems="center" px="0.5rem">
              <AspectRatio w={{ base: '20rem', md: '30rem', lg: '50rem' }} maxW="50rem" ratio={16 / 9}>
                <Image src={img} alt="Description about image" />
              </AspectRatio>
            </Flex>
          </SlideFade>
        </>
      )}
    </Flex>
  )
}

function ContributorElement({ img, githubUrl, name, role }: ContributorElementProps): JSX.Element {
  const ref = React.useRef(null)
  const { inViewport } = useInViewport(ref, { rootMargin: '-120px' }, { disconnectOnLeave: false }, {})
  return (
    <ScaleFade initialScale={0.8} in={inViewport} whileHover={{ scale: 1.1 }}>
      <Card display="flex" alignItems="center" ref={ref} gridGap="0.75rem">
        <Avatar name={name} src={img} />
        <Flex direction="column">
          <Text fontWeight="semibold">{name}</Text>
          <Text>{role}</Text>
          <Link mt="0.25rem" href={githubUrl}>
            <FiGithub />
          </Link>
        </Flex>
      </Card>
    </ScaleFade>
  )
}

function About(): JSX.Element {
  const { LL } = React.useContext(I18nContext)

  return (
    <Box overflowX="hidden">
      <Flex px={{ base: '0.75rem', md: '1.5rem' }} py="6rem" textAlign="center" direction="column" alignItems="center" gridGap="0.25rem">
        <Image as={Logo} alt="Logo of Alunno" w="15rem" />
        <Heading as="h1" fontSize="3rem">
          {LL.about.learnTogether()}
        </Heading>
        <Text fontWeight="semibold" fontSize="2rem">
          {LL.about.connect()}
        </Text>
        <IconElement />
      </Flex>
      <Flex direction="column" alignItems="stretch" gridGap={{ base: '3rem', lg: '1.5rem' }}>
        <SlideElement img={AboutImage1} content={LL.about.userFriendly()} description={LL.about.userFriendlyDescription()} />
        <SlideElement img={AboutImage2} content={LL.about.beautifulDesign()} description={LL.about.beautifulDesignDescription()} swap />
        <SlideElement img={AboutImage3} content={LL.about.powerful()} description={LL.about.powerfulDescription()} />
      </Flex>
      <Box px={{ base: '0.75rem', md: '1.5rem' }} py="6rem">
        <Heading textAlign="center">{LL.about.contributors()}</Heading>
        <Flex mt="1.5rem" direction={{ base: 'column', md: 'row' }} justifyContent="center" gridGap={{ base: '0.75rem', md: '1.5rem' }}>
          <ContributorElement img={SonImage} githubUrl="https://github.com/pinanek23" name="Ngô Đức Hoàng Sơn" role="Frontend" />
          <ContributorElement img={ThiImage} githubUrl="https://github.com/thihuynhdotexe" name="Huỳnh Thái Thi" role="Backend" />
          <ContributorElement img={LuongImage} githubUrl="https://github.com/ducluongtran9121" name="Trần Đức Lương" role="Backend" />
        </Flex>
      </Box>
    </Box>
  )
}

export default About
