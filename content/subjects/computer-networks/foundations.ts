import type { SubjectTopic } from "@/lib/subject-content";

export const introductionToComputerNetworks: SubjectTopic = {
  slug: "introduction-to-computer-networks",
  title: "Introduction to Computer Networks",
  description:
    "Understand what a network is, why we build one, and how networks differ by coverage and purpose.",
  readTime: "12 min",
  difficulty: "Foundation",
  tags: ["Networks", "LAN", "Internet"],
  learn: {
    opening:
      "A computer network is a group of connected devices that exchange data and share resources using agreed rules called protocols.",
    sections: [
      {
        title: "What a Computer Network Does",
        paragraphs: [
          "A network lets independent devices communicate. The devices may be laptops, phones, servers, printers, sensors, or routers. A connection may use copper cable, fiber, or radio waves.",
          "The connection alone is not enough. Both ends must follow the same protocol so they agree on message format, timing, addressing, and what to do when something goes wrong.",
        ],
        points: [
          "Communication: send messages, calls, files, and video.",
          "Resource sharing: use shared printers, storage, and internet connections.",
          "Remote access: reach applications and data from another location.",
          "Distributed work: let many computers cooperate on one service.",
        ],
      },
      {
        title: "The Parts of a Simple Network",
        paragraphs: [
          "Every communication has a sender, a receiver, some data, a path, and a protocol. A web request, for example, travels from a browser to a web server through several links and devices.",
        ],
        table: {
          headers: ["Part", "Meaning"],
          rows: [
            [
              "End device",
              "Creates or receives data, such as a laptop or server",
            ],
            ["Link", "Carries signals through cable, fiber, or wireless radio"],
            [
              "Intermediate device",
              "Forwards data, such as a switch or router",
            ],
            ["Protocol", "Defines the rules used by communicating devices"],
          ],
        },
      },
      {
        title: "Networks by Geographic Coverage",
        paragraphs: [
          "Network names often describe the area they cover. The border is not always exact, but the classification helps us compare typical size, ownership, and purpose.",
        ],
        visual: {
          src: "/notes/computer-networks/network-types.png",
          alt: "PAN, LAN, MAN, and WAN arranged from personal coverage to worldwide coverage",
          width: 1536,
          height: 1024,
          caption:
            "Coverage generally grows from a personal network to a wide area network.",
        },
        dataTable: {
          headers: ["Type", "Typical area", "Example", "Usual ownership"],
          rows: [
            [
              "PAN",
              "Around one person",
              "Phone connected to earbuds",
              "One person",
            ],
            [
              "LAN",
              "Home, lab, or building",
              "College computer lab",
              "One home or organization",
            ],
            [
              "MAN",
              "Town or city",
              "City-wide campus network",
              "Provider or large organization",
            ],
            [
              "WAN",
              "Country or worldwide",
              "Bank branches across India",
              "Several providers or organizations",
            ],
          ],
        },
      },
      {
        title: "Internet, Intranet, and Extranet",
        paragraphs: [
          "The Internet is the public network of interconnected networks. No single organization owns the entire Internet. Many independent networks cooperate through the TCP/IP protocol suite.",
          "An intranet uses network and web technologies inside one organization. An extranet gives selected outsiders, such as suppliers or customers, controlled access to part of that private system.",
        ],
        table: {
          headers: ["Network", "Who can use it"],
          rows: [
            ["Internet", "The public, subject to service access"],
            ["Intranet", "Members of one organization"],
            ["Extranet", "Authorized members plus selected outsiders"],
          ],
        },
      },
      {
        title: "How We Judge a Network",
        paragraphs: [
          "A fast network is not automatically a good network. We also care about whether it stays available and whether it protects its users and data.",
        ],
        points: [
          "Performance includes delay, throughput, and response time.",
          "Reliability includes failure rate, recovery time, and alternative paths.",
          "Security includes confidentiality, integrity, authentication, and availability.",
          "Scalability means the network can grow without a large loss of performance or manageability.",
        ],
      },
      {
        title: "Bandwidth, Throughput, Delay, and Loss",
        paragraphs: [
          "These terms describe different parts of network performance. Bandwidth is the maximum capacity of a link, while throughput is the useful rate actually achieved. A high-bandwidth link can still feel slow when delay, congestion, or packet loss is high.",
        ],
        dataTable: {
          headers: ["Term", "Simple meaning", "Common unit"],
          rows: [
            [
              "Bandwidth",
              "Maximum data-carrying capacity",
              "bit/s, Mbit/s, Gbit/s",
            ],
            [
              "Throughput",
              "Rate of successfully delivered data",
              "bit/s, Mbit/s, Gbit/s",
            ],
            ["Latency", "Time taken for data to travel", "ms"],
            ["Jitter", "Variation in packet delay", "ms"],
            [
              "Packet loss",
              "Packets that never reach the destination",
              "Percentage",
            ],
          ],
        },
      },
      {
        title: "Direction of Communication",
        paragraphs: [
          "Communication can also be classified by which side is allowed to send. This is different from client-server roles: a client-server application can use a full-duplex transport connection.",
        ],
        dataTable: {
          headers: ["Mode", "Direction", "Example"],
          rows: [
            [
              "Simplex",
              "Only one side sends",
              "Traditional keyboard to computer",
            ],
            [
              "Half-duplex",
              "Both sides send, but not at the same time",
              "Walkie-talkie",
            ],
            [
              "Full-duplex",
              "Both sides send at the same time",
              "Phone call or switched Ethernet",
            ],
          ],
        },
      },
    ],
    mechanism: {
      title: "How a simple network exchange happens",
      steps: [
        "An application creates data, such as a request for a web page.",
        "The sender follows network protocols to identify the destination and prepare the data for transmission.",
        "Links and intermediate devices carry the data toward the destination.",
        "The receiver interprets the data using the same protocol rules.",
        "The receiver may return a response through the network.",
      ],
    },
    example: {
      title: "Opening a page on college Wi-Fi",
      body: "Your phone creates a web request and sends it over Wi-Fi to an access point. The local network forwards it to a router, and provider networks carry it to the website's server. The server returns the page data through the same interconnected system, although the exact return path may differ.",
    },
    misconception:
      "The Internet and the Web are not the same thing. The Internet is the network infrastructure. The Web is one service that uses it, mainly through HTTP and HTTPS.",
  },
  revise: {
    definition:
      "A computer network connects devices so they can exchange data and share resources using common protocols.",
    sections: [
      {
        title: "Coverage Types",
        dataTable: {
          headers: ["Type", "Coverage", "Example"],
          rows: [
            ["PAN", "One person", "Phone and smartwatch"],
            ["LAN", "Building", "Office network"],
            ["MAN", "City", "Metropolitan network"],
            ["WAN", "Large region", "Internet"],
          ],
        },
      },
    ],
    essentials: [
      "A network needs devices, links, data, and protocols.",
      "PAN, LAN, MAN, and WAN describe increasing coverage.",
      "Internet is public, intranet is private, and extranet grants controlled outside access.",
      "Judge a network by performance, reliability, security, and scalability.",
      "Bandwidth is capacity; throughput is the useful rate actually achieved.",
      "Latency is delay, jitter is delay variation, and packet loss means missing packets.",
    ],
    comparisonTitle: "Internet vs intranet",
    comparison: {
      left: {
        label: "Internet",
        points: [
          "Public network of networks",
          "No single owner",
          "Globally reachable",
        ],
      },
      right: {
        label: "Intranet",
        points: [
          "Private organizational network",
          "Controlled by one organization",
          "Restricted access",
        ],
      },
    },
    followUp:
      "Why does a network require common protocols in addition to a physical connection?",
  },
  lastMinute: {
    definition:
      "Network = connected devices + communication links + agreed protocols.",
    memoryLine: "PAN is personal, LAN is local, MAN is a city, WAN is wide.",
    cues: [
      "Internet: public network of networks.",
      "Intranet: private to an organization.",
      "Extranet: controlled access for selected outsiders.",
      "Core criteria: performance, reliability, security, scalability.",
      "Simplex: one direction. Half-duplex: take turns. Full-duplex: both directions together.",
    ],
    trap: "Do not call every large network the Internet. A private WAN can connect distant offices without being the public Internet.",
  },
};

export const networkCommunicationModels: SubjectTopic = {
  slug: "network-communication-models",
  title: "Network Communication Models",
  description:
    "Compare client-server and peer-to-peer systems, then separate stateless messages from stateful conversations.",
  readTime: "11 min",
  difficulty: "Foundation",
  tags: ["Client-server", "P2P", "State"],
  learn: {
    opening:
      "A communication model describes how devices divide responsibilities and how one side interacts with another.",
    sections: [
      {
        title: "Client-Server Communication",
        paragraphs: [
          "A client asks for a service, and a server provides it. The roles describe the interaction, not a particular type of hardware. A laptop can run client software, server software, or both.",
          "Web browsing is a familiar example. The browser is the client for an HTTP exchange, while the website host is the server. One server service may handle requests from many clients.",
        ],
        points: [
          "Central control makes data and policy easier to manage.",
          "Dedicated servers can provide predictable service.",
          "The server may become a bottleneck or failure point unless the design adds capacity and redundancy.",
          "Examples include websites, email, banking, and database applications.",
        ],
        visual: {
          src: "/notes/computer-networks/client-server-vs-peer-to-peer.png",
          alt: "Client-server communication compared with direct peer-to-peer sharing",
          width: 1536,
          height: 1024,
          caption:
            "Client-server uses a central service. Peers can communicate directly with one another.",
        },
      },
      {
        title: "Peer-to-Peer Communication",
        paragraphs: [
          "In a peer-to-peer system, participating devices can both request and provide resources. Peers communicate directly instead of depending on one central server for every transfer.",
          "P2P can distribute storage, bandwidth, and work across many devices. It is harder to coordinate because peers may join, leave, or have different speeds and security levels.",
        ],
        table: {
          headers: ["Client-server", "Peer-to-peer"],
          rows: [
            [
              "Roles are clearly separated",
              "A peer can act as client and server",
            ],
            ["Central management is simpler", "Control is more distributed"],
            [
              "Server capacity limits the service",
              "Resources can grow with peers",
            ],
            [
              "Examples: web and email",
              "Examples: file sharing and blockchains",
            ],
          ],
        },
      },
      {
        title: "Centralized, Decentralized, and Distributed Systems",
        paragraphs: [
          "These words describe where control and work are placed. A centralized system depends mainly on one controlling service. A decentralized system has several controlling authorities. A distributed system runs work across multiple connected computers and may still be centrally controlled.",
          "The terms are related but not interchangeable. For example, a company may operate a distributed web service across many servers while keeping one central administration team.",
        ],
        dataTable: {
          headers: ["Design", "Main idea", "Typical concern"],
          rows: [
            [
              "Centralized",
              "One main control point",
              "Bottleneck or single point of failure",
            ],
            [
              "Decentralized",
              "Control is shared by several authorities",
              "Coordination and consistency",
            ],
            [
              "Distributed",
              "Work or data spans multiple computers",
              "Communication and partial failures",
            ],
          ],
        },
      },
      {
        title: "Request and Response",
        paragraphs: [
          "Many application protocols use request and response. A client sends a message that asks for an action or resource. The server returns a response containing a result, data, or error.",
          "Request-response does not mean that only one transport packet is used. One logical request can require many packets, acknowledgments, and retransmissions underneath.",
        ],
        flow: [
          "Client creates a request",
          "Network carries the request",
          "Server processes it",
          "Network carries the response",
          "Client uses the result",
        ],
      },
      {
        title: "Stateless and Stateful Interactions",
        paragraphs: [
          "A stateless service treats each request as self-contained. The request includes the information needed to process it, so the server does not need to remember an earlier request to understand the current one.",
          "A stateful service remembers context across interactions. That state might include a logged-in session, a game position, or an active transaction. Stateful systems need a way to store, locate, and recover that context.",
        ],
        table: {
          headers: ["Stateless", "Stateful"],
          rows: [
            [
              "Each request stands on its own",
              "Later actions depend on stored context",
            ],
            [
              "Easier to distribute between servers",
              "Needs state storage or session coordination",
            ],
            [
              "Failure loses less interaction context",
              "Failure may interrupt an active session",
            ],
            [
              "Example: public search request",
              "Example: online multiplayer session",
            ],
          ],
        },
      },
      {
        title: "Hybrid Designs Are Common",
        paragraphs: [
          "Real applications often combine models. A messaging app may use central servers for login and contact discovery, then use direct peer connections for a call when possible.",
          "HTTP is described as stateless, but a web application can still remember a user through cookies, tokens, or server-side session data. The protocol property and application behavior must not be confused.",
        ],
      },
      {
        title: "Thin Clients, Thick Clients, and MVC",
        paragraphs: [
          "A thin client performs little application processing and depends heavily on a server. A thick client performs more processing and may continue some work without the server. These are design choices, not separate network protocols.",
          "Model-View-Controller, or MVC, is an application design pattern from the course notes. It separates data and business rules, the user interface, and input-handling logic. MVC can be used inside a client-server application, but it does not describe how packets move through a network.",
        ],
        dataTable: {
          headers: ["MVC part", "Responsibility", "Example"],
          rows: [
            ["Model", "Data and business rules", "User data and validation"],
            ["View", "Presents information", "Web page or application screen"],
            [
              "Controller",
              "Handles input and coordinates work",
              "Login request handler",
            ],
          ],
        },
      },
    ],
    mechanism: {
      title: "How to identify a communication model",
      steps: [
        "Find who asks for the resource or action.",
        "Find who provides it and whether that provider is central.",
        "Check whether participants keep fixed roles or can exchange roles.",
        "Check whether each message is independent or depends on stored context.",
        "Classify the interaction, while allowing a larger system to combine several models.",
      ],
    },
    example: {
      title: "A video call application",
      body: "The app first contacts central servers to authenticate users and locate the person being called. Media may then flow directly between peers, or through a relay when direct communication is not possible. The same application therefore uses both client-server and peer-to-peer ideas.",
    },
    misconception:
      "Stateless does not mean insecure or unable to recognize a user. A self-contained token can identify the user on every request without requiring the server to remember the previous request.",
  },
  revise: {
    definition:
      "Client-server separates service requester and provider. Peer-to-peer lets devices provide resources directly to one another.",
    sections: [
      {
        title: "State",
        table: {
          headers: ["Stateless", "Stateful"],
          rows: [
            [
              "Request is self-contained",
              "Server remembers interaction context",
            ],
            ["Simpler horizontal distribution", "Needs coordinated state"],
          ],
        },
      },
    ],
    essentials: [
      "Client asks; server provides.",
      "A peer can both request and provide resources.",
      "Request-response is an application interaction, not a packet count.",
      "Real systems often combine centralized and peer communication.",
      "Distributed describes where work runs; decentralized describes where control lies.",
      "MVC separates Model, View, and Controller inside an application.",
    ],
    comparisonTitle: "Central service vs direct peers",
    comparison: {
      left: {
        label: "Client-server",
        points: [
          "Central control",
          "Simpler management",
          "Server needs capacity and redundancy",
        ],
      },
      right: {
        label: "Peer-to-peer",
        points: [
          "Distributed participants",
          "Direct sharing",
          "Coordination is harder",
        ],
      },
    },
    followUp:
      "How can an HTTP application remember a login even though HTTP is stateless?",
  },
  lastMinute: {
    definition:
      "Client-server centralizes a service. P2P distributes service among peers.",
    memoryLine: "Stateless remembers no conversation; stateful keeps context.",
    cues: [
      "Client and server are software roles.",
      "P2P devices can exchange roles.",
      "One request may use many packets.",
      "Applications can combine both models.",
      "Thin client depends more on the server; thick client performs more work locally.",
      "MVC is an application pattern, not a network protocol.",
    ],
    trap: "Do not say a stateless service stores no data. It may store data; it simply does not need earlier interaction context to understand each request.",
  },
};

export const osiAndTcpIpModels: SubjectTopic = {
  slug: "osi-and-tcp-ip-models",
  title: "OSI and TCP/IP Models",
  description:
    "Learn what each layer does and how the seven-layer OSI model maps to the practical TCP/IP stack.",
  readTime: "18 min",
  difficulty: "Foundation",
  tags: ["OSI", "TCP/IP", "Layers"],
  learn: {
    opening:
      "Layered models divide network communication into smaller jobs so protocols can cooperate without every part needing to understand every other part.",
    sections: [
      {
        title: "Why Networking Uses Layers",
        paragraphs: [
          "Sending data across the Internet requires many jobs: application rules, reliable delivery, addressing, local frame delivery, and physical signaling. A layered design gives each job a clear boundary.",
          "A layer offers a service to the layer above and uses the service of the layer below. This separation lets an application use Ethernet or Wi-Fi without rewriting the application protocol for each medium.",
        ],
        points: [
          "Modularity: one layer can change while its interface remains stable.",
          "Interoperability: vendors can implement shared standards.",
          "Troubleshooting: problems can be isolated by layer.",
          "Learning: a complex journey becomes a sequence of smaller responsibilities.",
        ],
      },
      {
        title: "Names and Exam Facts",
        paragraphs: [
          "OSI stands for Open Systems Interconnection and was standardized by ISO. TCP/IP stands for Transmission Control Protocol/Internet Protocol and grew from work funded by the United States Department of Defense for ARPANET. For exams, remember that OSI is mainly a seven-layer reference model, while TCP/IP is the protocol suite used by the Internet.",
          "A useful top-to-bottom OSI mnemonic is: All People Seem To Need Data Processing. It represents Application, Presentation, Session, Transport, Network, Data Link, and Physical.",
        ],
      },
      {
        title: "The Seven OSI Layers",
        paragraphs: [
          "The OSI model is a conceptual reference model. It is valuable for describing responsibilities and troubleshooting, even though Internet protocols do not always fit its boundaries perfectly.",
        ],
        dataTable: {
          headers: ["Layer", "Main responsibility", "Examples"],
          rows: [
            [
              "7 Application",
              "Network services used by applications",
              "HTTP, DNS, SMTP",
            ],
            [
              "6 Presentation",
              "Data format, compression, encryption",
              "Text encoding, image format",
            ],
            [
              "5 Session",
              "Starts, manages, and ends dialogs",
              "Checkpoints, session control",
            ],
            [
              "4 Transport",
              "Process delivery, reliability, flow control",
              "TCP, UDP",
            ],
            ["3 Network", "Logical addressing and routing", "IPv4, IPv6, ICMP"],
            [
              "2 Data Link",
              "Frames and local link delivery",
              "Ethernet, Wi-Fi, MAC",
            ],
            ["1 Physical", "Transmits bits as signals", "Copper, fiber, radio"],
          ],
        },
      },
      {
        title: "The TCP/IP Model",
        paragraphs: [
          "The TCP/IP model describes the protocol stack used by the Internet. Its layers are broader than the OSI layers because several OSI responsibilities are grouped together.",
        ],
        dataTable: {
          headers: ["TCP/IP layer", "Responsibility", "Examples"],
          rows: [
            [
              "Application",
              "Application data and communication rules",
              "HTTP, DNS, SMTP, SSH",
            ],
            ["Transport", "End-to-end process communication", "TCP, UDP"],
            ["Internet", "Addressing and routing across networks", "IP, ICMP"],
            [
              "Network Access",
              "Local framing and physical transmission",
              "Ethernet, Wi-Fi",
            ],
          ],
        },
      },
      {
        title: "Connection-Oriented and Connectionless Service",
        paragraphs: [
          "At the Transport layer, TCP is connection-oriented: it establishes transport state and provides ordered, reliable byte delivery. UDP is connectionless: it sends independent datagrams without guaranteeing delivery, order, or duplicate protection.",
          "Connectionless does not mean that an application cannot be reliable. An application can add acknowledgments or recovery above UDP when it needs them.",
        ],
        table: {
          headers: ["TCP", "UDP"],
          rows: [
            ["Connection-oriented", "Connectionless"],
            [
              "Reliable and ordered byte stream",
              "Best-effort independent datagrams",
            ],
            [
              "More transport control",
              "Smaller transport header and no setup handshake",
            ],
          ],
        },
      },
      {
        title: "OSI to TCP/IP Mapping",
        paragraphs: [
          "The top three OSI layers map to the TCP/IP Application layer. The middle Transport and Network responsibilities map directly. The bottom two OSI layers combine into Network Access.",
        ],
        visual: {
          src: "/notes/computer-networks/osi-tcp-ip-mapping.png",
          alt: "The seven OSI layers mapped to the four TCP/IP layers",
          width: 1536,
          height: 1024,
          caption:
            "TCP/IP groups several OSI responsibilities into broader layers.",
        },
      },
      {
        title: "Protocol, Service, and Device Examples",
        paragraphs: [
          "A protocol defines rules followed by peer entities, such as TCP at one host communicating logically with TCP at another host. A service is what a layer provides upward, such as reliable transport for an application.",
          "Device-layer labels are useful shortcuts, not absolute limits. A router primarily forwards at Layer 3, but a modern router may also inspect transport ports or application traffic for security and management.",
        ],
        table: {
          headers: ["Item", "Primary layer"],
          rows: [
            ["Hub or repeater", "Physical"],
            ["Bridge or switch", "Data Link"],
            ["Router", "Network"],
            ["Web proxy", "Application"],
          ],
        },
      },
      {
        title: "Using Layers to Troubleshoot",
        paragraphs: [
          "Start low and move upward. If there is no Wi-Fi association or cable signal, an HTTP setting cannot fix the problem. If IP connectivity works but a domain name does not resolve, investigate DNS at the Application layer.",
        ],
        flow: [
          "Physical link available?",
          "Local frame delivery working?",
          "Valid IP and route present?",
          "Transport connection succeeds?",
          "Application protocol responds?",
        ],
      },
    ],
    mechanism: {
      title: "How layers cooperate when data is sent",
      steps: [
        "The Application layer creates a message according to an application protocol.",
        "The Transport layer identifies the application endpoints and provides its delivery behavior.",
        "The Internet or Network layer adds logical addressing for routing across networks.",
        "The Network Access layers prepare a frame and signals for the current local link.",
        "The receiver processes the information upward in the reverse order.",
      ],
    },
    example: {
      title: "Loading a secure website",
      body: "HTTPS defines the application exchange, TCP or QUIC provides transport behavior, IP carries packets across routers, Ethernet or Wi-Fi delivers each local frame, and the physical medium carries signals. Each layer handles a different part of one page load.",
    },
    misconception:
      "OSI is not the protocol stack that the Internet literally runs. It is a reference model. TCP/IP is the practical family of protocols used by the Internet.",
  },
  revise: {
    definition:
      "OSI has seven conceptual layers. TCP/IP uses four broader layers for practical Internet communication.",
    sections: [
      {
        title: "Layer Mapping",
        dataTable: {
          headers: ["OSI", "TCP/IP"],
          rows: [
            ["Application + Presentation + Session", "Application"],
            ["Transport", "Transport"],
            ["Network", "Internet"],
            ["Data Link + Physical", "Network Access"],
          ],
        },
      },
    ],
    essentials: [
      "Application: user-facing network protocols.",
      "Transport: process-to-process communication.",
      "Network or Internet: IP addressing and routing.",
      "Data Link and Network Access: local frame delivery.",
      "Physical: bits represented as signals.",
      "OSI was standardized by ISO; TCP/IP is the practical Internet protocol suite.",
      "TCP is connection-oriented; UDP is connectionless.",
    ],
    comparisonTitle: "OSI vs TCP/IP",
    comparison: {
      left: {
        label: "OSI",
        points: [
          "Seven layers",
          "Conceptual reference model",
          "Fine separation of responsibilities",
        ],
      },
      right: {
        label: "TCP/IP",
        points: [
          "Four broad layers",
          "Practical Internet model",
          "Built around the Internet protocol suite",
        ],
      },
    },
    followUp:
      "Why can the same web application work over both Ethernet and Wi-Fi?",
  },
  lastMinute: {
    definition:
      "OSI explains seven jobs; TCP/IP groups them into four practical layers.",
    memoryLine: "Application, Transport, Internet, Network Access.",
    cues: [
      "OSI 7-6-5 maps to TCP/IP Application.",
      "OSI 4 maps to Transport.",
      "OSI 3 maps to Internet.",
      "OSI 2-1 maps to Network Access.",
      "Router: mainly Layer 3. Switch: mainly Layer 2. Hub: Layer 1.",
      "Mnemonic: All People Seem To Need Data Processing.",
    ],
    trap: "Do not list ARP as a clean Application-layer protocol. It supports local address resolution near the boundary of the Network and Data Link responsibilities.",
  },
};

export const encapsulationAndPacketJourney: SubjectTopic = {
  slug: "encapsulation-and-packet-journey",
  title: "Encapsulation and the Packet Journey",
  description:
    "Follow application data as headers are added, frames cross local links, and the destination removes each layer.",
  readTime: "17 min",
  difficulty: "Intermediate",
  tags: ["Encapsulation", "Packets", "Addresses"],
  learn: {
    opening:
      "Encapsulation is the process of wrapping application data with control information as it moves down the network stack.",
    sections: [
      {
        title: "Protocol Data Units",
        paragraphs: [
          "Each layer views the information in its own form. The names help us state which layer is doing the work. In everyday speech, people often say packet for many forms, but exam answers should use the specific names.",
        ],
        dataTable: {
          headers: [
            "Layer",
            "Common data-unit name",
            "Important control information",
          ],
          rows: [
            ["Application", "Data or message", "Application-specific fields"],
            [
              "Transport",
              "TCP segment or UDP datagram",
              "Ports and transport control",
            ],
            ["Network", "IP packet or datagram", "Source and destination IP"],
            ["Data Link", "Frame", "Source and destination MAC, error check"],
            ["Physical", "Bits", "Electrical, light, or radio signals"],
          ],
        },
      },
      {
        title: "Encapsulation and Decapsulation",
        paragraphs: [
          "At the sender, each lower layer treats the result from the layer above as payload and adds its own header. The Data Link layer may also add a trailer for error detection.",
          "At the receiver, each layer reads and removes the control information meant for it, then passes the remaining payload upward. This reverse process is decapsulation.",
        ],
        visual: {
          src: "/notes/computer-networks/encapsulation-decapsulation.png",
          alt: "Application data becoming a TCP segment, IP packet, Ethernet frame, and bits before decapsulation",
          width: 1536,
          height: 1024,
          caption:
            "Every lower layer wraps the data for its own job. The receiver unwraps it in reverse order.",
        },
      },
      {
        title: "MAC, IP, and Port Numbers",
        paragraphs: [
          "The three address types answer different questions. A port identifies an application process, an IP address identifies an interface for end-to-end network delivery, and a MAC address identifies the next interface on the current local link.",
        ],
        dataTable: {
          headers: ["Identifier", "Identifies", "Scope", "Example"],
          rows: [
            [
              "Port",
              "Application process",
              "Transport endpoint",
              "HTTPS server port 443",
            ],
            [
              "IP address",
              "Network interface",
              "Across routed networks",
              "192.0.2.20",
            ],
            [
              "MAC address",
              "Link interface",
              "Current local link",
              "00:1A:2B:3C:4D:5E",
            ],
          ],
        },
        visual: {
          src: "/notes/computer-networks/address-scope-across-hops.png",
          alt: "IP addresses and port numbers remaining end to end while MAC addresses change at router hops",
          width: 1536,
          height: 1024,
          caption:
            "Without translation, endpoint IP addresses and transport ports identify the conversation while each link uses a new frame and MAC pair.",
        },
      },
      {
        title: "Choosing the Next Hop",
        paragraphs: [
          "For a local destination, the frame uses the destination host's MAC address. For a remote destination, the IP destination stays remote but the first frame uses the default gateway's MAC address. ARP and its cache are covered fully in the Data Link module.",
        ],
        flow: [
          "Use the subnet mask to decide whether the destination is local",
          "Choose the destination host or default gateway as the next hop",
          "Resolve that next hop to a local link address",
          "Build the frame with the learned destination MAC address",
        ],
      },
      {
        title: "Same Network or Different Network",
        paragraphs: [
          "A host uses its subnet information to decide whether a destination is local. For a local destination, it creates a frame addressed to that destination's MAC address and sends it through the switch.",
          "For a remote destination, the host keeps the remote destination IP in the packet but addresses the first frame to the default gateway's MAC address. The router removes that frame and creates another frame for its next link.",
        ],
        visual: {
          src: "/notes/computer-networks/same-vs-different-network.png",
          alt: "Direct delivery through a switch compared with remote delivery through a default gateway",
          width: 1536,
          height: 1024,
          caption:
            "A remote IP packet is first framed for the default gateway, not directly for the remote host's MAC address.",
        },
      },
      {
        title: "What a Router Changes",
        paragraphs: [
          "A router receives a frame, verifies and removes the link-layer wrapper, examines the destination IP address, decreases the IP Time To Live value, chooses a next hop, and places the packet into a new frame for the outgoing link.",
          "The frame is therefore hop-by-hop. The IP packet is primarily end-to-end, although some network devices may translate addresses, and routers update fields such as TTL and the IPv4 header checksum.",
        ],
        points: [
          "Switches forward frames inside a LAN using MAC addresses.",
          "Routers forward packets between networks using IP prefixes.",
          "A new frame is created for each routed link.",
          "Transport information is normally used by the end hosts, not ordinary routers.",
        ],
      },
      {
        title: "Address Changes Across Router Hops",
        paragraphs: [
          "Assume host A sends to server B through two routers and no NAT is used. The endpoint IP addresses and transport ports continue to identify the same conversation, but every routed link receives a new frame with a new source and destination MAC pair.",
        ],
        dataTable: {
          headers: [
            "Link",
            "Packet destination IP",
            "Frame source MAC",
            "Frame destination MAC",
          ],
          rows: [
            [
              "Host A to Router 1",
              "Server B",
              "Host A",
              "Router 1 incoming interface",
            ],
            [
              "Router 1 to Router 2",
              "Server B",
              "Router 1 outgoing interface",
              "Router 2 incoming interface",
            ],
            [
              "Router 2 to Server B",
              "Server B",
              "Router 2 outgoing interface",
              "Server B",
            ],
          ],
        },
      },
      {
        title: "FCS, MTU, Fragmentation, and NAT",
        paragraphs: [
          "Each routed link receives a new frame and FCS. MTU limits the network-layer packet that a link can carry without fragmentation.",
          "IP addresses and ports are normally end to end, but NAT, PAT, proxies, and tunnel endpoints can change or wrap them. Detailed fragmentation and NAT behavior appears in the Network Layer module.",
        ],
      },
    ],
    mechanism: {
      title: "A web request from laptop to server",
      steps: [
        "The browser creates an HTTP request as application data.",
        "The transport protocol adds source and destination port information.",
        "IP adds source and destination IP addresses to form a packet.",
        "Ethernet or Wi-Fi places that packet inside a frame for the next local hop.",
        "The physical layer transmits bits as signals.",
        "Each router replaces the frame for the next link while forwarding the IP packet.",
        "The destination decapsulates the information and gives the request to the correct server process.",
      ],
    },
    example: {
      title: "Sending to a server outside your home",
      body: "Your laptop sees that the server IP is outside the home subnet. It keeps the server IP as the packet destination but uses the home router's MAC as the first frame destination. The home router then builds a different frame for its provider-facing link.",
    },
    misconception:
      "A frame does not normally travel unchanged from sender to remote receiver. Routers remove the incoming frame and build a new one for every outgoing link.",
  },
  revise: {
    definition:
      "Encapsulation adds layer-specific control information at the sender. Decapsulation removes it at the receiver.",
    sections: [
      {
        title: "Data-unit Order",
        flow: [
          "Application data",
          "Segment or datagram",
          "IP packet",
          "Frame",
          "Bits",
        ],
      },
      {
        title: "Address Roles",
        dataTable: {
          headers: ["Address", "Question answered"],
          rows: [
            ["Port", "Which application process?"],
            ["IP", "Which network endpoint?"],
            ["MAC", "Which interface on this local link?"],
          ],
        },
      },
    ],
    essentials: [
      "Headers are added downward and removed upward.",
      "Transport creates a segment or datagram.",
      "IP creates a packet; Data Link creates a frame.",
      "A router replaces the frame for the next hop.",
      "Remote delivery first uses the default gateway's MAC address.",
      "ARP resolves a next-hop IPv4 address to a MAC address; IPv6 uses Neighbor Discovery.",
      "NAT may change endpoint IP addresses and transport ports.",
    ],
    followUp:
      "Why does a remote packet use the server's IP address but the gateway's MAC address on the first link?",
  },
  lastMinute: {
    definition:
      "Data becomes segment, packet, frame, then bits; the receiver reverses the order.",
    memoryLine:
      "Port finds the process, IP finds the endpoint, MAC finds the next local interface.",
    cues: [
      "Application: data.",
      "Transport: segment or datagram.",
      "Network: packet.",
      "Data Link: frame.",
      "Physical: bits and signals.",
      "At each router: old frame removed, TTL reduced, new frame and FCS created.",
      "MTU limits the packet size that a link can carry without fragmentation.",
    ],
    trap: "Do not say the destination MAC in the first frame is the remote server's MAC. For a remote network, it is the default gateway's MAC.",
  },
};

export const networkTopologiesAndDevices: SubjectTopic = {
  slug: "network-topologies-and-devices",
  title: "Network Topologies and Devices",
  description:
    "Compare physical connection patterns and understand how common devices move data through a network.",
  readTime: "18 min",
  difficulty: "Foundation",
  tags: ["Topologies", "Switch", "Router"],
  learn: {
    opening:
      "A topology describes how network nodes and links are arranged. Network devices then repeat, filter, or route traffic through that arrangement.",
    sections: [
      {
        title: "Physical and Logical Topology",
        paragraphs: [
          "Physical topology describes the actual cables, radios, devices, and connection points. Logical topology describes how data flows. The two views can differ.",
          "For example, early shared Ethernet could be wired like a physical star around a hub while behaving like one shared logical bus because every signal reached every device.",
        ],
      },
      {
        title: "Common Network Topologies",
        paragraphs: [
          "No topology is best in every situation. A design trades cost, fault tolerance, expansion, cable use, and ease of management.",
        ],
        visual: {
          src: "/notes/computer-networks/network-topologies.png",
          alt: "Bus, star, ring, mesh, tree, and hybrid network topologies",
          width: 1536,
          height: 1024,
          caption:
            "Each topology arranges nodes and links differently, creating different costs and failure behavior.",
        },
        dataTable: {
          headers: ["Topology", "Main idea", "Strength", "Main weakness"],
          rows: [
            [
              "Bus",
              "All nodes share one backbone",
              "Low cable use",
              "Backbone failure affects all",
            ],
            [
              "Star",
              "Every node connects to a center",
              "Easy to add and isolate nodes",
              "Center is critical",
            ],
            [
              "Ring",
              "Each node has two neighbors",
              "Orderly path",
              "A break can interrupt the ring",
            ],
            [
              "Mesh",
              "Nodes have several direct links",
              "High redundancy",
              "High link and port cost",
            ],
            [
              "Tree",
              "Stars form a hierarchy",
              "Scales in branches",
              "Upper failure affects descendants",
            ],
            [
              "Hybrid",
              "Combines topology types",
              "Flexible",
              "Design and management are complex",
            ],
          ],
        },
      },
      {
        title: "The Full-Mesh Numerical",
        paragraphs: [
          "In a full mesh, every unordered pair of nodes needs one direct link. With n nodes, the number of links is n(n - 1) / 2. Each node needs n - 1 network connections for the mesh links.",
          "For 6 nodes, links = 6 x 5 / 2 = 15. Each node needs 5 link interfaces. This calculation assumes one bidirectional link per node pair.",
          "Reverse example: if a full mesh contains 28 links, solve n(n - 1) / 2 = 28. This gives n(n - 1) = 56, so n = 8. If one new node joins a full mesh that already has n nodes, exactly n new links are required.",
        ],
        points: [
          "Links in full mesh: n(n - 1) / 2.",
          "Mesh ports per node: n - 1.",
          "Total link endpoints: n(n - 1), which is twice the number of links.",
          "Partial mesh has selected redundant links, so the full-mesh formula does not apply directly.",
        ],
      },
      {
        title: "Hub, Switch, and Router",
        paragraphs: [
          "A hub repeats incoming bits to every other port. It does not learn addresses, so all connected devices share the same collision domain.",
          "A switch learns which source MAC addresses appear on which ports and forwards ordinary unicast frames only where needed. A router connects different IP networks and chooses a next hop using the destination IP prefix.",
        ],
        visual: {
          src: "/notes/computer-networks/hub-switch-router.png",
          alt: "Hub copying traffic to all devices, switch forwarding by MAC, and router forwarding between networks by IP",
          width: 1536,
          height: 1024,
          caption:
            "Hub repeats bits, switch forwards local frames, and router forwards packets between networks.",
        },
        dataTable: {
          headers: [
            "Device",
            "Primary layer",
            "Decision information",
            "Main job",
          ],
          rows: [
            ["Hub", "Physical", "None", "Repeat signals to all ports"],
            [
              "Bridge or switch",
              "Data Link",
              "MAC address",
              "Connect LAN segments and forward frames",
            ],
            [
              "Router",
              "Network",
              "IP prefix",
              "Connect networks and forward packets",
            ],
          ],
        },
      },
      {
        title: "How an Ethernet Switch Learns and Forwards",
        paragraphs: [
          "A Layer 2 switch learns from the source MAC address of each arriving frame. It records the source MAC and incoming port in its MAC address table. It then checks the destination MAC to decide what to do.",
        ],
        flow: [
          "Learn the source MAC address on the incoming port",
          "Forward a known unicast only through the recorded destination port",
          "Filter the frame if the destination is on the same incoming port",
          "Flood an unknown unicast through the other ports in the same VLAN",
          "Flood a Layer 2 broadcast through the other ports in the same VLAN",
        ],
      },
      {
        title: "NICs and Ethernet Cables",
        paragraphs: [
          "A network interface card, or NIC, connects a device to a network. A device can have several interfaces, such as Ethernet and Wi-Fi, and each interface can have its own link-layer address.",
          "Traditionally, a straight-through Ethernet cable connected unlike devices, such as a computer to a switch. A crossover cable connected like devices, such as switch to switch. Most modern Ethernet interfaces support Auto MDI-X and automatically adjust, so either cable wiring may work.",
        ],
        dataTable: {
          headers: ["Cable", "Traditional use", "Pin arrangement"],
          rows: [
            [
              "Straight-through",
              "Unlike devices: PC-switch, switch-router",
              "Same wiring standard at both ends",
            ],
            [
              "Crossover",
              "Like devices: PC-PC, switch-switch",
              "Transmit and receive pairs crossed",
            ],
          ],
        },
      },
      {
        title: "Other Important Devices",
        paragraphs: [
          "Several common products combine more than one role. A home Wi-Fi router usually contains a router, Ethernet switch, wireless access point, DHCP service, NAT function, and basic firewall in one box.",
        ],
        dataTable: {
          headers: ["Device", "Purpose"],
          rows: [
            ["Repeater", "Regenerates or repeats a weakened signal"],
            ["Wireless access point", "Bridges wireless devices into a LAN"],
            [
              "Modem",
              "Adapts signals for an access technology used by the provider",
            ],
            [
              "Gateway",
              "Connects systems, often translating protocols or serving as the route out",
            ],
            [
              "Firewall",
              "Allows or blocks traffic according to security rules",
            ],
            [
              "Load balancer",
              "Distributes service requests across several servers",
            ],
          ],
        },
      },
      {
        title: "Collision and Broadcast Domains",
        paragraphs: [
          "A collision domain is a part of a network where simultaneous transmissions can interfere. A hub keeps all ports in one collision domain. A switch gives each port a separate collision domain.",
          "A broadcast domain is the area reached by a Layer 2 broadcast. A normal switch forwards broadcasts within its LAN or VLAN. A router does not forward ordinary Layer 2 broadcasts between networks.",
        ],
        table: {
          headers: ["Boundary", "Meaning"],
          rows: [
            ["Switch port", "Separates collision domains"],
            ["Router interface", "Separates broadcast domains and IP networks"],
          ],
        },
      },
      {
        title: "Domain-Counting Numericals",
        paragraphs: [
          "For exam questions, first identify hubs, used switch ports, VLANs, and router interfaces. Unless a diagram states otherwise, a hub is one shared collision domain, every used switch port is a separate collision domain, and each VLAN or routed LAN is a separate broadcast domain.",
        ],
        points: [
          "Eight devices on one hub: 1 collision domain and 1 broadcast domain.",
          "Eight devices using eight switch ports in one VLAN: 8 collision domains and 1 broadcast domain.",
          "A switch divided into three VLANs: 3 broadcast domains.",
          "A router connecting three separate LANs: 3 broadcast domains.",
        ],
      },
    ],
    mechanism: {
      title: "How to choose a topology and device",
      steps: [
        "List the nodes, physical distance, expected traffic, and growth requirement.",
        "Decide how much link or central-device failure the network must tolerate.",
        "Choose a topology that balances redundancy, cable cost, and management.",
        "Use switches for efficient local frame delivery inside a LAN.",
        "Use routers where traffic must move between different IP networks.",
        "Add wireless access, security, or traffic distribution devices only for the roles the design needs.",
      ],
    },
    example: {
      title: "A college computer lab",
      body: "Each desktop connects in a physical star to a central switch. The switch handles local frames and gives every port its own collision domain. An uplink connects the switch to a router, which reaches other campus networks and the Internet. An access point can bridge wireless devices into the same or a separate LAN.",
    },
    misconception:
      "A Wi-Fi router is not only a router. Consumer devices commonly combine routing, switching, wireless access, address assignment, NAT, and firewall functions.",
  },
  revise: {
    definition:
      "Topology describes the arrangement of network links and nodes. Devices move data according to their layer and role.",
    sections: [
      {
        title: "Device Decisions",
        dataTable: {
          headers: ["Device", "Uses", "Forwards"],
          rows: [
            ["Hub", "No address table", "Bits to all ports"],
            ["Switch", "MAC table", "Frames inside a LAN"],
            ["Router", "Routing table", "Packets between networks"],
          ],
        },
      },
      {
        title: "Full Mesh",
        points: [
          "Links = n(n - 1) / 2.",
          "Ports per node = n - 1.",
          "For 6 nodes: 15 links and 5 mesh ports per node.",
          "For 28 links: n = 8 nodes.",
          "Adding one node to an n-node full mesh requires n new links.",
        ],
      },
      {
        title: "Ethernet Switching",
        points: [
          "A switch learns from source MAC addresses.",
          "Known unicast is sent to one recorded port.",
          "Unknown unicast and broadcast are flooded within the VLAN.",
          "Modern Auto MDI-X usually removes the need to choose between straight-through and crossover cables.",
        ],
      },
    ],
    essentials: [
      "Star is common because individual links are easy to isolate.",
      "Mesh gives redundancy at high cost.",
      "A switch separates collision domains.",
      "A router separates IP networks and broadcast domains.",
      "Physical and logical topology can differ.",
      "A NIC is the device's network interface; one device can have multiple NICs.",
    ],
    comparisonTitle: "Switch vs router",
    comparison: {
      left: {
        label: "Switch",
        points: [
          "Mainly Layer 2",
          "Uses MAC addresses",
          "Forwards inside a LAN",
        ],
      },
      right: {
        label: "Router",
        points: [
          "Mainly Layer 3",
          "Uses IP prefixes",
          "Forwards between networks",
        ],
      },
    },
    followUp:
      "How many direct links and ports per node are needed for a full mesh of 8 nodes?",
  },
  lastMinute: {
    definition:
      "Topology is the connection pattern; devices decide how traffic moves through it.",
    memoryLine: "Hub repeats, switch learns MAC, router chooses an IP route.",
    cues: [
      "Full mesh links: n(n - 1) / 2.",
      "Star: easy node isolation, critical center.",
      "Switch port: separate collision domain.",
      "Router interface: separate broadcast domain.",
      "Access point bridges wireless clients into a LAN.",
      "Switch: learn source, look up destination, forward or flood.",
      "28 full-mesh links means 8 nodes.",
    ],
    trap: "Do not say a switch blocks all broadcasts. A normal switch floods Layer 2 broadcasts within the same LAN or VLAN.",
  },
};
