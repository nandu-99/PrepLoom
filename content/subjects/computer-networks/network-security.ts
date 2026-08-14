import type { SubjectTopic } from "@/lib/subject-content";

export const networkSecurityFoundations: SubjectTopic = {
  slug: "network-security-foundations",
  title: "Network Security Foundations and Defense in Depth",
  description:
    "Understand security goals, threats, attack surfaces, trust boundaries, segmentation, DMZs, zero trust, and layered defenses.",
  readTime: "20 min",
  difficulty: "Foundation",
  tags: ["Security", "Defense in Depth", "DMZ"],
  learn: {
    opening:
      "Network security protects systems and communication against unauthorized access, disclosure, modification, disruption, and misuse. No single control stops every attack, so secure designs combine prevention, detection, response, and recovery.",
    sections: [
      {
        title: "CIA and Supporting Security Goals",
        paragraphs: [
          "Confidentiality limits who can read information. Integrity detects or prevents unauthorized change. Availability keeps systems and data usable when required. Authentication proves an identity or message source, while authorization decides what an authenticated identity may do.",
        ],
        dataTable: {
          headers: ["Goal", "Question", "Example control"],
          rows: [
            [
              "Confidentiality",
              "Who can read it?",
              "Encryption and access control",
            ],
            [
              "Integrity",
              "Was it changed?",
              "Cryptographic integrity check and signed update",
            ],
            [
              "Availability",
              "Can authorized users reach it?",
              "Redundancy and DDoS protection",
            ],
            [
              "Authentication",
              "Who are you?",
              "Certificate or multi-factor authentication",
            ],
            ["Authorization", "What may you do?", "Role and policy rules"],
            [
              "Accountability",
              "What happened and who acted?",
              "Protected logs and audit trails",
            ],
          ],
        },
      },
      {
        title: "Threat, Vulnerability, Exploit, and Risk",
        paragraphs: [
          "A threat is a possible harmful event or actor. A vulnerability is a weakness. An exploit is a method that uses a weakness. Risk combines the likelihood of a harmful event with its impact; it is reduced, transferred, accepted, or avoided according to business needs.",
          "A control can be preventive, detective, corrective, deterrent, or compensating. Security work starts with assets and realistic threats rather than buying isolated products.",
        ],
      },
      {
        title: "Common Network Attacks",
        paragraphs: [
          "Network attacks try to impersonate systems, read or change traffic, reuse valid messages, discover exposed services, or make services unavailable. Each defense should match the attack it is meant to reduce.",
        ],
        dataTable: {
          headers: ["Attack", "Main effect", "Example defense"],
          rows: [
            [
              "Spoofing",
              "Pretend to use another identity or address",
              "Authentication and anti-spoofing filters",
            ],
            [
              "Man in the middle",
              "Observe or alter communication",
              "Authenticated encryption",
            ],
            [
              "Replay",
              "Reuse a valid old message",
              "Nonces, timestamps, and sequence checks",
            ],
            [
              "DoS / DDoS",
              "Exhaust capacity or state",
              "Rate limits, resilient design, and upstream mitigation",
            ],
            [
              "Scanning",
              "Discover hosts, ports, and services",
              "Reduce exposure and monitor reconnaissance",
            ],
            [
              "Malware command traffic",
              "Remote control or data theft",
              "Endpoint controls, egress filtering, and detection",
            ],
          ],
        },
      },
      {
        title: "Defense in Depth and Trust Boundaries",
        paragraphs: [
          "Defense in depth places independent controls across endpoints, identities, applications, networks, data, monitoring, and recovery. If one layer fails, another can still limit movement or reveal the incident.",
          "A trust boundary is a point where data crosses between different security levels. Internet edges, user-to-server VLANs, cloud networks, administrative interfaces, and third-party connections are common policy-enforcement points.",
        ],
        visual: {
          src: "/notes/computer-networks/defense-in-depth.png",
          alt: "Internet traffic crossing an edge firewall, DMZ, internal firewall and inline IPS while an IDS observes traffic",
          width: 1536,
          height: 1024,
          caption:
            "A public DMZ limits direct exposure, passive sensors observe, and inline controls can block traffic.",
        },
      },
      {
        title: "Segmentation, DMZ, and Least Privilege",
        paragraphs: [
          "Segmentation divides systems into zones and permits only required flows between them. A DMZ holds Internet-facing services apart from sensitive internal systems. Compromise of one public server should not create unrestricted internal access.",
          "Least privilege gives users, devices, and applications only the access they need. Default deny is a useful policy baseline: traffic is blocked unless a justified rule allows it.",
        ],
      },
      {
        title: "Zero Trust in Simple Terms",
        paragraphs: [
          "Zero trust does not mean trusting nobody or replacing every firewall. It means access is not granted only because a device is inside a network. Each request is evaluated using identity, device state, resource, context, and policy, with continuous monitoring and limited access.",
        ],
      },
    ],
    mechanism: {
      title: "How to design layered protection",
      steps: [
        "Identify valuable assets, required flows, and realistic threats.",
        "Divide systems at meaningful trust boundaries.",
        "Apply least-privilege preventive controls to each allowed path.",
        "Collect logs and deploy detection where attacks or failures can be observed.",
        "Prepare containment, recovery, testing, and regular policy review.",
      ],
    },
    example: {
      title: "Protecting a public web application",
      body: "Expose only HTTPS to a web service in the DMZ. Permit the web tier to reach one required application service, and permit that service to reach only the necessary database port. Monitor each boundary and keep administrative access on a separate protected path.",
    },
    misconception:
      "An internal network is not automatically trusted. Phishing, compromised laptops, malicious insiders, and configuration errors can originate inside the perimeter.",
  },
  revise: {
    definition:
      "Network security applies layered controls across trust boundaries to preserve confidentiality, integrity, availability, and accountable access.",
    sections: [
      {
        title: "Core Model",
        points: [
          "Assets and threats",
          "Trust boundaries",
          "Least privilege",
          "Prevent, detect, respond, recover",
        ],
      },
    ],
    essentials: [
      "Threat is potential harm; vulnerability is weakness; exploit uses weakness.",
      "Risk depends on likelihood and impact.",
      "DMZ separates public services from internal systems.",
      "Default deny permits only justified traffic.",
      "Zero trust evaluates each access request instead of trusting location alone.",
    ],
    comparisonTitle: "Authentication vs authorization",
    comparison: {
      left: {
        label: "Authentication",
        points: [
          "Proves identity",
          "Happens before access decision",
          "Password, token, or certificate",
        ],
      },
      right: {
        label: "Authorization",
        points: [
          "Grants permitted actions",
          "Uses policy and roles",
          "Read, write, administer",
        ],
      },
    },
    followUp:
      "Why should a public web server be separated from an internal database network?",
  },
  lastMinute: {
    definition:
      "Layer defenses so one control failure does not expose everything.",
    memoryLine: "Identify, segment, allow least privilege, monitor, recover.",
    cues: [
      "CIA: confidentiality, integrity, availability.",
      "DMZ contains public services.",
      "Default deny needs explicit allow rules.",
      "Inside location alone is not proof of trust.",
    ],
    trap: "Do not describe encryption as a complete defense against endpoint compromise or denial of service.",
  },
};

export const firewallsRulesAndInspection: SubjectTopic = {
  slug: "firewalls-rules-and-inspection",
  title: "Firewalls, Rules, Stateful Inspection, Proxies, and NGFW",
  description:
    "Compare firewall types, read ordered ACL rules, understand state tables, proxies, deep inspection, NAT, logging, and policy design.",
  readTime: "25 min",
  difficulty: "Intermediate",
  tags: ["Firewall", "ACL", "Stateful Inspection"],
  learn: {
    opening:
      "A firewall controls traffic between hosts or networks with different security requirements. Its value depends on correct placement, a clear policy, tested rules, useful logs, and secure management.",
    sections: [
      {
        title: "Firewall Types",
        dataTable: {
          headers: ["Type", "Main context", "Strength and limit"],
          rows: [
            [
              "Stateless packet filter",
              "Headers in each packet",
              "Fast but no connection memory",
            ],
            [
              "Stateful firewall",
              "Headers plus tracked flow state",
              "Handles return traffic and rejects invalid state",
            ],
            [
              "Application proxy",
              "Terminates and relays application sessions",
              "Deep control but added latency and protocol support work",
            ],
            [
              "NGFW",
              "State, applications, users, content, and threat intelligence",
              "Broad visibility with cost and processing overhead",
            ],
            [
              "Host firewall",
              "Traffic entering or leaving one endpoint",
              "Protects workloads beyond the perimeter",
            ],
          ],
        },
        paragraphs: [
          "NGFW is a product capability category rather than a new OSI layer. Features commonly include stateful policy, application identification, intrusion prevention, content filtering, and identity integration.",
        ],
      },
      {
        title: "What a Firewall Rule Matches",
        paragraphs: [
          "Rules may match source and destination addresses, protocol, source and destination ports, interface or zone, direction, user, application, time, connection state, and content. A rule action can allow, reject, drop, log, rate-limit, or redirect traffic.",
          "Drop silently discards traffic. Reject discards and returns an error such as TCP reset or ICMP unreachable when policy permits. The choice affects troubleshooting and information exposure.",
        ],
      },
      {
        title: "Ordered ACL Numerical",
        paragraphs: [
          "Many rule sets use first match wins. Therefore, specific exceptions belong before broad rules, and a final default deny catches everything not explicitly allowed.",
        ],
        dataTable: {
          headers: ["Order", "Rule", "Action"],
          rows: [
            [
              "1",
              "Source 10.0.5.0/24 to 172.16.10.10 TCP 443",
              "Allow and log",
            ],
            ["2", "Source 10.0.0.0/8 to 172.16.10.0/24", "Deny"],
            ["3", "Any to any", "Deny"],
          ],
        },
        points: [
          "10.0.5.22 to 172.16.10.10:443 matches rule 1 and is allowed.",
          "10.0.5.22 to the same server on port 22 skips rule 1 and is denied by rule 2.",
          "192.0.2.8 to the server is denied by the final rule.",
          "Moving rule 2 above rule 1 would shadow the HTTPS exception.",
        ],
      },
      {
        title: "How Stateful Inspection Works",
        paragraphs: [
          "A stateful firewall records flow information such as source and destination endpoints, protocol, TCP state, sequence expectations, NAT mapping, and timeout. Return traffic must match an allowed state rather than merely claiming to be part of an established connection.",
          "UDP has no handshake, so the firewall creates temporary state after seeing a permitted outbound datagram and allows matching replies for a timeout period. Stateful does not mean the firewall understands every application message.",
        ],
      },
      {
        title: "Proxy and Deep Packet Inspection",
        paragraphs: [
          "An application proxy creates separate client-to-proxy and proxy-to-server connections. It can validate protocol behavior, authenticate users, filter commands, and hide direct server exposure.",
          "Deep Packet Inspection examines payload or application metadata when visible. End-to-end encryption limits payload visibility unless an authorized inspection design terminates or intercepts encryption, which adds privacy, key-management, trust, legal, and performance concerns.",
        ],
      },
      {
        title: "Firewall, NAT, and WAF",
        table: {
          headers: ["Network firewall", "Web Application Firewall"],
          rows: [
            [
              "Controls general network flows",
              "Specializes in HTTP application traffic",
            ],
            [
              "Uses addresses, ports, state, and applications",
              "Uses URLs, headers, bodies, sessions, and web rules",
            ],
            [
              "Placed at host or network boundaries",
              "Placed before web applications or services",
            ],
          ],
        },
        paragraphs: [
          "NAT translates addressing and often shares a device with a firewall, but NAT is not an access-control policy by itself. A WAF complements rather than replaces a network firewall.",
        ],
      },
      {
        title: "Policy Hygiene",
        points: [
          "Document owner, purpose, source, destination, service, and expiry for each exception.",
          "Remove shadowed, duplicate, unused, overly broad, and temporary expired rules.",
          "Protect the management plane with separate authentication and restricted access.",
          "Log important allows and denies without overwhelming storage or exposing secrets.",
          "Test rule changes, keep a rollback path, and review policy regularly.",
        ],
        paragraphs: [
          "A firewall cannot patch vulnerable applications, stop every allowed-channel attack, or protect traffic that bypasses its enforcement point.",
        ],
      },
    ],
    mechanism: {
      title: "How a stateful firewall decides",
      steps: [
        "Identify interfaces, zones, addresses, protocol, and ports.",
        "Check whether the packet matches an existing valid state.",
        "For a new flow, evaluate the ordered policy rules.",
        "Allow, drop, reject, inspect, translate, or log according to policy.",
        "Create or update state and expire it after closure or timeout.",
      ],
    },
    example: {
      title: "Allowing web access safely",
      body: "Permit Internet clients to the DMZ reverse proxy on TCP 443. Do not expose the internal database. Permit only the proxy or application tier to the exact backend port, log the flow, and deny other cross-zone traffic.",
    },
    misconception:
      "A firewall is not automatically secure because it is stateful or next generation. A broad allow rule can defeat advanced inspection.",
  },
  revise: {
    definition:
      "A firewall enforces traffic policy at host or network boundaries using packet, state, application, identity, and content context.",
    sections: [
      {
        title: "Rule Review",
        points: [
          "First match can win",
          "Specific before general",
          "Look for shadowed rules",
          "Finish with deliberate default policy",
        ],
      },
    ],
    essentials: [
      "Stateless checks each packet independently.",
      "Stateful tracks permitted flows.",
      "Proxy terminates and relays separate connections.",
      "NGFW can add application and IPS functions.",
      "NAT is not a firewall policy.",
    ],
    comparisonTitle: "Stateless vs stateful",
    comparison: {
      left: {
        label: "Stateless",
        points: [
          "Independent packet decision",
          "Low state overhead",
          "Return traffic needs explicit matching rules",
        ],
      },
      right: {
        label: "Stateful",
        points: [
          "Maintains flow table",
          "Allows valid return traffic",
          "Consumes state and needs timeouts",
        ],
      },
    },
    followUp:
      "Why must a specific allow rule appear before a broader deny in a first-match ACL?",
  },
  lastMinute: {
    definition:
      "Firewall = ordered policy enforcement plus correct placement and maintenance.",
    memoryLine:
      "Match context, check state, apply first valid policy, log wisely.",
    cues: [
      "Default deny blocks unmatched traffic.",
      "State table tracks flows, including temporary UDP state.",
      "Proxy creates two connections.",
      "WAF specializes in web application traffic.",
    ],
    trap: "Do not call NAT a security guarantee or assume encrypted traffic is always fully inspectable.",
  },
};

export const idsIpsAndDetection: SubjectTopic = {
  slug: "ids-ips-and-detection",
  title: "IDS, IPS, Detection Methods, and Incident Signals",
  description:
    "Compare IDS and IPS, network and host sensors, signature, anomaly and protocol detection, alert accuracy, placement, tuning, and response.",
  readTime: "23 min",
  difficulty: "Intermediate",
  tags: ["IDS", "IPS", "Detection"],
  learn: {
    opening:
      "An intrusion detection and prevention system observes events for signs of attacks or policy violations. Detection produces evidence and alerts; prevention adds an enforcement action that can also disrupt legitimate traffic if the decision is wrong.",
    sections: [
      {
        title: "IDS vs IPS",
        table: {
          headers: ["IDS", "IPS"],
          rows: [
            [
              "Usually observes copied traffic or host events",
              "Usually sits inline with traffic",
            ],
            [
              "Alerts and records evidence",
              "Can drop, reset, block, or rate-limit",
            ],
            [
              "Failure normally does not stop traffic",
              "Failure policy can affect availability",
            ],
          ],
        },
        paragraphs: [
          "An IDS can trigger an external response through automation, but it is still not inline for the original packet. An IPS must see traffic before forwarding it to block that traffic directly.",
        ],
      },
      {
        title: "Sensor Types",
        dataTable: {
          headers: ["Type", "Observes", "Useful visibility"],
          rows: [
            [
              "NIDS / NIPS",
              "Network packets and flows",
              "Several systems and network attacks",
            ],
            [
              "HIDS / HIPS",
              "Host logs, processes, files, and calls",
              "Decrypted endpoint activity and local change",
            ],
            [
              "Wireless IDPS",
              "802.11 radio and management activity",
              "Rogue APs and wireless attacks",
            ],
            [
              "Network behavior analysis",
              "Flow and traffic patterns",
              "Scanning, DDoS, and unusual communication",
            ],
          ],
        },
        paragraphs: [
          "Encrypted traffic can hide payload from a network sensor, while endpoint sensors may see activity after decryption. Combining sources improves context.",
        ],
      },
      {
        title: "Detection Methods",
        paragraphs: [
          "An IDPS can combine several detection methods. Signature detection is strong for known attacks, while behavior and protocol analysis help identify suspicious activity that has no exact known signature.",
        ],
        dataTable: {
          headers: ["Method", "Strength", "Limitation"],
          rows: [
            [
              "Signature",
              "Precise for known patterns",
              "Misses unknown or modified attacks",
            ],
            [
              "Anomaly",
              "Can reveal new or unusual behavior",
              "Needs baselines and can create false positives",
            ],
            [
              "Stateful protocol analysis",
              "Finds invalid protocol sequences",
              "Complex and resource-intensive",
            ],
            [
              "Reputation / intelligence",
              "Blocks known bad infrastructure",
              "Can be stale or incorrectly classified",
            ],
          ],
        },
      },
      {
        title: "True and False Decisions",
        paragraphs: [
          "A true positive is malicious activity correctly alerted. A true negative is benign activity correctly ignored. A false positive is benign activity incorrectly alerted or blocked. A false negative is malicious activity missed.",
        ],
        dataTable: {
          headers: [
            "Reality",
            "Detection says malicious",
            "Detection says benign",
          ],
          rows: [
            ["Malicious", "True positive", "False negative"],
            ["Benign", "False positive", "True negative"],
          ],
        },
      },
      {
        title: "Alert-Metric Numerical",
        paragraphs: [
          "A sensor observes 10,000 events. It correctly alerts on 90 of 100 attacks, so true positives = 90 and false negatives = 10. It also alerts on 198 of 9,900 benign events, so false positives = 198 and true negatives = 9,702.",
          "Precision = TP/(TP+FP) = 90/288 = 31.25 percent. Recall = TP/(TP+FN) = 90/100 = 90 percent. Even good recall can produce an alert queue dominated by false positives when attacks are rare.",
        ],
      },
      {
        title: "Placement and Visibility",
        paragraphs: [
          "Place sensors where they can observe meaningful traffic: Internet edges, DMZs, server zones, cloud boundaries, remote-access paths, and critical internal segments. A network TAP or switch mirror can feed an out-of-band IDS; an IPS is placed inline and needs capacity, high availability, and bypass or failure planning.",
          "Traffic asymmetric routing, packet loss, overload, encryption, and poor clock synchronization can reduce detection quality.",
        ],
      },
      {
        title: "Tuning and Incident Workflow",
        flow: [
          "Collect and normalize event",
          "Match rule, behavior, or protocol model",
          "Enrich with asset and threat context",
          "Prioritize and investigate",
          "Contain, preserve evidence, recover, and tune",
        ],
        paragraphs: [
          "Tuning suppresses known benign patterns, updates signatures and baselines, prioritizes critical assets, and tests rules safely. Disabling every noisy rule hides attacks rather than solving the detection problem.",
        ],
      },
    ],
    mechanism: {
      title: "How an alert becomes an incident decision",
      steps: [
        "Verify the event and affected asset.",
        "Correlate packets, logs, identity, and endpoint evidence.",
        "Decide whether it is true positive, false positive, or uncertain.",
        "Contain according to impact and confidence.",
        "Document, recover, and tune detection using the lesson.",
      ],
    },
    example: {
      title: "High-volume login failures",
      body: "A signature sees repeated failures, anomaly logic notices the rate is unusual, and identity logs show attempts across many accounts. Correlation raises confidence that this is password spraying rather than one user mistyping a password.",
    },
    misconception:
      "An IDS does not guarantee that every alert is an attack, and an IPS does not guarantee every malicious event will be blocked.",
  },
  revise: {
    definition:
      "IDS observes and alerts; IPS observes inline and can automatically enforce a response.",
    sections: [
      {
        title: "Decision Matrix",
        points: [
          "TP: attack alerted",
          "TN: benign ignored",
          "FP: benign alerted",
          "FN: attack missed",
        ],
      },
    ],
    essentials: [
      "Signature detects known patterns.",
      "Anomaly compares activity with a normal baseline.",
      "NIDS sees network traffic; HIDS sees host activity.",
      "Precision measures alert correctness; recall measures detected attacks.",
      "IPS availability and false positives require careful planning.",
    ],
    comparisonTitle: "Signature vs anomaly",
    comparison: {
      left: {
        label: "Signature",
        points: ["Known patterns", "Often precise", "Weak for novel variants"],
      },
      right: {
        label: "Anomaly",
        points: [
          "Deviation from baseline",
          "Can find unknown behavior",
          "Needs tuning",
        ],
      },
    },
    followUp:
      "Why can a detector with high recall still overwhelm analysts with false alerts?",
  },
  lastMinute: {
    definition:
      "Detection turns observed evidence into alerts; prevention adds inline action.",
    memoryLine: "See, classify, correlate, contain, tune.",
    cues: [
      "IDS out-of-band; IPS inline.",
      "FP wastes effort; FN misses an attack.",
      "Precision = TP/(TP+FP).",
      "Recall = TP/(TP+FN).",
    ],
    trap: "Do not maximize blocking without considering false positives and service availability.",
  },
};

export const vpnFoundationsAndTunneling: SubjectTopic = {
  slug: "vpn-foundations-and-tunneling",
  title: "VPN Foundations, Tunneling, and Deployment Models",
  description:
    "Understand VPN security goals, encapsulation, remote-access and site-to-site designs, full and split tunneling, routing, DNS, MTU, and overhead.",
  readTime: "22 min",
  difficulty: "Intermediate",
  tags: ["VPN", "Tunneling", "Remote Access"],
  learn: {
    opening:
      "A Virtual Private Network creates a logical protected path across another network. A secure VPN normally combines peer authentication, encryption, integrity, anti-replay protection, encapsulation, routing, and key management.",
    sections: [
      {
        title: "What a VPN Does and Does Not Do",
        paragraphs: [
          "A VPN protects traffic between tunnel endpoints. It can connect one user to a private network, join two networks, or protect host-to-host traffic. After traffic leaves the tunnel endpoint, another control must protect the remaining path.",
          "A VPN does not make malicious websites safe, repair an infected endpoint, provide anonymity from every observer, or guarantee that the VPN operator is trustworthy.",
        ],
      },
      {
        title: "Encapsulation and Tunneling",
        paragraphs: [
          "The original packet becomes an inner packet. The VPN adds protection and an outer header that ordinary Internet routers can forward between tunnel endpoints. The receiving endpoint verifies, decrypts, decapsulates, and routes the original packet.",
        ],
        visual: {
          src: "/notes/computer-networks/vpn-tunneling.png",
          alt: "Private packet encrypted and encapsulated into an outer VPN packet across the public Internet before decryption and forwarding",
          width: 1536,
          height: 1024,
          caption:
            "The public network forwards the outer packet while the protected inner packet travels between VPN endpoints.",
        },
      },
      {
        title: "Remote Access and Site-to-Site",
        paragraphs: [
          "A remote-access VPN protects one user's device connection, while a site-to-site VPN joins two networks through their gateways.",
        ],
        table: {
          headers: ["Remote access", "Site-to-site"],
          rows: [
            [
              "One client connects to a gateway",
              "Gateways connect whole networks",
            ],
            [
              "User/device authentication is central",
              "Gateway or peer authentication is central",
            ],
            [
              "Client software or built-in VPN",
              "Normally transparent to endpoint users",
            ],
          ],
        },
      },
      {
        title: "Full Tunnel vs Split Tunnel",
        paragraphs: [
          "A full tunnel sends all client traffic through the VPN gateway, enabling central filtering and consistent egress policy but consuming gateway bandwidth and possibly adding latency. A split tunnel sends only selected destinations through the VPN, improving efficiency but creating another direct Internet path that needs endpoint controls.",
        ],
        dataTable: {
          headers: ["Destination", "Full tunnel", "Split tunnel example"],
          rows: [
            ["Corporate 10.0.0.0/8", "VPN", "VPN"],
            ["Public website", "VPN", "Local Internet"],
            [
              "Corporate DNS zone",
              "VPN resolver",
              "Must use correct routed resolver",
            ],
          ],
        },
      },
      {
        title: "Routes, DNS, and Overlapping Networks",
        paragraphs: [
          "The VPN installs or advertises routes for protected networks. Wrong route priority can bypass the tunnel or black-hole traffic. DNS settings must send private names to a resolver that can answer them without leaking sensitive queries.",
          "If the remote user's home LAN and company LAN use the same private prefix, the local route may capture company traffic. Renumbering, narrower routes, translation, or a carefully designed VPN policy can resolve the overlap.",
        ],
      },
      {
        title: "Tunnel-Overhead Numerical",
        paragraphs: [
          "Assume an outer path MTU of 1,500 bytes and a simplified VPN adds 60 bytes of outer headers and protection. Maximum inner packet without fragmentation is 1,500 - 60 = 1,440 bytes. For inner IPv4 plus TCP with 20-byte headers each, maximum TCP payload is 1,440 - 20 - 20 = 1,400 bytes.",
          "Real overhead varies with protocol, address version, cipher, padding, and options. Path MTU Discovery or TCP MSS adjustment prevents repeated fragmentation and black-hole behavior.",
        ],
      },
      {
        title: "Authentication and Operations",
        points: [
          "Use certificates, public keys, or strong identity authentication rather than shared weak passwords.",
          "Apply MFA to remote access where supported.",
          "Rotate and revoke credentials when devices or users change.",
          "Patch clients and gateways, restrict reachable subnets, and log connections.",
          "Use kill-switch or fail-closed behavior carefully where leakage is unacceptable.",
        ],
        paragraphs: [
          "The tunnel should grant only necessary network reachability. Successful VPN authentication should not mean unrestricted access to every internal system.",
        ],
      },
    ],
    mechanism: {
      title: "How a remote-access VPN carries a packet",
      steps: [
        "Authenticate the client and VPN gateway.",
        "Negotiate algorithms, keys, addresses, and routes.",
        "Match a packet to tunnel policy.",
        "Encrypt, authenticate, encapsulate, and send the outer packet.",
        "Verify, decrypt, decapsulate, and forward the inner packet.",
      ],
    },
    example: {
      title: "Private DNS through split tunneling",
      body: "Corporate application traffic uses the VPN, while public browsing uses the local Internet. DNS policy must still send internal names through a corporate resolver or the application may fail and private names may leak.",
    },
    misconception:
      "A VPN does not hide traffic from both the ISP and the VPN provider. It moves the point of visibility and trust to the tunnel endpoint and onward path.",
  },
  revise: {
    definition:
      "A VPN authenticates endpoints and protects encapsulated traffic between tunnel endpoints across another network.",
    sections: [
      {
        title: "Tunnel Checklist",
        points: [
          "Authenticate peers",
          "Protect confidentiality and integrity",
          "Install correct routes and DNS",
          "Account for overhead and MTU",
          "Limit post-tunnel access",
        ],
      },
    ],
    essentials: [
      "Remote access connects a client; site-to-site connects networks.",
      "Full tunnel carries all routes; split tunnel carries selected routes.",
      "Outer routers forward the encapsulated packet.",
      "VPN overhead reduces inner MTU.",
      "Protection ends at the VPN endpoint.",
    ],
    comparisonTitle: "Full vs split tunnel",
    comparison: {
      left: {
        label: "Full tunnel",
        points: [
          "All traffic through gateway",
          "Central inspection",
          "More bandwidth and latency",
        ],
      },
      right: {
        label: "Split tunnel",
        points: [
          "Selected routes only",
          "Efficient local Internet",
          "Needs strong endpoint and DNS policy",
        ],
      },
    },
    followUp:
      "With path MTU 1,500 and 80 bytes of VPN overhead, what is the largest inner packet?",
  },
  lastMinute: {
    definition:
      "VPN = authenticated protected tunnel plus correct routing and policy.",
    memoryLine:
      "Match route, protect inner packet, send outer packet, decapsulate at peer.",
    cues: [
      "Remote access: client to network.",
      "Site-to-site: network to network.",
      "Split tunnel sends selected routes only.",
      "Overhead lowers effective MTU.",
    ],
    trap: "Do not assume the traffic stays encrypted after it leaves the far VPN endpoint.",
  },
};

export const vpnProtocolsAndIpsec: SubjectTopic = {
  slug: "vpn-protocols-and-ipsec",
  title: "IPsec, OpenVPN, WireGuard, and VPN Security",
  description:
    "Compare IPsec architecture and modes with OpenVPN and WireGuard, understand IKE, ESP, NAT traversal, cryptokey routing, protocol choice, and overhead.",
  readTime: "28 min",
  difficulty: "Advanced",
  tags: ["IPsec", "OpenVPN", "WireGuard"],
  learn: {
    opening:
      "VPN protocols differ in packet format, transport, key exchange, identity model, operating-system integration, and network behavior. Security depends more on sound protocols, algorithms, keys, updates, and configuration than on a marketing claim of speed.",
    sections: [
      {
        title: "IPsec Building Blocks",
        dataTable: {
          headers: ["Component", "Purpose", "Common identifier"],
          rows: [
            [
              "IKEv2",
              "Authenticate peers and negotiate Security Associations",
              "UDP 500",
            ],
            [
              "ESP",
              "Confidentiality, integrity, origin authentication, and anti-replay as configured",
              "IP protocol 50",
            ],
            [
              "NAT-T",
              "Carry ESP through NAT using UDP encapsulation",
              "UDP 4500",
            ],
            [
              "AH",
              "Integrity/authentication without payload encryption",
              "IP protocol 51; poor NAT compatibility",
            ],
          ],
        },
        paragraphs: [
          "A Security Association is a one-way set of algorithms, keys, identifiers, sequence state, and lifetimes. Bidirectional protected communication therefore uses separate inbound and outbound SAs.",
        ],
      },
      {
        title: "Transport and Tunnel Modes",
        paragraphs: [
          "Transport mode protects the upper-layer payload while retaining the original outer IP header for routing. Tunnel mode protects the complete inner IP packet and adds a new outer IP header, making it natural for gateway-to-gateway and many remote-access designs.",
        ],
        visual: {
          src: "/notes/computer-networks/ipsec-modes.png",
          alt: "IPsec ESP transport mode protecting transport payload and tunnel mode protecting a complete inner IP packet behind a new IP header",
          width: 1536,
          height: 1024,
          caption:
            "Transport mode keeps the original routing header; tunnel mode adds a new header around a protected inner packet.",
        },
      },
      {
        title: "IKEv2 Exchange in Simple Terms",
        flow: [
          "Negotiate cryptographic capabilities and perform Diffie-Hellman exchange",
          "Authenticate peers with certificates or shared credentials",
          "Create the IKE Security Association",
          "Create child SAs for protected data traffic",
          "Rekey or delete SAs as lifetimes and policy require",
        ],
        paragraphs: [
          "Diffie-Hellman establishes shared secret material over an untrusted network but does not authenticate identity by itself. Certificates, pre-shared keys, or EAP-based identity methods prevent an unauthenticated man in the middle.",
        ],
      },
      {
        title: "ESP Anti-Replay and NAT Traversal",
        paragraphs: [
          "ESP sequence numbers let a receiver reject duplicate packets inside an anti-replay window. Integrity validation occurs before accepting protected data.",
          "NAT changes IP addresses and often ports. AH protects address-related header fields and conflicts with translation. IPsec NAT Traversal normally encapsulates ESP in UDP 4500 so NAT devices can maintain mappings.",
        ],
      },
      {
        title: "OpenVPN and WireGuard",
        table: {
          headers: ["OpenVPN", "WireGuard"],
          rows: [
            [
              "TLS-based user-space VPN",
              "Compact modern protocol with fixed cryptographic design",
            ],
            ["Can use UDP or TCP transport", "Carries tunnel packets over UDP"],
            [
              "Highly configurable and mature",
              "Public keys map to allowed IP ranges",
            ],
            [
              "Broader configuration complexity",
              "Small configuration surface but surrounding identity/distribution remains external",
            ],
          ],
        },
        paragraphs: [
          "OpenVPN over UDP normally avoids TCP-over-TCP performance problems. TCP transport can help traverse restrictive networks but nested retransmission and congestion control may cause poor behavior.",
          "WireGuard uses cryptokey routing: a peer public key is associated with allowed IP prefixes. Outbound prefixes select a peer, while authenticated inbound packets are accepted only for allowed source prefixes.",
        ],
      },
      {
        title: "Protocol Choice",
        dataTable: {
          headers: ["Need", "Often suitable", "Reason"],
          rows: [
            [
              "Enterprise site-to-site and standards integration",
              "IPsec / IKEv2",
              "Broad gateway and platform support",
            ],
            [
              "Flexible TLS-based deployment",
              "OpenVPN",
              "Mature configuration and transport choices",
            ],
            [
              "Simple high-performance routed tunnel",
              "WireGuard",
              "Compact design and public-key routing",
            ],
            [
              "Legacy L2TP confidentiality",
              "L2TP over IPsec",
              "L2TP tunnels Layer 2 but relies on IPsec for security",
            ],
          ],
        },
        paragraphs: [
          "There is no universally fastest or safest protocol for every network. Hardware acceleration, operating system, path, cipher, MTU, policy, implementation quality, and configuration determine real results.",
        ],
      },
      {
        title: "Overhead and Efficiency Numerical",
        paragraphs: [
          "A link carries 1,500-byte outer packets and a VPN adds 80 bytes. Inner packet capacity is 1,420 bytes. Encapsulation efficiency for a full 1,420-byte inner packet is 1,420/1,500 x 100 = 94.67 percent.",
          "If the application sends many 100-byte payloads, fixed headers consume a much larger percentage. Aggregation, transport behavior, and avoiding fragmentation can matter more than headline cipher speed.",
        ],
      },
      {
        title: "VPN Hardening Checklist",
        points: [
          "Use current implementations and disable obsolete algorithms and protocols.",
          "Authenticate both peers and protect private keys.",
          "Use least-privilege routes and firewall policy for tunnel interfaces.",
          "Plan revocation, rotation, logging, rekeying, and high availability.",
          "Test DNS leakage, IPv6 routing, MTU, kill-switch behavior, and reconnects.",
        ],
        paragraphs: [
          "PPTP and obsolete cryptographic configurations should not be used for secure modern deployment. L2TP alone provides tunneling, not encryption.",
        ],
      },
    ],
    mechanism: {
      title: "How an IPsec tunnel becomes active",
      steps: [
        "Peers negotiate algorithms and Diffie-Hellman material through IKE.",
        "Peers authenticate identities.",
        "IKE creates child Security Associations and keys.",
        "Matching packets enter ESP protection and tunnel policy.",
        "The receiver checks replay and integrity, decrypts, decapsulates, and forwards.",
      ],
    },
    example: {
      title: "IPsec behind a home NAT",
      body: "A remote client starts IKE through UDP 500, detects address translation, and uses NAT-T over UDP 4500. The NAT device can now track the UDP mapping while ESP protection remains between IPsec peers.",
    },
    misconception:
      "WireGuard does not automatically provide user accounts, address assignment, MFA, or a complete enterprise access system. Those functions must be designed around the tunnel protocol.",
  },
  revise: {
    definition:
      "IPsec protects IP with negotiated SAs; OpenVPN uses TLS-based tunneling; WireGuard associates public keys with allowed routed prefixes.",
    sections: [
      {
        title: "Protocol Recall",
        points: [
          "IKEv2: negotiate and authenticate",
          "ESP: protect data",
          "NAT-T: UDP 4500",
          "WireGuard: public key plus allowed IPs",
        ],
      },
    ],
    essentials: [
      "IPsec SAs are unidirectional.",
      "Tunnel mode protects the full inner IP packet.",
      "ESP can provide encryption, integrity, origin authentication, and anti-replay.",
      "AH and NAT conflict because NAT changes protected header values.",
      "L2TP needs another protocol such as IPsec for encryption.",
    ],
    comparisonTitle: "Transport vs tunnel mode",
    comparison: {
      left: {
        label: "Transport",
        points: [
          "Original IP header remains outer",
          "Protects upper-layer payload",
          "Common host-to-host fit",
        ],
      },
      right: {
        label: "Tunnel",
        points: [
          "Adds new outer IP header",
          "Protects complete inner packet",
          "Common gateway and remote-access fit",
        ],
      },
    },
    followUp: "Why does IPsec NAT traversal commonly use UDP port 4500?",
  },
  lastMinute: {
    definition:
      "Choose VPN protocols by security model, integration, path behavior, and operational needs.",
    memoryLine:
      "IKE negotiates, ESP protects, NAT-T wraps, routes decide the peer.",
    cues: [
      "IKEv2: UDP 500; NAT-T: UDP 4500.",
      "ESP is IP protocol 50 without NAT-T.",
      "Tunnel mode adds a new IP header.",
      "WireGuard maps keys to allowed IP prefixes.",
    ],
    trap: "Do not say L2TP, tunneling, or an outer header alone provides encryption.",
  },
};
