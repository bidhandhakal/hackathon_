import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const services = [
  { title: "Electricians", image: "/electrician-working.jpg" },
  { title: "Plumbers", image: "/plumber-fixing-pipes.jpg" },
  { title: "Carpenters", image: "/carpenter-woodwork.jpg" },
  { title: "House Painters", image: "/house-painter-painting-wall.jpg" },
  { title: "Cleaning Helpers", image: "/cleaning-service.jpg" },
  { title: "Babysitters", image: "/babysitter-with-child.jpg" },
  { title: "Home Tutors", image: "/tutor-teaching-student.jpg" },
  { title: "Photographers", image: "/photographer-with-camera.jpg" },
  { title: "Gardeners", image: "/gardener-with-plants.jpg" },
  { title: "Movers", image: "/movers-loading-furniture.jpg" },
  {
    title: "Appliance Repair",
    image: "/repair-technician-fixing-appliance.jpg",
  },
  { title: "Event Helpers", image: "/event-decoration.jpg" },
  { title: "Videographers", image: "/videographer-filming.jpg" },
  { title: "Designers", image: "/designer-at-work.jpg" },
  { title: "Delivery Helpers", image: "/delivery-person.jpg" },
];

export default function ServicesScroll() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="pt-0 pb-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-8">
          Our Services
        </h2>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
          >
            {services.map((service, idx) => (
              <div
                key={idx}
                className="flex-none w-48 snap-center group cursor-pointer"
              >
                <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative w-full h-40 overflow-hidden bg-muted">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Guarantee of 1 month after work
                    </p>
                    <button className="w-full bg-primary text-primary-foreground py-2 rounded hover:opacity-90 transition-opacity text-sm font-medium">
                      Explore worker
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
