import '../styles/ProjectPage.css'
import ShaderBackground from '../components/ui/shader-background'

export default function ContactPage() {
  return (
    <div className="project-page" style={{ position: 'relative' }}>
      <ShaderBackground />

      {/* Content layer above waves */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="project-content" style={{ maxWidth: '640px', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div
            className="project-meta"
            style={{
              flexDirection: 'column',
              gap: '1.5rem',
              background: 'rgba(255, 255, 255, 0.80)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderRadius: '12px',
              padding: '2rem',
            }}
          >
            <h1 className="project-title" style={{ fontSize: '28px', color: '#111111' }}>Contact</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a
                href="mailto:ry2541@nyu.edu"
                style={{ color: '#111111', textDecoration: 'none', fontSize: '14px', letterSpacing: '0.05em', fontWeight: 300 }}
              >
                ✉ ry2541@nyu.edu
              </a>
              <a
                href="https://www.linkedin.com/in/rayyang26/"
                target="_blank"
                rel="noreferrer"
                style={{ color: '#444444', textDecoration: 'none', fontSize: '14px', letterSpacing: '0.05em', fontWeight: 300 }}
              >
                ↗ linkedin.com/in/rayyang26
              </a>
              <a
                href="tel:+15512636831"
                style={{ color: '#444444', textDecoration: 'none', fontSize: '14px', letterSpacing: '0.05em', fontWeight: 300 }}
              >
                📱 +1 (551) 263-6831
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
