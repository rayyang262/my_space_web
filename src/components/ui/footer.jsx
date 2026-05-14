export function Footer({
  logo,
  brandName,
  mainLinks,
  legalLinks,
  copyright,
}) {
  return (
    <footer style={{ backgroundColor: '#f5f5f5', borderTop: '1px solid #ddd', padding: '2rem', marginTop: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem', flexWrap: 'wrap' }}>
          {/* Left side - Logo and Copyright */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <a
              href="/"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#111', fontWeight: 'bold' }}
            >
              {logo}
              <span style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>{brandName}</span>
            </a>
            <div style={{ fontSize: '0.875rem', color: '#666' }}>
              <div>{copyright.text}</div>
              {copyright.license && <div>{copyright.license}</div>}
            </div>
          </div>

          {/* Right side - Navigation Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'right' }}>
            {/* Main Links */}
            <nav>
              <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '1.5rem 1.5rem', justifyContent: 'flex-end' }}>
                {mainLinks.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      style={{ fontSize: '0.875rem', color: '#2d6a35', textDecoration: 'none', cursor: 'pointer', transition: 'opacity 0.2s' }}
                      onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                      onMouseLeave={(e) => e.target.style.opacity = '1'}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Legal Links */}
            <div>
              <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '1.5rem 1.5rem', justifyContent: 'flex-end' }}>
                {legalLinks.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      style={{ fontSize: '0.875rem', color: '#999', textDecoration: 'none', cursor: 'pointer', transition: 'opacity 0.2s' }}
                      onMouseEnter={(e) => e.target.style.opacity = '0.6'}
                      onMouseLeave={(e) => e.target.style.opacity = '1'}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
