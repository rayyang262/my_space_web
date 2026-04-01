import { useNavigate } from 'react-router-dom'
import '../styles/ProjectPage.css'

export default function AboutPage() {
  const navigate = useNavigate()

  return (
    <div className="project-page">
      <button className="back-btn" onClick={() => navigate('/')}>← Back to Studio</button>

      <div className="project-content" style={{ maxWidth: '640px' }}>
        <div className="project-meta" style={{ flexDirection: 'column', gap: '1.5rem' }}>
          <h1 className="project-title">About</h1>
          <p style={{ color: '#aaa', lineHeight: '1.8', fontSize: '1rem', fontWeight: 300 }}>
            Hi, I'm a UX/UI designer passionate about crafting thoughtful digital experiences.
            This space is where I share my work — feel free to explore.
          </p>
          <p style={{ color: '#666', lineHeight: '1.8', fontSize: '0.9rem', fontWeight: 300 }}>
            ✦ Available for freelance &amp; full-time opportunities.
          </p>
        </div>
      </div>
    </div>
  )
}
