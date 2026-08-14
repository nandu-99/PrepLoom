import type { SubjectTopic } from "@/lib/subject-content";

export const dataLinkLayerAndEthernetFrames: SubjectTopic = {
  slug: "data-link-layer-and-ethernet-frames",
  title: "Data Link Layer and Ethernet Frames",
  description:
    "Understand node-to-node delivery, Data Link sublayers, Ethernet frame fields, MTU, frame sizes, and error handling.",
  readTime: "23 min",
  difficulty: "Foundation",
  tags: ["Data Link Layer", "Ethernet", "Frames"],
  learn: {
    opening:
      "The Data Link Layer moves frames across one local link. It gives network-layer packets a link-specific wrapper, identifies local interfaces, detects damaged frames, and coordinates access to a shared medium.",
    sections: [
      {
        title: "Responsibilities of Layer 2",
        paragraphs: [
          "Layer 2 provides hop-to-hop delivery rather than complete end-to-end delivery. A frame normally travels across one link or switched LAN, while an IP packet can cross many routers and receive a different frame at every routed hop.",
        ],
        points: [
          "Framing: marks the beginning and end of a link-layer unit.",
          "Physical addressing: carries source and destination MAC addresses.",
          "Error detection: uses an FCS such as Ethernet CRC-32.",
          "Media access: controls how devices share a common channel.",
          "Link flow control: may regulate directly connected sender and receiver behavior in protocols that provide it.",
        ],
      },
      {
        title: "LLC and MAC Sublayers",
        paragraphs: [
          "IEEE descriptions divide Layer 2 into Logical Link Control and Media Access Control. LLC provides an interface toward the network layer and can identify an upper-layer protocol. MAC handles frame format, hardware addressing, and access to the physical medium.",
        ],
        table: {
          headers: ["LLC", "MAC"],
          rows: [
            ["Interface toward Layer 3", "MAC address handling"],
            ["Protocol multiplexing", "Frame format and FCS"],
            ["Optional link-control functions", "Access to shared media"],
          ],
        },
      },
      {
        title: "Ethernet II Frame Anatomy",
        paragraphs: [
          "Ethernet starts transmission with a 7-byte preamble and 1-byte Start Frame Delimiter. The Ethernet frame counted from Destination through FCS is normally 64 to 1,518 bytes without an 802.1Q VLAN tag.",
          "The 2-byte EtherType identifies the payload protocol, such as IPv4, ARP, or IPv6. Payload below 46 bytes is padded so the frame reaches its minimum size. The receiver does not pass padding to the network-layer protocol as useful data.",
        ],
        visual: {
          src: "/notes/computer-networks/ethernet-frame-anatomy.png",
          alt: "Ethernet frame fields from preamble through frame check sequence with byte sizes",
          width: 1536,
          height: 1024,
          caption:
            "Ethernet II uses local MAC addresses, an EtherType, a variable payload, and a four-byte FCS.",
        },
        dataTable: {
          headers: ["Field", "Size", "Purpose"],
          rows: [
            ["Preamble + SFD", "8 bytes", "Synchronization and frame start"],
            ["Destination MAC", "6 bytes", "Intended local receiver"],
            ["Source MAC", "6 bytes", "Sending local interface"],
            ["EtherType", "2 bytes", "Payload protocol"],
            ["Payload + padding", "46-1,500 bytes", "Upper-layer data"],
            ["FCS", "4 bytes", "CRC-based error detection"],
          ],
        },
      },
      {
        title: "Frame-Size Numerical",
        paragraphs: [
          "An Ethernet II frame carrying 1,200 payload bytes has 6 + 6 + 2 + 1,200 + 4 = 1,218 bytes from Destination through FCS. The preamble and SFD add 8 transmitted bytes, so 1,226 bytes are sent before considering the interpacket gap.",
          "If the upper-layer payload is only 20 bytes, Ethernet adds 26 padding bytes to reach the minimum 46-byte payload field. The frame is then 64 bytes from Destination through FCS.",
        ],
      },
      {
        title: "MTU, FCS, and Error Handling",
        paragraphs: [
          "The common Ethernet MTU is 1,500 bytes. MTU refers to the network-layer packet carried as Ethernet payload, not the entire Ethernet frame. A VLAN tag normally adds four bytes to the frame while the usual IP MTU remains 1,500.",
          "The sender calculates an FCS and the receiver checks it. A mismatching frame is normally discarded. Standard Ethernet detects corruption but does not ask for retransmission itself; recovery usually belongs to a higher-layer protocol or a medium-specific link mechanism.",
        ],
      },
      {
        title: "Ethernet Media Access and CSMA/CD",
        paragraphs: [
          "Classic shared, half-duplex Ethernet used CSMA/CD. A station listened before sending, transmitted if the medium was idle, detected a collision while transmitting, sent a jam signal, waited for a randomized backoff, and then tried again.",
          "Binary exponential backoff increases the possible waiting range after repeated collisions. After collision number n, a station chooses a random value from 0 through 2^k - 1 slot times, where k grows with repeated attempts up to the protocol limit.",
          "Modern switched full-duplex Ethernet gives each link separate transmit and receive paths, so normal collisions do not occur and CSMA/CD is not used. Wi-Fi cannot reliably detect collisions while transmitting, so it uses collision avoidance. Detailed CSMA/CA belongs to the Wi-Fi module.",
        ],
        flow: [
          "Listen to the shared medium",
          "Transmit when idle",
          "Detect collision and send jam signal",
          "Wait for randomized binary exponential backoff",
          "Retry or stop after the attempt limit",
        ],
      },
      {
        title: "Interpacket Gap, VLAN Tag, and Jumbo Frames",
        paragraphs: [
          "Ethernet requires an idle interval equivalent to 12 byte-times between transmitted frames. This interpacket gap gives interfaces time to recover and keeps back-to-back transmissions separated; it is timing on the medium, not a field stored inside the frame.",
          "An 802.1Q tag adds four bytes between the Source MAC and the original EtherType. A maximum ordinary untagged frame of 1,518 bytes therefore becomes 1,522 bytes when tagged, while its 1,500-byte IP payload can remain unchanged.",
          "Jumbo frames carry payloads larger than the usual 1,500-byte MTU. A value near 9,000 bytes is common, but there is no single universal jumbo-frame size. Every device along the Layer 2 path must support the configured size.",
        ],
      },
    ],
    mechanism: {
      title: "How a packet crosses one Ethernet link",
      steps: [
        "Receive an IP packet from the network layer.",
        "Choose the next-hop destination MAC address.",
        "Add Ethernet header fields and any required payload padding.",
        "Calculate and append the frame check sequence.",
        "Transmit bits; the receiver validates the frame and removes its wrapper.",
      ],
    },
    example: {
      title: "A routed packet gets a new frame",
      body: "A laptop sends an IP packet to its default gateway inside an Ethernet frame addressed to the router's MAC. The router removes that frame, forwards the same logical IP packet, and builds a new frame for the next link.",
    },
    misconception:
      "A frame is not just another name for an IP packet. The frame is a one-link wrapper around the network-layer packet.",
  },
  revise: {
    definition:
      "Layer 2 carries frames across a local link using framing, MAC addressing, media access, and error detection.",
    sections: [
      {
        title: "Ethernet Size Recall",
        points: [
          "Destination through FCS: normally 64-1,518 bytes without VLAN tagging.",
          "Payload and padding field: 46-1,500 bytes.",
          "Preamble + SFD: 8 transmitted bytes before Destination.",
          "Common Ethernet MTU: 1,500-byte Layer 3 packet.",
        ],
      },
    ],
    essentials: [
      "Data Link delivery is hop-to-hop; IP delivery can cross many hops.",
      "LLC faces Layer 3; MAC handles local addressing and media access.",
      "EtherType identifies the payload protocol.",
      "FCS detects a damaged frame, which Ethernet normally discards.",
      "Small payloads need padding to meet the minimum frame size.",
      "CSMA/CD belongs to shared half-duplex Ethernet, not normal switched full-duplex links.",
      "The interpacket gap is 12 byte-times and is not a frame field.",
    ],
    comparisonTitle: "Packet vs frame",
    comparison: {
      left: {
        label: "IP packet",
        points: ["Layer 3 unit", "Carries IP addresses", "Crosses routed networks"],
      },
      right: {
        label: "Ethernet frame",
        points: ["Layer 2 unit", "Carries MAC addresses", "Valid on one link or LAN"],
      },
    },
    followUp:
      "How large is an Ethernet frame carrying 30 bytes of upper-layer data?",
  },
  lastMinute: {
    definition:
      "Layer 2 wraps a packet in a frame for delivery across one local link.",
    memoryLine: "Packet travels farther; frame changes at each routed hop.",
    cues: [
      "MAC addresses are 6 bytes each.",
      "EtherType is 2 bytes; FCS is 4 bytes.",
      "Payload field is 46-1,500 bytes.",
      "Minimum normal Ethernet frame is 64 bytes from Destination through FCS.",
    ],
    trap: "Do not include the 8-byte preamble and SFD inside the stated 64-byte minimum Ethernet frame.",
  },
};

export const macAddressingAndLanSwitching: SubjectTopic = {
  slug: "mac-addressing-and-lan-switching",
  title: "MAC Addressing and LAN Switching",
  description:
    "Read 48-bit MAC addresses and understand unicast, multicast, broadcast, switch learning, flooding, and LAN domains.",
  readTime: "24 min",
  difficulty: "Intermediate",
  tags: ["MAC Address", "Switching", "LAN"],
  learn: {
    opening:
      "A MAC address identifies a network interface within a Layer 2 network. Ethernet switches learn which source addresses appear on which ports, then use that table to forward frames efficiently.",
    sections: [
      {
        title: "MAC Address Format",
        paragraphs: [
          "A common Ethernet MAC address has 48 bits, written as six hexadecimal octets such as 00:1A:2B:3C:4D:5E. The first 24 bits often contain an IEEE-assigned Organizationally Unique Identifier, while the remaining bits are assigned by the organization.",
          "Modern operating systems can use locally administered or randomized MAC addresses, especially for Wi-Fi privacy. A MAC address is therefore not guaranteed to be permanent, globally unique, or tied to one physical device forever.",
        ],
        dataTable: {
          headers: ["Bit in first octet", "0", "1"],
          rows: [
            ["Least significant bit", "Individual or unicast", "Group or multicast"],
            ["Next least significant bit", "Universally administered", "Locally administered"],
          ],
        },
        points: [
          "Example 02 begins as 00000010 in binary: the least significant bit is 0, so it is individual; the next bit is 1, so it is locally administered.",
          "Example 01 begins as 00000001: the least significant bit is 1, so it is a group or multicast address.",
        ],
      },
      {
        title: "Unicast, Multicast, and Broadcast MAC",
        paragraphs: [
          "A unicast address selects one interface. A multicast address selects a receiver group. FF:FF:FF:FF:FF:FF is the Ethernet broadcast address and is delivered across the current broadcast domain.",
        ],
        dataTable: {
          headers: ["Delivery", "Example", "Switch behavior"],
          rows: [
            ["Unicast", "00:1A:2B:3C:4D:5E", "Forward to known destination port"],
            ["IPv4 multicast mapping", "01:00:5E:xx:xx:xx", "Deliver or flood within multicast controls"],
            ["Broadcast", "FF:FF:FF:FF:FF:FF", "Flood through the VLAN except incoming port"],
          ],
        },
      },
      {
        title: "How a Switch Learns",
        paragraphs: [
          "A switch learns from the source MAC address of each arriving frame. It records source MAC to incoming port in a MAC address table, also called a CAM table. Entries age out after inactivity so the table can follow topology changes.",
          "A common default aging value on enterprise switches is around 300 seconds, but it is configurable and vendor-dependent. Seeing the same source MAC arrive on another port moves or relearns the entry.",
        ],
        flow: [
          "Frame from A enters port 1",
          "Switch learns A is reachable through port 1",
          "Switch looks up the destination MAC",
          "Known destination uses one port; unknown destination is flooded",
          "Reply lets the switch learn the second host's port",
        ],
      },
      {
        title: "MAC Table Learning Numerical",
        paragraphs: [
          "Start with an empty switch table. Frame 1 is A to B on port 1: learn A -> 1 and flood because B is unknown. Frame 2 is B to A on port 4: learn B -> 4 and forward only to port 1. Frame 3 is C to A on port 3: learn C -> 3 and forward only to port 1.",
        ],
        dataTable: {
          headers: ["After frame", "Learned table", "Switch action"],
          rows: [
            ["A to B enters P1", "A -> P1", "Flood B"],
            ["B to A enters P4", "A -> P1, B -> P4", "Forward to P1"],
            ["C to A enters P3", "A -> P1, B -> P4, C -> P3", "Forward to P1"],
          ],
        },
      },
      {
        title: "Forward, Filter, or Flood",
        paragraphs: [
          "If the destination is known on another port, the switch forwards there. If source and destination are known on the same port, it filters the frame because forwarding is unnecessary. An unknown unicast, broadcast, or applicable multicast is flooded to other ports in the same VLAN.",
          "Flooding is not broadcasting by definition. Broadcasting describes the destination address; flooding describes the switch action when it sends a frame through several ports.",
        ],
      },
      {
        title: "Collision and Broadcast Domains Numerical",
        paragraphs: [
          "Each switch port is a separate collision domain. A normal Layer 2 switch does not separate broadcast domains unless VLANs are configured. Routers separate Layer 2 broadcast domains.",
          "Example: an 8-port switch has six connected hosts and one router link. There are seven active collision domains. With no VLANs, the switch LAN is one broadcast domain. If the hosts are divided across three VLANs, there are three broadcast domains, and inter-VLAN traffic needs routing.",
        ],
      },
      {
        title: "VLANs and Switching Loops",
        paragraphs: [
          "A VLAN creates a logical Layer 2 broadcast domain. Access ports normally carry one VLAN for endpoint traffic, while an 802.1Q trunk can carry frames from multiple VLANs using tags.",
          "An access port normally sends and receives endpoint frames without an 802.1Q tag. A trunk identifies most VLANs with tags. A configured native VLAN may be untagged on an 802.1Q trunk, so both ends must agree to avoid traffic or security problems.",
          "Redundant Layer 2 paths can loop broadcasts and unknown unicasts indefinitely because Ethernet has no TTL. Spanning Tree Protocol blocks selected redundant paths to create a loop-free active topology while retaining backup links.",
          "STP elects a root bridge using bridge IDs. Each non-root switch selects its lowest-cost path toward the root. Port roles and states leave one active loop-free tree and block selected redundant paths; a blocked backup can transition when the topology changes.",
        ],
        dataTable: {
          headers: ["Port type", "Normal role", "Frame treatment"],
          rows: [
            ["Access", "Connect one endpoint VLAN", "Normally untagged to endpoint"],
            ["Trunk", "Carry several VLANs", "802.1Q tagged for most VLANs"],
            ["Native VLAN on trunk", "Configured untagged VLAN", "Must match at both ends"],
          ],
        },
      },
    ],
    mechanism: {
      title: "How a switch handles an arriving frame",
      steps: [
        "Learn the source MAC on the incoming port and VLAN.",
        "Look up the destination MAC in the forwarding table.",
        "Filter if the known destination is on the same port.",
        "Forward if it is known on another port, otherwise flood within the VLAN.",
        "Refresh learned entries and age inactive entries later.",
      ],
    },
    example: {
      title: "The first frame is flooded",
      body: "A switch initially knows host A on port 1 but not host B. A frame from A to B is flooded. When B replies through port 4, the switch learns B on port 4, so later A-to-B frames go only to port 4.",
    },
    misconception:
      "A switch does not learn a destination by reading only destination MAC addresses. It learns locations from source addresses of arriving frames.",
  },
  revise: {
    definition:
      "A switch learns source MAC-to-port mappings and forwards frames according to the destination address inside a VLAN.",
    sections: [
      {
        title: "Switch Decision",
        points: [
          "Learn from source.",
          "Look up destination.",
          "Known on another port: forward.",
          "Known on incoming port: filter.",
          "Unknown, broadcast, or relevant multicast: flood within VLAN.",
        ],
      },
    ],
    essentials: [
      "A MAC address is normally 48 bits or 6 bytes.",
      "Broadcast MAC is FF:FF:FF:FF:FF:FF.",
      "Every switch port forms a separate collision domain.",
      "Each VLAN forms a separate Layer 2 broadcast domain.",
      "STP prevents active Layer 2 loops.",
      "Access ports normally carry one VLAN; trunks carry multiple VLANs.",
    ],
    comparisonTitle: "Collision vs broadcast domain",
    comparison: {
      left: {
        label: "Collision domain",
        points: ["Contention region", "One per switch port", "Hub ports share one"],
      },
      right: {
        label: "Broadcast domain",
        points: ["Reach of Layer 2 broadcast", "One per VLAN", "Router separates domains"],
      },
    },
    followUp:
      "Why does a switch flood the first unicast frame to a host it has never seen?",
  },
  lastMinute: {
    definition:
      "Switches learn source MAC locations and use destination MAC addresses to forward.",
    memoryLine: "Learn source, look up destination, forward or flood.",
    cues: [
      "MAC: 48 bits, six hexadecimal octets.",
      "Broadcast: FF:FF:FF:FF:FF:FF.",
      "Unknown unicast is flooded inside the VLAN.",
      "VLAN splits broadcasts; STP prevents loops.",
    ],
    trap: "Do not say a switch creates one broadcast domain per physical port. That describes a router boundary, not ordinary Layer 2 switching.",
  },
};

export const arpAndLocalAddressResolution: SubjectTopic = {
  slug: "arp-and-local-address-resolution",
  title: "ARP and Local Address Resolution",
  description:
    "Follow ARP requests, replies, caches, gateway resolution, gratuitous and proxy ARP, and common ARP attacks.",
  readTime: "22 min",
  difficulty: "Intermediate",
  tags: ["ARP", "ARP Cache", "Spoofing"],
  learn: {
    opening:
      "ARP maps an IPv4 address to a link-layer address on the local network. A sender resolves either the destination host's MAC or the default gateway's MAC, depending on whether the IP destination is local.",
    sections: [
      {
        title: "When ARP Is Needed",
        paragraphs: [
          "A host first compares the destination IP with its own subnet using the mask. For a same-subnet destination, it resolves that host's MAC. For a remote destination, it keeps the remote destination IP in the packet but resolves the default gateway's local MAC for the Ethernet frame.",
          "ARP is for IPv4 on a local link. Routers do not forward an ordinary ARP broadcast. IPv6 uses Neighbor Discovery through ICMPv6 instead of ARP.",
        ],
      },
      {
        title: "ARP Request, Reply, and Cache",
        paragraphs: [
          "If no usable cache entry exists, the sender broadcasts an ARP Request asking who owns the target IPv4 address. The owner normally sends a unicast ARP Reply containing its MAC address. The sender stores the mapping for a limited time and can then send the waiting frame.",
        ],
        visual: {
          src: "/notes/computer-networks/arp-resolution-flow.png",
          alt: "ARP request broadcast from Host A and unicast ARP reply from Host B through a switch",
          width: 1536,
          height: 1024,
          caption:
            "The request is broadcast in the LAN; the reply normally returns directly and creates a temporary cache entry.",
        },
      },
      {
        title: "ARP Packet Fields",
        paragraphs: [
          "An ARP message carries enough information to describe the link protocol, network protocol, operation, sender, and target. For Ethernet carrying IPv4, the common hardware type is 1, protocol type is 0x0800, hardware length is 6, and protocol length is 4.",
        ],
        dataTable: {
          headers: ["Field", "Common Ethernet/IPv4 value", "Purpose"],
          rows: [
            ["Hardware type", "1", "Ethernet link type"],
            ["Protocol type", "0x0800", "IPv4 being resolved"],
            ["Hardware / protocol length", "6 / 4", "MAC and IPv4 byte lengths"],
            ["Opcode", "1 request, 2 reply", "ARP operation"],
            ["Sender addresses", "Sender MAC and IPv4", "Identity of sender"],
            ["Target addresses", "Target MAC and IPv4", "Identity being queried or answered"],
          ],
        },
      },
      {
        title: "Local vs Remote Destination Example",
        dataTable: {
          headers: ["Destination", "IP packet destination", "MAC to resolve"],
          rows: [
            ["192.168.1.20 on local /24", "192.168.1.20", "Host 192.168.1.20"],
            ["8.8.8.8 outside local /24", "8.8.8.8", "Default gateway 192.168.1.1"],
          ],
        },
        paragraphs: [
          "The remote IP destination does not become the gateway's IP. Only the current frame uses the gateway's MAC. This separation between Layer 3 destination and next-hop Layer 2 destination is a common interview question.",
        ],
      },
      {
        title: "Gratuitous ARP and Proxy ARP",
        paragraphs: [
          "Gratuitous ARP announces or checks a host's own IPv4-to-MAC mapping without first receiving a normal request. It can update neighbor caches, help detect duplicate addresses, and support failover when a virtual IP moves.",
          "With Proxy ARP, a router answers an ARP request on behalf of another IPv4 destination and gives its own MAC. It can make a remote destination appear locally reachable, but it can hide network boundaries and increase ARP dependence.",
        ],
      },
      {
        title: "ARP Cache, MAC Table, and Neighbor States",
        paragraphs: [
          "A host ARP cache maps an IPv4 address to a MAC address. A switch MAC table maps a MAC address and VLAN to a physical switch port. They solve different problems and exist on different devices.",
          "Neighbor implementations track states such as incomplete while resolution is pending, reachable after confirmation, and stale when an old mapping can still be tried but may need validation. Exact state names and timers depend on the operating system.",
          "ARP-based duplicate-address checks probe or announce an address before normal use. RARP historically asked for an IPv4 address using a known hardware address, but BOOTP and DHCP replaced it in practical networks.",
        ],
        table: {
          headers: ["Host ARP cache", "Switch MAC table"],
          rows: [
            ["IPv4 -> MAC", "MAC + VLAN -> switch port"],
            ["Used to build local frame", "Used to choose forwarding port"],
            ["Maintained by endpoint or router", "Maintained by Layer 2 switch"],
          ],
        },
      },
      {
        title: "ARP Spoofing and Defenses",
        paragraphs: [
          "ARP has no built-in authentication. An attacker can send false mappings, such as associating the gateway IP with the attacker's MAC. Victims may send traffic through the attacker, enabling interception, modification, or denial of service.",
        ],
        points: [
          "Dynamic ARP Inspection validates ARP messages using trusted information such as DHCP snooping bindings.",
          "Static ARP entries can protect a few critical systems but are difficult to manage at scale.",
          "Segmentation, switch port security, monitoring, and end-to-end encryption reduce exposure or impact.",
          "Clearing a poisoned cache treats the symptom unless the attacker or configuration problem is removed.",
        ],
      },
      {
        title: "Useful ARP Commands",
        paragraphs: [
          "Neighbor-table and packet-capture tools help confirm whether resolution is missing, stale, or being manipulated.",
        ],
        dataTable: {
          headers: ["Command", "Purpose"],
          rows: [
            ["ip neigh", "View or manage Linux neighbor entries"],
            ["arp -a", "View cached mappings on several systems"],
            ["arping", "Probe an IPv4 neighbor at Layer 2"],
            ["Wireshark filter arp", "Inspect ARP requests and replies"],
          ],
        },
      },
    ],
    mechanism: {
      title: "How a host selects the MAC destination",
      steps: [
        "Use the subnet mask to decide whether the destination IP is local.",
        "Choose the destination host as next hop if local; choose the gateway if remote.",
        "Check the ARP cache for the next-hop IPv4 address.",
        "Broadcast a request if the mapping is missing or stale.",
        "Cache the reply and transmit the Ethernet frame to that MAC.",
      ],
    },
    example: {
      title: "Sending to an Internet server",
      body: "A laptop sends to 203.0.113.20 from a 192.168.1.0/24 LAN. It ARPs for 192.168.1.1, not 203.0.113.20. The IP packet still names 203.0.113.20, while the first Ethernet frame names the router's MAC.",
    },
    misconception:
      "ARP does not find the MAC address of every remote Internet server. It resolves a local next hop, commonly the default gateway.",
  },
  revise: {
    definition:
      "ARP resolves an IPv4 next-hop address to a MAC address on the local link.",
    sections: [
      {
        title: "ARP Exchange",
        points: [
          "Request: normally Ethernet broadcast.",
          "Reply: normally unicast to the requester.",
          "Result: temporary IPv4-to-MAC cache entry.",
        ],
      },
    ],
    essentials: [
      "Local destination: ARP for the destination host.",
      "Remote destination: ARP for the default gateway.",
      "ARP broadcasts stay inside the local Layer 2 domain.",
      "Gratuitous ARP announces the sender's own mapping.",
      "ARP spoofing works because ordinary ARP lacks authentication.",
      "Opcode 1 is Request; opcode 2 is Reply.",
      "ARP cache maps IP to MAC; switch table maps MAC to port.",
    ],
    comparisonTitle: "ARP request vs reply",
    comparison: {
      left: {
        label: "Request",
        points: ["Asks for target MAC", "Normally broadcast", "Target MAC is unknown"],
      },
      right: {
        label: "Reply",
        points: ["Provides the mapping", "Normally unicast", "Populates neighbor cache"],
      },
    },
    followUp:
      "Which address does a host ARP for when sending to an IP outside its own subnet?",
  },
  lastMinute: {
    definition: "ARP maps a local IPv4 next hop to a MAC address.",
    memoryLine: "Local host or local gateway, never the remote Internet MAC.",
    cues: [
      "Request broadcast, reply usually unicast.",
      "Routers do not forward normal ARP broadcasts.",
      "IPv6 uses Neighbor Discovery, not ARP.",
      "Fake ARP mappings can create a man-in-the-middle path.",
    ],
    trap: "Do not change the IP packet destination to the gateway when only the first-hop frame is addressed to the gateway.",
  },
};

export const dhcpAndAutomaticConfiguration: SubjectTopic = {
  slug: "dhcp-and-automatic-configuration",
  title: "DHCP and Automatic Configuration",
  description:
    "Understand DORA, UDP ports, DHCP leases, renewal timers, relay agents, address conflicts, and automatic fallback addressing.",
  readTime: "24 min",
  difficulty: "Intermediate",
  tags: ["DHCP", "DORA", "Lease"],
  learn: {
    opening:
      "DHCP automatically supplies IPv4 configuration. It uses a lease rather than permanently giving an address, allowing the server to reuse addresses and centrally manage network parameters.",
    sections: [
      {
        title: "What DHCP Supplies",
        paragraphs: [
          "A DHCP server can provide an IPv4 address, subnet mask, default gateway, DNS servers, lease time, domain information, and other options. It manages a configured pool and can reserve a predictable address for a known client.",
        ],
        dataTable: {
          headers: ["Configuration", "Example"],
          rows: [
            ["IPv4 address", "192.168.1.20"],
            ["Subnet mask", "255.255.255.0"],
            ["Default gateway", "192.168.1.1"],
            ["DNS server", "192.168.1.1 or another resolver"],
            ["Lease time", "8 hours"],
          ],
        },
      },
      {
        title: "Pools, Exclusions, and Reservations",
        paragraphs: [
          "A dynamic pool is the range available for ordinary leases. An exclusion removes addresses from automatic allocation, often because infrastructure uses them manually. A reservation ties a particular client identifier or MAC-related identity to a predictable address while still delivering configuration through DHCP.",
          "DHCP messages carry a transaction identifier so a client can match replies to its current exchange. This is especially useful while several unconfigured clients and servers share broadcast traffic.",
        ],
        dataTable: {
          headers: ["Configuration", "Meaning"],
          rows: [
            ["Dynamic pool", "Addresses available for ordinary leases"],
            ["Exclusion", "Address DHCP must not allocate"],
            ["Reservation", "Predictable lease for a selected client"],
          ],
        },
      },
      {
        title: "DORA Exchange",
        paragraphs: [
          "A new client does not yet have a usable IPv4 address or know the server, so early DHCP messages can use broadcasts. DHCP uses UDP port 68 at the client and UDP port 67 at the server.",
        ],
        visual: {
          src: "/notes/computer-networks/dhcp-dora-flow.png",
          alt: "DHCP client and server exchanging Discover, Offer, Request, and Acknowledge messages",
          width: 1536,
          height: 1024,
          caption:
            "DORA selects an offered configuration and finishes with a time-limited lease.",
        },
        flow: [
          "DHCPDISCOVER: client searches for available servers",
          "DHCPOFFER: server proposes an address and options",
          "DHCPREQUEST: client selects and requests one offer",
          "DHCPACK: server confirms the lease and configuration",
        ],
      },
      {
        title: "Why DHCPREQUEST Is Broadcast Initially",
        paragraphs: [
          "Several servers may send offers. The client's initial DHCPREQUEST identifies the selected server and requested address, letting other servers withdraw their offers. A server can send DHCPNAK when the requested configuration is invalid for the current network.",
          "A client may perform an address-conflict check before fully using the address. If it detects a conflict, it can reject the address and restart configuration.",
        ],
      },
      {
        title: "Additional DHCP Messages",
        paragraphs: [
          "DORA is the common first exchange, but DHCP includes other messages for rejection, conflicts, release, and option-only requests.",
        ],
        dataTable: {
          headers: ["Message", "Meaning"],
          rows: [
            ["DHCPNAK", "Server rejects requested address or configuration"],
            ["DHCPDECLINE", "Client reports that offered address appears in use"],
            ["DHCPRELEASE", "Client voluntarily returns its lease"],
            ["DHCPINFORM", "Configured client requests options without a new address"],
          ],
        },
      },
      {
        title: "Lease Renewal Numerical",
        paragraphs: [
          "A client normally tries unicast renewal at T1, commonly 50 percent of the lease. If renewal fails, it enters rebinding at T2, commonly 87.5 percent, and can contact any DHCP server. The lease expires at 100 percent if no server extends it.",
          "For an 8-hour lease, T1 is normally 4 hours and T2 is 7 hours. If no reply arrives by 8 hours, the client must stop using that leased address. Servers can explicitly provide different T1 and T2 values.",
          "For a 24-hour lease using the common defaults, T1 is 12 hours and T2 is 21 hours because 24 x 0.875 = 21.",
        ],
        dataTable: {
          headers: ["Point", "8-hour example", "Client action"],
          rows: [
            ["T1", "4 hours", "Unicast renewal with leasing server"],
            ["T2", "7 hours", "Broadcast rebinding to any server"],
            ["Expiry", "8 hours", "Stop using address if not renewed"],
          ],
        },
      },
      {
        title: "DHCP Relay",
        paragraphs: [
          "Routers normally stop client broadcasts, so one central DHCP server cannot hear every subnet directly. A DHCP relay receives the local client message and forwards it to the server, adding information about the client's subnet. The server uses that information to choose the correct address pool.",
          "The client-side message can be a LAN broadcast, but the relay forwards it as routed traffic toward the configured server. The server replies through the relay, which delivers the result on the client subnet.",
        ],
      },
      {
        title: "DHCP Troubleshooting Flow",
        paragraphs: [
          "Troubleshoot from the local link outward. A link-local 169.254/16 address usually means the client did not complete DHCP, not that the DHCP server deliberately leased that address.",
        ],
        flow: [
          "No offer: check link, VLAN, pool capacity, server, and relay",
          "Wrong subnet: check relay subnet information and selected pool",
          "Address conflict: check exclusions, static devices, and DECLINE logs",
          "Gateway or DNS wrong: inspect DHCP options",
          "Lease not renewing: inspect T1 traffic, server reachability, and expiry",
        ],
      },
      {
        title: "Failures and Security",
        paragraphs: [
          "If IPv4 DHCP fails, some systems self-assign an address from 169.254.0.0/16 using link-local addressing. That may support local communication but normally does not provide a default gateway to the Internet.",
        ],
        points: [
          "A rogue DHCP server can give clients a malicious gateway or DNS server.",
          "DHCP starvation consumes leases using many fake client identities.",
          "DHCP snooping can trust selected switch ports and build address bindings.",
          "A duplicate static address can still conflict with the managed pool if planning is poor.",
        ],
      },
    ],
    mechanism: {
      title: "How a client obtains and keeps a lease",
      steps: [
        "Broadcast DHCPDISCOVER from client port 68 toward server port 67.",
        "Receive one or more DHCPOFFER messages.",
        "Send DHCPREQUEST identifying the chosen offer.",
        "Apply configuration after DHCPACK and perform any conflict check.",
        "Renew at T1, rebind at T2 if necessary, or stop at expiry.",
      ],
    },
    example: {
      title: "One server for several VLANs",
      body: "A company places its DHCP server in a server VLAN. Each user VLAN gateway acts as a relay, forwards client requests with subnet information, and lets the server select a pool for the correct VLAN.",
    },
    misconception:
      "DHCP does not guarantee an address forever. A normal dynamic assignment is a lease that must be renewed.",
  },
  revise: {
    definition:
      "DHCP uses UDP and leases to automatically deliver IPv4 addressing and related network options.",
    sections: [
      {
        title: "DORA",
        points: [
          "Discover: find servers.",
          "Offer: propose configuration.",
          "Request: select an offer.",
          "Acknowledge: confirm the lease.",
        ],
      },
    ],
    essentials: [
      "Server uses UDP 67; client uses UDP 68.",
      "T1 is commonly 50 percent; T2 is commonly 87.5 percent.",
      "A relay carries DHCP between subnets.",
      "A NAK rejects an invalid requested configuration.",
      "169.254/16 is IPv4 link-local fallback, not normal Internet configuration.",
      "DECLINE reports a conflict; RELEASE returns a lease; INFORM asks for options.",
      "DHCPv6 does not provide the IPv6 default gateway; Router Advertisements do.",
    ],
    comparisonTitle: "Renewal vs rebinding",
    comparison: {
      left: {
        label: "Renewal at T1",
        points: ["Usually unicast", "Contact original server", "Commonly at 50 percent"],
      },
      right: {
        label: "Rebinding at T2",
        points: ["Normally broadcast", "Any server may answer", "Commonly at 87.5 percent"],
      },
    },
    followUp: "For a 24-hour lease, when do default T1 and T2 occur?",
  },
  lastMinute: {
    definition: "DHCP automatically leases IPv4 configuration to a client.",
    memoryLine: "Discover, Offer, Request, ACK; renew before expiry.",
    cues: [
      "Server port 67; client port 68.",
      "Initial exchange may use broadcast because the client is unconfigured.",
      "T1 = 50 percent; T2 = 87.5 percent by common default.",
      "Relay connects client broadcasts to a server on another subnet.",
    ],
    trap: "Do not say DHCP itself supplies Internet access. It supplies configuration that may include a usable gateway and DNS server.",
  },
};

export const framingStuffingAndCrc: SubjectTopic = {
  slug: "framing-stuffing-and-crc",
  title: "Framing, Bit Stuffing, and CRC",
  description:
    "Compare framing methods, solve byte and bit stuffing, and calculate a CRC remainder using modulo-2 division.",
  readTime: "29 min",
  difficulty: "Intermediate",
  tags: ["Framing", "Bit Stuffing", "CRC"],
  learn: {
    opening:
      "A receiver needs a reliable way to separate one frame from the next and detect corruption. Framing defines boundaries; stuffing protects reserved boundary patterns; CRC adds a strong error-detection value.",
    sections: [
      {
        title: "Framing Methods",
        dataTable: {
          headers: ["Method", "Boundary rule", "Main risk or solution"],
          rows: [
            ["Length or count", "Header states frame length", "Corrupt count can lose synchronization"],
            ["Byte-oriented", "Special flag bytes", "Escape reserved bytes with byte stuffing"],
            ["Bit-oriented", "Special flag bit pattern", "Insert zero bits with bit stuffing"],
            ["Physical coding", "Reserved signal violations", "Needs suitable line-code symbols"],
          ],
        },
        paragraphs: [
          "A protocol chooses a boundary technique appropriate for its medium and encoding. Ethernet uses physical synchronization plus explicit frame format rather than HDLC-style bit stuffing.",
        ],
      },
      {
        title: "Byte Stuffing Numerical",
        paragraphs: [
          "Suppose FLAG marks a frame boundary and ESC quotes a reserved byte. For data A FLAG B ESC C, the sender produces FLAG A ESC FLAG B ESC ESC C FLAG. The receiver removes the outside flags and then removes each quoting ESC.",
          "Stuffing must be reversible. The receiver treats an escaped FLAG as data, not as the end of the frame.",
        ],
      },
      {
        title: "Bit Stuffing Numerical",
        paragraphs: [
          "A bit-oriented protocol may reserve 01111110 as a flag. The sender inserts a 0 after every sequence of five consecutive 1 bits in the data. The receiver removes a 0 that follows five data 1s.",
          "For data 01111110, the sender stuffs one zero after the first five 1s, producing 011111010. This prevents the data from being mistaken for the boundary flag. The outside flags are added separately.",
        ],
      },
      {
        title: "CRC Core Idea",
        paragraphs: [
          "CRC treats a bit string as a polynomial over modulo-2 arithmetic. Addition and subtraction both become XOR, so there are no carries or borrows. If the generator has degree r, the sender appends r zero bits before division and sends the r-bit remainder with the data.",
          "The receiver divides the full received codeword by the same generator. Zero remainder means no detectable error was found; it does not prove that the bits are certainly correct because some error patterns can be undetected.",
        ],
      },
      {
        title: "CRC Numerical",
        paragraphs: [
          "Let data D = 1101 and generator G = 1011. The generator degree is 3, so append three zeros: 1101000. Modulo-2 division of 1101000 by 1011 gives remainder 001. The transmitted codeword is 1101001.",
          "Check: dividing 1101001 by 1011 gives remainder 000. If one transmitted bit changes, the receiver usually gets a nonzero remainder and discards or reports the damaged frame according to the protocol.",
          "The complete receiver check can be followed as successive XOR states. Starting with 1101001, the working bits become 0110001, 0011101, 0001011, and finally 0000000. The final three bits are the zero remainder.",
        ],
        dataTable: {
          headers: ["Step", "Value"],
          rows: [
            ["Data", "1101"],
            ["Generator", "1011, degree 3"],
            ["Dividend", "1101000"],
            ["Remainder", "001"],
            ["Codeword", "1101001"],
          ],
        },
      },
      {
        title: "Detecting a Corrupted Codeword",
        paragraphs: [
          "Suppose transmitted 1101001 changes to received 1100001. Dividing 1100001 by generator 1011 gives remainder 011, not 000. The receiver has detected corruption, although CRC alone does not identify which bit changed or repair it.",
        ],
      },
      {
        title: "Parity, Checksum, CRC, and Hamming Code",
        paragraphs: [
          "These mechanisms add different kinds of redundancy. Their names should not be used interchangeably.",
        ],
        dataTable: {
          headers: ["Method", "Core operation", "Typical ability"],
          rows: [
            ["Single parity", "Count odd or even 1 bits", "Detect every odd number of bit errors"],
            ["Two-dimensional parity", "Parity across rows and columns", "Locate one flipped bit in a block"],
            ["Internet checksum", "One's-complement word sum", "Simple corruption detection"],
            ["CRC", "Polynomial division using XOR", "Strong burst-error detection"],
            ["Hamming code", "Parity at selected bit positions", "Correct one-bit error in basic SEC form"],
          ],
        },
      },
      {
        title: "What CRC Can Detect",
        paragraphs: [
          "A suitable degree-r CRC detects all single-bit errors, many multi-bit errors, and every burst error of length at most r. Exact guarantees for double-bit, odd-bit, and longer burst errors depend on the selected generator polynomial.",
        ],
        table: {
          headers: ["Error detection", "Error correction"],
          rows: [
            ["Finds that data is likely damaged", "Locates or reconstructs damaged data"],
            ["CRC and checksum are examples", "Hamming code is a common study example"],
            ["Often followed by discard or retry", "Adds enough redundancy to repair selected errors"],
          ],
        },
      },
    ],
    mechanism: {
      title: "How to solve a CRC numerical",
      steps: [
        "Find r = generator length - 1.",
        "Append r zeros to the original data.",
        "Divide using XOR wherever the current leading bit is 1.",
        "Keep the final r-bit remainder, including leading zeros.",
        "Replace the appended zeros with the remainder and verify a zero receiver remainder.",
      ],
    },
    example: {
      title: "CRC is not encryption",
      body: "Anyone who changes a frame can recalculate an ordinary CRC. CRC protects against accidental transmission errors, not a deliberate attacker. Authentication requires a cryptographic mechanism such as a MAC in the security sense.",
    },
    misconception:
      "A zero CRC remainder does not mathematically guarantee an error-free frame. It means the received pattern passed the selected CRC test.",
  },
  revise: {
    definition:
      "Framing marks boundaries, stuffing protects reserved patterns, and CRC detects transmission errors using polynomial division with XOR.",
    sections: [
      {
        title: "Numerical Rules",
        points: [
          "Bit stuffing: insert 0 after five consecutive data 1s.",
          "CRC bits r = generator length - 1.",
          "Append r zeros before division.",
          "Modulo-2 subtraction is XOR.",
          "Transmit data followed by the r-bit remainder.",
        ],
      },
    ],
    essentials: [
      "Length, byte flag, bit flag, and coding violation are framing approaches.",
      "Byte stuffing quotes reserved bytes with an escape byte.",
      "Bit stuffing prevents data from reproducing the flag pattern.",
      "CRC detects errors; it does not correct them or provide authentication.",
      "Receiver expects a zero remainder for a valid CRC codeword.",
      "A degree-r CRC detects every burst error of length at most r.",
    ],
    comparisonTitle: "Byte stuffing vs bit stuffing",
    comparison: {
      left: {
        label: "Byte stuffing",
        points: ["Character-oriented", "Escape reserved bytes", "Works on whole-byte symbols"],
      },
      right: {
        label: "Bit stuffing",
        points: ["Bit-oriented", "Insert zero after five 1s", "Protects flag bit pattern"],
      },
    },
    followUp:
      "For data 1010 and generator 1101, how many zeros are appended before division?",
  },
  lastMinute: {
    definition: "Stuffing preserves frame boundaries; CRC detects corrupted bit patterns.",
    memoryLine: "Protect the flag, divide with XOR, send the remainder.",
    cues: [
      "Flag example: 01111110.",
      "Stuff 0 after five consecutive 1s.",
      "Generator degree equals CRC remainder length.",
      "CRC uses XOR, with no carry or borrow.",
    ],
    trap: "Do not use ordinary decimal division or subtraction when calculating CRC.",
  },
};
