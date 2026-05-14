import { useParams, useNavigate } from 'react-router-dom'
import { projects } from '../data/projects'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { useState, useRef, useEffect } from 'react'
import '../styles/ProjectPage.css'
import { Footer } from '../components/ui/footer'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function ProjectPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = projects.find((p) => p.id === id)
  const [chartAnimated, setChartAnimated] = useState(false)
  const [showFooter, setShowFooter] = useState(false)
  const chartRef = useRef(null)
  const footerRef = useRef(null)
  const sentinelRef = useRef(null)

  if (!project) {
    return (
      <div className="project-page project-not-found">
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Studio</button>
        <p>Project not found.</p>
      </div>
    )
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setChartAnimated(true)
          } else {
            setChartAnimated(false)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (chartRef.current) {
      observer.observe(chartRef.current)
    }

    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFooter(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#ffffff' }}>
      {/* Scrollable content */}
      <div style={{ position: 'relative', zIndex: 1, overflowY: 'auto', height: '100vh', paddingBottom: '4rem' }}>


        {/* Hero / Title section */}
        <section style={{ paddingTop: '3rem', paddingBottom: '2rem', paddingLeft: '3rem', paddingRight: '3rem', display: 'flex', justifyContent: 'center' }}>
          <div style={{ maxWidth: '800px', width: '100%' }}>
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
          <section style={{ paddingBottom: '2rem', paddingLeft: '3rem', paddingRight: '3rem', borderBottom: '1px solid #e5e5e5', display: 'flex', justifyContent: 'center' }}>
            <div style={{ maxWidth: '800px', width: '100%', display: 'flex', gap: '2rem', flexWrap: 'wrap', fontSize: '13px', fontWeight: 400, color: '#666', letterSpacing: '0.05em' }}>
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
          <section style={{ paddingTop: '3rem', paddingBottom: '3rem', paddingLeft: '3rem', paddingRight: '3rem', display: 'flex', justifyContent: 'center' }}>
            <div style={{ maxWidth: '800px', width: '100%' }}>
              <img
                src={project.imageSrc}
                alt={project.title}
                style={{ width: '100%', borderRadius: '8px', display: 'block' }}
                onError={(e) => { e.target.style.display = 'none' }}
              />
            </div>
          </section>
        )}

        {/* Research - Chart.js Bar Chart */}
        {project.researchData && project.researchData.length > 0 && (
          <section ref={chartRef} style={{ paddingTop: '3rem', paddingBottom: '3rem', paddingLeft: '3rem', paddingRight: '3rem', borderTop: '1px solid #e5e5e5', display: 'flex', justifyContent: 'center' }}>
            <div style={{ maxWidth: '800px', width: '100%' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 600, color: '#111', marginBottom: '2rem' }}>Data Research</h2>
              <div style={{ height: '350px', position: 'relative' }}>
                <Bar
                  data={{
                    labels: project.researchData.map(item => item.label),
                    datasets: [
                      {
                        label: 'DBA Level',
                        data: chartAnimated ? project.researchData.map(item => item.dba) : project.researchData.map(() => 0),
                        backgroundColor: 'rgba(45, 106, 53, 0.8)',
                        borderColor: '#2d6a35',
                        borderWidth: 1,
                        borderRadius: 4,
                      }
                    ]
                  }}
                  options={{
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                      duration: chartAnimated ? 1500 : 0,
                      easing: 'easeInOutQuad',
                    },
                    plugins: {
                      legend: {
                        display: false,
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            return context.parsed.x + ' DBA'
                          }
                        }
                      }
                    },
                    scales: {
                      x: {
                        max: 120,
                        grid: {
                          color: '#e5e5e5',
                          drawBorder: false,
                        },
                        ticks: {
                          font: {
                            size: 12,
                          },
                          color: '#666',
                        }
                      },
                      y: {
                        grid: {
                          display: false,
                          drawBorder: false,
                        },
                        ticks: {
                          font: {
                            size: 12,
                            weight: 500,
                          },
                          color: '#666',
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </section>
        )}

{/* User Insights */}
        {project.userInsights && project.userInsights.length > 0 && (
          <section style={{ paddingTop: '3rem', paddingBottom: '3rem', paddingLeft: '3rem', paddingRight: '3rem', borderTop: '1px solid #e5e5e5', display: 'flex', justifyContent: 'center' }}>
            <div style={{ maxWidth: '800px', width: '100%' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 600, color: '#111', marginBottom: '2rem' }}>User Insights</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {project.userInsights.map((user, idx) => (
                  <div key={idx} style={{ background: '#f9f9f9', padding: '2rem', borderRadius: '8px', borderLeft: '4px solid #2d6a35' }}>
                    <div style={{ marginBottom: '1rem' }}>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: '#111', marginBottom: '0.25rem' }}>
                        {user.name}, Age {user.age}
                      </p>
                      <p style={{ fontSize: '12px', color: '#666', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        {user.role}
                      </p>
                    </div>
                    <p style={{ fontSize: '13px', color: '#333', fontWeight: 400, lineHeight: 1.8, marginBottom: '1rem' }}>
                      {user.quote.split(user.highlight).map((part, i) => (
                        i === 0 ? (
                          <span key={i}>{part}</span>
                        ) : (
                          <span key={i}><strong style={{ color: '#2d6a35' }}>{user.highlight}</strong>{part}</span>
                        )
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Speaker Comparison */}
        {project.speakerComparison && project.speakerComparison.length > 0 && (
          <section style={{ paddingTop: '3rem', paddingBottom: '3rem', paddingLeft: '3rem', paddingRight: '3rem', borderTop: '1px solid #e5e5e5', display: 'flex', justifyContent: 'center' }}>
            <div style={{ maxWidth: '800px', width: '100%' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 600, color: '#111', marginBottom: '2rem' }}>Marketing Research</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                {project.speakerComparison.map((speaker, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#111', textAlign: 'center' }}>
                      {speaker.name}
                    </h3>
                    <div style={{ width: '200px', height: '200px', position: 'relative' }}>
                      <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
                        <polygon
                          points="100,20 160,70 160,150 100,180 40,150 40,70"
                          fill="none"
                          stroke="#e5e5e5"
                          strokeWidth="1"
                        />
                        <circle cx="100" cy="100" r="30" fill="none" stroke="#e5e5e5" strokeWidth="1" />
                        <circle cx="100" cy="100" r="60" fill="none" stroke="#e5e5e5" strokeWidth="1" />
                      </svg>
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ textAlign: 'center', fontSize: '11px', fontWeight: 500, color: '#666' }}>
                          <p style={{ marginBottom: '0.5rem' }}>{speaker.attributes.pricing}</p>
                          <p style={{ marginBottom: '0.5rem' }}>{speaker.attributes.portability}</p>
                          <p>{speaker.attributes.soundQuality}</p>
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: 500, color: '#999', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <span>Pricing: {speaker.attributes.pricing}</span>
                      <span>Portability: {speaker.attributes.portability}</span>
                      <span>Sound Quality: {speaker.attributes.soundQuality}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Image Galleries */}
        {project.galleries && (
          <>
            {/* Prototype Gallery */}
            {project.galleries.prototype && (
              <section style={{ paddingTop: '3rem', paddingBottom: '3rem', paddingLeft: '3rem', paddingRight: '3rem', borderTop: '1px solid #e5e5e5', display: 'flex', justifyContent: 'center' }}>
                <div style={{ maxWidth: '800px', width: '100%' }}>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 600, color: '#111', marginBottom: '2rem' }}>Prototype Development</h2>
                  <img
                    src={project.galleries.prototype}
                    alt="Prototype gallery"
                    style={{ width: '100%', borderRadius: '8px', display: 'block' }}
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                </div>
              </section>
            )}

            {/* Render Features */}
            {project.galleries.renderFeatures && (
              <section style={{ paddingTop: '3rem', paddingBottom: '3rem', paddingLeft: '3rem', paddingRight: '3rem', borderTop: '1px solid #e5e5e5', display: 'flex', justifyContent: 'center' }}>
                <div style={{ maxWidth: '800px', width: '100%' }}>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 600, color: '#111', marginBottom: '2rem' }}>Render & Features</h2>
                  <img
                    src={project.galleries.renderFeatures}
                    alt="Render and features"
                    style={{ width: '100%', borderRadius: '8px', display: 'block' }}
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                </div>
              </section>
            )}

            {/* Explosive View */}
            {project.galleries.explosiveView && (
              <section style={{ paddingTop: '3rem', paddingBottom: '3rem', paddingLeft: '3rem', paddingRight: '3rem', borderTop: '1px solid #e5e5e5', display: 'flex', justifyContent: 'center' }}>
                <div style={{ maxWidth: '800px', width: '100%' }}>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 600, color: '#111', marginBottom: '2rem' }}>Explosive View</h2>
                  <img
                    src={project.galleries.explosiveView}
                    alt="Explosive view"
                    style={{ width: '100%', borderRadius: '8px', display: 'block' }}
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                </div>
              </section>
            )}

            {/* Button Functionality */}
            {project.galleries.buttonFunctionality && (
              <section style={{ paddingTop: '3rem', paddingBottom: '3rem', paddingLeft: '3rem', paddingRight: '3rem', borderTop: '1px solid #e5e5e5', display: 'flex', justifyContent: 'center' }}>
                <div style={{ maxWidth: '800px', width: '100%' }}>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 600, color: '#111', marginBottom: '2rem' }}>Button Functionality</h2>
                  <img
                    src={project.galleries.buttonFunctionality}
                    alt="Button functionality"
                    style={{ width: '100%', borderRadius: '8px', display: 'block' }}
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                </div>
              </section>
            )}

            {/* Scenario Render */}
            {project.galleries.scenarioRender && (
              <section style={{ paddingTop: '3rem', paddingBottom: '3rem', paddingLeft: '3rem', paddingRight: '3rem', borderTop: '1px solid #e5e5e5', display: 'flex', justifyContent: 'center' }}>
                <div style={{ maxWidth: '800px', width: '100%' }}>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 600, color: '#111', marginBottom: '2rem' }}>Scenario Rendering</h2>
                  <img
                    src={project.galleries.scenarioRender}
                    alt="Scenario rendering"
                    style={{ width: '100%', borderRadius: '8px', display: 'block' }}
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                </div>
              </section>
            )}
          </>
        )}

        {/* Problem → Solution → Result cards */}
        {(project.problem || project.solution || project.result) && (
          <section style={{ paddingBottom: '3rem', paddingLeft: '3rem', paddingRight: '3rem', display: 'flex', justifyContent: 'center' }}>
            <div style={{ maxWidth: '800px', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
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
          <section style={{ paddingBottom: '3rem', paddingLeft: '3rem', paddingRight: '3rem', display: 'flex', justifyContent: 'center' }}>
            <div style={{ maxWidth: '800px', width: '100%', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
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
          <section style={{ paddingBottom: '3rem', paddingLeft: '3rem', paddingRight: '3rem', borderTop: '1px solid #e5e5e5', paddingTop: '3rem', display: 'flex', justifyContent: 'center' }}>
            <div style={{ maxWidth: '800px', width: '100%' }}>
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
          <section style={{ paddingBottom: '3rem', paddingLeft: '3rem', paddingRight: '3rem', borderTop: '1px solid #e5e5e5', paddingTop: '3rem', display: 'flex', justifyContent: 'center' }}>
            <div style={{ maxWidth: '800px', width: '100%' }}>
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
          <section style={{ paddingBottom: '3rem', paddingLeft: '3rem', paddingRight: '3rem', borderTop: '1px solid #e5e5e5', paddingTop: '2rem', display: 'flex', justifyContent: 'center' }}>
            <div style={{ maxWidth: '800px', width: '100%', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {project.tags.map((tag) => (
                <span key={tag} style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.05em', padding: '4px 12px', borderRadius: '4px', border: '1px solid #ddd', color: '#666', background: '#f9f9f9' }}>
                  {tag}
                </span>
              ))}
            </div>
          </section>
        )}

        <div ref={sentinelRef} style={{ height: '1px', visibility: 'hidden' }} />

        <div
          ref={footerRef}
          style={{
            opacity: showFooter ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            pointerEvents: showFooter ? 'auto' : 'none',
          }}
        >
          <Footer
            logo={<Github className="h-6 w-6" />}
            brandName="Ray Yang"
            mainLinks={[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ]}
            legalLinks={[
              { href: "/privacy", label: "Privacy" },
              { href: "/terms", label: "Terms" },
            ]}
            copyright={{
              text: "© 2024 Ray Yang",
              license: "All rights reserved",
            }}
          />
        </div>
      </div>
    </div>
  )
}
