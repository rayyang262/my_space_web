import { useParams, useNavigate } from 'react-router-dom'
import { projects } from '../data/projects'
import '../styles/ProjectPage.css'

export default function ProjectPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return (
      <div className="project-page project-not-found">
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Studio</button>
        <p>Project not found.</p>
      </div>
    )
  }

  return (
    <div className="project-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back to Studio</button>

      <div className="project-content">
        <div className="project-image-wrap">
          <img
            src={project.imageSrc}
            alt={project.title}
            className="project-image"
            onError={(e) => { e.target.style.display = 'none' }}
          />
        </div>

        <div className="project-meta">
          <h1 className="project-title">{project.title}</h1>
          <span className="project-year">{project.year}</span>
        </div>
      </div>
    </div>
  )
}
