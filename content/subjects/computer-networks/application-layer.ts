import type { SubjectTopic } from "@/lib/subject-content";

export const applicationProtocols: SubjectTopic = {
  slug: "application-protocols-and-services",
  title: "Application Protocols and Services",
  description:
    "Understand how network applications use protocols, APIs, and standard services such as email, file transfer, and remote login.",
  readTime: "15 min",
  difficulty: "Foundation",
  tags: ["Application layer", "Email", "APIs"],
  learn: {
    opening:
      "A network application is software that exchanges data with another process through a network. Application-layer protocols define the messages, meaning, order, and expected actions for that exchange.",
    sections: [
      {
        title: "What an Application Protocol Defines",
        paragraphs: [
          "A protocol is more than a port number. It defines message types, message format, field meanings, the order in which messages are exchanged, and what each side should do after receiving one.",
          "Applications normally use socket interfaces provided by the operating system. The application chooses a transport service, while lower layers handle routing, framing, and signals.",
        ],
        points: [
          "Syntax: how a message is arranged.",
          "Semantics: what each field means.",
          "Timing: when messages are sent and in what order.",
          "Rules: how errors, retries, and unexpected messages are handled.",
        ],
      },
      {
        title: "Common Application Services",
        paragraphs: [
          "Standard protocols let independently built applications find and understand well-known services. Port numbers are defaults, not permanent rules, and encrypted variants may use a different port.",
        ],
        dataTable: {
          headers: ["Service", "Protocol", "Main purpose", "Common port"],
          rows: [
            ["Web", "HTTP / HTTPS", "Transfer web resources and API messages", "80 / 443"],
            ["Send email", "SMTP", "Submit and relay outgoing mail", "25, 587, or 465"],
            ["Read email", "IMAP", "Synchronize mail stored on a server", "143 or 993"],
            ["Download email", "POP3", "Retrieve mail, traditionally to one client", "110 or 995"],
            ["File transfer", "FTP", "Transfer and manage remote files", "21 control"],
            ["Secure file transfer", "SFTP", "File transfer over SSH", "22"],
            ["Remote login", "SSH", "Secure command-line access", "22"],
            ["Name resolution", "DNS", "Translate names and publish service data", "53"],
          ],
        },
      },
      {
        title: "Email Delivery and Access",
        paragraphs: [
          "SMTP pushes outgoing mail from a client to a mail server and relays mail between servers. IMAP and POP3 are used by a recipient to access a mailbox. SMTP does not normally provide mailbox synchronization.",
          "IMAP keeps the server mailbox as the main copy and synchronizes folders and message state across devices. POP3 traditionally downloads messages and offers fewer synchronization features.",
        ],
        flow: [
          "Sender submits mail using SMTP",
          "Sender's mail server finds the recipient mail server",
          "Mail servers relay the message using SMTP",
          "Recipient reads or synchronizes it using IMAP or POP3",
        ],
      },
      {
        title: "FTP, FTPS, and SFTP",
        paragraphs: [
          "FTP is an older file-transfer protocol that uses separate control and data connections and does not encrypt traffic by default. FTPS adds TLS protection to FTP. SFTP is a different protocol that transfers files through SSH.",
        ],
        table: {
          headers: ["Protocol", "Security model"],
          rows: [
            ["FTP", "Plain by default; separate control and data connections"],
            ["FTPS", "FTP protected with TLS"],
            ["SFTP", "File-transfer protocol carried through SSH"],
          ],
        },
      },
      {
        title: "APIs",
        paragraphs: [
          "An API is a contract that lets software request data or actions from other software. A network API often uses HTTP. REST commonly models resources, while SOAP uses structured XML messages. These are application-design choices, not new network layers.",
        ],
      },
    ],
    mechanism: {
      title: "How a network application uses a service",
      steps: [
        "The application chooses a protocol understood by the remote service.",
        "It creates a message using that protocol's format and meaning.",
        "A socket passes the message to a transport protocol such as TCP or UDP.",
        "The network delivers the message to the destination host and port.",
        "The receiving application interprets it and returns a valid response or error.",
      ],
    },
    example: {
      title: "Reading email on two devices",
      body: "The sender's mail application submits a message using SMTP. Mail servers relay it using SMTP. The recipient's phone and laptop use IMAP to view the same server mailbox and keep read status and folders synchronized.",
    },
    misconception:
      "SFTP is not simply FTP with encryption. SFTP runs through SSH, while FTPS is FTP protected by TLS.",
  },
  revise: {
    definition:
      "Application protocols define how network programs format, exchange, and interpret messages.",
    sections: [
      {
        title: "Protocol Matches",
        dataTable: {
          headers: ["Need", "Use"],
          rows: [
            ["Send or relay email", "SMTP"],
            ["Synchronize a mailbox", "IMAP"],
            ["Secure remote login", "SSH"],
            ["Secure transfer through SSH", "SFTP"],
            ["Translate a domain name", "DNS"],
          ],
        },
      },
    ],
    essentials: [
      "A protocol defines syntax, semantics, timing, and actions.",
      "SMTP sends mail; IMAP and POP3 access received mail.",
      "FTP, FTPS, and SFTP are different protocols or protection models.",
      "An API is a software contract and often uses HTTP.",
      "Ports identify the destination application service.",
    ],
    comparisonTitle: "IMAP vs POP3",
    comparison: {
      left: {
        label: "IMAP",
        points: ["Server mailbox is central", "Synchronizes multiple devices", "Keeps folders and state"],
      },
      right: {
        label: "POP3",
        points: ["Primarily retrieves mail", "Simpler access model", "Traditionally downloads locally"],
      },
    },
    followUp: "Why are SFTP and FTPS not two names for the same protocol?",
  },
  lastMinute: {
    definition: "Application protocol = rules understood by communicating network programs.",
    memoryLine: "SMTP sends, IMAP syncs, POP3 retrieves, SSH logs in, DNS resolves.",
    cues: [
      "HTTPS: 443. DNS: 53. SSH and SFTP: 22.",
      "SMTP moves outgoing mail between clients and servers.",
      "REST commonly models resources; SOAP uses structured XML messages.",
      "API and network protocol are related but not identical.",
    ],
    trap: "Do not say SMTP is used to synchronize a recipient's mailbox.",
  },
};

export const domainNameSystem: SubjectTopic = {
  slug: "domain-name-system",
  title: "Domain Name System",
  description:
    "Follow a DNS lookup through caches, recursive resolvers, root servers, TLD servers, and authoritative servers.",
  readTime: "18 min",
  difficulty: "Intermediate",
  tags: ["DNS", "Records", "Caching"],
  learn: {
    opening:
      "DNS is a distributed, hierarchical naming system. It maps domain names to data such as IP addresses and mail servers, so it is more than a simple Internet phonebook.",
    sections: [
      {
        title: "Names, Domains, and the Hierarchy",
        paragraphs: [
          "A fully qualified domain name is read from the most specific label on the left toward the DNS root on the right. In www.example.com, com is the top-level domain, example is a registered domain, and www is a host label.",
          "DNS is distributed so one server does not store every Internet name. Administrative responsibility is delegated down the hierarchy in zones.",
        ],
      },
      {
        title: "The Servers in a Lookup",
        paragraphs: [
          "A normal lookup involves different roles. The recursive resolver works on behalf of the client, while the DNS hierarchy delegates responsibility toward an authoritative source.",
        ],
        visual: {
          src: "/notes/computer-networks/dns-resolution.png",
          alt: "DNS lookup from a client through a recursive resolver, root, TLD, and authoritative servers",
          width: 1536,
          height: 1024,
          caption: "The resolver follows referrals through the hierarchy and returns the final answer to the client.",
        },
        dataTable: {
          headers: ["Component", "Main job"],
          rows: [
            ["Stub resolver", "Client-side code that asks a recursive resolver"],
            ["Recursive resolver", "Finds the answer for the client and caches results"],
            ["Root server", "Refers the resolver to the correct TLD servers"],
            ["TLD server", "Refers the resolver to the domain's authoritative servers"],
            ["Authoritative server", "Provides records for the zone it serves"],
          ],
        },
      },
      {
        title: "Recursive and Iterative Queries",
        paragraphs: [
          "A client normally sends a recursive query to its resolver: return a final answer or an error. The resolver then performs iterative queries, where each DNS server may return the best information it has, often a referral to another server.",
        ],
        flow: [
          "Browser and operating system check local caches",
          "Stub resolver asks its recursive resolver",
          "Resolver asks a root server and receives a TLD referral",
          "Resolver asks the TLD server and receives an authoritative referral",
          "Resolver asks the authoritative server and returns the answer",
        ],
      },
      {
        title: "Common DNS Records",
        paragraphs: [
          "DNS stores typed resource records. A lookup asks for a particular record type, so resolving a web address, finding a mail server, and checking a domain policy can require different records.",
        ],
        dataTable: {
          headers: ["Record", "Purpose", "Example meaning"],
          rows: [
            ["A", "Maps a name to an IPv4 address", "example.com to 192.0.2.10"],
            ["AAAA", "Maps a name to an IPv6 address", "example.com to an IPv6 address"],
            ["CNAME", "Aliases one name to another name", "www to a canonical hostname"],
            ["MX", "Names mail servers for a domain", "Where incoming email should go"],
            ["NS", "Names authoritative servers for a zone", "Who serves the domain"],
            ["TXT", "Stores text used by policies and verification", "Email policy or ownership proof"],
            ["PTR", "Supports reverse address-to-name lookup", "IP address to hostname"],
          ],
        },
      },
      {
        title: "Caching, TTL, and Transport",
        paragraphs: [
          "A DNS record's TTL tells a cache how long it may reuse that record before asking again. Caching reduces delay and DNS traffic, but an old value can remain visible until cached copies expire.",
          "DNS commonly uses UDP port 53 for ordinary queries and can retry with TCP when needed. TCP is also used for operations such as zone transfer. Encrypted DNS transports include DNS over TLS and DNS over HTTPS.",
        ],
      },
      {
        title: "DNS Delay Numerical",
        paragraphs: [
          "In a simplified uncached lookup, suppose client-to-resolver RTT is 10 ms and the resolver's RTTs to root, TLD, and authoritative servers are 20 ms, 25 ms, and 30 ms. Ignoring processing and transmission time, lookup delay = 10 + 20 + 25 + 30 = 85 ms.",
          "If the resolver already has a fresh cached answer, only the 10 ms client-to-resolver RTT is needed in this simplified model.",
        ],
      },
    ],
    mechanism: {
      title: "How an uncached DNS lookup succeeds",
      steps: [
        "The client asks a recursive resolver for a record.",
        "The resolver starts at a root server when it lacks a useful cached referral.",
        "Root and TLD servers return referrals toward the authoritative server.",
        "The authoritative server returns the requested record or a negative answer.",
        "The resolver caches eligible results for their TTL and replies to the client.",
      ],
    },
    example: {
      title: "Looking up shop.example.com",
      body: "The resolver may learn where com is served, then where example.com is served, and finally request the address record for shop.example.com. A later user may receive the cached answer without repeating the complete hierarchy.",
    },
    misconception:
      "The recursive resolver does not normally ask every root server. It contacts one suitable root instance and follows referrals, often using cached delegation information.",
  },
  revise: {
    definition:
      "DNS is a distributed hierarchy that maps names to records and caches answers for a limited TTL.",
    sections: [
      {
        title: "Lookup Order",
        flow: ["Client", "Recursive resolver", "Root", "TLD", "Authoritative server", "Answer"],
      },
      {
        title: "Record Recall",
        points: ["A: IPv4", "AAAA: IPv6", "CNAME: alias", "MX: mail", "NS: name server", "PTR: reverse lookup"],
      },
    ],
    essentials: [
      "The client asks recursively; the resolver commonly follows iterative referrals.",
      "Root points to TLD; TLD points to authoritative servers.",
      "The authoritative server owns the final zone data.",
      "TTL controls cache lifetime, not permanent record lifetime.",
      "DNS commonly uses port 53 over UDP or TCP.",
    ],
    comparisonTitle: "Recursive resolver vs authoritative server",
    comparison: {
      left: {
        label: "Recursive resolver",
        points: ["Works for clients", "Follows referrals", "Caches answers"],
      },
      right: {
        label: "Authoritative",
        points: ["Serves a zone", "Holds original zone records", "Returns authoritative answers"],
      },
    },
    followUp: "Why can a DNS change take time to become visible to every user?",
  },
  lastMinute: {
    definition: "DNS turns names into records through a cached, delegated hierarchy.",
    memoryLine: "Resolver asks Root, then TLD, then Authoritative.",
    cues: [
      "A: IPv4. AAAA: IPv6. MX: mail. CNAME: alias.",
      "Recursive query asks for a final result; iterative query may return a referral.",
      "TTL says how long a cached record remains reusable.",
      "Uncached delay is approximately the sum of required query RTTs in the simplified model.",
    ],
    trap: "Do not say a root server stores the IP address of every website.",
  },
};

export const httpMessagesAndSemantics: SubjectTopic = {
  slug: "http-messages-and-semantics",
  title: "HTTP Messages and Semantics",
  description:
    "Read HTTP requests and responses, choose methods correctly, and interpret status codes, headers, cookies, and connections.",
  readTime: "19 min",
  difficulty: "Intermediate",
  tags: ["HTTP", "Methods", "Status codes"],
  learn: {
    opening:
      "HTTP is a stateless application-layer request-response protocol. A client sends a request for a resource or action, and a server returns a response with a status, metadata, and optional content.",
    sections: [
      {
        title: "Request and Response Structure",
        paragraphs: [
          "An HTTP/1.1 request contains a request line, headers, a blank line, and sometimes a body. A response contains a status line, headers, a blank line, and sometimes a body. HTTP/2 and HTTP/3 encode messages differently on the wire but preserve HTTP semantics.",
        ],
        dataTable: {
          headers: ["Message part", "Request example", "Response example"],
          rows: [
            ["Start line", "GET /notes HTTP/1.1", "HTTP/1.1 200 OK"],
            ["Headers", "Host, Accept, Authorization", "Content-Type, Cache-Control, Set-Cookie"],
            ["Body", "Optional submitted data", "HTML, JSON, image, or error details"],
          ],
        },
      },
      {
        title: "HTTP Methods",
        dataTable: {
          headers: ["Method", "Typical purpose", "Important property"],
          rows: [
            ["GET", "Retrieve a representation", "Safe and idempotent"],
            ["HEAD", "Retrieve headers without the response body", "Safe and idempotent"],
            ["POST", "Submit data or start an action", "Not necessarily idempotent"],
            ["PUT", "Create or replace a resource at a known URI", "Idempotent"],
            ["PATCH", "Apply a partial modification", "Not necessarily idempotent"],
            ["DELETE", "Request resource removal", "Idempotent in intended effect"],
            ["OPTIONS", "Discover communication options", "Safe and idempotent"],
          ],
        },
        paragraphs: [
          "Safe means the method is intended only to read. Idempotent means repeating the same request has the same intended effect as sending it once. Idempotent does not mean the response must be identical every time.",
        ],
      },
      {
        title: "Status-Code Classes",
        paragraphs: [
          "The first digit groups a response into a broad result class. The complete three-digit code gives the specific meaning, so applications should not treat every code in one class as identical.",
        ],
        dataTable: {
          headers: ["Class", "Meaning", "Common examples"],
          rows: [
            ["1xx", "Informational", "100 Continue"],
            ["2xx", "Successful", "200 OK, 201 Created, 204 No Content"],
            ["3xx", "Redirection or cache validation", "301, 302, 304"],
            ["4xx", "Client-side request problem", "400, 401, 403, 404, 429"],
            ["5xx", "Server-side failure", "500, 502, 503, 504"],
          ],
        },
        points: [
          "401 Unauthorized normally means authentication is required or failed.",
          "403 Forbidden means the server understood the request but refuses access.",
          "404 Not Found means the target resource was not found.",
          "301 is permanent redirection; 302 is a temporary redirection response.",
          "304 Not Modified tells a cache that its stored representation can be reused.",
        ],
      },
      {
        title: "Headers, Content, and Cookies",
        paragraphs: [
          "Headers carry metadata. Content-Type describes the representation being sent, while Accept describes formats the client can handle. Authorization carries credentials, and Location identifies a redirect target or newly created resource.",
          "HTTP itself is stateless. A server can send Set-Cookie, and the browser can return the cookie on later matching requests. Cookies can support sessions, preferences, and tracking, but the cookie is application state carried through HTTP rather than memory built into HTTP itself.",
        ],
      },
      {
        title: "Persistent Connections",
        paragraphs: [
          "HTTP/1.0 commonly used a new TCP connection for each object. HTTP/1.1 uses persistent connections by default, allowing several requests to reuse one connection. Reuse avoids repeated connection setup, although sequential requests can still wait behind earlier responses.",
        ],
      },
    ],
    mechanism: {
      title: "How a browser receives an HTTP resource",
      steps: [
        "The browser resolves the server name and establishes the required transport connection.",
        "It sends a method, target, headers, and any request body.",
        "The server authenticates, validates, and processes the request.",
        "The server returns a status code, headers, and any response body.",
        "The browser interprets the response, updates cookies or caches, and may request more resources.",
      ],
    },
    example: {
      title: "Updating a profile",
      body: "A client might GET the current profile, send a PATCH request with changed fields, and receive 200 OK with the updated representation. If the user is not authenticated it may receive 401; if authenticated but not allowed, it may receive 403.",
    },
    misconception:
      "401 and 403 are not interchangeable. 401 concerns missing or unsuccessful authentication; 403 means the server refuses the authenticated or understood request.",
  },
  revise: {
    definition:
      "HTTP exchanges requests and responses using methods, targets, headers, status codes, and optional bodies.",
    sections: [
      {
        title: "Method Recall",
        points: ["GET reads", "POST submits", "PUT replaces", "PATCH partially changes", "DELETE removes", "HEAD returns headers"],
      },
      {
        title: "Status Recall",
        points: ["2xx success", "3xx redirect or validation", "4xx client issue", "5xx server issue"],
      },
    ],
    essentials: [
      "Request: method, target, version, headers, optional body.",
      "Response: version, status, headers, optional body.",
      "Safe is about reading; idempotent is about repeated intended effect.",
      "Cookies let applications maintain state over stateless HTTP.",
      "HTTP/1.1 connections are persistent by default.",
    ],
    comparisonTitle: "PUT vs PATCH",
    comparison: {
      left: {
        label: "PUT",
        points: ["Create or replace", "Complete representation is common", "Idempotent"],
      },
      right: {
        label: "PATCH",
        points: ["Partial modification", "Sends a change document", "Not always idempotent"],
      },
    },
    followUp: "Why can repeating a POST request be more dangerous than repeating a PUT request?",
  },
  lastMinute: {
    definition: "HTTP request asks; HTTP response reports a status and may return content.",
    memoryLine: "2 success, 3 redirect, 4 client issue, 5 server issue.",
    cues: [
      "GET and HEAD are safe and idempotent.",
      "POST is not necessarily idempotent; PUT is idempotent.",
      "401: authenticate. 403: understood but refused. 404: not found.",
      "Cookie-based state belongs to the application, not the HTTP protocol itself.",
    ],
    trap: "Do not assume every HTTP request or response contains a body.",
  },
};

export const httpsAndHttpEvolution: SubjectTopic = {
  slug: "https-and-http-evolution",
  title: "HTTPS and HTTP Evolution",
  description:
    "Understand TLS protection and compare HTTP/1.0, HTTP/1.1, HTTP/2, HTTP/3, QUIC, and gRPC.",
  readTime: "20 min",
  difficulty: "Intermediate",
  tags: ["HTTPS", "TLS", "HTTP/3"],
  learn: {
    opening:
      "HTTPS is HTTP protected by TLS. TLS authenticates the server and protects HTTP data against reading and modification while it travels between TLS endpoints.",
    sections: [
      {
        title: "What HTTPS Protects",
        visual: {
          src: "/notes/computer-networks/http-vs-https.png",
          alt: "Plain HTTP request and response compared with a TLS handshake followed by encrypted HTTP",
          width: 1536,
          height: 1024,
          caption: "HTTPS performs a TLS handshake before protected HTTP application data is exchanged.",
        },
        points: [
          "Confidentiality: outsiders cannot easily read protected application data.",
          "Integrity: tampering can be detected.",
          "Authentication: the certificate helps the client verify the server identity.",
        ],
        paragraphs: [
          "HTTPS does not hide every network detail. Observers can still see information such as endpoint IP addresses, traffic timing, and approximate traffic volume.",
        ],
      },
      {
        title: "Symmetric, Asymmetric, and Hybrid Cryptography",
        paragraphs: [
          "Symmetric cryptography uses the same secret for encryption and decryption and is efficient for bulk data. Asymmetric cryptography uses a public-private key pair and supports identity and key agreement operations. TLS combines these ideas: public-key mechanisms authenticate and establish shared secrets, then symmetric keys protect application traffic efficiently.",
        ],
        table: {
          headers: ["Method", "Main TLS role"],
          rows: [
            ["Asymmetric and certificate mechanisms", "Authenticate and help establish shared secrets"],
            ["Symmetric session keys", "Efficiently protect HTTP application data"],
          ],
        },
      },
      {
        title: "A Simplified TLS Handshake",
        flow: [
          "ClientHello offers supported TLS parameters and key-share information",
          "ServerHello selects parameters and returns its key share",
          "Server sends its certificate and proof of private-key possession",
          "Client validates the certificate chain, domain name, and validity",
          "Both sides derive session keys and exchange protected application data",
        ],
        paragraphs: [
          "Modern TLS normally uses ephemeral Diffie-Hellman key agreement rather than encrypting a session key directly with an RSA certificate. The exact handshake differs by TLS version and configuration.",
        ],
      },
      {
        title: "HTTP Versions",
        dataTable: {
          headers: ["Version", "Transport", "Important improvement", "Remaining issue"],
          rows: [
            ["HTTP/1.0", "Usually TCP", "Simple request-response", "Often one connection per object"],
            ["HTTP/1.1", "TCP", "Persistent connections and required Host header", "Responses on one connection remain ordered"],
            ["HTTP/2", "TCP", "Binary framing, multiplexing, HPACK header compression", "TCP loss can delay all streams on that connection"],
            ["HTTP/3", "QUIC over UDP", "Multiplexed QUIC streams and integrated TLS", "Newer transport and deployment complexity"],
          ],
        },
        paragraphs: [
          "HTTP/2 removes HTTP/1.1 response ordering between multiplexed streams, but all streams still share one ordered TCP connection. HTTP/3 uses independent QUIC streams so loss in one stream does not block delivery in another stream in the same way.",
          "HTTP/1.1 pipelining keeps responses ordered and is rarely used. HTTP/2 server push also has little modern browser use. QUIC can support 0-RTT data on resumed connections, but replay-sensitive actions must not be sent carelessly as early data.",
        ],
      },
      {
        title: "RTT Numerical for Page Loading",
        paragraphs: [
          "Assume a page has one HTML file and four small resources, one RTT is 40 ms, transmission time is ignored, DNS and TLS are already complete, and HTTP/1.0 loads objects sequentially with a new TCP connection. Each object needs about 2 RTT, so 5 x 2 x 40 = 400 ms.",
          "With one persistent HTTP/1.1 connection and sequential requests, the first object costs about 2 RTT and four later objects cost about 1 RTT each: 6 x 40 = 240 ms. In a simplified HTTP/2 case, the base page costs 2 RTT and multiplexed resources complete in one more RTT: 3 x 40 = 120 ms.",
        ],
      },
      {
        title: "Where gRPC Fits",
        paragraphs: [
          "gRPC is an RPC framework, not a replacement for IP or transport. It commonly uses HTTP/2, Protocol Buffers, generated service definitions, and unary or streaming calls. It is useful for efficient service-to-service communication.",
        ],
      },
    ],
    mechanism: {
      title: "How a secure HTTP request begins",
      steps: [
        "The client resolves the server name and establishes the required transport path.",
        "Client and server negotiate TLS parameters and shared secrets.",
        "The client validates the server certificate and domain identity.",
        "Both sides derive symmetric session keys.",
        "HTTP messages travel inside the protected TLS connection or QUIC session.",
      ],
    },
    example: {
      title: "Opening an HTTPS banking page",
      body: "The browser verifies that the certificate is valid for the bank's domain and chains to a trusted certificate authority. After key agreement, HTTP requests, cookies, and responses are encrypted and integrity-protected between the browser and the TLS endpoint.",
    },
    misconception:
      "HTTP/2 does not remove every form of head-of-line blocking. TCP packet loss can still delay all HTTP/2 streams sharing that TCP connection; QUIC gives HTTP/3 independent transport streams.",
  },
  revise: {
    definition:
      "HTTPS is HTTP protected by TLS for server authentication, confidentiality, and integrity.",
    sections: [
      {
        title: "Version Progression",
        flow: ["HTTP/1.0: new connections", "HTTP/1.1: reuse", "HTTP/2: multiplex", "HTTP/3: QUIC streams"],
      },
      {
        title: "Simplified RTT Result",
        points: ["Five sequential HTTP/1.0 objects at 40 ms RTT: 400 ms", "Persistent HTTP/1.1: 240 ms", "Simplified HTTP/2 multiplexing: 120 ms"],
      },
    ],
    essentials: [
      "TLS combines certificate-based authentication and key agreement with symmetric traffic keys.",
      "HTTP/1.1 reuses TCP connections.",
      "HTTP/2 multiplexes streams over TCP and compresses headers.",
      "HTTP/3 carries HTTP over QUIC and integrates modern TLS.",
      "HTTP/1.1 pipelining keeps response order; HTTP/2 multiplexing interleaves streams.",
      "gRPC commonly uses HTTP/2 and Protocol Buffers.",
    ],
    comparisonTitle: "HTTP/2 vs HTTP/3",
    comparison: {
      left: {
        label: "HTTP/2",
        points: ["Runs over TCP", "Multiplexed HTTP streams", "TCP loss can delay all streams"],
      },
      right: {
        label: "HTTP/3",
        points: ["Runs over QUIC and UDP", "Independent QUIC streams", "TLS is integrated into QUIC"],
      },
    },
    followUp: "Why does TLS use symmetric keys for application data after using public-key mechanisms during setup?",
  },
  lastMinute: {
    definition: "HTTPS = HTTP semantics carried through TLS protection.",
    memoryLine: "1.1 reuses, 2 multiplexes on TCP, 3 multiplexes on QUIC.",
    cues: [
      "TLS gives authentication, confidentiality, and integrity.",
      "Certificate checks include trust chain, domain name, and validity.",
      "HTTP/2 uses binary frames and HPACK.",
      "HTTP/3 uses QUIC over UDP with independent streams.",
    ],
    trap: "Do not say HTTPS hides destination IP addresses, timing, or all traffic metadata.",
  },
};

export const cdnAndWebCaching: SubjectTopic = {
  slug: "cdn-and-web-caching",
  title: "CDN and Web Caching",
  description:
    "Understand cache locations, freshness, validation, CDN edge delivery, hit ratio, and average response-time numericals.",
  readTime: "18 min",
  difficulty: "Intermediate",
  tags: ["CDN", "Caching", "Cache-Control"],
  learn: {
    opening:
      "A cache stores a reusable response closer to future requests. A CDN operates distributed edge servers that can cache or process content nearer to users, reducing delay, bandwidth use, and origin load.",
    sections: [
      {
        title: "How a CDN Serves Content",
        visual: {
          src: "/notes/computer-networks/cdn-cache-flow.png",
          alt: "A user receiving a cache hit from a CDN edge while a cache miss reaches the origin server",
          width: 1536,
          height: 1024,
          caption: "A hit is served at the edge. A miss reaches the origin and can populate the edge cache for later requests.",
        },
        paragraphs: [
          "A CDN chooses an edge using factors such as network routing, measured performance, availability, and location. The geographically nearest server is not always the network-fastest server.",
        ],
        flow: [
          "The user is directed to an appropriate CDN edge",
          "The edge checks for a fresh cached response",
          "A cache hit is returned directly",
          "A miss or stale entry is fetched or validated with the origin",
          "Eligible content is stored for later requests",
        ],
      },
      {
        title: "Where Caches Exist",
        paragraphs: [
          "Caching can happen at several points between an application and its data source. Each location serves a different audience and must follow the response's cache rules.",
        ],
        dataTable: {
          headers: ["Cache", "Location", "Main benefit"],
          rows: [
            ["Private browser cache", "One user's browser", "Avoids repeat network transfers"],
            ["Shared forward-proxy cache", "Between a group of users and servers", "Reuses responses across users"],
            ["Reverse-proxy cache", "In front of an origin", "Reduces origin work"],
            ["CDN edge cache", "Distributed edge location", "Reduces global latency and origin traffic"],
            ["Application or origin cache", "Inside the service", "Avoids repeated computation or storage access"],
          ],
        },
      },
      {
        title: "Freshness and Cache-Control",
        dataTable: {
          headers: ["Directive", "Meaning"],
          rows: [
            ["max-age=N", "Response is fresh for N seconds after its response time"],
            ["public", "Shared caches may store the response when other rules allow"],
            ["private", "Response is intended for a private cache, not a shared cache"],
            ["no-cache", "May be stored, but must be validated before reuse"],
            ["no-store", "Cache must not store the response"],
            ["must-revalidate", "A stale response must be successfully validated before reuse"],
          ],
        },
        paragraphs: [
          "Expires gives an absolute freshness time and is older than Cache-Control. Cache-Control normally takes precedence when both are present. Vary tells a cache which request headers affect the selected representation.",
        ],
      },
      {
        title: "Validation with ETag and Last-Modified",
        paragraphs: [
          "A stale cached response does not always require downloading the full content again. The cache can send If-None-Match with an ETag or If-Modified-Since with a date. If the stored representation is still valid, the server can return 304 Not Modified without a response body.",
        ],
        table: {
          headers: ["Validator", "Conditional request"],
          rows: [
            ["ETag", "If-None-Match"],
            ["Last-Modified", "If-Modified-Since"],
          ],
        },
      },
      {
        title: "Cache Hit Ratio Numerical",
        paragraphs: [
          "Average response time = hit ratio x hit time + miss ratio x miss time. If the hit ratio is 80%, edge-hit time is 20 ms, and the complete miss time is 200 ms, the average is 0.8 x 20 + 0.2 x 200 = 16 + 40 = 56 ms.",
          "Without the cache every request would take 200 ms in this simplified example. The saving is 200 - 56 = 144 ms on average, or 72%.",
        ],
        points: [
          "Miss ratio = 1 - hit ratio.",
          "Be clear whether the stated miss time already includes edge processing.",
          "A high hit ratio helps only when hit service is meaningfully faster or cheaper.",
        ],
      },
      {
        title: "Benefits and Trade-offs",
        paragraphs: [
          "Caching and CDNs improve performance only when their keys, freshness rules, privacy controls, and failure behavior are designed correctly.",
        ],
        points: [
          "Lower latency and reduced origin bandwidth.",
          "Better handling of traffic spikes and some denial-of-service attacks.",
          "Improved availability when edge or origin redundancy is designed well.",
          "Risk of stale content, cache-key mistakes, and accidentally caching private data.",
          "Dynamic or personalized content may need careful validation or bypass rules.",
        ],
      },
    ],
    mechanism: {
      title: "How a cache decides what to return",
      steps: [
        "Build a cache key from the request target and relevant request fields.",
        "Look for a stored response that matches the key.",
        "Return it immediately if it is fresh and reusable.",
        "Validate or fetch from the origin when it is stale or missing.",
        "Store the new response only when its rules allow caching.",
      ],
    },
    example: {
      title: "Loading a website logo",
      body: "The browser checks its private cache first. If needed, it contacts the CDN edge. A fresh edge copy is returned as a hit; otherwise the edge fetches or validates the logo with the origin and may store the result for later users.",
    },
    misconception:
      "Cache-Control: no-cache does not mean do not store. It means the stored response must be validated before reuse. no-store is the directive that forbids storage.",
  },
  revise: {
    definition:
      "Caching reuses stored responses; a CDN provides distributed edge delivery and caching near users.",
    sections: [
      {
        title: "Average-Time Formula",
        points: [
          "Average = hit ratio x hit time + miss ratio x miss time.",
          "Example: 0.8 x 20 + 0.2 x 200 = 56 ms.",
          "Average saving against 200 ms = 144 ms or 72%.",
        ],
      },
    ],
    essentials: [
      "A hit is served from cache; a miss reaches another cache or the origin.",
      "Fresh content can be reused without validation.",
      "ETag and Last-Modified support conditional validation and 304 responses.",
      "no-cache permits storage but requires validation; no-store forbids storage.",
      "CDN edge choice depends on network conditions, not only physical distance.",
    ],
    comparisonTitle: "Freshness vs validation",
    comparison: {
      left: {
        label: "Freshness",
        points: ["Uses max-age or Expires", "Reuse without contacting origin", "Ends when response becomes stale"],
      },
      right: {
        label: "Validation",
        points: ["Uses ETag or Last-Modified", "Asks whether stored copy changed", "May receive 304 without a body"],
      },
    },
    followUp: "Why can no-cache still reduce bandwidth even though it requires validation?",
  },
  lastMinute: {
    definition: "Cache stores reusable responses; CDN moves those responses closer to users.",
    memoryLine: "Hit returns nearby; miss reaches origin; stale content validates.",
    cues: [
      "Miss ratio = 1 - hit ratio.",
      "Average = H x hit time + (1 - H) x miss time.",
      "no-cache validates; no-store does not save.",
      "ETag pairs with If-None-Match and may produce 304.",
    ],
    trap: "Do not assume the geographically closest CDN edge always gives the lowest network delay.",
  },
};
