import '../styles/ProjectPage.css'
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack'

export default function ContactPage() {
  return (
    <ScrollStack
      itemDistance={120}
      itemScale={0.02}
      itemStackDistance={40}
      stackPosition="25%"
      scaleEndPosition="5%"
      baseScale={0.90}
      className="contact-scroll-stack"
    >
      {/* Title Card */}
      <ScrollStackItem>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%', justifyContent: 'center' }}>
          <h1 className="project-title" style={{ fontSize: '28px', color: '#111111' }}>Contact</h1>
          <p style={{ color: '#666', fontSize: '13px', letterSpacing: '0.04em', fontWeight: 300 }}>Get in touch via any of these channels</p>
        </div>
      </ScrollStackItem>

      {/* Email */}
      <ScrollStackItem>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%', justifyContent: 'center' }}>
          <p style={{ color: '#888', fontSize: '12px', letterSpacing: '0.05em', fontWeight: 400, textTransform: 'uppercase' }}>Email</p>
          <a
            href="mailto:ry2541@nyu.edu"
            className="cursor-target"
            style={{ color: '#111111', textDecoration: 'none', fontSize: '18px', letterSpacing: '0.02em', fontWeight: 400, transition: 'color 0.3s' }}
            onMouseEnter={e => e.target.style.color = '#2d6a35'}
            onMouseLeave={e => e.target.style.color = '#111111'}
          >
            ✉ ry2541@nyu.edu
          </a>
        </div>
      </ScrollStackItem>

      {/* LinkedIn */}
      <ScrollStackItem>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%', justifyContent: 'center' }}>
          <p style={{ color: '#888', fontSize: '12px', letterSpacing: '0.05em', fontWeight: 400, textTransform: 'uppercase' }}>LinkedIn</p>
          <a
            href="https://www.linkedin.com/in/rayyang26/"
            target="_blank"
            rel="noreferrer"
            className="cursor-target"
            style={{ color: '#444444', textDecoration: 'none', fontSize: '18px', letterSpacing: '0.02em', fontWeight: 400, transition: 'color 0.3s' }}
            onMouseEnter={e => e.target.style.color = '#2d6a35'}
            onMouseLeave={e => e.target.style.color = '#444444'}
          >
            ↗ linkedin.com/in/rayyang26
          </a>
        </div>
      </ScrollStackItem>

      {/* Phone */}
      <ScrollStackItem>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%', justifyContent: 'center' }}>
          <p style={{ color: '#888', fontSize: '12px', letterSpacing: '0.05em', fontWeight: 400, textTransform: 'uppercase' }}>Phone</p>
          <a
            href="tel:+15512636831"
            className="cursor-target"
            style={{ color: '#444444', textDecoration: 'none', fontSize: '18px', letterSpacing: '0.02em', fontWeight: 400, transition: 'color 0.3s' }}
            onMouseEnter={e => e.target.style.color = '#2d6a35'}
            onMouseLeave={e => e.target.style.color = '#444444'}
          >
            📱 +1 (551) 263-6831
          </a>
        </div>
      </ScrollStackItem>
    </ScrollStack>
  )
}
