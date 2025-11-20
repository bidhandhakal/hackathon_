import {
  Search,
  ArrowRight,
  Globe,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { Button, Input } from "./ui";

function Hero() {
  return (
    <div className="bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        {/* Radial Gradient Fade */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_200px,transparent,var(--background))]"></div>

        {/* Abstract Shapes */}
        <div className="absolute top-1/4 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-foreground/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-foreground/3 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
      </div>

      {/* Hero Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-start text-center px-4 pt-36 pb-26 md:pb-30 lg:pb-34 max-w-5xl mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-8xl font-bold tracking-tight md:tracking-tighter mb-4 md:mb-6 max-w-4xl leading-[0.8] md:leading-19 font-[wire]">
          Find the perfect <br className="hidden md:block" />
          <span className="text-muted-foreground">freelance</span> services.
        </h1>

        {/* Subheadline */}
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl md:max-w-2xl mb-6 md:mb-10 leading-relaxed px-2 sm:px-0">
          Connect with a global network of expert freelancers. From development
          to design, find the right talent to scale your business today.
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-2xl relative group px-2 sm:px-0">
          <div className="absolute inset-0 bg-foreground/5 rounded-full blur-xl group-hover:bg-foreground/1 0 transition-all duration-500"></div>
          <div className="relative flex items-center bg-background border rounded-xl p-1.5 md:p-2 shadow-xl ">
            <div className="pl-2 sm:pl-3 md:pl-4 text-muted-foreground">
              <Search className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <Input
              type="text"
              placeholder="Search services..."
              className="border-0 shadow-none focus-visible:ring-0 bg-transparent text-sm md:text-base h-10 md:h-12 px-2 sm:px-3 md:px-4 flex-1 placeholder:text-xs sm:placeholder:text-sm"
            />
            <Button
              size="lg"
              variant="default"
              className="rounded-xl px-3 sm:px-4 md:px-8 h-10 md:h-12 text-xs sm:text-sm md:text-base whitespace-nowrap bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Popular Tags */}
        <div className="mt-4 md:mt-6 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs md:text-sm text-muted-foreground px-2 sm:px-0">
          <span className="hidden sm:inline">Popular:</span>
          <button className="px-2 sm:px-2.5 py-1 md:px-3 rounded-full border hover:border-foreground hover:text-foreground transition-colors text-[10px] sm:text-xs md:text-sm">
            Plumbing
          </button>
          <button className="px-2 sm:px-2.5 py-1 md:px-3 rounded-full border hover:border-foreground hover:text-foreground transition-colors text-[10px] sm:text-xs md:text-sm">
            Carpentry
          </button>
          <button className="px-2 sm:px-2.5 py-1 md:px-3 rounded-full border hover:border-foreground hover:text-foreground transition-colors text-[10px] sm:text-xs md:text-sm">
            Electrical
          </button>
          <button className="px-2 sm:px-2.5 py-1 md:px-3 rounded-full border hover:border-foreground hover:text-foreground transition-colors text-[10px] sm:text-xs md:text-sm">
            Web Development
          </button>
        </div>
      </main>
    </div>
  );
}

export default Hero;
