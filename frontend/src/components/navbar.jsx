import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const serviceCategories = {
  'Browse Work': [
    { category: 'Home & Repair Services', items: ['Electricians', 'Plumbers', 'Carpenters', 'House painters', 'Appliance repair technicians', 'Home maintenance workers'] },
    { category: 'Personal & Daily Assistance', items: ['Cleaning helpers', 'Household helpers', 'Babysitters / caretakers', 'Delivery helpers', 'Errand helpers'] },
    { category: 'Education & Tutoring', items: ['Home tutors', 'Language tutors', 'Skill coaches (music, dance, instruments)'] },
    { category: 'Creative & Event Services', items: ['Photographers', 'Videographers', 'Event helpers', 'Decoration helpers'] },
    { category: 'Outdoor & Labor Services', items: ['Garden/yard workers', 'Movers & loaders', 'Construction helpers', 'Handymen'] },
    { category: 'Local Freelance Professionals', items: ['On-site designers', 'Computer/laptop maintenance'] },
  ],
  'Offer Work': [
    { category: 'Get Started', items: ['Create Profile', 'Browse Available Jobs', 'Submit Proposals', 'Track Applications'] },
  ],
}

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null)

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold text-primary">
            Quickkam
          </a>

          {/* Center Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['Browse Work', 'Offer Work', 'Why Quickkam', 'Pricing'].map((item) => (
              <div key={item} className="relative group">
                <button className="flex items-center gap-1 text-foreground hover:text-primary transition-colors">
                  {item}
                  {['Browse Work', 'Offer Work'].includes(item) && <ChevronDown size={16} />}
                </button>

                {/* Dropdown */}
                {['Browse Work', 'Offer Work'].includes(item) && serviceCategories[item] && (
                  <div className="absolute left-0 mt-0 w-96 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 p-6">
                    <div className="grid grid-cols-2 gap-6">
                      {serviceCategories[item].map((section) => (
                        <div key={section.category}>
                          <h3 className="font-semibold text-foreground mb-3 text-sm">{section.category}</h3>
                          <ul className="space-y-2">
                            {section.items.map((subitem) => (
                              <li key={subitem}>
                                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                  {subitem}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Auth Buttons */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-foreground hover:text-primary transition-colors hidden sm:block">
              Sign In
            </a>
            <a href="#" className="bg-primary text-primary-foreground px-6 py-2 rounded-full hover:opacity-90 transition-opacity">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}