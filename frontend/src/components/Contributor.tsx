import { FiGithub } from 'react-icons/fi'

interface Props {
  name: string
  imgSrc: string
  role: 'Frontend' | 'Backend'
  githubUrl: string
}

function Contributor({ name, imgSrc, role, githubUrl }: Props) {
  return (
    <div className="card grid grid-cols-2-left-auto items-center gap-6 px-6 py-3">
      <img className="w-16" src={imgSrc} alt="sd" />
      <div className="flex flex-col gap-0.5">
        <p className="font-semibold">{name}</p>
        <p>{role}</p>
        <div className="mt-1.5 flex gap-3 items-center">
          <a href={githubUrl} target="_blank">
            <FiGithub className="text-accent-default hover:text-accent-secondary active:text-accent-ternary" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Contributor
