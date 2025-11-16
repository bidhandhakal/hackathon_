const footerSections = {
  "For Clients": ["How to hire", "Talent Marketplace", "Contract-to-hire"],
  "For Talent": ["How to find work", "Direct Contracts", "Find freelance jobs"],
  Resources: ["Help & support", "Success stories", "Quickkam reviews"],
  Company: ["About us", "Careers", "Contact us"],
};

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {Object.entries(footerSections).map(([section, links]) => (
            <div key={section}>
              <h3 className="font-bold mb-4">{section}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="hover:underline transition-colors text-background/80 hover:text-background"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60">
            © 2025 Quickkam. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="hover:underline transition-colors text-background/80 hover:text-background"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:underline transition-colors text-background/80 hover:text-background"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
