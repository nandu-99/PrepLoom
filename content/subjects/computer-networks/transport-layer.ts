import type { SubjectTopic } from "@/lib/subject-content";

export const transportServicesPortsAndSockets: SubjectTopic = {
  slug: "transport-services-ports-and-sockets",
  title: "Transport Services, Ports, and Sockets",
  description:
    "Understand process-to-process delivery, port ranges, sockets, multiplexing, and demultiplexing.",
  readTime: "14 min",
  difficulty: "Foundation",
  tags: ["Transport", "Ports", "Sockets"],
  learn: {
    opening:
      "The Transport layer extends host-to-host IP delivery into process-to-process communication. It identifies applications with port numbers and gives them TCP or UDP services.",
    sections: [
      {
        title: "Transport-Layer Responsibilities",
        paragraphs: [
          "Applications need more than a destination IP address. The receiving host must identify the correct process, and the chosen transport protocol must provide the required delivery behavior.",
        ],
        points: [
          "Process-to-process delivery using ports.",
          "Segmentation and reassembly of application data.",
          "Multiplexing several applications over one host's network connection.",
          "Optional reliability, ordering, flow control, and congestion control through TCP.",
        ],
      },
      {
        title: "Port Numbers",
        paragraphs: [
          "A port is an unsigned 16-bit number from 0 to 65535. A server usually listens on a known port, while a client normally receives a temporary ephemeral source port.",
        ],
        dataTable: {
          headers: ["Range", "Numbers", "Typical use"],
          rows: [
            ["Well-known", "0-1023", "Common system services"],
            [
              "Registered",
              "1024-49151",
              "Registered applications and services",
            ],
            [
              "Dynamic or private",
              "49152-65535",
              "Commonly used as client ephemeral ports",
            ],
          ],
        },
      },
      {
        title: "Sockets and Connections",
        paragraphs: [
          "A socket endpoint is commonly described by IP address, transport protocol, and port. A TCP connection is uniquely identified by its protocol and four endpoint values: source IP, source port, destination IP, and destination port.",
        ],
        points: [
          "Server socket: 203.0.113.20:443 using TCP.",
          "Client socket: 192.0.2.10:53000 using TCP.",
          "Two clients can contact the same server port because their source endpoints differ.",
        ],
      },
      {
        title: "Multiplexing and Demultiplexing",
        paragraphs: [
          "At the sender, multiplexing accepts data from many application sockets and passes segments or datagrams downward. At the receiver, demultiplexing examines transport information and gives the data to the correct socket.",
        ],
        flow: [
          "Applications write to sockets",
          "Transport adds source and destination ports",
          "IP delivers data to the destination host",
          "Transport matches the receiving socket",
          "Correct application receives the data",
        ],
      },
    ],
    mechanism: {
      title: "How a web server handles many clients",
      steps: [
        "The server listens on TCP port 443.",
        "Each client chooses an ephemeral source port.",
        "Every accepted connection receives a distinct endpoint tuple.",
        "Incoming segments are demultiplexed to the matching connection.",
        "The server can respond independently to each client.",
      ],
    },
    example: {
      title: "Two browser tabs using HTTPS",
      body: "Both tabs may contact the same server IP and port 443, but their source ports or connection endpoints differ. The operating system therefore delivers each response to the correct socket.",
    },
    misconception:
      "A port does not identify a physical connector or an entire computer. It identifies a transport endpoint used by an application process.",
  },
  revise: {
    definition:
      "Ports identify application endpoints; sockets connect application processes to transport services.",
    sections: [
      {
        title: "Port Ranges",
        points: [
          "0-1023: well-known",
          "1024-49151: registered",
          "49152-65535: dynamic/private",
        ],
      },
    ],
    essentials: [
      "Port numbers are 16-bit values.",
      "Clients commonly use ephemeral source ports.",
      "TCP connections are separated by endpoint tuples.",
      "Multiplexing combines application flows; demultiplexing separates them.",
    ],
    comparisonTitle: "IP address vs port",
    comparison: {
      left: {
        label: "IP address",
        points: [
          "Identifies a network interface",
          "Used for host routing",
          "Network layer",
        ],
      },
      right: {
        label: "Port",
        points: [
          "Identifies a process endpoint",
          "Used for demultiplexing",
          "Transport layer",
        ],
      },
    },
    followUp:
      "How can thousands of clients use the same server IP address and port at once?",
  },
  lastMinute: {
    definition:
      "IP finds the host interface; port finds the application endpoint.",
    memoryLine: "Socket endpoint = IP + transport protocol + port.",
    cues: [
      "Ports: 0 to 65535.",
      "Server uses a stable listening port.",
      "Client usually uses an ephemeral source port.",
      "TCP flow is identified by endpoint information.",
    ],
    trap: "Do not describe only IP plus port as globally unique without also considering the transport protocol.",
  },
};

export const tcpAndUdpFundamentals: SubjectTopic = {
  slug: "tcp-and-udp-fundamentals",
  title: "TCP and UDP Fundamentals",
  description:
    "Compare reliable TCP byte streams with lightweight UDP datagrams and understand their headers and checksums.",
  readTime: "18 min",
  difficulty: "Intermediate",
  tags: ["TCP", "UDP", "Checksum"],
  learn: {
    opening:
      "TCP and UDP both use ports, but they offer different services. TCP manages a reliable ordered byte stream; UDP sends independent datagrams with minimal transport behavior.",
    sections: [
      {
        title: "TCP Service",
        paragraphs: [
          "TCP is connection-oriented, full-duplex, and byte-stream based. It numbers bytes, acknowledges received data, retransmits loss, removes duplicates, delivers data in order, and applies flow and congestion control.",
        ],
        points: [
          "Reliable and ordered delivery.",
          "No message boundaries in the byte stream.",
          "Connection state at both endpoints.",
          "Larger header and more control traffic than UDP.",
        ],
      },
      {
        title: "UDP Service",
        paragraphs: [
          "UDP is connectionless and message-oriented. It preserves datagram boundaries but does not guarantee delivery, order, duplicate removal, retransmission, or congestion control. An application can add the behavior it needs.",
        ],
        points: [
          "Small 8-byte base header.",
          "No transport handshake.",
          "Useful for DNS, voice, gaming, and protocols such as QUIC.",
          "Low overhead does not automatically mean lower total application delay.",
        ],
      },
      {
        title: "TCP vs UDP",
        paragraphs: [
          "The correct choice depends on application needs, not a claim that one protocol is universally faster or better.",
        ],
        dataTable: {
          headers: ["Feature", "TCP", "UDP"],
          rows: [
            [
              "Service",
              "Reliable ordered byte stream",
              "Best-effort datagrams",
            ],
            ["Connection", "Stateful connection", "No transport connection"],
            ["Message boundaries", "Not preserved", "Preserved"],
            ["Flow control", "Yes", "No"],
            ["Congestion control", "Yes", "Not provided by UDP"],
            ["Base header", "At least 20 bytes", "8 bytes"],
          ],
        },
      },
      {
        title: "Important Header Fields",
        paragraphs: [
          "Both protocols carry source and destination ports and a checksum. TCP needs additional fields to manage its connection and reliable byte stream.",
        ],
        dataTable: {
          headers: ["TCP field", "Purpose"],
          rows: [
            [
              "Sequence number",
              "Number of the first data byte in this segment",
            ],
            ["Acknowledgment number", "Next byte expected from the peer"],
            ["Data offset", "TCP header length"],
            ["Flags", "Control such as SYN, ACK, FIN, RST"],
            ["Window", "Advertised receive capacity"],
            ["Checksum", "Detects corruption in header and data"],
          ],
        },
      },
      {
        title: "Internet Checksum Idea",
        paragraphs: [
          "TCP and UDP use a one's-complement checksum over transport data plus an IP pseudo-header. The sender adds fixed-size words using one's-complement addition and complements the result. The receiver repeats the check; failure means corruption was detected, not corrected.",
        ],
        points: [
          "Checksum detects many bit errors but is not cryptographic protection.",
          "A bad TCP segment is discarded and may later be retransmitted.",
          "UDP checksum is mandatory in IPv6 and normally used in IPv4.",
        ],
      },
    ],
    mechanism: {
      title: "Choosing TCP or UDP",
      steps: [
        "Decide whether ordered reliable delivery is required.",
        "Decide whether message boundaries should remain visible.",
        "Consider delay tolerance and application recovery behavior.",
        "Consider congestion responsibility and network friendliness.",
        "Choose the transport and design the application around its actual guarantees.",
      ],
    },
    example: {
      title: "Live voice and file download",
      body: "A file download benefits from TCP's complete ordered byte stream. A live voice application may prefer timely UDP datagrams and ignore late audio, while still adding timestamps, loss handling, and congestion behavior in the application.",
    },
    misconception:
      "UDP is not automatically unreliable at the application level. It means UDP itself does not provide reliability; an application protocol can add acknowledgments and recovery.",
  },
  revise: {
    definition:
      "TCP provides a managed reliable byte stream; UDP provides lightweight independent datagrams.",
    essentials: [
      "TCP preserves byte order, not application message boundaries.",
      "UDP preserves datagram boundaries.",
      "TCP has flow and congestion control.",
      "Both protocols use ports and checksums.",
      "A checksum detects corruption but does not repair it.",
    ],
    comparisonTitle: "TCP vs UDP",
    comparison: {
      left: {
        label: "TCP",
        points: [
          "Connection-oriented",
          "Reliable ordered stream",
          "Flow and congestion control",
        ],
      },
      right: {
        label: "UDP",
        points: [
          "Connectionless",
          "Best-effort datagrams",
          "Minimal transport behavior",
        ],
      },
    },
    followUp: "Why might a reliable application protocol still choose UDP?",
  },
  lastMinute: {
    definition: "TCP manages a stream; UDP sends datagrams.",
    memoryLine:
      "TCP orders and recovers; UDP leaves policy to the application.",
    cues: [
      "TCP base header: at least 20 bytes.",
      "UDP header: 8 bytes.",
      "ACK number means next byte expected.",
      "Checksum detects, not corrects.",
    ],
    trap: "Do not say TCP sends messages. It exposes a byte stream, so applications must frame their own messages.",
  },
};

export const tcpConnectionAndReliability: SubjectTopic = {
  slug: "tcp-connection-and-reliability",
  title: "TCP Connection and Reliable Delivery",
  description:
    "Follow TCP setup, sequence numbers, acknowledgments, retransmissions, teardown, and important states.",
  readTime: "20 min",
  difficulty: "Intermediate",
  tags: ["Handshake", "Reliability", "TCP states"],
  learn: {
    opening:
      "TCP establishes shared connection state before ordinary data transfer. Sequence numbers and acknowledgments then let the endpoints detect gaps and deliver bytes in order.",
    sections: [
      {
        title: "Three-Way Handshake",
        paragraphs: [
          "The handshake confirms two-way reachability and synchronizes initial sequence numbers. A SYN consumes one sequence number even when it carries no ordinary application data.",
        ],
        visual: {
          src: "/notes/computer-networks/tcp-lifecycle.png",
          alt: "TCP three-way connection setup and four-message connection close between a client and server",
          width: 1536,
          height: 1024,
          caption:
            "TCP normally uses three messages to establish state and separate FIN exchanges to close each direction.",
        },
        flow: [
          "Client sends SYN with initial sequence number x",
          "Server sends SYN + ACK with sequence y and acknowledgment x + 1",
          "Client sends ACK with acknowledgment y + 1",
          "Connection enters ESTABLISHED state",
        ],
      },
      {
        title: "Sequence Numbers and ACKs",
        paragraphs: [
          "TCP sequence numbers count bytes, not segments. An acknowledgment is cumulative and normally states the next byte expected. If bytes 1000 through 1499 arrive correctly, ACK 1500 means all bytes before 1500 were received in order.",
        ],
        points: [
          "Out-of-order segments can produce duplicate ACKs.",
          "Retransmission occurs after a timeout or evidence such as duplicate ACKs.",
          "The receiver removes duplicates and exposes ordered bytes to the application.",
        ],
      },
      {
        title: "Timeout and Retransmission",
        paragraphs: [
          "TCP estimates round-trip time and chooses a retransmission timeout with safety margin for variation. A timeout that is too short causes unnecessary retransmissions; one that is too long makes recovery slow.",
        ],
        points: [
          "SampleRTT measures an acknowledgment round trip.",
          "EstimatedRTT smooths samples.",
          "DevRTT represents variation.",
          "A common teaching formula is TimeoutInterval = EstimatedRTT + 4 x DevRTT.",
        ],
      },
      {
        title: "Connection Teardown and TIME_WAIT",
        paragraphs: [
          "TCP is full-duplex, so each direction closes independently with FIN and ACK. The active closer may enter TIME_WAIT so delayed duplicate segments expire and the final ACK can be retransmitted if needed.",
        ],
        points: [
          "FIN means this endpoint has no more bytes to send.",
          "A peer can still send after receiving a FIN until it closes its own direction.",
          "RST aborts a connection instead of performing an orderly close.",
        ],
      },
    ],
    mechanism: {
      title: "How TCP recovers a missing segment",
      steps: [
        "Sender numbers bytes and keeps unacknowledged data.",
        "Receiver acknowledges the next in-order byte expected.",
        "A gap produces duplicate acknowledgments or silence.",
        "Sender infers loss through timeout or duplicate ACK evidence.",
        "Missing data is retransmitted and ordered delivery resumes.",
      ],
    },
    example: {
      title: "ACK-number numerical",
      body: "A segment begins with sequence number 5000 and contains 600 data bytes. If received in order, the next expected byte is 5600, so the receiver sends ACK 5600. Sequence numbers count bytes, so do not add one unless SYN or FIN consumes it.",
    },
    misconception:
      "The third handshake ACK does not acknowledge application data. It confirms the server's SYN and initial sequence number.",
  },
  revise: {
    definition:
      "TCP uses connection state, byte sequence numbers, cumulative ACKs, timers, and retransmissions for reliable ordered delivery.",
    sections: [
      { title: "Handshake", flow: ["SYN", "SYN + ACK", "ACK", "ESTABLISHED"] },
      {
        title: "ACK Numerical",
        points: [
          "Sequence 5000 + 600 bytes means ACK 5600.",
          "SYN and FIN each consume one sequence number.",
        ],
      },
    ],
    essentials: [
      "Handshake confirms both directions and synchronizes sequence numbers.",
      "ACK number is normally the next byte expected.",
      "Loss can be detected by timeout or duplicate ACK evidence.",
      "Four close messages are common because each direction closes separately.",
      "TIME_WAIT protects against delayed duplicates and lost final ACKs.",
    ],
    followUp: "Why does TCP need three setup messages instead of two?",
  },
  lastMinute: {
    definition:
      "SYN synchronizes; ACK confirms; FIN closes one direction; RST aborts.",
    memoryLine: "Sequence counts bytes, ACK names the next byte wanted.",
    cues: [
      "Setup: SYN, SYN + ACK, ACK.",
      "Close commonly: FIN, ACK, FIN, ACK.",
      "Timeout formula: EstimatedRTT + 4 x DevRTT.",
      "TIME_WAIT belongs to the active closer.",
    ],
    trap: "Do not calculate ACK numbers by counting segments; TCP numbers bytes.",
  },
};

export const flowControlAndArq: SubjectTopic = {
  slug: "flow-control-and-arq",
  title: "Flow Control and ARQ",
  description:
    "Compare stop-and-wait, sliding windows, receiver flow control, Go-Back-N, and Selective Repeat.",
  readTime: "20 min",
  difficulty: "Intermediate",
  tags: ["Sliding window", "ARQ", "Flow control"],
  learn: {
    opening:
      "Flow control prevents a fast sender from overwhelming a receiver. Sliding-window ARQ also keeps a link busy while acknowledgments travel back.",
    sections: [
      {
        title: "Stop-and-Wait",
        paragraphs: [
          "The sender transmits one frame or segment and waits for its acknowledgment. The method is simple but wastes capacity when transmission time is small compared with RTT.",
        ],
        points: [
          "Only one unacknowledged unit at a time.",
          "Timer handles a lost data unit or ACK.",
          "Sequence bits distinguish a new unit from a retransmitted duplicate.",
        ],
      },
      {
        title: "Sliding Window and Receiver Window",
        paragraphs: [
          "A sliding window allows several bytes or frames to remain unacknowledged. TCP advertises receive window rwnd based on free buffer space. The sender limits outstanding data so the receiver is not overrun.",
        ],
        points: [
          "Window slides forward as ACKs arrive.",
          "A zero window tells the sender to pause ordinary data.",
          "TCP uses window probes so an update is not lost forever.",
          "Actual sending is limited by both receiver capacity and congestion control.",
        ],
      },
      {
        title: "Go-Back-N vs Selective Repeat",
        paragraphs: [
          "Both schemes pipeline several numbered units. Their main difference is what the receiver accepts and what the sender retransmits after loss.",
        ],
        visual: {
          src: "/notes/computer-networks/arq-comparison.png",
          alt: "Go-Back-N retransmitting a lost packet and later packets compared with Selective Repeat retransmitting only the lost packet",
          width: 1536,
          height: 1024,
          caption:
            "Go-Back-N repeats the missing unit and later outstanding units; Selective Repeat targets only missing units.",
        },
        dataTable: {
          headers: ["Feature", "Go-Back-N", "Selective Repeat"],
          rows: [
            [
              "Receiver behavior",
              "Usually keeps only next expected unit",
              "Buffers acceptable out-of-order units",
            ],
            ["ACK style", "Cumulative", "Individual or selective"],
            [
              "After loss",
              "Retransmits missing and later outstanding units",
              "Retransmits only missing units",
            ],
            ["Complexity", "Lower", "Higher"],
          ],
        },
      },
      {
        title: "Window and Utilization Numericals",
        paragraphs: [
          "For ideal stop-and-wait with acknowledgment transmission ignored, utilization U = transmission time / (transmission time + RTT). If a 1 ms frame uses a path with 19 ms RTT, U = 1 / 20 = 5%.",
          "To keep the path busy, the sender needs a window large enough to cover the bandwidth-delay product. On a 10 Mbit/s link with RTT 40 ms, BDP = 10,000,000 x 0.04 = 400,000 bits = 50,000 bytes.",
        ],
        points: [
          "BDP = bandwidth x RTT.",
          "Minimum ideal window is approximately BDP plus the data currently entering the link, depending on the model used.",
          "Keep units consistent: convert Mbit/s and milliseconds before multiplying.",
        ],
      },
    ],
    mechanism: {
      title: "How receiver flow control changes sending",
      steps: [
        "Receiver measures free buffer space.",
        "It advertises rwnd in ACKs.",
        "Sender keeps outstanding bytes within the allowed window.",
        "A full buffer produces a zero-window advertisement.",
        "Window updates or probes allow transfer to resume.",
      ],
    },
    example: {
      title: "Why sliding windows matter",
      body: "A satellite path can have a large RTT. Stop-and-wait leaves the sender idle for most of that RTT. A suitable sliding window fills the path with multiple units before acknowledgments return.",
    },
    misconception:
      "Flow control and congestion control are different. Flow control protects the receiver; congestion control protects the network path.",
  },
  revise: {
    definition:
      "Flow control limits sending to receiver capacity; ARQ uses acknowledgments and retransmissions to recover loss.",
    sections: [
      {
        title: "Numericals",
        points: [
          "Stop-and-wait U = transmission time / (transmission time + RTT).",
          "BDP = bandwidth x RTT.",
          "10 Mbit/s x 40 ms = 50,000 bytes.",
        ],
      },
    ],
    essentials: [
      "Stop-and-wait keeps one unit outstanding.",
      "Sliding window pipelines several units.",
      "rwnd reports receiver capacity.",
      "Go-Back-N repeats missing and later units.",
      "Selective Repeat buffers out-of-order data and repeats only loss.",
    ],
    comparisonTitle: "Go-Back-N vs Selective Repeat",
    comparison: {
      left: {
        label: "Go-Back-N",
        points: ["Cumulative ACKs", "Simple receiver", "More retransmission"],
      },
      right: {
        label: "Selective Repeat",
        points: [
          "Selective recovery",
          "Buffers out-of-order units",
          "More state",
        ],
      },
    },
    followUp: "Why does a long-RTT high-bandwidth link need a large window?",
  },
  lastMinute: {
    definition:
      "rwnd protects the receiver; sliding windows keep multiple units in flight.",
    memoryLine: "GBN repeats a range; SR repeats the missing parts.",
    cues: [
      "Zero window means pause, not close.",
      "BDP measures data that can fill the path.",
      "Flow control is receiver-facing.",
      "Selective Repeat needs more buffering.",
    ],
    trap: "Do not use RTT in milliseconds directly with bandwidth in bits per second; convert RTT to seconds.",
  },
};

export const tcpCongestionAndNetworkDelay: SubjectTopic = {
  slug: "tcp-congestion-and-network-delay",
  title: "TCP Congestion Control and Network Delay",
  description:
    "Understand cwnd, slow start, congestion avoidance, fast recovery, TCP CUBIC, and end-to-end delay calculations.",
  readTime: "22 min",
  difficulty: "Advanced",
  tags: ["Congestion", "CUBIC", "Delay"],
  learn: {
    opening:
      "Congestion control prevents a sender from injecting more traffic than the network path can handle. TCP combines congestion window cwnd with receiver window rwnd, so usable sending capacity is limited by the smaller value.",
    sections: [
      {
        title: "Slow Start and Congestion Avoidance",
        paragraphs: [
          "Slow start increases cwnd rapidly, approximately doubling it each RTT when every segment is acknowledged. At slow-start threshold ssthresh, classic TCP enters congestion avoidance and grows more cautiously, approximately linearly.",
        ],
        visual: {
          src: "/notes/computer-networks/tcp-congestion-control.png",
          alt: "TCP congestion window growing through slow start and congestion avoidance before a loss and fast recovery",
          width: 1536,
          height: 1024,
          caption:
            "Classic TCP grows quickly at first, then cautiously, and reduces its sending window after congestion evidence.",
        },
        points: [
          "cwnd is maintained by the sender.",
          "rwnd is advertised by the receiver.",
          "Effective window is approximately min(cwnd, rwnd).",
          "Exact behavior depends on the TCP congestion-control algorithm.",
        ],
      },
      {
        title: "Fast Retransmit and Fast Recovery",
        paragraphs: [
          "Three duplicate ACKs are classic evidence that one segment was lost while later data still arrived. Fast retransmit resends the suspected loss before the retransmission timer expires. Fast recovery reduces the window but avoids returning fully to the initial slow-start state.",
        ],
      },
      {
        title: "TCP CUBIC",
        paragraphs: [
          "CUBIC grows cwnd using a cubic function of time around the window size that existed before congestion. It is designed to use high-bandwidth, long-delay paths more effectively than older linear growth while still reducing load after congestion.",
        ],
        points: [
          "Growth depends mainly on elapsed time since congestion.",
          "The curve is cautious near the previous maximum.",
          "Congestion algorithms can differ even though applications still use TCP.",
        ],
      },
      {
        title: "Four Delay Components",
        paragraphs: [
          "End-to-end delay is built from processing, queueing, transmission, and propagation delay at the links and nodes along a path.",
        ],
        dataTable: {
          headers: ["Delay", "Meaning", "Formula or cause"],
          rows: [
            ["Processing", "Inspect and handle a packet", "Device work"],
            ["Queueing", "Wait behind other packets", "Traffic-dependent"],
            ["Transmission", "Push all packet bits onto a link", "L / R"],
            ["Propagation", "Signal travels through the medium", "d / s"],
          ],
        },
      },
      {
        title: "Delay Numerical",
        paragraphs: [
          "A 1,500-byte packet crosses a 10 Mbit/s link. Transmission delay = 1,500 x 8 / 10,000,000 = 0.0012 s = 1.2 ms. If the link is 600 km long and propagation speed is 2 x 10^8 m/s, propagation delay = 600,000 / 200,000,000 = 0.003 s = 3 ms.",
          "Ignoring processing and queueing, one-way link delay = 1.2 + 3 = 4.2 ms. A simple round trip over the same symmetric link is about 8.4 ms, but real RTT also includes other links, device processing, and queueing.",
        ],
      },
      {
        title: "Congestion-Window Numerical",
        paragraphs: [
          "Suppose cwnd starts at 1 MSS and slow start continues without loss. After each completed RTT it approximately becomes 2, 4, 8, and 16 MSS. If ssthresh is 8 MSS, the sender reaches it after three growth rounds and then changes to congestion avoidance.",
        ],
      },
    ],
    mechanism: {
      title: "How TCP reacts to network feedback",
      steps: [
        "Sender limits outstanding data using cwnd and rwnd.",
        "ACKs provide delivery feedback and allow controlled growth.",
        "Slow start probes capacity rapidly.",
        "Congestion avoidance grows more cautiously.",
        "Loss or explicit congestion evidence reduces the sending rate.",
      ],
    },
    example: {
      title: "Receiver versus network limit",
      body: "If rwnd is 64 KB but cwnd is 20 KB, congestion control limits outstanding data to about 20 KB. If cwnd later reaches 100 KB while rwnd remains 64 KB, receiver flow control becomes the smaller limit.",
    },
    misconception:
      "Slow start is exponential per RTT, not a slow linear increase. Its name means TCP starts from a relatively small window.",
  },
  revise: {
    definition:
      "Congestion control adjusts sending to path capacity; total delay includes processing, queueing, transmission, and propagation.",
    sections: [
      {
        title: "Delay Formulas",
        points: [
          "Transmission = packet bits / link rate.",
          "Propagation = distance / signal speed.",
          "BDP = bandwidth x RTT.",
        ],
      },
      {
        title: "Window Rule",
        points: [
          "Effective sending window is approximately min(cwnd, rwnd).",
          "Slow start roughly doubles cwnd each RTT.",
        ],
      },
    ],
    essentials: [
      "Slow start grows rapidly until a threshold or congestion event.",
      "Congestion avoidance grows more cautiously.",
      "Fast retransmit uses duplicate ACK evidence.",
      "Fast recovery reduces without a full initial restart.",
      "CUBIC bases growth on a cubic time function.",
    ],
    comparisonTitle: "Flow vs congestion control",
    comparison: {
      left: {
        label: "Flow control",
        points: ["Protects receiver", "Uses rwnd", "Depends on buffer space"],
      },
      right: {
        label: "Congestion control",
        points: [
          "Protects network path",
          "Uses cwnd",
          "Responds to path feedback",
        ],
      },
    },
    followUp:
      "Why can propagation delay remain large even when link bandwidth increases?",
  },
  lastMinute: {
    definition:
      "Effective window is the smaller of receiver capacity and congestion capacity.",
    memoryLine: "Slow start doubles, avoidance grows, loss reduces.",
    cues: [
      "Transmission: L / R.",
      "Propagation: d / s.",
      "Three duplicate ACKs trigger classic fast retransmit.",
      "CUBIC targets high bandwidth-delay paths.",
      "Queueing is traffic-dependent.",
    ],
    trap: "Do not confuse transmission delay with propagation delay: bandwidth changes the first, distance and signal speed change the second.",
  },
};
