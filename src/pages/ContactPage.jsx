import { useNavigate } from 'react-router-dom'
import '../styles/ProjectPage.css'

export default function ContactPage() {
  const navigate = useNavigate()

  return (
    <div className="project-page">
      <button className="back-btn" onClick={() => navigate('/')}>← Back to Studio</button>

      <div className="project-content" style={{ maxWidth: '640px' }}>
        <div className="project-meta" style={{ flexDirection: 'column', gap: '1.5rem' }}>
          <h1 className="project-title">Contact</h1>
          <p style={{ color: '#aaa', lineHeight: '1.8', fontSize: '1rem', fontWeight: 300 }}>
            Let's connect — whether it's a project, a collaboration, or just to say hi.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <a
              href="mailto:your@email.com"
              style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', letterSpacing: '0.05em' }}
            >
              ✉ your@email.com
            </a>
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#aaa', textDecoration: 'none', fontSize: '0.95rem', letterSpacing: '0.05em' }}
            >
              ↗ LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
