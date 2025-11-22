import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Terminal, Shield, AlertTriangle, Database } from "lucide-react";

const SqlInjectionOracleVersion = () => {
  return (
    <Layout>
      <article className="container mx-auto px-4 py-16">
        <Link to="/portfolio">
          <Button variant="ghost" className="mb-8 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Button>
        </Link>

        <header className="mb-12 border-b border-operator-border pb-8">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            SQL Injection Attack: Querying Database Type and Version on Oracle
          </h1>
          <p className="text-lg text-muted-foreground">
            Category filter exploitation leading to Oracle database version disclosure through UNION-based SQL injection
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              SQL Injection
            </span>
            <span className="rounded border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              UNION SELECT
            </span>
            <span className="rounded border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              Oracle
            </span>
            <span className="rounded border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              Info Disclosure
            </span>
            <span className="rounded border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              Critical
            </span>
          </div>
        </header>

        <div className="space-y-12">
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
              <Shield className="h-6 w-6 text-accent" />
              Overview
            </h2>
            <div className="rounded-lg border border-operator-border bg-operator-surface p-6">
              <p className="mb-4 leading-relaxed text-foreground">
                The application's category filtering functionality is vulnerable to SQL injection. By
                exploiting the parameter used to fetch products belonging to a category, an attacker
                can modify the SQL query using a crafted UNION SELECT payload.
              </p>
              <p className="mb-4 leading-relaxed text-foreground">
                This allows enumeration of Oracle database version information, which is highly
                sensitive as it directly informs attackers about patch levels and known exploits.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                This vulnerability demonstrates that the backend is using an Oracle database and
                reveals its exact version.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold">Attack Surface</h2>
            <div className="rounded-lg border border-operator-border bg-operator-surface p-6">
              <p className="mb-4 leading-relaxed text-foreground">
                The vulnerable parameter exists in:
              </p>
              <div className="mb-4 rounded-lg border border-operator-border bg-black p-4">
                <code className="font-mono text-sm text-foreground">/filter?category=&lt;input&gt;</code>
              </div>
              <p className="mb-4 leading-relaxed text-foreground">
                When a category is selected, the input is inserted directly into an SQL query without
                sanitization:
              </p>
              <div className="mb-4 rounded-lg border border-operator-border bg-black p-4">
                <pre className="overflow-x-auto">
                  <code className="font-mono text-sm text-foreground">
                    SELECT * FROM products WHERE category = '&lt;input&gt;';
                  </code>
                </pre>
              </div>
              <p className="mb-4 leading-relaxed text-foreground">
                This allows attackers to:
              </p>
              <ul className="ml-6 space-y-2 text-foreground">
                <li className="list-disc">inject SQL logic</li>
                <li className="list-disc">extend the query using UNION SELECT</li>
                <li className="list-disc">
                  extract data from system tables (v$version in Oracle)
                </li>
              </ul>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                The system does not validate the number of returned columns or data types, enabling
                successful UNION injection.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold">Exploitation Steps</h2>
            <div className="rounded-lg border border-operator-border bg-operator-surface p-6">
              <ol className="space-y-3 text-foreground">
                <li className="flex gap-3">
                  <span className="font-mono text-accent">1.</span>
                  <span>
                    Navigate to the home page and intercept the category request using Burp Suite
                    (optional, but recommended for clarity).
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-accent">2.</span>
                  <span>
                    Click on any product category — this triggers the vulnerable query.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-accent">3.</span>
                  <span>
                    Modify the category parameter by adding a UNION-based SQL injection payload that
                    queries Oracle's v$version view.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-accent">4.</span>
                  <span>
                    Send the request. The backend concatenates the attacker-controlled query to the
                    legitimate one.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-accent">5.</span>
                  <span>
                    The response page displays the output of BANNER from v$version, revealing Oracle
                    database version and patch information.
                  </span>
                </li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
              <Terminal className="h-6 w-6 text-accent" />
              Payload Used
            </h2>
            <div className="rounded-lg border border-operator-border bg-black p-6">
              <pre className="overflow-x-auto">
                <code className="font-mono text-sm text-foreground">
                  ' UNION SELECT BANNER FROM v$version--
                </code>
              </pre>
            </div>
          </section>

          <section>
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
              <AlertTriangle className="h-6 w-6 text-accent" />
              Impact
            </h2>
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6">
              <p className="mb-4 leading-relaxed text-foreground">
                Revealing database version information enables attackers to:
              </p>
              <ul className="space-y-3 text-foreground">
                <li className="flex flex-col gap-1">
                  <strong className="text-accent">Identify exact database version, edition, and patch level</strong>
                  <span className="text-sm text-muted-foreground">
                    Complete visibility into the database infrastructure and its security posture.
                  </span>
                </li>
                <li className="flex flex-col gap-1">
                  <strong className="text-accent">Map known Oracle vulnerabilities</strong>
                  <span className="text-sm text-muted-foreground">
                    CVE mapping becomes trivial, allowing attackers to identify applicable exploits immediately.
                  </span>
                </li>
                <li className="flex flex-col gap-1">
                  <strong className="text-accent">Plan targeted exploitation</strong>
                  <span className="text-sm text-muted-foreground">
                    Develop payloads for privilege escalation, RCE, or lateral movement based on version-specific exploits.
                  </span>
                </li>
                <li className="flex flex-col gap-1">
                  <strong className="text-accent">Chain attacks with existing SQL injection</strong>
                  <span className="text-sm text-muted-foreground">
                    Extract sensitive data, enumerate database structure, and escalate privileges using known techniques.
                  </span>
                </li>
              </ul>
              <p className="mt-6 font-bold text-destructive">
                Version disclosure on top of an injection vulnerability increases risk to Critical.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
              <Database className="h-6 w-6 text-accent" />
              Remediation
            </h2>
            <div className="rounded-lg border border-operator-border bg-operator-surface p-6">
              <ol className="space-y-4 text-foreground">
                <li className="flex flex-col gap-2">
                  <strong className="text-accent">1. Use prepared statements (parameterized queries)</strong>
                  <span className="text-sm text-muted-foreground">
                    Prevent SQL injection by ensuring user input is never directly concatenated into queries.
                  </span>
                </li>
                <li className="flex flex-col gap-2">
                  <strong className="text-accent">2. Enforce strict input validation</strong>
                  <span className="text-sm text-muted-foreground">
                    Reject or sanitize unexpected characters such as ', ", ;, --, etc.
                  </span>
                </li>
                <li className="flex flex-col gap-2">
                  <strong className="text-accent">3. Disable database error leakage</strong>
                  <span className="text-sm text-muted-foreground">
                    Do not expose stack traces or database messages in UI responses.
                  </span>
                </li>
                <li className="flex flex-col gap-2">
                  <strong className="text-accent">4. Use least-privilege DB accounts</strong>
                  <span className="text-sm text-muted-foreground">
                    The application user should not have permissions to read v$version or other system tables.
                  </span>
                </li>
                <li className="flex flex-col gap-2">
                  <strong className="text-accent">5. Implement Web Application Firewall (WAF) rules</strong>
                  <span className="text-sm text-muted-foreground">
                    Detect and block UNION-based injection, comment sequences, and known SQLi patterns.
                  </span>
                </li>
              </ol>
            </div>
          </section>
        </div>

        <div className="mt-12 border-t border-operator-border pt-8">
          <Link to="/portfolio">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Button>
          </Link>
        </div>
      </article>
    </Layout>
  );
};

export default SqlInjectionOracleVersion;
