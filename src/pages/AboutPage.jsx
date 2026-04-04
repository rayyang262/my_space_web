import { useNavigate } from 'react-router-dom'
import '../styles/ProjectPage.css'

export default function AboutPage() {
  const navigate = useNavigate()

  return (
    <div className="project-page">
      <button className="back-btn" onClick={() => navigate('/')}>← Back to Studio</button>

      <div className="project-content" style={{ maxWidth: '640px', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div className="project-meta" style={{ flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h1 className="project-title" style={{ fontSize: '28px', marginBottom: '4px' }}>Ray Yang</h1>
            <p style={{ color: '#f0c060', fontSize: '14px', letterSpacing: '0.08em', fontWeight: 300 }}>UX Focused Designer</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <p style={{ color: '#aaa', fontSize: '14px', fontWeight: 300, letterSpacing: '0.04em' }}>NYU Class of 2028</p>
            <p style={{ color: '#aaa', fontSize: '14px', fontWeight: 300, letterSpacing: '0.04em' }}>Double major in Interactive Media Arts & Computer Science</p>
          </div>
          <p style={{ color: '#555', fontSize: '13px', fontWeight: 300, letterSpacing: '0.05em' }}>
            ✦ Available for freelance & full-time opportunities
          </p>
        </div>
      </div>
    </div>
  )
}
