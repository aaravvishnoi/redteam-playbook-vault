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
      title: "API Pentest Report",
      description:
        "Deep dive into REST and GraphQL API security, identifying broken authorization, mass assignment, and rate limiting issues.",
      tags: ["API Security", "BOLA", "Mass Assignment", "GraphQL"],
      link: "/portfolio/api-pentest",
    },
    {
      title: "Linux Privilege Escalation Lab",
      description:
        "Step-by-step documentation of privilege escalation techniques in Linux environments, from weak permissions to kernel exploits.",
      tags: ["Linux", "Privesc", "SUID", "Kernel Exploits"],
      link: "/portfolio/linux-privesc",
    },
    {
      title: "Windows Privilege Escalation Lab",
      description:
        "Comprehensive guide to Windows privilege escalation covering service misconfigurations, DLL hijacking, and token manipulation.",
      tags: ["Windows", "Privesc", "DLL Hijacking", "Tokens"],
      link: "/portfolio/windows-privesc",
    },
    {
      title: "Custom Offensive Tool",
      description:
        "Python-based automation tool for reconnaissance and vulnerability scanning with customizable modules for different attack surfaces.",
      tags: ["Python", "Automation", "Recon", "Tool Development"],
      link: "/portfolio/custom-tool",
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
