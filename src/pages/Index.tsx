import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Github } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-20 text-center">
          <div className="mb-8 inline-block">
            <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              <span className="text-foreground">Aarav Vishnoi</span>
            </h1>
            <div className="h-1 bg-accent"></div>
          </div>

          <p className="mb-6 text-xl text-muted-foreground sm:text-2xl">
            Offensive Security | Red Teaming | Web & API Exploitation
          </p>

          <p className="mb-12 max-w-2xl text-lg text-muted-foreground">
            Breaking assumptions. Exposing weaknesses. Building resilience.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="group">
              <Link to="/portfolio">
                View Portfolio
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a
                href="https://github.com/aaravsec"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>
        </section>

        {/* Skills Overview */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold">Core Capabilities</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-lg border border-operator-border bg-card p-6">
                <h3 className="mb-3 text-xl font-semibold text-accent">
                  Web Exploitation
                </h3>
                <p className="text-sm text-muted-foreground">
                  Advanced web application testing including authentication bypasses, authorization
                  flaws, and business logic vulnerabilities.
                </p>
              </div>
              <div className="rounded-lg border border-operator-border bg-card p-6">
                <h3 className="mb-3 text-xl font-semibold text-accent">API Security</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive API testing covering REST and GraphQL with focus on broken
                  authorization and mass assignment attacks.
                </p>
              </div>
              <div className="rounded-lg border border-operator-border bg-card p-6">
                <h3 className="mb-3 text-xl font-semibold text-accent">
                  Privilege Escalation
                </h3>
                <p className="text-sm text-muted-foreground">
                  Post-exploitation techniques for Windows and Linux, including misconfigurations
                  and kernel exploits.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="pb-20">
          <div className="mx-auto max-w-3xl rounded-lg border border-accent/20 bg-accent/5 p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold">Ready to Collaborate?</h2>
            <p className="mb-6 text-muted-foreground">
              Looking for offensive security expertise, red team assessments, or vulnerability
              research collaboration.
            </p>
            <Button asChild size="lg">
              <Link to="/contact">Get In Touch</Link>
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
