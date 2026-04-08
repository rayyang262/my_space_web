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
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#ffffff' }}>
      {/* Scrollable content */}
      <div style={{ position: 'relative', zIndex: 1, overflowY: 'auto', height: '100vh', paddingBottom: '4rem' }}>


        {/* Hero / Title section */}
        <section style={{ paddingTop: '3rem', paddingBottom: '2rem', paddingLeft: '3rem', paddingRight: '3rem' }}>
          <div style={{ maxWidth: '800px' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 600, color: '#111', marginBottom: '1rem', lineHeight: 1.1 }}>
              {project.title}
            </h1>
            {project.impact && (
              <p style={{ fontSize: '1.3rem', color: '#2d6a35', fontWeight: 500, marginBottom: '1rem' }}>
                {project.impact}
              </p>
            )}
          </div>
        </section>

        {/* Meta info bar */}
        {(project.role || project.duration || project.collaborators) && (
          <section style={{ paddingBottom: '2rem', paddingLeft: '3rem', paddingRight: '3rem', borderBottom: '1px solid #e5e5e5' }}>
            <div style={{ maxWidth: '800px', display: 'flex', gap: '2rem', flexWrap: 'wrap', fontSize: '13px', fontWeight: 400, color: '#666', letterSpacing: '0.05em' }}>
              {project.role && <span>{project.role}</span>}
              {project.duration && <span>{project.duration}</span>}
              {project.collaborators && project.collaborators.length > 0 && (
                <span>{project.collaborators.join(', ')}</span>
              )}
            </div>
          </section>
        )}

        {/* Main image */}
        {project.imageSrc && (
          <section style={{ paddingTop: '3rem', paddingBottom: '3rem', paddingLeft: '3rem', paddingRight: '3rem' }}>
            <div style={{ maxWidth: '800px' }}>
              <img
                src={project.imageSrc}
                alt={project.title}
                style={{ width: '100%', borderRadius: '8px', display: 'block' }}
                onError={(e) => { e.target.style.display = 'none' }}
              />
            </div>
          </section>
        )}

        {/* Problem → Solution → Result cards */}
        {(project.problem || project.solution || project.result) && (
          <section style={{ paddingBottom: '3rem', paddingLeft: '3rem', paddingRight: '3rem' }}>
            <div style={{ maxWidth: '800px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              {project.problem && (
                <div style={{ background: '#f9f9f9', padding: '1.5rem', borderRadius: '8px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: '#999', letterSpacing: '0.08em', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Problem</p>
                  <p style={{ fontSize: '13px', color: '#333', fontWeight: 400, lineHeight: 1.7 }}>
                    {project.problem}
                  </p>
                </div>
              )}
              {project.solution && (
                <div style={{ background: '#f9f9f9', padding: '1.5rem', borderRadius: '8px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: '#999', letterSpacing: '0.08em', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Solution</p>
                  <p style={{ fontSize: '13px', color: '#333', fontWeight: 400, lineHeight: 1.7 }}>
                    {project.solution}
                  </p>
                </div>
              )}
              {project.result && (
                <div style={{ background: '#f9f9f9', padding: '1.5rem', borderRadius: '8px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: '#999', letterSpacing: '0.08em', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Result</p>
                  <p style={{ fontSize: '13px', color: '#333', fontWeight: 400, lineHeight: 1.7 }}>
                    {project.result}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Features breakdown - stacked sections */}
        {project.features && project.features.length > 0 && (
          <section style={{ paddingBottom: '3rem', paddingLeft: '3rem', paddingRight: '3rem' }}>
            <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {project.features.map((feature, idx) => (
                <div key={idx} style={{ borderBottom: idx < project.features.length - 1 ? '1px solid #e5e5e5' : 'none', paddingBottom: '2.5rem' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#111', marginBottom: '0.75rem' }}>
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#666', fontWeight: 400, lineHeight: 1.8 }}>
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Process & Methodology */}
        {project.process && project.process.length > 0 && (
          <section style={{ paddingBottom: '3rem', paddingLeft: '3rem', paddingRight: '3rem', borderTop: '1px solid #e5e5e5', paddingTop: '3rem' }}>
            <div style={{ maxWidth: '800px' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 600, color: '#111', marginBottom: '2rem' }}>Process</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {project.process.map((step, idx) => (
                  <div key={idx} style={{ borderBottom: idx < project.process.length - 1 ? '1px solid #e5e5e5' : 'none', paddingBottom: '2rem' }}>
                    <p style={{ fontSize: '12px', fontWeight: 600, color: '#2d6a35', letterSpacing: '0.08em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                      {step.stage}
                    </p>
                    <p style={{ fontSize: '14px', color: '#666', fontWeight: 400, lineHeight: 1.8 }}>
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Tech Stack */}
        {project.techStack && project.techStack.length > 0 && (
          <section style={{ paddingBottom: '3rem', paddingLeft: '3rem', paddingRight: '3rem', borderTop: '1px solid #e5e5e5', paddingTop: '3rem' }}>
            <div style={{ maxWidth: '800px' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 600, color: '#111', marginBottom: '1.5rem' }}>Tech Stack</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {project.techStack.map((tech) => (
                  <span key={tech} style={{ fontSize: '13px', fontWeight: 500, color: '#2d6a35', padding: '6px 14px', border: '1px solid #ddd', borderRadius: '6px', background: '#f9f9f9' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <section style={{ paddingBottom: '3rem', paddingLeft: '3rem', paddingRight: '3rem', borderTop: '1px solid #e5e5e5', paddingTop: '2rem' }}>
            <div style={{ maxWidth: '800px', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {project.tags.map((tag) => (
                <span key={tag} style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.05em', padding: '4px 12px', borderRadius: '4px', border: '1px solid #ddd', color: '#666', background: '#f9f9f9' }}>
                  {tag}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Footer CTA */}
        <section style={{ paddingTop: '3rem', paddingBottom: '2rem', paddingLeft: '3rem', paddingRight: '3rem', borderTop: '1px solid #e5e5e5' }}>
          <div style={{ maxWidth: '800px', textAlign: 'center' }}>
            <p style={{ fontSize: '13px', color: '#999', marginBottom: '1.5rem' }}>Interested in working together?</p>
            <a href="mailto:ry2541@nyu.edu" style={{ fontSize: '14px', fontWeight: 500, color: '#2d6a35', textDecoration: 'none', borderBottom: '1px solid #2d6a35', paddingBottom: '2px' }}>
              Get in touch
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
