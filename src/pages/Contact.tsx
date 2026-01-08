import Layout from "@/components/Layout";
import { Mail, Github, Linkedin, Key } from "lucide-react";

const Contact = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-8 text-4xl font-bold tracking-tight">Contact</h1>

          <p className="mb-12 text-lg text-muted-foreground">
            For security-related opportunities or collaboration, reach out through the channels
            below.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4 rounded-lg border border-operator-border bg-card p-6 transition-colors hover:border-accent/50">
              <Mail className="h-6 w-6 flex-shrink-0 text-accent" />
              <div>
                <h3 className="mb-1 font-semibold">Email</h3>
                <a
                  href="mailto:contact@aaravsec.dev"
                  className="text-sm text-muted-foreground hover:text-accent"
                >
                  aaravvishnoi764@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-lg border border-operator-border bg-card p-6 transition-colors hover:border-accent/50">
              <Github className="h-6 w-6 flex-shrink-0 text-accent" />
              <div>
                <h3 className="mb-1 font-semibold">GitHub</h3>
                <a
                  href="https://github.com/aaravvishnoi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-accent"
                >
                  github.com/aaravvishnoi
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-lg border border-operator-border bg-card p-6 transition-colors hover:border-accent/50">
              <Linkedin className="h-6 w-6 flex-shrink-0 text-accent" />
              <div>
                <h3 className="mb-1 font-semibold">LinkedIn</h3>
                <a
                  href="https://www.linkedin.com/in/aarav-vishnoi-51b921290"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-accent"
                >
                  linkedin.com/in/aarav-vishnoi-51b921290
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-lg border border-operator-border bg-card p-6">
              <Key className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
            </div>
          </div>

          <div className="mt-12 rounded-lg border border-accent/20 bg-accent/5 p-6">
            <h3 className="mb-2 font-semibold">Response Time</h3>
            <p className="text-sm text-muted-foreground">
              I typically respond to security-related inquiries within 24-48 hours. For urgent
              matters or vulnerability disclosures, please indicate priority in the subject line.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
