import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";

const Portfolio = () => {
  const projects = [
    {
      title: "Login Bypass using SQL Injection",
      description:
        "Authentication bypass through unsanitized user input in login form, demonstrating complete access control failure and privilege escalation.",
      tags: ["SQL Injection", "Auth Bypass", "Critical"],
      link: "/portfolio/sql-injection-login-bypass",
    },
    {
      title: "SQL Injection: Oracle Database Version Disclosure",
      description:
        "UNION-based SQL injection in category filter exposing Oracle database version and patch information through v$version enumeration.",
      tags: ["SQL Injection", "UNION SELECT", "Oracle", "Info Disclosure"],
      link: "/portfolio/sql-injection-oracle-version",
    },
    {
      title: "SQL Injection: UNION-Based Enumeration on MS SQL Server",
      description:
        "Complete database enumeration via UNION-based SQL injection, extracting server version, schema structure, and sensitive user credentials from Microsoft SQL Server.",
      tags: ["SQL Injection", "UNION SELECT", "MS SQL Server", "Critical", "Data Enumeration"],
      link: "/portfolio/sql-injection-union-enumeration",
    },
    {
      title: "Blind SQL Injection: Boolean-Based Credential Extraction",
      description:
        "Boolean-based blind SQL injection to extract administrator password character-by-character using conditional responses and Burp Intruder automation.",
      tags: ["Blind SQL Injection", "Boolean-Based", "Credential Extraction", "Critical"],
      link: "/portfolio/blind-sql-injection-boolean",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Portfolio</h1>
          <p className="text-lg text-muted-foreground">
            Major red team projects and security assessments demonstrating methodology, technical
            depth, and documentation discipline.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Portfolio;
