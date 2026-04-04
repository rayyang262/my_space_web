import { useNavigate } from 'react-router-dom'
import '../styles/ProjectPage.css'

export default function ContactPage() {
  const navigate = useNavigate()

  return (
    <div className="project-page">
      <button className="back-btn" onClick={() => navigate('/')}>← Back to Studio</button>

      <div className="project-content" style={{ maxWidth: '640px', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div className="project-meta" style={{ flexDirection: 'column', gap: '1.5rem' }}>
          <h1 className="project-title" style={{ fontSize: '28px' }}>Contact</h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a
              href="mailto:ry2541@nyu.edu"
              style={{ color: '#e8e0d0', textDecoration: 'none', fontSize: '14px', letterSpacing: '0.05em', fontWeight: 300 }}
            >
              ✉ ry2541@nyu.edu
            </a>
            <a
              href="https://www.linkedin.com/in/rayyang26/"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#aaa', textDecoration: 'none', fontSize: '14px', letterSpacing: '0.05em', fontWeight: 300 }}
            >
              ↗ linkedin.com/in/rayyang26
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
