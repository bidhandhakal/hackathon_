import { useState } from "react";
import {
  Briefcase,
  FileText,
  HandshakeIcon,
  CheckCircle,
  DollarSign,
  Shield,
} from "lucide-react";

const hiringCards = [
  {
    title: "Posting a job is always free",
    hoverTitle: "Create a job",
    hoverText:
      "Generate a job post with AI or create your own and filter talent matches.",
    icon: FileText,
  },
  {
    title: "Get proposals and hire",
    hoverTitle: "Explore experts",
    hoverText:
      "Screen, interview, or book a consult with an expert before hiring.",
    icon: Briefcase,
  },
  {
    title: "Pay when work is done",
    hoverTitle: "View pricing",
    hoverText:
      "Release payments after approving work, by milestone or upon project completion.",
    icon: DollarSign,
  },
];

const workingCards = [
  {
    title: "Create your profile and get discovered",
    hoverTitle: "Create profile",
    hoverText:
      "Build a strong profile so clients can find you based on skills, experience, and location.",
    icon: CheckCircle,
  },
  {
    title: "Apply to jobs that match your skills",
    hoverTitle: "Find jobs",
    hoverText:
      "Browse local jobs, view details, and submit proposals to clients who need your skills.",
    icon: HandshakeIcon,
  },
  {
    title: "Work safely and get paid on time",
    hoverTitle: "View payment process",
    hoverText:
      "Complete tasks, track progress, and receive secure payments after client approval.",
    icon: Shield,
  },
];

function Card({ title, hoverTitle, hoverText, icon: Icon }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-card border border-border rounded-lg p-6 min-h-64 flex flex-col justify-center items-center text-center cursor-pointer hover:shadow-lg transition-all duration-300 group"
    >
      <Icon
        size={40}
        className="text-primary mb-4 group-hover:scale-110 transition-transform"
      />

      {!isHovered ? (
        <>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold text-foreground mb-3">
            {hoverTitle}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">{hoverText}</p>
          <button className="bg-primary text-primary-foreground px-6 py-2 rounded hover:opacity-90 transition-opacity text-sm font-medium">
            {hoverTitle}
          </button>
        </>
      )}
    </div>
  );
}

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState("hiring");

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-12">
          <h2 className="text-3xl font-bold text-foreground">How it works</h2>

          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("hiring")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === "hiring"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              For hiring
            </button>
            <button
              onClick={() => setActiveTab("working")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === "working"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              For finding work
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(activeTab === "hiring" ? hiringCards : workingCards).map(
            (card, idx) => (
              <Card key={idx} {...card} />
            )
          )}
        </div>
      </div>
    </section>
  );
}
