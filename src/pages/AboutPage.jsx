import '../styles/ProjectPage.css'
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack'


export default function AboutPage() {
  return (
    <ScrollStack
      itemDistance={120}
      itemScale={0.02}
      itemStackDistance={40}
      stackPosition="25%"
      scaleEndPosition="5%"
      baseScale={0.90}
      className="about-scroll-stack"
    >
      {/* Bio Panel */}
      <ScrollStackItem>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
          <div>
            <h1 className="project-title" style={{ fontSize: '28px', marginBottom: '4px', color: '#111111' }}>Ray Yang</h1>
            <p style={{ color: '#2d6a35', fontSize: '14px', letterSpacing: '0.08em', fontWeight: 300 }}>UX Focused Designer</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <p style={{ color: '#444444', fontSize: '14px', fontWeight: 300, letterSpacing: '0.04em' }}>NYU Class of 2028</p>
            <p style={{ color: '#444444', fontSize: '14px', fontWeight: 300, letterSpacing: '0.04em' }}>Double major in Interactive Media Arts & Computer Science</p>
          </div>
        </div>
      </ScrollStackItem>

      {/* Bio Text - Part 1 */}
      <ScrollStackItem>
        <p style={{ color: '#222222', fontSize: '14px', fontWeight: 300, lineHeight: '1.9', letterSpacing: '0.03em' }}>
          I design at the intersection of human behavior, technology, and visual storytelling. My work spans UX, product design, and AI integration — built on the belief that the best interfaces don't just function, they shift how people think and feel.
        </p>
      </ScrollStackItem>

      {/* Bio Text - Part 2 */}
      <ScrollStackItem>
        <p style={{ color: '#222222', fontSize: '14px', fontWeight: 300, lineHeight: '1.9', letterSpacing: '0.03em' }}>
          Growing up between Shanghai and New York, I developed a dual fluency — in culture, in language, and in design systems. That perspective shapes how I approach problems: I don't look for the obvious solution, I look for the one nobody considered yet.
        </p>
      </ScrollStackItem>

      {/* Bio Text - Part 3 */}
      <ScrollStackItem>
        <p style={{ color: '#222222', fontSize: '14px', fontWeight: 300, lineHeight: '1.9', letterSpacing: '0.03em' }}>
          Currently studying Interactive Media Arts and Computer Science at NYU Tisch, I bring both the technical depth to build what I design and the creative instinct to make it worth building. I've applied this at scale — from AI-driven marketing campaigns at Acer to building computer vision tools for athletes — and I'm always looking for the next problem worth solving.
        </p>
      </ScrollStackItem>

      {/* Skill 1 */}
      <ScrollStackItem>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', height: '100%' }}>
          <span style={{ fontSize: '1.5rem' }}>⌨️</span>
          <div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#111', letterSpacing: '0.02em' }}>Design Engineer</p>
            <p style={{ fontSize: '12px', color: '#2d6a35', fontWeight: 400, letterSpacing: '0.06em', marginTop: '2px' }}>Front End</p>
          </div>
          <p style={{ fontSize: '13px', color: '#444', fontWeight: 300, lineHeight: '1.7', letterSpacing: '0.02em' }}>I build what I design. Comfortable across React, Three.js, and modern CSS — I close the gap between mockup and production with clean, performant code.</p>
        </div>
      </ScrollStackItem>

      {/* Skill 2 */}
      <ScrollStackItem>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', height: '100%' }}>
          <span style={{ fontSize: '1.5rem' }}>🧠</span>
          <div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#111', letterSpacing: '0.02em' }}>UX Designer</p>
            <p style={{ fontSize: '12px', color: '#2d6a35', fontWeight: 400, letterSpacing: '0.06em', marginTop: '2px' }}>Design Thinking</p>
          </div>
          <p style={{ fontSize: '13px', color: '#444', fontWeight: 300, lineHeight: '1.7', letterSpacing: '0.02em' }}>I approach every problem through the lens of human behavior — researching, prototyping, and iterating until the experience feels inevitable.</p>
        </div>
      </ScrollStackItem>

      {/* Skill 3 */}
      <ScrollStackItem>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', height: '100%' }}>
          <span style={{ fontSize: '1.5rem' }}>🌐</span>
          <div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#111', letterSpacing: '0.02em' }}>Adaptable</p>
            <p style={{ fontSize: '12px', color: '#2d6a35', fontWeight: 400, letterSpacing: '0.06em', marginTop: '2px' }}>Cross-Context Skills</p>
          </div>
          <p style={{ fontSize: '13px', color: '#444', fontWeight: 300, lineHeight: '1.7', letterSpacing: '0.02em' }}>Raised between Shanghai and New York, I move fluidly across cultures, disciplines, and domains — turning unfamiliar constraints into creative advantages.</p>
        </div>
      </ScrollStackItem>
    </ScrollStack>
  )
}
