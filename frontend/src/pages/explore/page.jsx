import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, Filter, Star, MapPin, Heart } from "lucide-react";

const SERVICES = [
  {
    id: 1,
    title: "Professional House Cleaning",
    provider: "Clean Sweep Services",
    rating: 4.9,
    reviews: 256,
    price: 150,
    category: "Cleaning",
    location: "2.3 km away",
    image: "/house-cleaning.jpg",
    availability: "Available today",
    verified: true,
  },
  {
    id: 2,
    title: "Expert Plumbing Repair",
    provider: "Plumber Pro",
    rating: 4.8,
    reviews: 189,
    price: 200,
    category: "Plumbing",
    location: "1.8 km away",
    image: "/plumbing-repair.jpg",
    availability: "Available today",
    verified: true,
  },
  {
    id: 3,
    title: "Electrical Installation & Repair",
    provider: "ElectroFix",
    rating: 4.7,
    reviews: 342,
    price: 250,
    category: "Electrical",
    location: "3.1 km away",
    image: "/electrical-work.jpg",
    availability: "Available tomorrow",
    verified: true,
  },
  {
    id: 4,
    title: "Interior Painting Services",
    provider: "ColorWorks",
    rating: 4.9,
    reviews: 178,
    price: 180,
    category: "Painting",
    location: "2.8 km away",
    image: "/painting-service.jpg",
    availability: "Available today",
    verified: true,
  },
  {
    id: 5,
    title: "Lawn Landscaping & Maintenance",
    provider: "Green Gardens",
    rating: 4.6,
    reviews: 267,
    price: 120,
    category: "Landscaping",
    location: "1.5 km away",
    image: "/landscaping-garden.jpg",
    availability: "Available today",
    verified: false,
  },
  {
    id: 6,
    title: "Carpentry & Furniture Assembly",
    provider: "WoodCraft",
    rating: 4.8,
    reviews: 201,
    price: 220,
    category: "Carpentry",
    location: "2.2 km away",
    image: "/carpentry-work.jpg",
    availability: "Available tomorrow",
    verified: true,
  },
];

const CATEGORIES = [
  "All",
  "Cleaning",
  "Plumbing",
  "Electrical",
  "Painting",
  "Landscaping",
  "Carpentry",
  "HVAC",
];
const SORT_OPTIONS = [
  "Recommended",
  "Highest Rated",
  "Most Reviews",
  "Lowest Price",
  "Highest Price",
];

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Recommended");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 300]);

  const filteredServices = useMemo(() => {
    let filtered = SERVICES;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((s) => s.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (s) =>
          s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered = filtered.filter(
      (s) => s.price >= priceRange[0] && s.price <= priceRange[1]
    );

    if (sortBy === "Highest Rated") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "Most Reviews") {
      filtered.sort((a, b) => b.reviews - a.reviews);
    } else if (sortBy === "Lowest Price") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Highest Price") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [selectedCategory, searchTerm, sortBy, priceRange]);

  return (
    <div className="min-h-screen bg-background">
      {/* Search Section */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/5 border-b border-border py-8 px-4">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold text-foreground">
            Find Services Near You
          </h1>

          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by service, provider name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 bg-card border-border text-foreground"
              />
            </div>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="border-border"
            >
              <Filter size={20} />
              <span className="hidden sm:inline ml-2">Filters</span>
            </Button>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-foreground hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Sidebar Filters */}
        {showFilters && (
          <div className="mb-8 p-6 bg-card border border-border rounded-lg">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-4">
                  Price Range
                </h3>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="300"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([
                        priceRange[0],
                        Number.parseInt(e.target.value),
                      ])
                    }
                    className="flex-1 h-2 bg-muted rounded-lg"
                  />
                  <span className="text-foreground font-semibold">
                    ${priceRange[1]}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchTerm("");
                    setPriceRange([0, 300]);
                    setSortBy("Recommended");
                  }}
                  variant="outline"
                  className="flex-1 border-border"
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-foreground">
              {filteredServices.length}{" "}
              {filteredServices.length === 1 ? "Service" : "Services"} Found
            </h2>
            {!showFilters && (
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="hidden sm:block px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-sm"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>

          {filteredServices.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No services found matching your criteria
              </p>
              <Button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchTerm("");
                  setPriceRange([0, 300]);
                }}
                className="mt-4 bg-primary text-primary-foreground hover:bg-accent"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <Link key={service.id} to={`/service/${service.id}`}>
                  <Card className="bg-card border border-border overflow-hidden hover:shadow-lg transition-shadow h-full cursor-pointer">
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <img
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setFavorites((prev) =>
                            prev.includes(service.id)
                              ? prev.filter((id) => id !== service.id)
                              : [...prev, service.id]
                          );
                        }}
                        className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full transition-colors"
                      >
                        <Heart
                          size={20}
                          className={
                            favorites.includes(service.id)
                              ? "fill-destructive text-destructive"
                              : "text-muted-foreground"
                          }
                        />
                      </button>
                      {service.verified && (
                        <div className="absolute top-3 left-3 bg-accent/90 text-accent-foreground text-xs font-bold px-2 py-1 rounded-full">
                          Verified
                        </div>
                      )}
                    </div>

                    <div className="p-4 space-y-3">
                      <h3 className="font-semibold text-foreground line-clamp-2">
                        {service.title}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        {service.provider}
                      </p>

                      <div className="flex items-center gap-1 text-sm">
                        <Star size={16} className="fill-accent text-accent" />
                        <span className="font-semibold text-foreground">
                          {service.rating}
                        </span>
                        <span className="text-muted-foreground">
                          ({service.reviews} reviews)
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin size={16} />
                        {service.location}
                      </div>

                      <div className="border-t border-border pt-3 flex justify-between items-center">
                        <span className="font-bold text-primary text-lg">
                          ${service.price}
                        </span>
                        <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                          {service.availability}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
