import Contributor from '../components/Contributor'

function About() {
  return (
    <div>
      <div className="p-3 md:p-12 text-center">
        <h1 className="text-6xl font-bold">Chua nghi ra cai gi cho ngau 🐧</h1>
        <p className="mt-6">Chua nghi ra luon 😒</p>
      </div>

      <div className="mt-6">
        <h2 className="text-4.5xl font-semibold text-center">Contributor</h2>
        <div className="flex flex-wrap gap-6 py-6 justify-center">
          <Contributor
            name="pinanek23"
            imgSrc="https://avatars.githubusercontent.com/u/57288958?v=4"
            role="Frontend"
            githubUrl="https://github.com/pinanek23"
          />
          <Contributor
            name="thihuynhdotexe"
            imgSrc="https://avatars.githubusercontent.com/u/71972700?v=4"
            role="Backend"
            githubUrl="https://github.com/thihuynhdotexe"
          />
          <Contributor
            name="ducluongtran9121"
            imgSrc="https://avatars.githubusercontent.com/u/62114461?v=4"
            role="Backend"
            githubUrl="https://github.com/ducluongtran9121"
          />
        </div>
      </div>
    </div>
  )
}

export default About
