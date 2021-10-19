import { FiGithub } from 'react-icons/fi'
import Card from './Card'

interface Props {
  name: string
  imgSrc: string
  role: 'Frontend' | 'Backend'
  githubUrl: string
}

function Contributor({ name, imgSrc, role, githubUrl }: Props) {}

export default Contributor