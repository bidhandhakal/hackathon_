import { useState } from "react";
import { Search, MapPin } from "lucide-react";

const nepaliCities = [
  "Kathmandu",
  "Lalitpur",
  "Bhaktapur",
  "Pokhara",
  "Chitwan",
  "Biratnagar",
];
const allServices = [
  "Electricians",
  "Plumbers",
  "Carpenters",
  "House painters",
  "Appliance repair technicians",
  "Cleaning helpers",
  "Household helpers",
  "Babysitters",
  "Delivery helpers",
  "Errand helpers",
  "Home tutors",
  "Language tutors",
  "Photographers",
  "Videographers",
  "Garden workers",
];

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [showServiceSuggestions, setShowServiceSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);

  const filteredServices = searchQuery
    ? allServices.filter((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  const filteredCities = locationQuery
    ? nepaliCities.filter((c) =>
        c.toLowerCase().includes(locationQuery.toLowerCase())
      )
    : [];

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-primary/5 to-background overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
          A platform linking Nepali clients with nearby skilled workers.
        </h1>

        {/* Search Bar */}
        <div className="mt-12 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {/* Service Search */}
            <div className="relative">
              <div className="relative flex items-center">
                <Search
                  size={20}
                  className="absolute left-3 text-muted-foreground"
                />
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowServiceSuggestions(true);
                  }}
                  onBlur={() =>
                    setTimeout(() => setShowServiceSuggestions(false), 200)
                  }
                  onFocus={() => setShowServiceSuggestions(true)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              {showServiceSuggestions && filteredServices.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-10">
                  {filteredServices.slice(0, 5).map((service) => (
                    <button
                      key={service}
                      onClick={() => {
                        setSearchQuery(service);
                        setShowServiceSuggestions(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-primary/10 transition-colors text-sm text-foreground"
                    >
                      {service}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Location Search */}
            <div className="relative">
              <div className="relative flex items-center">
                <MapPin
                  size={20}
                  className="absolute left-3 text-muted-foreground"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={locationQuery}
                  onChange={(e) => {
                    setLocationQuery(e.target.value);
                    setShowLocationSuggestions(true);
                  }}
                  onBlur={() =>
                    setTimeout(() => setShowLocationSuggestions(false), 200)
                  }
                  onFocus={() => setShowLocationSuggestions(true)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              {showLocationSuggestions && filteredCities.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-10">
                  {filteredCities.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setLocationQuery(city);
                        setShowLocationSuggestions(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-primary/10 transition-colors text-sm text-foreground"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button className="w-full md:w-auto bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium">
            Search Workers
          </button>
        </div>
      </div>
    </section>
  );
}
