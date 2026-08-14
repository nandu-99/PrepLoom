import type { SubjectTopic } from "@/lib/subject-content";

export const ipv4AddressingAndSubnetting: SubjectTopic = {
  slug: "ipv4-addressing-and-subnetting",
  title: "IPv4 Addressing and Subnetting",
  description:
    "Read IPv4 addresses, masks, and CIDR prefixes, then calculate networks, broadcasts, hosts, subnets, and VLSM allocations.",
  readTime: "24 min",
  difficulty: "Intermediate",
  tags: ["IPv4", "Subnetting", "CIDR"],
  learn: {
    opening:
      "An IPv4 address contains 32 bits. A CIDR prefix tells us how many leading bits identify the network; the remaining bits identify addresses inside that network.",
    sections: [
      {
        title: "Address, Prefix, and Mask",
        paragraphs: [
          "IPv4 is written as four decimal octets, each representing eight bits. In 192.168.10.34/24, the first 24 bits form the network prefix and the last 8 bits vary inside that network.",
          "A subnet mask writes the same boundary in dotted decimal. Prefix /24 equals 255.255.255.0, /26 equals 255.255.255.192, and /30 equals 255.255.255.252.",
        ],
        dataTable: {
          headers: ["Prefix", "Mask", "Addresses", "Traditional usable hosts"],
          rows: [
            ["/24", "255.255.255.0", "256", "254"],
            ["/25", "255.255.255.128", "128", "126"],
            ["/26", "255.255.255.192", "64", "62"],
            ["/27", "255.255.255.224", "32", "30"],
            ["/28", "255.255.255.240", "16", "14"],
            ["/30", "255.255.255.252", "4", "2"],
          ],
        },
      },
      {
        title: "Network, Broadcast, and Host Range",
        paragraphs: [
          "The network address has all host bits zero. The directed broadcast address has all host bits one. Traditional subnet questions reserve both, so usable hosts = 2^h - 2, where h is the number of host bits.",
          "For 192.168.10.70/26, the block size is 256 - 192 = 64. The address lies in the 64-127 block. Network = 192.168.10.64, broadcast = 192.168.10.127, and usable hosts = .65 through .126.",
        ],
      },
      {
        title: "Binary AND Method",
        paragraphs: [
          "A reliable way to find the network address is to apply bitwise AND between every address bit and mask bit. A result bit is 1 only when both input bits are 1.",
          "For 192.168.10.70/26, the last address octet is 01000110 and the /26 mask's last octet is 11000000. AND gives 01000000, which is decimal 64. Therefore, the network is 192.168.10.64/26.",
        ],
        dataTable: {
          headers: ["Value", "Last octet in binary", "Decimal"],
          rows: [
            ["IP address", "01000110", "70"],
            ["Subnet mask", "11000000", "192"],
            ["AND result", "01000000", "64"],
          ],
        },
      },
      {
        title: "Dividing a Network into Equal Subnets",
        paragraphs: [
          "Borrowing b host bits produces 2^b equal subnets. Moving from /24 to /26 borrows two bits, producing four /26 networks with 64 addresses each.",
        ],
        visual: {
          src: "/notes/computer-networks/ipv4-subnetting.png",
          alt: "The IPv4 network 192.168.1.0/24 divided into four equal /26 subnets",
          width: 1536,
          height: 1024,
          caption:
            "Two borrowed bits create four equal /26 blocks, each containing 64 addresses.",
        },
      },
      {
        title: "CIDR and Route Aggregation",
        paragraphs: [
          "CIDR replaced classful allocation with variable-length prefixes. A shorter prefix represents a larger address block. Route aggregation advertises one common prefix for several contiguous, correctly aligned networks.",
          "For example, 192.168.0.0/24 through 192.168.3.0/24 can be summarized as 192.168.0.0/22. A summary must not claim unrelated address space by mistake.",
          "To calculate a summary, write the network addresses in binary and count identical leading bits. The third octets 0, 1, 2, and 3 share their first six bits. With the first 16 address bits, that gives 16 + 6 = /22.",
        ],
      },
      {
        title: "VLSM Allocation Numerical",
        paragraphs: [
          "Variable Length Subnet Masking assigns different prefix sizes based on need. Allocate largest requirements first. From 10.0.0.0/24, a 100-host LAN needs /25, a 50-host LAN needs /26, and a 20-host LAN needs /27.",
          "One valid allocation is 10.0.0.0/25, 10.0.0.128/26, and 10.0.0.192/27. The remaining 10.0.0.224/27 can be reserved or divided further.",
        ],
        dataTable: {
          headers: ["LAN need", "Allocated subnet", "Usable range", "Broadcast"],
          rows: [
            ["100 hosts", "10.0.0.0/25", "10.0.0.1-10.0.0.126", "10.0.0.127"],
            ["50 hosts", "10.0.0.128/26", "10.0.0.129-10.0.0.190", "10.0.0.191"],
            ["20 hosts", "10.0.0.192/27", "10.0.0.193-10.0.0.222", "10.0.0.223"],
            ["Unused", "10.0.0.224/27", "10.0.0.225-10.0.0.254", "10.0.0.255"],
          ],
        },
      },
      {
        title: "Classful History and Special Ranges",
        paragraphs: [
          "Older classful networking used default boundaries: Class A /8, Class B /16, and Class C /24. Modern routing uses CIDR, but class ranges still appear in exams. Class D was multicast and Class E was reserved or experimental.",
        ],
        dataTable: {
          headers: ["Range", "Default class or purpose"],
          rows: [
            ["1.0.0.0-126.255.255.255", "Class A, default /8"],
            ["128.0.0.0-191.255.255.255", "Class B, default /16"],
            ["192.0.0.0-223.255.255.255", "Class C, default /24"],
            ["10.0.0.0/8", "Private IPv4"],
            ["172.16.0.0/12", "Private IPv4"],
            ["192.168.0.0/16", "Private IPv4"],
            ["127.0.0.0/8", "Loopback"],
            ["169.254.0.0/16", "IPv4 link-local"],
            ["224.0.0.0/4", "IPv4 multicast"],
          ],
        },
      },
      {
        title: "Special Prefixes: /31 and /32",
        paragraphs: [
          "The usual 2^h - 2 host formula is an exam convention for ordinary multi-access subnets. A /31 has two addresses and is commonly used on a point-to-point link, where both endpoints can be used under modern standards. It does not need a separate network and broadcast address.",
          "A /32 names exactly one IPv4 address. Routers use /32 host routes for loopbacks, specific endpoints, and policy entries. Always follow the wording of the question if it assumes traditional subnet rules.",
        ],
      },
    ],
    mechanism: {
      title: "How to solve an IPv4 subnet question",
      steps: [
        "Convert the prefix to host-bit count h = 32 - prefix.",
        "Calculate block size or apply the subnet mask with bitwise AND.",
        "Find the aligned block containing the given address.",
        "Set host bits to zero for the network and one for the broadcast.",
        "State the usable range and host count, then verify boundaries.",
      ],
    },
    example: {
      title: "Finding a prefix for 50 hosts",
      body: "Choose the smallest h where 2^h - 2 is at least 50. Five host bits give 30, which is too small; six give 62. The required prefix is 32 - 6 = /26.",
    },
    misconception:
      "A /24 is not automatically a Class C network in modern routing. /24 is a CIDR prefix length and can occur anywhere in IPv4 space.",
  },
  revise: {
    definition:
      "IPv4 subnetting divides a 32-bit address into a network prefix and host part using a CIDR length or mask.",
    sections: [
      {
        title: "Core Formulas",
        points: [
          "Host bits h = 32 - prefix.",
          "Addresses per subnet = 2^h.",
          "Traditional usable hosts = 2^h - 2.",
          "Borrow b bits to create 2^b equal subnets.",
        ],
      },
    ],
    essentials: [
      "Network has all host bits zero; broadcast has all host bits one.",
      "CIDR supports classless allocation and route aggregation.",
      "VLSM allocates the largest requirement first.",
      "Private IPv4 blocks are 10/8, 172.16/12, and 192.168/16.",
      "Longer prefix means a smaller address block.",
      "/31 is useful for point-to-point links; /32 identifies one address.",
    ],
    comparisonTitle: "FLSM vs VLSM",
    comparison: {
      left: {
        label: "FLSM",
        points: [
          "Equal prefix for every subnet",
          "Simple planning",
          "Can waste addresses",
        ],
      },
      right: {
        label: "VLSM",
        points: [
          "Different prefix sizes",
          "Fits actual requirements",
          "Needs careful allocation",
        ],
      },
    },
    followUp:
      "What are the network, broadcast, and usable range for 172.16.5.200/27?",
  },
  lastMinute: {
    definition:
      "Prefix bits name the network; remaining bits select addresses inside it.",
    memoryLine: "Longer prefix, fewer addresses, smaller subnet.",
    cues: [
      "/24: 256 addresses. /26: 64. /27: 32. /30: 4.",
      "Block size in an interesting octet = 256 - mask value.",
      "For 50 hosts, choose /26.",
      "Allocate VLSM from largest to smallest.",
    ],
    trap: "Do not subtract two blindly for every special prefix; /31 and /32 have specific modern uses.",
  },
};

export const ipv6NatAndAddressDelivery: SubjectTopic = {
  slug: "ipv6-nat-and-address-delivery",
  title: "IPv6, NAT, and Address Delivery",
  description:
    "Understand IPv6 representation and address types, then compare private IPv4, NAT, PAT, and basic automatic configuration.",
  readTime: "18 min",
  difficulty: "Intermediate",
  tags: ["IPv6", "NAT", "PAT"],
  learn: {
    opening:
      "IPv6 expands addresses to 128 bits and redesigns several network-layer behaviors. NAT remains common in IPv4 networks, where private endpoints share or map to public addresses.",
    sections: [
      {
        title: "IPv6 Format and Shortening",
        paragraphs: [
          "An IPv6 address contains eight 16-bit hexadecimal groups. Leading zeros inside a group may be removed. One longest consecutive run of all-zero groups may be replaced by ::, but :: can appear only once because expansion must remain unambiguous.",
          "2001:0db8:0000:0000:0000:0000:1428:57ab shortens to 2001:db8::1428:57ab.",
        ],
      },
      {
        title: "IPv6 Prefixes and /64 Subnets",
        paragraphs: [
          "IPv6 uses prefix lengths just like CIDR. In a common 2001:db8:1200:34::/64 subnet, the first 64 bits identify the subnet and the remaining 64 bits form the interface identifier.",
          "A /48 site prefix contains 65,536 separate /64 subnets because 16 bits remain for subnet IDs. IPv6 planning normally gives a /64 to an ordinary LAN instead of making tiny subnets to conserve addresses.",
        ],
        dataTable: {
          headers: ["Prefix", "Typical meaning", "Number of /64 subnets"],
          rows: [
            ["/48", "Common site allocation", "65,536"],
            ["/56", "Smaller site allocation", "256"],
            ["/64", "Ordinary LAN subnet", "1"],
            ["/128", "One IPv6 address", "Not a subnet allocation"],
          ],
        },
      },
      {
        title: "Important IPv6 Address Types",
        paragraphs: [
          "IPv6 does not use broadcast. It uses unicast, multicast, and anycast. Neighbor Discovery uses ICMPv6 multicast for local discovery instead of IPv4 ARP broadcasts.",
        ],
        dataTable: {
          headers: ["Prefix or type", "Purpose"],
          rows: [
            ["Global unicast", "Publicly routable unicast addressing"],
            ["fe80::/10", "Link-local communication"],
            ["fc00::/7", "Unique local range; locally assigned addresses normally use fd00::/8"],
            ["ff00::/8", "Multicast"],
            ["::1/128", "Loopback"],
            ["::/128", "Unspecified address"],
          ],
        },
      },
      {
        title: "IPv4 and IPv6 Differences",
        paragraphs: [
          "IPv6 is not only a larger IPv4 address. Its base header and local-network behavior were simplified or redesigned, while extension headers carry optional functions.",
        ],
        dataTable: {
          headers: ["Feature", "IPv4", "IPv6"],
          rows: [
            ["Address size", "32 bits", "128 bits"],
            [
              "Header",
              "Variable, minimum 20 bytes",
              "Fixed 40-byte base header",
            ],
            ["Broadcast", "Supported", "Not used"],
            [
              "Router fragmentation",
              "May occur when allowed",
              "Routers do not fragment forwarded packets",
            ],
            ["Header checksum", "Present", "Not in base header"],
            ["Local resolution", "ARP", "Neighbor Discovery using ICMPv6"],
          ],
        },
      },
      {
        title: "NAT and PAT",
        paragraphs: [
          "Network Address Translation changes address information between address realms. Static NAT keeps a fixed one-to-one mapping. Dynamic NAT chooses from a public pool. PAT, also called NAT overload, lets many private connections share one public address by translating transport ports.",
        ],
        dataTable: {
          headers: ["Inside endpoint", "Translated endpoint"],
          rows: [
            ["192.168.1.10:51000", "203.0.113.5:40001"],
            ["192.168.1.11:51000", "203.0.113.5:40002"],
          ],
        },
        points: [
          "NAT conserves public IPv4 addresses and changes endpoint visibility.",
          "PAT uses the protocol and port mapping to return replies to the correct host.",
          "NAT breaks simple end-to-end address transparency and can complicate inbound, peer-to-peer, IPsec, and application protocols that carry addresses.",
          "NAT is not a firewall by definition, even though many devices combine both roles.",
        ],
      },
      {
        title: "How Hosts Receive Configuration",
        paragraphs: [
          "An IPv4 host can receive an address, mask, default gateway, DNS servers, and lease information from DHCP. IPv6 hosts can use Router Advertisements for Stateless Address Autoconfiguration, DHCPv6, or both depending on network policy.",
          "With SLAAC, a host first creates a link-local address, checks that it is unique using Duplicate Address Detection, listens for a Router Advertisement, and forms a global address from the advertised prefix. DHCPv6 can provide addresses or other configuration, but the IPv6 default gateway is learned from Router Advertisements.",
          "The full DHCP DORA exchange belongs to the later LAN and Data Link module, where broadcasts, leases, and relays are covered together.",
        ],
      },
      {
        title: "Moving from IPv4 to IPv6",
        paragraphs: [
          "IPv4 and IPv6 are separate protocols, so migration normally happens gradually. Dual stack runs both protocols on the same device. Tunnelling carries one protocol through a network built for the other. Translation allows communication between IPv6-only and IPv4-only endpoints.",
        ],
        dataTable: {
          headers: ["Method", "Main idea"],
          rows: [
            ["Dual stack", "Run IPv4 and IPv6 together"],
            ["Tunnelling", "Encapsulate traffic across an incompatible network"],
            ["Translation", "Convert between IPv4 and IPv6 communication"],
          ],
        },
      },
    ],
    mechanism: {
      title: "How PAT returns a reply",
      steps: [
        "An inside host creates a connection with a private source endpoint.",
        "The NAT device chooses a public address and available translated port.",
        "It stores the inside-to-public mapping and rewrites checksums as needed.",
        "A reply arrives for the translated public endpoint.",
        "The device looks up the mapping and restores the private destination endpoint.",
      ],
    },
    example: {
      title: "Shortening an IPv6 address",
      body: "2001:0db8:0000:0000:00ab:0000:0000:0001 can become 2001:db8::ab:0:0:1. Only one zero run uses ::; the other zero groups use ordinary 0 so the address can be expanded uniquely.",
    },
    misconception:
      "IPv6 does not require NAT to make private-style networks possible. It has large address space, local scopes, and firewall policy without address translation.",
  },
  revise: {
    definition:
      "IPv6 uses 128-bit hexadecimal addresses; NAT translates address realms, while PAT also translates transport ports.",
    sections: [
      {
        title: "IPv6 Shortening",
        points: [
          "Remove leading zeros within each group.",
          "Replace one consecutive zero run with ::.",
          "Use :: at most once.",
        ],
      },
    ],
    essentials: [
      "IPv6 base header is 40 bytes and has no header checksum.",
      "IPv6 uses multicast instead of broadcast.",
      "IPv6 routers do not fragment forwarded packets.",
      "PAT maps many private connections through ports on a public address.",
      "NAT changes addressing; firewall policy decides what traffic is allowed.",
      "SLAAC uses Router Advertisements and Duplicate Address Detection.",
    ],
    comparisonTitle: "NAT vs PAT",
    comparison: {
      left: {
        label: "NAT",
        points: [
          "General address translation",
          "Can be static or dynamic",
          "May use one-to-one mapping",
        ],
      },
      right: {
        label: "PAT",
        points: [
          "Translates ports too",
          "Many-to-one sharing",
          "Tracks transport mappings",
        ],
      },
    },
    followUp: "Why can :: appear only once in a shortened IPv6 address?",
  },
  lastMinute: {
    definition:
      "IPv6 expands address space; PAT lets many IPv4 connections share a public address.",
    memoryLine: "IPv6 shortens zeros; PAT distinguishes flows with ports.",
    cues: [
      "IPv6: 128 bits, eight hexadecimal groups.",
      "fe80::/10 is link-local; ff00::/8 is multicast.",
      "IPv6 has no broadcast and no base-header checksum.",
      "Static NAT: fixed mapping. PAT: many flows share one address.",
    ],
    trap: "Do not describe NAT as a security guarantee or a replacement for firewall rules.",
  },
};

export const ipDatagramsIcmpAndDiagnostics: SubjectTopic = {
  slug: "ip-datagrams-icmp-and-diagnostics",
  title: "IP Datagrams, ICMP, and Diagnostics",
  description:
    "Read the IPv4 packet header, solve fragmentation questions, and understand ICMP, ping, traceroute, and network tools.",
  readTime: "21 min",
  difficulty: "Intermediate",
  tags: ["IPv4 header", "ICMP", "Traceroute"],
  learn: {
    opening:
      "IP provides best-effort packet delivery. Its header carries addressing and forwarding control, while ICMP reports network conditions and supports diagnostics.",
    sections: [
      {
        title: "IPv4 Datagram Fields",
        paragraphs: [
          "An IPv4 datagram contains a header and payload. The minimum header is 20 bytes. Routers primarily inspect the destination address, reduce TTL, update the IPv4 header checksum, and forward using a selected route.",
        ],
        dataTable: {
          headers: ["Field", "Purpose"],
          rows: [
            ["Version and IHL", "IP version and header length"],
            [
              "DSCP and ECN",
              "Service marking and explicit congestion notification",
            ],
            ["Total Length", "Entire datagram size up to 65,535 bytes"],
            [
              "Identification, flags, offset",
              "IPv4 fragmentation and reassembly",
            ],
            ["TTL", "Limits forwarding hops"],
            ["Protocol", "Identifies payload such as ICMP, TCP, or UDP"],
            ["Header checksum", "Detects corruption in the IPv4 header"],
            ["Source and destination", "IPv4 endpoint addresses"],
          ],
        },
      },
      {
        title: "IHL and Header-Length Numerical",
        paragraphs: [
          "The four-bit Internet Header Length field stores the IPv4 header length in 32-bit words. Header bytes = IHL × 4. Therefore, IHL 5 means 20 bytes and IHL 7 means 28 bytes, leaving 8 bytes of options after the standard 20-byte fields.",
          "If Total Length is 1,200 and IHL is 7, the payload length is 1,200 - 28 = 1,172 bytes.",
        ],
      },
      {
        title: "IPv4 Fragmentation Numerical",
        paragraphs: [
          "For a normal fragment, maximum payload = floor((MTU - header bytes) / 8) × 8. Multiples of eight are required because the Fragment Offset field counts 8-byte blocks. The last fragment may carry a payload that is not a multiple of eight.",
          "Suppose a 4,000-byte IPv4 datagram has a 20-byte header and crosses a link with MTU 1,500. Each fragment can carry at most 1,480 payload bytes, which is divisible by eight. The original payload is 3,980 bytes.",
          "Fragments carry 1,480, 1,480, and 1,020 payload bytes. Their total lengths are 1,500, 1,500, and 1,040. Fragment offsets are 0, 185, and 370 because offsets count 8-byte units. MF is 1 on the first two and 0 on the last. Reassembly happens at the destination.",
          "All fragments copy the same Identification value. DF means Do Not Fragment; if DF is set and the packet is too large, an IPv4 router drops it and normally returns an ICMP fragmentation-needed message.",
        ],
      },
      {
        title: "ICMP Messages",
        paragraphs: [
          "Internet Control Message Protocol carries error reports and diagnostic information inside IP. An ICMP error reports a problem; it does not repair the original packet or make IP reliable.",
          "An ICMP Type identifies the broad message, while Code gives a more specific reason. For example, Destination Unreachable has different codes for failures such as an unreachable network, host, or transport port.",
        ],
        dataTable: {
          headers: ["Message", "Meaning"],
          rows: [
            ["Echo Request / Reply", "Reachability and RTT used by ping"],
            ["Destination Unreachable", "Delivery failed for a stated reason"],
            [
              "Time Exceeded",
              "TTL reached zero or fragment reassembly timed out",
            ],
            ["Redirect", "A host may have a better local next hop"],
            ["Packet Too Big in ICMPv6", "Supports IPv6 Path MTU Discovery"],
          ],
        },
      },
      {
        title: "Path MTU Discovery",
        paragraphs: [
          "Path MTU Discovery tries to find the smallest MTU along a path so the sender can avoid fragmentation. In IPv4, the sender commonly sets DF and reduces packet size after an ICMP fragmentation-needed response. In IPv6, routers never fragment forwarded packets, so ICMPv6 Packet Too Big is essential.",
          "Blocking every ICMP message can create an MTU black hole: small packets work, but larger packets fail because the sender never learns the permitted size.",
        ],
      },
      {
        title: "Ping and Traceroute",
        paragraphs: [
          "Ping normally sends ICMP Echo Requests and measures Echo Replies. A failed ping does not prove the host is down because ICMP may be filtered or rate-limited.",
          "Traceroute sends probes with increasing TTL or hop limit. Each router that reduces the value to zero returns an ICMP Time Exceeded message, revealing one hop. The final response depends on the traceroute implementation and probe type.",
        ],
        flow: [
          "Probe with TTL 1 expires at the first router",
          "Probe with TTL 2 expires at the second router",
          "TTL increases until the destination responds",
          "Tool reports each responding hop and measured times",
        ],
      },
      {
        title: "Useful Diagnostic Tools",
        paragraphs: [
          "Tools observe different layers, so a good diagnosis combines them instead of trusting one command.",
        ],
        dataTable: {
          headers: ["Tool", "Main use"],
          rows: [
            ["ping", "ICMP reachability and RTT"],
            ["traceroute / tracert", "Hop-by-hop path clues"],
            ["ip / ipconfig", "Interface and address configuration"],
            ["ip route / route", "Routing table"],
            ["ss / netstat", "Sockets and listening services"],
            ["dig / nslookup", "DNS queries"],
            ["tcpdump / Wireshark", "Packet capture and protocol analysis"],
          ],
        },
      },
    ],
    mechanism: {
      title: "How traceroute finds hops",
      steps: [
        "Send a probe with a small TTL.",
        "Each router reduces TTL before forwarding.",
        "The router where TTL reaches zero discards the packet.",
        "That router returns ICMP Time Exceeded when permitted.",
        "Increase TTL and repeat until the destination is reached.",
      ],
    },
    example: {
      title: "Why ping can fail while a website works",
      body: "A firewall may block ICMP Echo while allowing HTTPS. The browser can still reach TCP port 443 even though ping receives no reply, so test the application service as well as ICMP.",
    },
    misconception:
      "Traceroute does not force every packet to use a fixed path. Load balancing and route changes can make hops vary between probes.",
  },
  revise: {
    definition:
      "IPv4 carries best-effort datagrams; ICMP reports network conditions and powers diagnostics such as ping and traceroute.",
    sections: [
      {
        title: "Fragment Rules",
        points: [
          "Fragment payload except the last is normally a multiple of 8 bytes.",
          "Offset is measured in 8-byte units.",
          "MF is zero only on the last fragment.",
          "IPv4 reassembly occurs at the destination.",
        ],
      },
    ],
    essentials: [
      "TTL is reduced at each router.",
      "IPv4 checksum protects only its header.",
      "Ping uses Echo Request and Reply.",
      "Traceroute depends on TTL expiry and ICMP Time Exceeded.",
      "Missing ICMP replies do not prove the path or host is unavailable.",
      "IHL is counted in 32-bit words; multiply it by four for bytes.",
      "Path MTU Discovery depends on useful ICMP feedback.",
    ],
    comparisonTitle: "Ping vs traceroute",
    comparison: {
      left: {
        label: "Ping",
        points: [
          "Tests Echo response",
          "Measures RTT",
          "Does not list the path",
        ],
      },
      right: {
        label: "Traceroute",
        points: [
          "Uses increasing TTL",
          "Finds responding hops",
          "Path can vary",
        ],
      },
    },
    followUp:
      "Why is a fragment offset divided by eight rather than stored as a byte count?",
  },
  lastMinute: {
    definition:
      "IP forwards best-effort packets; ICMP reports errors and diagnostic information.",
    memoryLine: "Ping echoes; traceroute expires TTL one hop at a time.",
    cues: [
      "Minimum IPv4 header: 20 bytes.",
      "Total Length is 16 bits.",
      "Fragment offset uses 8-byte units.",
      "ICMP error reports a failure; it does not recover the packet.",
    ],
    trap: "Do not say every traceroute implementation sends ICMP Echo; probes may use UDP, ICMP, or TCP.",
  },
};

export const routerForwardingAndRouteSelection: SubjectTopic = {
  slug: "router-forwarding-and-route-selection",
  title: "Router Forwarding and Route Selection",
  description:
    "Understand router data and control planes, forwarding tables, longest-prefix matching, static routes, and traffic delivery types.",
  readTime: "19 min",
  difficulty: "Intermediate",
  tags: ["Router", "Forwarding", "Routing table"],
  learn: {
    opening:
      "Routing decides which paths should exist; forwarding moves each packet through a router using the installed forwarding information.",
    sections: [
      {
        title: "Router Architecture",
        paragraphs: [
          "The control plane runs routing protocols and builds routing information. The data plane performs fast per-packet lookup, switching, queueing, and output transmission.",
        ],
        visual: {
          src: "/notes/computer-networks/router-forwarding.png",
          alt: "A packet passing through router input, longest-prefix forwarding lookup, switching fabric, and output port",
          width: 1536,
          height: 1024,
          caption:
            "The router selects the most specific matching route and moves the packet to the chosen output.",
        },
        dataTable: {
          headers: ["Part", "Main job"],
          rows: [
            ["Input port", "Receives, validates, and classifies packets"],
            [
              "Forwarding table",
              "Maps destination prefixes to next hops or outputs",
            ],
            ["Switching fabric", "Moves a packet across the router"],
            ["Output port", "Queues and transmits packets"],
            ["Routing processor", "Runs control protocols and management"],
          ],
        },
      },
      {
        title: "Longest Prefix Match",
        paragraphs: [
          "Several routes may match one destination. The router chooses the route with the greatest prefix length because it is the most specific.",
          "If the table contains 10.0.0.0/8, 10.1.0.0/16, and 10.1.2.0/24, destination 10.1.2.99 uses /24. Destination 10.1.9.5 uses /16. A default route 0.0.0.0/0 matches only when nothing more specific does.",
        ],
      },
      {
        title: "Static, Connected, and Dynamic Routes",
        paragraphs: [
          "A connected route comes from an active local interface. A static route is configured by an administrator. A dynamic route is learned through a routing protocol. When identical prefixes have several candidates, a router applies implementation-specific route preference and metric rules before installing a best route.",
          "Do not compare metrics belonging to unrelated protocols directly. First prefer the most specific prefix. For candidates to that same prefix, a router normally prefers a route source using an administrative-distance-like value, then uses that protocol's metric. Exact preference values and tie-break rules depend on the router implementation.",
        ],
        table: {
          headers: ["Static routing", "Dynamic routing"],
          rows: [
            ["Manually configured", "Automatically exchanges reachability"],
            ["Predictable and low overhead", "Adapts to topology changes"],
            [
              "Hard to scale and update",
              "Consumes protocol and computation resources",
            ],
          ],
        },
      },
      {
        title: "Reading a Routing Table",
        paragraphs: [
          "A route normally contains a destination prefix, route source, next hop, outgoing interface, metric, and sometimes an age. A directly connected route can send through its interface without a separate remote next hop.",
          "A recursive lookup occurs when a route names a next-hop IP but not the final output interface. The router looks up that next hop until it finds a connected path, then resolves the next hop's link-layer address before transmitting.",
        ],
        dataTable: {
          headers: ["Prefix", "Source", "Next hop", "Interface", "Metric"],
          rows: [
            ["10.1.2.0/24", "OSPF", "192.0.2.2", "eth1", "20"],
            ["10.1.0.0/16", "Static", "192.0.2.6", "eth2", "—"],
            ["10.0.0.0/8", "RIP", "192.0.2.10", "eth3", "3 hops"],
            ["0.0.0.0/0", "Static", "198.51.100.1", "wan0", "—"],
          ],
        },
        points: [
          "Destination 10.1.2.99 uses /24 because it is the longest match.",
          "Destination 10.1.8.7 uses /16.",
          "Destination 10.9.1.1 uses /8.",
          "Destination 8.8.8.8 uses the default route.",
        ],
      },
      {
        title: "What Happens at Each Router",
        flow: [
          "Receive and validate the incoming frame",
          "Remove its link-layer wrapper",
          "Check the IP header and reduce TTL or Hop Limit",
          "Find the longest matching destination prefix",
          "Resolve the next-hop link information and create a new frame",
          "Queue and transmit through the selected output",
        ],
        paragraphs: [
          "If no route exists, the router normally drops the packet and may send ICMP Destination Unreachable. If output traffic exceeds link capacity, packets wait in a queue and may be dropped when buffers fill.",
          "Queueing adds variable delay. A scheduler decides which queued packet transmits next; common designs include first-in-first-out and priority or fair scheduling. Very large buffers can prevent early loss but create excessive latency, a problem called bufferbloat.",
        ],
      },
      {
        title: "Unicast, Broadcast, Multicast, and Anycast",
        paragraphs: [
          "Network delivery can target one interface, every host in an IPv4 broadcast domain, a subscribed group, or one routed instance of a shared address.",
        ],
        dataTable: {
          headers: ["Delivery", "Meaning"],
          rows: [
            ["Unicast", "One sender to one selected interface"],
            [
              "Broadcast",
              "One sender to all hosts in an IPv4 broadcast domain",
            ],
            ["Multicast", "One sender to a joined receiver group"],
            [
              "Anycast",
              "One address announced by several locations; routing selects one",
            ],
          ],
        },
      },
    ],
    mechanism: {
      title: "How a router selects an output",
      steps: [
        "Read the destination IP address.",
        "Find all installed prefixes that contain it.",
        "Choose the matching prefix with the greatest length.",
        "Use that entry's next hop and outgoing interface.",
        "Build the link-layer frame and send or queue the packet.",
      ],
    },
    example: {
      title: "Default route fallback",
      body: "A home router has connected routes for local networks and a default route toward the ISP. Local destinations use their specific connected prefixes; an Internet destination uses 0.0.0.0/0 because no more-specific local route matches.",
    },
    misconception:
      "A router does not choose the numerically smallest IP route. It chooses the most specific matching prefix, then applies route-selection rules when candidates have the same prefix.",
  },
  revise: {
    definition:
      "Routing computes reachability; forwarding applies installed prefix entries to individual packets.",
    sections: [
      {
        title: "Longest Match",
        points: [
          "10.1.2.99 matches /8, /16, and /24, so /24 wins.",
          "0.0.0.0/0 is the IPv4 default route.",
        ],
      },
    ],
    essentials: [
      "Control plane learns routes; data plane forwards packets.",
      "Longest prefix match chooses the most specific route.",
      "Connected, static, and dynamic routes can coexist.",
      "Routers reduce TTL and create a new outgoing frame.",
      "Queueing occurs when arrival exceeds output service capacity.",
      "For equal prefixes: prefer the route source, then that protocol's metric.",
      "A recursive lookup resolves a next hop to a connected output path.",
    ],
    comparisonTitle: "Switching vs routing",
    comparison: {
      left: {
        label: "Layer 2 switching",
        points: ["Forwards frames", "Uses MAC table", "Usually inside a VLAN"],
      },
      right: {
        label: "Layer 3 routing",
        points: [
          "Forwards packets",
          "Uses IP prefixes",
          "Connects IP networks",
        ],
      },
    },
    followUp:
      "Which route wins for 172.16.8.7 if /8, /12, /16, and /24 entries all match?",
  },
  lastMinute: {
    definition:
      "Forwarding sends a packet using the most specific installed destination prefix.",
    memoryLine: "Routing builds the map; forwarding uses it per packet.",
    cues: [
      "Longest prefix = greatest slash length among matches.",
      "Default IPv4 route = 0.0.0.0/0.",
      "Input, lookup, switching fabric, output.",
      "Each routed hop gets a new link-layer frame.",
    ],
    trap: "Do not confuse the routing table or control-plane database with the optimized forwarding table used for packet lookup.",
  },
};

export const dynamicRoutingProtocols: SubjectTopic = {
  slug: "dynamic-routing-protocols",
  title: "Dynamic Routing: RIP, OSPF, and BGP",
  description:
    "Compare distance-vector, link-state, and path-vector routing, then solve Bellman-Ford and Dijkstra path calculations.",
  readTime: "25 min",
  difficulty: "Advanced",
  tags: ["RIP", "OSPF", "BGP"],
  learn: {
    opening:
      "Dynamic routing protocols exchange reachability and adapt to topology changes. Different protocol families know different information and optimize different goals.",
    sections: [
      {
        title: "Three Routing Families",
        paragraphs: [
          "Distance-vector routers learn distance and next-hop information from neighbors. Link-state routers flood local link information and independently calculate paths from a shared topology database. Path-vector routing advertises network prefixes with path and policy attributes between autonomous systems.",
        ],
        visual: {
          src: "/notes/computer-networks/routing-protocol-families.png",
          alt: "Distance-vector RIP, link-state OSPF, and path-vector BGP compared",
          width: 1536,
          height: 1024,
          caption:
            "RIP learns neighbor distances, OSPF calculates from a topology map, and BGP applies inter-domain path policy.",
        },
      },
      {
        title: "Distance Vector and Bellman-Ford",
        paragraphs: [
          "Router x calculates its best distance to destination y as the minimum, over each neighbor v, of the link cost c(x,v) plus v's advertised distance Dv(y). Routers repeat this update as information spreads.",
          "If A reaches neighbor B at cost 2 and B advertises destination D at cost 5, A's route through B costs 7. If neighbor C offers 1 + 9 = 10, A chooses B.",
        ],
        points: [
          "Failures can cause slow convergence, loops, and count-to-infinity.",
          "Split horizon, route poisoning, and triggered updates reduce some problems.",
          "A router trusts neighbor advertisements rather than holding a complete topology graph.",
        ],
      },
      {
        title: "Bellman-Ford Iteration Numerical",
        paragraphs: [
          "Suppose A-B costs 1, B-C costs 2, C-D costs 1, and A-D costs 7. Initially A knows B = 1 and D = 7, but not C. After B advertises C = 2, A learns C through B at cost 3. After that information reaches the route to D through C, A improves D from 7 to 1 + 2 + 1 = 4.",
        ],
        dataTable: {
          headers: ["At router A", "B", "C", "D", "Best change"],
          rows: [
            ["Initial", "1", "∞", "7", "Direct neighbors only"],
            ["After B update", "1", "3 via B", "7", "Learns C"],
            ["After propagation", "1", "3 via B", "4 via B", "Improves D"],
          ],
        },
      },
      {
        title: "RIP",
        paragraphs: [
          "Routing Information Protocol is a distance-vector interior gateway protocol. Its metric is hop count: 15 is the largest reachable value and 16 means unreachable. RIP periodically sends routing information and also supports triggered changes.",
          "RIPv1 is classful and does not carry subnet masks. RIPv2 is classless, carries masks for CIDR and VLSM, supports authentication, and uses multicast address 224.0.0.9. Both use UDP port 520 for IPv4 RIP.",
        ],
        points: [
          "Simple but unsuitable for large or rapidly changing networks.",
          "Equal hop counts ignore bandwidth and delay differences.",
          "RIPv2 supports CIDR and carries routes over UDP port 520.",
          "Common exam timers are update 30 seconds, invalid 180 seconds, and flush 240 seconds; implementations can vary or add hold-down behavior.",
        ],
      },
      {
        title: "Link State, Dijkstra, and OSPF",
        paragraphs: [
          "A link-state router discovers neighbors and costs, floods Link State Advertisements, builds a Link State Database, and runs Dijkstra's shortest-path-first algorithm. Routers in the same area should have a consistent topology view.",
          "Dijkstra starts the source at cost zero, repeatedly finalizes the lowest tentative-cost node, and relaxes its outgoing edges. The resulting shortest-path tree supplies next hops.",
        ],
        points: [
          "OSPF is a link-state interior gateway protocol.",
          "Its cost commonly relates to interface bandwidth, subject to configuration.",
          "Areas improve hierarchy and scale; Area 0 is the backbone area.",
          "OSPF runs directly over IP protocol number 89, not TCP or UDP.",
          "Hello packets discover neighbors. Compatible neighbors may form adjacencies and synchronize databases. On broadcast networks, a Designated Router and Backup Designated Router reduce unnecessary adjacency and flooding overhead.",
          "The five OSPF packet types are Hello, Database Description, Link State Request, Link State Update, and Link State Acknowledgment.",
        ],
      },
      {
        title: "Dijkstra Numerical",
        paragraphs: [
          "Suppose edges are A-B = 2, A-C = 5, B-C = 1, B-D = 4, and C-D = 1. Start at A. Finalize B at 2, then improve C through B to 3, then improve D through C to 4. Shortest A-to-D path is A-B-C-D with cost 4.",
        ],
        dataTable: {
          headers: ["Step", "Permanent set", "B", "C", "D"],
          rows: [
            ["Start", "{A}", "2 via A", "5 via A", "∞"],
            ["Choose B", "{A, B}", "—", "3 via B", "6 via B"],
            ["Choose C", "{A, B, C}", "—", "—", "4 via C"],
            ["Choose D", "{A, B, C, D}", "—", "—", "Final 4"],
          ],
        },
      },
      {
        title: "BGP and Autonomous Systems",
        paragraphs: [
          "Border Gateway Protocol exchanges Internet reachability between autonomous systems and also distributes external routes inside an AS. eBGP connects different ASes; iBGP distributes BGP information within one AS.",
          "BGP is policy-driven, so the shortest AS path does not automatically win. Implementations compare attributes and policy in a defined decision process.",
        ],
        dataTable: {
          headers: ["Attribute", "Main meaning"],
          rows: [
            [
              "LOCAL_PREF",
              "Preferred exit inside the local AS; higher is commonly preferred",
            ],
            [
              "AS_PATH",
              "Sequence of ASes; helps selection and loop prevention",
            ],
            ["NEXT_HOP", "IP next hop for reaching the advertised prefix"],
            ["MED", "Suggestion to a neighboring AS about preferred entry"],
            ["ORIGIN", "How the prefix entered BGP"],
          ],
        },
        points: [
          "BGP uses TCP port 179.",
          "An AS is a set of networks under one administrative routing policy.",
          "Route advertisements carry prefixes plus attributes, not a simple distance alone.",
        ],
      },
      {
        title: "BGP Messages and Simplified Path Selection",
        paragraphs: [
          "BGP peers exchange OPEN messages to start a session, KEEPALIVE messages to maintain it, UPDATE messages to advertise or withdraw routes, and NOTIFICATION messages to report an error and close the session.",
          "A simplified study order is: accept only policy-valid routes, prefer higher LOCAL_PREF, prefer a locally originated route, prefer a shorter AS_PATH, consider ORIGIN and lower MED where comparable, then apply later eBGP, IGP-cost, and tie-break rules. Real vendor decision processes contain more steps and configurable policy.",
          "Example: Route X has LOCAL_PREF 200 and AS_PATH length 3; Route Y has LOCAL_PREF 100 and AS_PATH length 2. X wins because LOCAL_PREF is considered before AS_PATH. A shorter path does not override a higher local preference.",
        ],
        dataTable: {
          headers: ["Message", "Purpose"],
          rows: [
            ["OPEN", "Negotiate and establish BGP peering"],
            ["UPDATE", "Advertise routes or withdraw routes"],
            ["KEEPALIVE", "Confirm that the session remains active"],
            ["NOTIFICATION", "Report an error and close the session"],
          ],
        },
      },
      {
        title: "RIP, OSPF, and BGP Compared",
        paragraphs: [
          "The protocols solve different routing problems. RIP and OSPF are interior protocols, while BGP carries policy-rich reachability for Internet-scale inter-domain routing and internal BGP distribution.",
        ],
        dataTable: {
          headers: ["Protocol", "Family", "Scope", "Main choice input"],
          rows: [
            ["RIP", "Distance vector", "Inside an AS", "Hop count"],
            [
              "OSPF",
              "Link state",
              "Inside an AS",
              "Shortest path using OSPF cost",
            ],
            [
              "BGP",
              "Path vector",
              "Between and within ASes",
              "Policy and path attributes",
            ],
          ],
        },
      },
    ],
    mechanism: {
      title: "How dynamic routing reacts to a failure",
      steps: [
        "A router detects that a link or neighbor is unavailable.",
        "The protocol advertises or floods changed reachability.",
        "Other routers update their knowledge and recompute best routes.",
        "New forwarding entries replace invalid paths.",
        "Convergence completes when routers reach a stable consistent result for the change.",
      ],
    },
    example: {
      title: "Choosing the right protocol",
      body: "A small lab might use static routes or RIP for simplicity. A large enterprise commonly uses OSPF internally. Its Internet-facing border routers use BGP to exchange policy-controlled prefixes with providers.",
    },
    misconception:
      "BGP does not simply choose the route with the fewest router hops. It applies policy and BGP attributes, and AS_PATH counts autonomous systems rather than individual routers.",
  },
  revise: {
    definition:
      "RIP exchanges neighbor distances, OSPF floods link state and runs Dijkstra, and BGP exchanges policy-rich AS paths.",
    sections: [
      {
        title: "Algorithm Recall",
        points: [
          "Distance vector: Bellman-Ford-style neighbor update.",
          "Link state: Dijkstra on a topology database.",
          "Path vector: attributes and policy across ASes.",
        ],
      },
    ],
    essentials: [
      "RIP uses hop count, with 16 meaning unreachable.",
      "OSPF floods LSAs and supports areas.",
      "BGP uses autonomous systems and TCP port 179.",
      "Convergence is the process of reaching stable routing knowledge after change.",
      "BGP best path is policy-driven, not pure shortest path.",
      "RIPv2 carries masks; RIPv1 is classful.",
      "OSPF neighbors use Hello packets and synchronize link-state data.",
      "BGP commonly compares LOCAL_PREF before AS_PATH length.",
    ],
    comparisonTitle: "RIP vs OSPF",
    comparison: {
      left: {
        label: "RIP",
        points: [
          "Distance vector",
          "Hop-count metric",
          "Small networks and slower convergence",
        ],
      },
      right: {
        label: "OSPF",
        points: [
          "Link state",
          "Cost metric",
          "Hierarchical areas and faster convergence",
        ],
      },
    },
    followUp: "Why can BGP prefer a longer AS_PATH over a shorter one?",
  },
  lastMinute: {
    definition:
      "Dynamic protocols learn routes and adapt forwarding after topology changes.",
    memoryLine: "RIP counts hops, OSPF maps links, BGP applies policy.",
    cues: [
      "RIP: distance vector, 15-hop maximum.",
      "OSPF: link state, Dijkstra, IP protocol 89.",
      "BGP: path vector, AS policy, TCP 179.",
      "Bellman-Ford asks neighbors; Dijkstra uses the whole graph.",
    ],
    trap: "Do not say OSPF sends updates only once. It floods changes and also refreshes link-state information.",
  },
};
