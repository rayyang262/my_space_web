import '../styles/ProjectPage.css'
import ShaderBackground from '../components/ui/shader-background'

export default function AboutPage() {
  return (
    <div className="project-page" style={{ position: 'relative', overflow: 'hidden' }}>
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
            <div>
              <h1 className="project-title" style={{ fontSize: '28px', marginBottom: '4px', color: '#111111' }}>Ray Yang</h1>
              <p style={{ color: '#2d6a35', fontSize: '14px', letterSpacing: '0.08em', fontWeight: 300 }}>UX Focused Designer</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <p style={{ color: '#444444', fontSize: '14px', fontWeight: 300, letterSpacing: '0.04em' }}>NYU Class of 2028</p>
              <p style={{ color: '#444444', fontSize: '14px', fontWeight: 300, letterSpacing: '0.04em' }}>Double major in Interactive Media Arts & Computer Science</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', maxWidth: '560px' }}>
              <p style={{ color: '#222222', fontSize: '14px', fontWeight: 300, lineHeight: '1.9', letterSpacing: '0.03em' }}>
                I design at the intersection of human behavior, technology, and visual storytelling. My work spans UX, product design, and AI integration — built on the belief that the best interfaces don't just function, they shift how people think and feel.
              </p>
              <p style={{ color: '#222222', fontSize: '14px', fontWeight: 300, lineHeight: '1.9', letterSpacing: '0.03em' }}>
                Growing up between Shanghai and New York, I developed a dual fluency — in culture, in language, and in design systems. That perspective shapes how I approach problems: I don't look for the obvious solution, I look for the one nobody considered yet.
              </p>
              <p style={{ color: '#222222', fontSize: '14px', fontWeight: 300, lineHeight: '1.9', letterSpacing: '0.03em' }}>
                Currently studying Interactive Media Arts and Computer Science at NYU Tisch, I bring both the technical depth to build what I design and the creative instinct to make it worth building. I've applied this at scale — from AI-driven marketing campaigns at Acer to building computer vision tools for athletes — and I'm always looking for the next problem worth solving.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
