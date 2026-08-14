"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Command } from "cmdk";
import {
  ArrowRight,
  BookOpen,
  Braces,
  Code2,
  Route,
  Search,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SearchItem = {
  title: string;
  description: string;
  href: string;
  keywords: string[];
  icon: typeof BookOpen;
};

type SearchGroup = {
  label: string;
  items: SearchItem[];
};

const searchGroups: SearchGroup[] = [
  {
    label: "Operating Systems",
    items: [
      {
        title: "Introduction to Operating Systems",
        description: "Operating Systems fundamentals",
        href: "/subjects/operating-systems#workspace",
        keywords: ["os", "introduction", "fundamentals", "kernel"],
        icon: BookOpen,
      },
      {
        title: "Processes and Threads",
        description: "Operating Systems process management",
        href: "/subjects/operating-systems#workspace",
        keywords: ["process", "thread", "pcb", "tcb"],
        icon: BookOpen,
      },
      {
        title: "CPU Scheduling",
        description: "Operating Systems scheduling",
        href: "/subjects/operating-systems#workspace",
        keywords: ["fcfs", "sjf", "round robin", "priority scheduling"],
        icon: BookOpen,
      },
      {
        title: "Deadlocks",
        description: "Operating Systems resource allocation",
        href: "/subjects/operating-systems#workspace",
        keywords: [
          "deadlock prevention",
          "deadlock avoidance",
          "banker algorithm",
        ],
        icon: BookOpen,
      },
      {
        title: "Process Synchronization",
        description: "Operating Systems concurrency",
        href: "/subjects/operating-systems#workspace",
        keywords: ["semaphore", "mutex", "critical section", "race condition"],
        icon: BookOpen,
      },
      {
        title: "Memory Management",
        description: "Operating Systems memory allocation",
        href: "/subjects/operating-systems#workspace",
        keywords: ["memory", "allocation", "fragmentation"],
        icon: BookOpen,
      },
      {
        title: "Paging and Virtual Memory",
        description: "Operating Systems address translation",
        href: "/subjects/operating-systems#workspace",
        keywords: ["paging", "virtual memory", "page table", "tlb"],
        icon: BookOpen,
      },
      {
        title: "Page Replacement",
        description: "Operating Systems replacement algorithms",
        href: "/subjects/operating-systems#workspace",
        keywords: ["fifo", "lru", "optimal", "page fault"],
        icon: BookOpen,
      },
    ],
  },
  {
    label: "Computer Architecture",
    items: [
      {
        title: "Binary Numbers and Place Value",
        description: "MCA digital logic foundations",
        href: "/subjects/modern-computer-architecture#workspace",
        keywords: ["mca", "binary", "bits", "number system", "place value"],
        icon: BookOpen,
      },
      {
        title: "Signed Binary and Two's Complement",
        description: "Signed range, addition, carry, and overflow",
        href: "/subjects/modern-computer-architecture#workspace",
        keywords: ["twos complement", "signed binary", "overflow", "carry"],
        icon: BookOpen,
      },
      {
        title: "Boolean Algebra and Logic Gates",
        description: "Truth tables, Boolean laws, and universal gates",
        href: "/subjects/modern-computer-architecture#workspace",
        keywords: ["boolean", "logic gate", "and", "or", "xor", "nand", "nor"],
        icon: BookOpen,
      },
      {
        title: "Combinational Circuits",
        description: "Multiplexers, decoders, adders, and comparators",
        href: "/subjects/modern-computer-architecture#workspace",
        keywords: ["mux", "multiplexer", "decoder", "adder", "comparator"],
        icon: BookOpen,
      },
      {
        title: "ALU Foundations and Control",
        description: "ALU operations, subtraction, and status flags",
        href: "/subjects/modern-computer-architecture#workspace",
        keywords: ["alu", "arithmetic logic unit", "zero flag", "carry flag"],
        icon: BookOpen,
      },
      {
        title: "Sequential Logic and State",
        description: "Stored state, feedback, clocks, and timing",
        href: "/subjects/modern-computer-architecture#workspace",
        keywords: ["sequential logic", "state", "clock", "setup", "hold"],
        icon: BookOpen,
      },
      {
        title: "Latches and Flip-Flops",
        description: "SR, D, JK, and T storage elements",
        href: "/subjects/modern-computer-architecture#workspace",
        keywords: ["latch", "flip flop", "sr", "d flip flop", "jk", "t flip flop"],
        icon: BookOpen,
      },
      {
        title: "Registers and Shift Registers",
        description: "Parallel storage, loading, and serial shifting",
        href: "/subjects/modern-computer-architecture#workspace",
        keywords: ["register", "shift register", "siso", "sipo", "piso", "pipo"],
        icon: BookOpen,
      },
      {
        title: "Memory Organization",
        description: "RAM, ROM, addressing, capacity, and chip expansion",
        href: "/subjects/modern-computer-architecture#workspace",
        keywords: ["memory", "ram", "rom", "address line", "memory chip", "capacity"],
        icon: BookOpen,
      },
      {
        title: "Program Counter",
        description: "Instruction address, increment, load, and reset",
        href: "/subjects/modern-computer-architecture#workspace",
        keywords: ["program counter", "pc", "instruction fetch", "increment", "jump"],
        icon: BookOpen,
      },
      {
        title: "Stored-Program Model and Hack Computer",
        description: "Hack platform, separate memories, and memory-mapped I/O",
        href: "/subjects/modern-computer-architecture#workspace",
        keywords: ["hack computer", "stored program", "harvard", "rom32k", "screen", "keyboard"],
        icon: BookOpen,
      },
      {
        title: "Hack CPU Datapath",
        description: "A, D, M, ALU, memory interface, and PC",
        href: "/subjects/modern-computer-architecture#workspace",
        keywords: ["hack cpu", "datapath", "a register", "d register", "ram a", "outm", "writem"],
        icon: BookOpen,
      },
      {
        title: "Hack Instruction Formats",
        description: "A-instruction and C-instruction machine-code formats",
        href: "/subjects/modern-computer-architecture#workspace",
        keywords: ["hack instruction", "a instruction", "c instruction", "machine code", "111"],
        icon: BookOpen,
      },
      {
        title: "C-Instruction Control and Execution",
        description: "ALU controls, destinations, flags, and jump codes",
        href: "/subjects/modern-computer-architecture#workspace",
        keywords: ["comp bits", "dest bits", "jump bits", "zx", "nx", "zr", "ng"],
        icon: BookOpen,
      },
      {
        title: "Hack Assembly Programming",
        description: "Symbols, RAM access, branches, and loops",
        href: "/subjects/modern-computer-architecture#workspace",
        keywords: ["hack assembly", "assembler", "labels", "variables", "loop", "r0"],
        icon: BookOpen,
      },
      {
        title: "CPU Limitations and Performance",
        description: "CPU time, CPI, latency, throughput, and speedup",
        href: "/subjects/modern-computer-architecture#workspace",
        keywords: ["cpu performance", "cpi", "clock rate", "latency", "throughput", "speedup"],
        icon: BookOpen,
      },
      {
        title: "Polling, Interrupts, and I/O Handling",
        description: "Polling cost, interrupt flow, context, and ISR",
        href: "/subjects/modern-computer-architecture#workspace",
        keywords: ["polling", "interrupt", "isr", "context switch", "interrupt latency", "io"],
        icon: BookOpen,
      },
      {
        title: "Stack, Function Calls, and Recursion",
        description: "Stack frames, calling conventions, and recursive calls",
        href: "/subjects/modern-computer-architecture#workspace",
        keywords: ["call stack", "stack frame", "function call", "recursion", "sp", "ra"],
        icon: BookOpen,
      },
      {
        title: "Instruction Set Architecture: RISC and CISC",
        description: "ISA contract, load-store design, RISC, and CISC",
        href: "/subjects/modern-computer-architecture#workspace",
        keywords: ["isa", "risc", "cisc", "load store", "microarchitecture", "risc v"],
        icon: BookOpen,
      },
      {
        title: "MIPS Architecture and Basic Assembly",
        description: "MIPS registers, R-I-J formats, assembly, and encoding",
        href: "/subjects/modern-computer-architecture#workspace",
        keywords: ["mips", "r type", "i type", "j type", "mips assembly", "branch offset"],
        icon: BookOpen,
      },
      {
        title: "Single-Cycle and Multi-Cycle Processors",
        description: "Processor timing, CPI, and execution-time comparison",
        href: "/subjects/modern-computer-architecture#workspace",
        keywords: ["single cycle", "multi cycle", "datapath", "average cpi"],
        icon: BookOpen,
      },
      {
        title: "Five-Stage Instruction Pipeline",
        description: "IF, ID, EX, MEM, WB, pipeline speedup, and efficiency",
        href: "/subjects/modern-computer-architecture#workspace",
        keywords: ["pipeline", "if id ex mem wb", "pipeline speedup"],
        icon: BookOpen,
      },
      {
        title: "Data Hazards and Forwarding",
        description: "RAW, WAR, WAW, bypassing, bubbles, and load-use stalls",
        href: "/subjects/modern-computer-architecture#workspace",
        keywords: ["data hazard", "forwarding", "raw", "war", "waw", "load use"],
        icon: BookOpen,
      },
      {
        title: "Control and Structural Hazards",
        description: "Branch prediction, flushing, penalties, and resource conflicts",
        href: "/subjects/modern-computer-architecture#workspace",
        keywords: ["control hazard", "structural hazard", "branch prediction", "flush"],
        icon: BookOpen,
      },
      {
        title: "Superscalar and Out-of-Order Execution",
        description: "Multiple issue, register renaming, ROB, and retirement",
        href: "/subjects/modern-computer-architecture#workspace",
        keywords: ["superscalar", "out of order", "register renaming", "reorder buffer", "rob"],
        icon: BookOpen,
      },
      {
        title: "Memory Hierarchy, Cache, and Virtual Memory",
        description: "Locality, cache mapping, AMAT, TLBs, pages, and page faults",
        href: "/subjects/modern-computer-architecture#workspace",
        keywords: ["cache", "memory hierarchy", "amat", "tag index offset", "locality", "virtual memory", "tlb", "page fault"],
        icon: BookOpen,
      },
      {
        title: "SIMD, SIMT, and GPU Architecture",
        description: "Warps, divergence, coalescing, and CPU-GPU comparison",
        href: "/subjects/modern-computer-architecture#workspace",
        keywords: ["simd", "simt", "gpu", "warp", "divergence", "coalescing", "vector alu", "arithmetic intensity"],
        icon: BookOpen,
      },
    ],
  },
  {
    label: "Computer Networks",
    items: [
      {
        title: "Networking Foundations",
        description: "Computer Networks fundamentals",
        href: "/subjects/computer-networks#workspace",
        keywords: ["computer networks", "networking", "cn", "lan", "wan"],
        icon: BookOpen,
      },
      {
        title: "OSI and TCP/IP Models",
        description: "Layers and protocol responsibilities",
        href: "/subjects/computer-networks#workspace",
        keywords: ["osi", "tcp ip", "layers", "protocol stack"],
        icon: BookOpen,
      },
      {
        title: "Encapsulation and Packet Journey",
        description: "Segments, packets, frames, and addresses",
        href: "/subjects/computer-networks#workspace",
        keywords: ["encapsulation", "packet", "frame", "mac", "ip", "port"],
        icon: BookOpen,
      },
      {
        title: "Network Topologies and Devices",
        description: "Topologies, switches, routers, and hubs",
        href: "/subjects/computer-networks#workspace",
        keywords: ["topology", "switch", "router", "hub", "mesh", "star"],
        icon: BookOpen,
      },
      {
        title: "DNS and Application Protocols",
        description: "DNS resolution, email, file transfer, and APIs",
        href: "/subjects/computer-networks#workspace",
        keywords: ["dns", "smtp", "imap", "pop3", "ftp", "ssh", "api"],
        icon: BookOpen,
      },
      {
        title: "HTTP, HTTPS, and HTTP Versions",
        description: "Web messages, TLS, HTTP/2, HTTP/3, and QUIC",
        href: "/subjects/computer-networks#workspace",
        keywords: ["http", "https", "tls", "quic", "grpc", "status code"],
        icon: BookOpen,
      },
      {
        title: "CDN and Web Caching",
        description: "Edge delivery, cache control, and hit-ratio numericals",
        href: "/subjects/computer-networks#workspace",
        keywords: ["cdn", "cache", "etag", "max-age", "hit ratio"],
        icon: BookOpen,
      },
      {
        title: "TCP, UDP, Ports, and Sockets",
        description: "Transport services, headers, checksums, and endpoints",
        href: "/subjects/computer-networks#workspace",
        keywords: ["tcp", "udp", "port", "socket", "checksum"],
        icon: BookOpen,
      },
      {
        title: "TCP Reliability and Flow Control",
        description: "Handshake, ACKs, sliding windows, and ARQ",
        href: "/subjects/computer-networks#workspace",
        keywords: [
          "syn",
          "ack",
          "fin",
          "sliding window",
          "go back n",
          "selective repeat",
        ],
        icon: BookOpen,
      },
      {
        title: "Congestion Control and Network Delay",
        description: "Slow start, CUBIC, RTT, BDP, and delay numericals",
        href: "/subjects/computer-networks#workspace",
        keywords: [
          "cwnd",
          "slow start",
          "cubic",
          "rtt",
          "bandwidth delay",
          "propagation",
        ],
        icon: BookOpen,
      },
      {
        title: "IPv4, IPv6, and Subnetting",
        description: "CIDR, VLSM, private ranges, NAT, and PAT",
        href: "/subjects/computer-networks#workspace",
        keywords: ["ipv4", "ipv6", "subnet", "cidr", "vlsm", "nat", "pat"],
        icon: BookOpen,
      },
      {
        title: "IP Datagrams and ICMP",
        description: "Fragmentation, ping, traceroute, and diagnostics",
        href: "/subjects/computer-networks#workspace",
        keywords: [
          "ip header",
          "icmp",
          "fragmentation",
          "ping",
          "traceroute",
          "mtu",
        ],
        icon: BookOpen,
      },
      {
        title: "Router Forwarding and Dynamic Routing",
        description:
          "Longest-prefix match, RIP, OSPF, BGP, and path algorithms",
        href: "/subjects/computer-networks#workspace",
        keywords: [
          "routing",
          "longest prefix",
          "rip",
          "ospf",
          "bgp",
          "dijkstra",
          "bellman ford",
        ],
        icon: BookOpen,
      },
      {
        title: "Ethernet Frames and MAC Switching",
        description: "Frame fields, MAC learning, VLANs, and LAN domains",
        href: "/subjects/computer-networks#workspace",
        keywords: [
          "data link",
          "ethernet",
          "mac address",
          "switching",
          "vlan",
          "collision domain",
          "broadcast domain",
        ],
        icon: BookOpen,
      },
      {
        title: "ARP and DHCP",
        description: "Local address resolution, DORA, leases, and relays",
        href: "/subjects/computer-networks#workspace",
        keywords: [
          "arp",
          "arp spoofing",
          "dhcp",
          "dora",
          "lease",
          "dhcp relay",
        ],
        icon: BookOpen,
      },
      {
        title: "Framing, Bit Stuffing, and CRC",
        description: "Frame boundaries, stuffing, and CRC numericals",
        href: "/subjects/computer-networks#workspace",
        keywords: [
          "framing",
          "byte stuffing",
          "bit stuffing",
          "crc",
          "error detection",
        ],
        icon: BookOpen,
      },
      {
        title: "Wi-Fi Architecture and Generations",
        description: "802.11, access points, BSS, ESS, roaming, and Wi-Fi generations",
        href: "/subjects/computer-networks#workspace",
        keywords: [
          "wifi",
          "802.11",
          "access point",
          "ssid",
          "bssid",
          "bss",
          "ess",
          "roaming",
        ],
        icon: BookOpen,
      },
      {
        title: "MIMO, OFDM, and OFDMA",
        description: "Spatial streams, beamforming, subcarriers, and wireless capacity",
        href: "/subjects/computer-networks#workspace",
        keywords: [
          "siso",
          "mimo",
          "mu mimo",
          "beamforming",
          "ofdm",
          "ofdma",
          "qam",
        ],
        icon: BookOpen,
      },
      {
        title: "Wi-Fi Channels and Security",
        description: "CSMA/CA, bands, channels, WPA2, WPA3, and wireless threats",
        href: "/subjects/computer-networks#workspace",
        keywords: [
          "csma ca",
          "rts cts",
          "hidden node",
          "2.4 ghz",
          "5 ghz",
          "6 ghz",
          "wep",
          "wpa2",
          "wpa3",
        ],
        icon: BookOpen,
      },
      {
        title: "Transmission Media and Channel Capacity",
        description: "Copper, fiber, noise, decibels, Nyquist, and Shannon numericals",
        href: "/subjects/computer-networks#workspace",
        keywords: [
          "transmission media",
          "twisted pair",
          "coax",
          "fiber",
          "snr",
          "decibel",
          "nyquist",
          "shannon",
        ],
        icon: BookOpen,
      },
      {
        title: "Network Security and Firewalls",
        description: "Defense in depth, DMZs, ACL rules, stateful inspection, proxies, and NGFW",
        href: "/subjects/computer-networks#workspace",
        keywords: [
          "network security",
          "firewall",
          "acl",
          "stateful",
          "stateless",
          "proxy firewall",
          "ngfw",
          "dmz",
          "zero trust",
        ],
        icon: BookOpen,
      },
      {
        title: "IDS and IPS",
        description: "Detection methods, sensor placement, false positives, precision, and recall",
        href: "/subjects/computer-networks#workspace",
        keywords: [
          "ids",
          "ips",
          "nids",
          "hids",
          "signature detection",
          "anomaly detection",
          "false positive",
          "false negative",
        ],
        icon: BookOpen,
      },
      {
        title: "VPN Tunneling and Deployment",
        description: "Remote access, site-to-site, split tunneling, routes, DNS, and MTU",
        href: "/subjects/computer-networks#workspace",
        keywords: [
          "vpn",
          "tunnel",
          "remote access",
          "site to site",
          "split tunnel",
          "full tunnel",
          "vpn mtu",
        ],
        icon: BookOpen,
      },
      {
        title: "IPsec, OpenVPN, and WireGuard",
        description: "IKEv2, ESP, NAT traversal, tunnel modes, and modern VPN protocols",
        href: "/subjects/computer-networks#workspace",
        keywords: [
          "ipsec",
          "ikev2",
          "esp",
          "nat t",
          "openvpn",
          "wireguard",
          "l2tp",
          "security association",
        ],
        icon: BookOpen,
      },
    ],
  },
  {
    label: "WebDev",
    items: [
      {
        title: "Useful websites",
        description:
          "Documentation, testing tools, design assets, and utilities",
        href: "/webdev?tab=websites",
        keywords: ["webdev", "websites", "tools", "resources"],
        icon: Code2,
      },
      {
        title: "Project ideas",
        description: "Projects grouped by skill, stack, and difficulty",
        href: "/webdev?tab=projects",
        keywords: ["webdev", "projects", "portfolio", "build"],
        icon: Code2,
      },
      {
        title: "Component libraries",
        description: "Reusable interface components and design systems",
        href: "/webdev?tab=libraries",
        keywords: ["webdev", "components", "ui", "libraries"],
        icon: Code2,
      },
      {
        title: "Curated collections",
        description: "Selected setup, deployment, and development guides",
        href: "/webdev?tab=guides",
        keywords: ["webdev", "collections", "guides", "deployment"],
        icon: Code2,
      },
      {
        title: "Skills.md",
        description: "Reusable instructions for Claude and Codex",
        href: "/webdev?tab=skills",
        keywords: ["webdev", "skills", "claude", "codex", "agents"],
        icon: Code2,
      },
    ],
  },
  {
    label: "Interview Questions",
    items: [
      {
        title: "Behavioral interview questions",
        description: "Build natural answers from real software engineering experience",
        href: "/interview-questions/behavioral",
        keywords: [
          "behavioral",
          "hr interview",
          "tell me about yourself",
          "star method",
          "leadership",
          "conflict",
        ],
        icon: BookOpen,
      },
      {
        title: "Operating system interview questions",
        description: "Review OS fundamentals with concise interview-style answers",
        href: "/interview-questions/operating-systems",
        keywords: [
          "operating system",
          "os interview",
          "process",
          "thread",
          "scheduling",
          "deadlock",
          "virtual memory",
        ],
        icon: BookOpen,
      },
      {
        title: "Computer networks interview questions",
        description: "Review networking concepts with concise interview-style answers",
        href: "/interview-questions/computer-networks",
        keywords: [
          "computer networks",
          "cn interview",
          "tcp",
          "udp",
          "http",
          "dns",
          "routing",
          "subnetting",
        ],
        icon: BookOpen,
      },
      {
        title: "OOP interview questions",
        description: "Review object-oriented design with concise interview-style answers",
        href: "/interview-questions/oop",
        keywords: [
          "oop",
          "object oriented programming",
          "inheritance",
          "polymorphism",
          "encapsulation",
          "solid",
          "design patterns",
        ],
        icon: BookOpen,
      },
      {
        title: "DBMS interview questions",
        description: "Review databases and SQL with concise interview-style answers",
        href: "/interview-questions/dbms",
        keywords: [
          "dbms",
          "database",
          "sql",
          "normalization",
          "transactions",
          "indexing",
          "joins",
        ],
        icon: BookOpen,
      },
      {
        title: "HTML interview questions",
        description: "Practice with visible answers or test your recall",
        href: "/interview-questions/html",
        keywords: ["html", "interview", "questions", "practice", "test"],
        icon: Code2,
      },
      {
        title: "CSS interview questions",
        description:
          "Review layout, selectors, responsive CSS, and the cascade",
        href: "/interview-questions/css",
        keywords: ["css", "interview", "questions", "layout", "responsive"],
        icon: Code2,
      },
      {
        title: "React interview questions",
        description: "Review components, hooks, state, rendering, and React 19",
        href: "/interview-questions/react",
        keywords: ["react", "interview", "questions", "hooks", "components"],
        icon: Code2,
      },
    ],
  },
  {
    label: "DSA",
    items: [
      {
        title: "DSA Preparation",
        description:
          "Choose a trusted sheet for learning, interviews or revision",
        href: "/dsa",
        keywords: [
          "algorithms",
          "data structures",
          "leetcode",
          "striver",
          "sheet",
        ],
        icon: Braces,
      },
    ],
  },
  {
    label: "Roadmaps",
    items: [
      {
        title: "Frontend roadmap",
        description: "Web foundations, JavaScript, React, and UI interviews",
        href: "/roadmaps",
        keywords: ["roadmap", "frontend", "react", "javascript"],
        icon: Route,
      },
      {
        title: "Backend roadmap",
        description: "APIs, databases, systems, and backend interviews",
        href: "/roadmaps",
        keywords: ["roadmap", "backend", "api", "databases"],
        icon: Route,
      },
      {
        title: "DSA Practice roadmap",
        description: "Patterns, problem solving, and structured revision",
        href: "/roadmaps",
        keywords: ["roadmap", "dsa", "algorithms", "practice"],
        icon: Route,
      },
    ],
  },
];

const subjectShortcuts: SearchItem[] = [
  {
    title: "Database Systems",
    description: "Structured database notes and revision",
    href: "/subjects/dbms",
    keywords: ["dbms", "database management system", "database systems"],
    icon: BookOpen,
  },
  {
    title: "Object-Oriented Programming",
    description: "Classes, objects, design principles, and patterns",
    href: "/subjects/oop",
    keywords: ["oop", "oops", "object oriented programming"],
    icon: BookOpen,
  },
  {
    title: "Data Structures and Algorithms",
    description: "Coming soon",
    href: "/subjects/dsa-theory",
    keywords: ["dsa", "dsa theory", "data structures", "algorithms"],
    icon: BookOpen,
  },
  {
    title: "System Design",
    description: "Coming soon",
    href: "/subjects/system-design",
    keywords: ["system design"],
    icon: BookOpen,
  },
  {
    title: "Web Fundamentals",
    description: "Coming soon",
    href: "/subjects/web-fundamentals",
    keywords: ["web fundamentals"],
    icon: BookOpen,
  },
];

export function CommandSearch({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const matchedSubjectShortcuts = normalizedQuery
    ? subjectShortcuts.filter((subject) =>
        subject.keywords.some(
          (keyword) =>
            normalizedQuery === keyword || normalizedQuery.includes(keyword),
        ),
      )
    : [];
  const visibleGroups = matchedSubjectShortcuts.length
    ? [
        ...searchGroups,
        { label: "Subjects", items: matchedSubjectShortcuts },
      ]
    : searchGroups;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) setQuery("");
    onOpenChange(nextOpen);
  };

  const openResult = (href: string) => {
    setQuery("");
    onOpenChange(false);
    router.push(href);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[100] min-h-dvh bg-black/55 backdrop-blur-[3px] transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute" />
        <Dialog.Viewport className="fixed inset-0 z-[101] flex items-start justify-center overflow-y-auto px-3 pb-8 pt-[10vh] sm:px-6 sm:pt-[16vh]">
          <Dialog.Popup
            id="preploom-command-search"
            className="w-full max-w-[600px] overflow-hidden rounded-2xl border border-black/10 bg-white font-[family-name:var(--font-inter)] text-black shadow-[0_30px_100px_rgba(0,0,0,0.3)] transition-[scale,opacity] duration-150 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0 dark:border-white/[0.12] dark:bg-[#080808] dark:text-white"
          >
            <Dialog.Title className="sr-only">Search PrepLoom</Dialog.Title>
            <Dialog.Description className="sr-only">
              Search subjects, topics, interview questions, roadmaps and
              development resources.
            </Dialog.Description>

            <Command label="PrepLoom search" className="flex min-h-0 flex-col">
              <div className="flex h-14 items-center gap-3 border-b border-black/10 px-4 dark:border-white/10 sm:h-16 sm:px-5">
                <Search
                  aria-hidden="true"
                  className="size-5 shrink-0 text-[#7C7C7C]"
                />
                <Command.Input
                  autoFocus
                  value={query}
                  onValueChange={setQuery}
                  placeholder="Search subjects, topics, questions..."
                  className="h-full min-w-0 flex-1 bg-transparent text-[15px] font-normal outline-none placeholder:text-[#7C7C7C] sm:text-base"
                />
                <Dialog.Close
                  className="grid size-8 shrink-0 place-items-center rounded-lg text-[#7C7C7C] transition-colors hover:bg-black/[0.06] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50 dark:hover:bg-white/[0.07] dark:hover:text-white dark:focus-visible:ring-white/60"
                  aria-label="Close search"
                >
                  <X aria-hidden="true" className="size-[18px]" />
                </Dialog.Close>
              </div>

              <Command.List className="max-h-[min(55vh,400px)] overflow-y-auto overscroll-contain p-2 sm:p-3">
                <Command.Empty className="px-5 py-14 text-center">
                  <Search
                    aria-hidden="true"
                    className="mx-auto mb-3 size-6 text-[#7C7C7C]"
                  />
                  <p className="text-sm font-medium">No results found</p>
                  <p className="mt-1 text-xs text-[#7C7C7C]">
                    Try a subject, topic, question, or roadmap.
                  </p>
                </Command.Empty>

                {visibleGroups.map((group) => (
                  <Command.Group
                    key={group.label}
                    heading={group.label}
                    className="mb-2 overflow-hidden text-black last:mb-0 dark:text-white [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.14em] [&_[cmdk-group-heading]]:text-[#7C7C7C]"
                  >
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Command.Item
                          key={`${group.label}:${item.title}`}
                          value={`${item.title} ${item.description}`}
                          keywords={item.keywords}
                          onSelect={() => openResult(item.href)}
                          className="group flex cursor-default select-none items-center gap-3 rounded-xl px-3 py-2.5 outline-none data-[selected=true]:bg-black/[0.07] data-[selected=true]:text-black dark:data-[selected=true]:bg-white/[0.1] dark:data-[selected=true]:text-white"
                        >
                          <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-black/10 bg-black/[0.03] text-[#7C7C7C] group-data-[selected=true]:bg-black/[0.05] group-data-[selected=true]:text-black dark:border-white/10 dark:bg-white/[0.04] dark:group-data-[selected=true]:bg-white/[0.08] dark:group-data-[selected=true]:text-white">
                            <Icon aria-hidden="true" className="size-[17px]" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium">
                              {item.title}
                            </span>
                            <span className="mt-0.5 block truncate text-xs text-[#7C7C7C] group-data-[selected=true]:text-black/60 dark:group-data-[selected=true]:text-white/60">
                              {item.description}
                            </span>
                          </span>
                          <ArrowRight
                            aria-hidden="true"
                            className="size-4 shrink-0 -translate-x-1 text-[#7C7C7C] opacity-0 transition-[opacity,transform] group-data-[selected=true]:translate-x-0 group-data-[selected=true]:text-current group-data-[selected=true]:opacity-100"
                          />
                        </Command.Item>
                      );
                    })}
                  </Command.Group>
                ))}
              </Command.List>

              <div className="hidden h-10 items-center justify-between border-t border-black/10 px-5 text-[11px] text-[#7C7C7C] dark:border-white/10 sm:flex">
                <span>Search across all PrepLoom resources</span>
                <span className="flex items-center gap-3">
                  <span>↑↓ Navigate</span>
                  <span>↵ Open</span>
                  <span>Esc Close</span>
                </span>
              </div>
            </Command>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
