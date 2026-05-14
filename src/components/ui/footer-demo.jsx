import { Hexagon, Github, Twitter, Linkedin, Mail } from 'lucide-react'
import { Footer } from '@/components/ui/footer'

export function FooterDemo() {
  return (
    <Footer
      logo={<Hexagon className="h-10 w-10" />}
      brandName="Ray Yang Design"
      socialLinks={[
        {
          icon: <Twitter className="h-5 w-5" />,
          href: "https://twitter.com",
          label: "Twitter",
        },
        {
          icon: <Github className="h-5 w-5" />,
          href: "https://github.com",
          label: "GitHub",
        },
        {
          icon: <Linkedin className="h-5 w-5" />,
          href: "https://linkedin.com",
          label: "LinkedIn",
        },
        {
          icon: <Mail className="h-5 w-5" />,
          href: "mailto:ry2541@nyu.edu",
          label: "Email",
        },
      ]}
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
  )
}
