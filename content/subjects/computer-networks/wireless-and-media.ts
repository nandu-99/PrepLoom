import type { SubjectTopic } from "@/lib/subject-content";

export const wifiFoundationsArchitectureAndGenerations: SubjectTopic = {
  slug: "wifi-foundations-architecture-and-generations",
  title: "Wi-Fi Foundations, Architecture, and Generations",
  description:
    "Understand IEEE 802.11 wireless LANs, access points, BSS and ESS architecture, association, and major Wi-Fi generations.",
  readTime: "25 min",
  difficulty: "Foundation",
  tags: ["Wi-Fi", "802.11", "WLAN"],
  learn: {
    opening:
      "Wi-Fi is the common product name for wireless LAN technology based on the IEEE 802.11 family. It defines MAC and physical-layer behavior for stations communicating through radio rather than an Ethernet cable.",
    sections: [
      {
        title: "What Wi-Fi Provides",
        paragraphs: [
          "Wi-Fi connects mobile and fixed stations inside a local network. It can provide Internet access through a router, but Wi-Fi itself is the wireless LAN link and does not mean the Internet.",
          "IEEE develops 802.11 specifications. The Wi-Fi Alliance certifies interoperability and markets generation names such as Wi-Fi 6 and Wi-Fi 7. The standard and certification program are related but not the same organization.",
        ],
      },
      {
        title: "Wireless LAN Components",
        paragraphs: [
          "A WLAN combines radio endpoints with an access and distribution structure that connects wireless traffic to the rest of the LAN.",
        ],
        dataTable: {
          headers: ["Component", "Role"],
          rows: [
            ["Station or STA", "Wireless client such as a laptop or phone"],
            [
              "Access Point or AP",
              "Connects associated stations to a distribution system",
            ],
            [
              "BSS",
              "One basic wireless cell, commonly one AP and its stations",
            ],
            ["ESS", "Several connected BSS cells presenting one larger WLAN"],
            [
              "Distribution system",
              "Backhaul connecting APs, often switched Ethernet",
            ],
            ["Router", "Routes traffic between the WLAN and other IP networks"],
          ],
        },
      },
      {
        title: "SSID, BSSID, and Association",
        paragraphs: [
          "An SSID is the human-visible network name. A BSSID identifies a particular basic service set and is commonly based on an AP radio MAC address. Several APs can advertise the same SSID while using different BSSIDs.",
          "A client discovers networks through beacon frames or active probing, selects an AP, authenticates using the configured method, and associates. Security key establishment follows for protected networks before normal data traffic.",
        ],
        flow: [
          "Discover available BSS cells",
          "Select SSID, BSSID, band, and supported capabilities",
          "Perform 802.11 authentication and association",
          "Establish security keys when protection is enabled",
          "Receive IP configuration and exchange data",
        ],
      },
      {
        title: "802.11 Frame Categories",
        paragraphs: [
          "Wi-Fi frames are grouped by purpose. Management frames create and maintain a wireless relationship. Control frames coordinate delivery. Data frames carry user traffic and can also carry quality-of-service information.",
        ],
        dataTable: {
          headers: ["Category", "Examples", "Main job"],
          rows: [
            [
              "Management",
              "Beacon, Probe, Authentication, Association",
              "Discover and manage WLAN membership",
            ],
            [
              "Control",
              "ACK, RTS, CTS",
              "Coordinate access and confirm delivery",
            ],
            ["Data", "Data and QoS Data", "Carry upper-layer payloads"],
          ],
        },
      },
      {
        title: "Discovery, Authentication, and Association",
        paragraphs: [
          "Beacon frames periodically announce a BSS and its capabilities. A client can also actively send a Probe Request and receive a Probe Response. Discovery only identifies available networks.",
          "802.11 authentication and association are separate management steps. Association registers the station with the AP and establishes the Layer 2 relationship. WPA-Personal or Enterprise authentication and key establishment then provide actual protected access according to the security configuration.",
        ],
      },
      {
        title: "Access Point, Wireless Router, and Modem",
        dataTable: {
          headers: ["Device", "Main role", "Does not necessarily provide"],
          rows: [
            [
              "Access point",
              "Bridges wireless clients into a LAN",
              "IP routing or ISP conversion",
            ],
            [
              "Wireless router",
              "Combines routing, switching, firewalling, and an AP",
              "The ISP physical link by itself",
            ],
            [
              "Modem or ONT",
              "Terminates the ISP access technology",
              "Wi-Fi unless combined with a router/AP",
            ],
          ],
        },
        paragraphs: [
          "Home equipment often combines all three roles in one box, but separating their functions makes troubleshooting and network design clearer.",
        ],
      },
      {
        title: "Infrastructure, Ad Hoc, and Mesh",
        paragraphs: [
          "Infrastructure mode uses APs and is the normal home and enterprise design. An independent basic service set supports direct ad hoc station communication without an AP. Mesh systems use wireless links among mesh nodes to extend coverage, although many deployments still prefer wired backhaul when possible.",
        ],
      },
      {
        title: "Major Wi-Fi Generations",
        paragraphs: [
          "Generation maximums are theoretical PHY rates under ideal configurations. Real application throughput is lower because of contention, headers, acknowledgments, interference, distance, client limits, and retransmissions.",
          "The Wi-Fi Alliance's simple generation naming is commonly applied from Wi-Fi 4 onward. Older 802.11b, 802.11a, and 802.11g are clearer when named by their IEEE amendment rather than unofficial Wi-Fi 1, 2, or 3 labels.",
        ],
        dataTable: {
          headers: [
            "Generation",
            "IEEE amendment",
            "Main bands",
            "Key improvement",
          ],
          rows: [
            ["Legacy", "802.11b", "2.4 GHz", "Up to 11 Mbit/s PHY"],
            ["Legacy", "802.11a / g", "5 / 2.4 GHz", "Up to 54 Mbit/s PHY"],
            ["Wi-Fi 4", "802.11n", "2.4 and 5 GHz", "MIMO and channel bonding"],
            [
              "Wi-Fi 5",
              "802.11ac",
              "5 GHz",
              "Wider channels and downlink MU-MIMO",
            ],
            [
              "Wi-Fi 6",
              "802.11ax",
              "2.4 and 5 GHz",
              "OFDMA, efficiency, and uplink/downlink MU-MIMO",
            ],
            [
              "Wi-Fi 6E",
              "802.11ax",
              "Adds 6 GHz",
              "More clean spectrum, not a new PHY generation",
            ],
            [
              "Wi-Fi 7",
              "802.11be",
              "2.4, 5, and 6 GHz",
              "320 MHz, Multi-Link Operation, and 4096-QAM",
            ],
          ],
        },
      },
      {
        title: "Roaming Between APs",
        paragraphs: [
          "In an ESS, a client may reassociate from one AP to another while keeping the same SSID. The client usually makes the roaming decision based on signal, quality, and implementation policy. Standards such as 802.11k, 802.11v, and 802.11r can improve neighbor information, steering assistance, and fast transition.",
          "Roaming between APs on the same IP subnet can preserve the current address. Moving into another IP subnet normally requires new addressing or a mobility design that keeps sessions reachable across the Layer 3 boundary.",
        ],
      },
    ],
    mechanism: {
      title: "How a client joins a protected WLAN",
      steps: [
        "Scan for beacon frames or send probe requests.",
        "Choose a BSSID supporting the desired SSID and capabilities.",
        "Authenticate and associate with the access point.",
        "Complete the configured WPA key exchange.",
        "Obtain IP configuration and begin normal communication.",
      ],
    },
    example: {
      title: "Same SSID, different APs",
      body: "An office has three APs advertising Staff-WiFi. The SSID is the same, but each radio has its own BSSID. A laptop can roam to a stronger BSSID while staying on the same logical WLAN.",
    },
    misconception:
      "Wi-Fi and the Internet are not synonyms. A device can join a Wi-Fi LAN even when the router has no Internet connection.",
  },
  revise: {
    definition:
      "Wi-Fi is an IEEE 802.11 wireless LAN technology connecting stations through radio, usually via an access point.",
    sections: [
      {
        title: "Architecture Recall",
        points: [
          "BSS: one wireless cell.",
          "ESS: connected BSS cells forming a larger WLAN.",
          "SSID: network name; BSSID: one specific cell identifier.",
          "AP bridges wireless stations toward the distribution system.",
        ],
      },
    ],
    essentials: [
      "IEEE specifies 802.11; the Wi-Fi Alliance certifies products.",
      "Infrastructure mode uses an AP; ad hoc mode does not.",
      "Wi-Fi 4 introduced MIMO; Wi-Fi 6 introduced OFDMA.",
      "Wi-Fi 6E extends Wi-Fi 6 into 6 GHz.",
      "Advertised PHY rate is not application throughput.",
      "Management frames discover and manage; control frames coordinate; data frames carry payloads.",
    ],
    comparisonTitle: "SSID vs BSSID",
    comparison: {
      left: {
        label: "SSID",
        points: [
          "Logical network name",
          "Can be shared by several APs",
          "Chosen by the user or profile",
        ],
      },
      right: {
        label: "BSSID",
        points: [
          "Identifies one BSS",
          "Usually tied to an AP radio",
          "Changes when client roams",
        ],
      },
    },
    followUp: "Why can two APs have the same SSID but different BSSIDs?",
  },
  lastMinute: {
    definition: "802.11 provides wireless Layer 2 LAN communication.",
    memoryLine: "SSID names the WLAN; BSSID identifies one wireless cell.",
    cues: [
      "BSS = one cell; ESS = several connected cells.",
      "Wi-Fi 4: MIMO. Wi-Fi 6: OFDMA. Wi-Fi 7: MLO and 320 MHz.",
      "6E means 802.11ax operating in the 6 GHz band.",
      "Wi-Fi access can exist without Internet access.",
    ],
    trap: "Do not present a theoretical multi-stream PHY rate as the speed every client will receive.",
  },
};

export const wirelessCapacityTechniques: SubjectTopic = {
  slug: "wireless-capacity-techniques",
  title: "Wireless Capacity: MIMO, Beamforming, OFDM, and OFDMA",
  description:
    "Understand multipath, spatial streams, diversity, beamforming, MU-MIMO, subcarriers, resource units, and wireless capacity tradeoffs.",
  readTime: "28 min",
  difficulty: "Intermediate",
  tags: ["MIMO", "OFDMA", "Beamforming"],
  learn: {
    opening:
      "Modern Wi-Fi improves capacity by using several antennas, wider channels, efficient modulation, and careful division of radio resources across time, frequency, and space.",
    sections: [
      {
        title: "Multipath: Problem and Opportunity",
        paragraphs: [
          "Radio signals reflect from walls, furniture, people, and other surfaces. Copies reach the receiver with different delays and strengths. This multipath can cause fading and inter-symbol interference, but modern receivers and MIMO techniques can also exploit it.",
          "Signal quality changes as devices move because path lengths and interference change. More antennas do not automatically mean more speed; the transmitter, receiver, channel, and number of supported spatial streams all matter.",
        ],
      },
      {
        title: "SISO, MIMO, and MU-MIMO",
        paragraphs: [
          "SISO uses one transmit and one receive radio chain for one spatial stream. Single-user MIMO can send several independent spatial streams to one capable client. MU-MIMO separates streams for different clients in the same transmission opportunity.",
          "Notation such as 2x2 MIMO normally describes two transmit and two receive radio chains. It can support at most two spatial streams, but the actual stream count is limited by both endpoints and the channel. A 4x4 AP serving a 1x1 phone cannot send four spatial streams to that phone.",
        ],
        visual: {
          src: "/notes/computer-networks/wireless-capacity-evolution.png",
          alt: "SISO, MIMO, and MU-MIMO showing one stream, multiple streams to one client, and streams to multiple clients",
          width: 1536,
          height: 1024,
          caption:
            "Spatial streams can increase one client's rate or serve several compatible clients concurrently.",
        },
      },
      {
        title: "Spatial Multiplexing, Diversity, and Beamforming",
        paragraphs: [
          "Multiple antennas can be used for different goals, so the selected technique must be distinguished from the number of physical antenna elements.",
        ],
        dataTable: {
          headers: ["Technique", "Main goal", "How it helps"],
          rows: [
            [
              "Spatial multiplexing",
              "Throughput",
              "Parallel independent streams",
            ],
            [
              "Transmit/receive diversity",
              "Reliability",
              "Combine or choose signal copies",
            ],
            [
              "Beamforming",
              "Signal quality",
              "Coordinate antennas to direct energy",
            ],
            [
              "MU-MIMO",
              "Multi-user capacity",
              "Spatially separate compatible clients",
            ],
          ],
        },
      },
      {
        title: "OFDM and OFDMA",
        paragraphs: [
          "OFDM divides a wide channel into many orthogonal subcarriers and transmits symbols across them in parallel. Orthogonality lets subcarriers overlap mathematically without behaving like ordinary interfering channels when synchronized correctly.",
          "OFDMA groups subcarriers into resource units and schedules them for different clients. This improves efficiency for many small or latency-sensitive transfers because one client need not occupy the entire channel for every transmission.",
          "A cyclic prefix repeats a small end portion of an OFDM symbol at its beginning. It creates a guard interval that helps delayed multipath copies settle before the useful symbol is processed, reducing inter-symbol interference when the delay spread fits inside the guard interval.",
        ],
        visual: {
          src: "/notes/computer-networks/ofdm-vs-ofdma.png",
          alt: "OFDM assigning a channel to one user and OFDMA dividing subcarriers among three users",
          width: 1536,
          height: 1024,
          caption:
            "OFDM parallelizes one channel; OFDMA schedules portions of that channel for several users.",
        },
      },
      {
        title: "Modulation, Coding, Width, and Streams",
        paragraphs: [
          "Higher-order QAM carries more bits per symbol but requires a cleaner signal. A wider channel and more spatial streams can raise PHY rate, while stronger error-correcting coding improves robustness at the cost of payload rate.",
          "An approximate planning relationship is PHY rate proportional to channel width x spatial streams x bits per symbol x coding rate, adjusted for symbol timing and overhead. Doubling channel width does not guarantee double application throughput because contention and interference can also increase.",
        ],
      },
      {
        title: "QAM and Bits per Symbol",
        paragraphs: [
          "A modulation constellation represents information through signal states. If a modulation has M possible symbols, each symbol represents log2(M) bits. Denser constellations carry more bits but place signal points closer together, so noise can confuse them more easily.",
        ],
        dataTable: {
          headers: ["Modulation", "Possible symbols", "Bits per symbol"],
          rows: [
            ["BPSK", "2", "1"],
            ["QPSK", "4", "2"],
            ["16-QAM", "16", "4"],
            ["64-QAM", "64", "6"],
            ["256-QAM", "256", "8"],
            ["1024-QAM", "1,024", "10"],
            ["4096-QAM", "4,096", "12"],
          ],
        },
      },
      {
        title: "QAM Numerical and MCS",
        paragraphs: [
          "Suppose a simplified link sends 250,000 modulation symbols per second using 64-QAM. Since log2(64) = 6, the uncoded raw rate is 250,000 x 6 = 1.5 Mbit/s. With coding rate 3/4, the coded payload contribution becomes 1.5 x 3/4 = 1.125 Mbit/s before other overhead.",
          "A Modulation and Coding Scheme index represents a defined combination of modulation, coding rate, and related PHY choices. Rate adaptation moves to a stronger or weaker MCS as SNR, errors, mobility, and implementation policy change.",
        ],
      },
      {
        title: "OFDMA Resource-Unit Example",
        paragraphs: [
          "An AP has one scheduled OFDMA opportunity and three clients. It can allocate a small resource unit to a sensor sending a short status message, a medium unit to a phone, and a larger unit to a laptop download. The allocations coexist in the scheduled time-frequency grid and finish according to AP coordination.",
          "Resource units improve aggregate efficiency; they do not guarantee that every user receives equal bandwidth. The scheduler chooses allocations according to queued traffic, radio quality, capabilities, and policy.",
        ],
      },
      {
        title: "Simple Stream Numerical",
        paragraphs: [
          "Assume one spatial stream provides a 300 Mbit/s PHY rate under a selected width and modulation. With two usable spatial streams, the ideal PHY rate is about 600 Mbit/s. If protocol efficiency is 65 percent, estimated data throughput is 600 x 0.65 = 390 Mbit/s.",
          "This estimate assumes the client supports both streams and radio conditions sustain the chosen modulation. It is not a guaranteed user speed.",
        ],
      },
    ],
    mechanism: {
      title: "How an AP increases wireless capacity",
      steps: [
        "Measure channel and client capabilities.",
        "Choose modulation, coding, channel width, and spatial streams.",
        "Use beamforming or diversity to improve signal reliability.",
        "Schedule users through time, OFDMA resource units, or MU-MIMO streams.",
        "Adapt rates and retransmit when channel conditions change.",
      ],
    },
    example: {
      title: "Crowded network with small packets",
      body: "Many phones each need short bursts of data. OFDMA can assign small resource units to several phones in one scheduled opportunity, reducing the waste and delay of giving the whole channel to each phone in turn.",
    },
    misconception:
      "MIMO does not always send the same data from every antenna. Spatial multiplexing sends different streams, while diversity techniques improve reliability.",
  },
  revise: {
    definition:
      "Modern Wi-Fi shares and reuses time, frequency, and spatial resources to improve throughput, reliability, and multi-user efficiency.",
    sections: [
      {
        title: "Technique Match",
        points: [
          "Spatial multiplexing: parallel streams for rate.",
          "Diversity: multiple observations for reliability.",
          "Beamforming: direct useful energy toward a receiver.",
          "OFDMA: allocate resource units to several clients.",
        ],
      },
    ],
    essentials: [
      "Multipath can cause fading and also enable spatial separation.",
      "SU-MIMO serves one client; MU-MIMO serves several compatible clients.",
      "OFDM uses many orthogonal subcarriers.",
      "OFDMA assigns resource units across users.",
      "Higher QAM needs better SNR.",
      "An MCS combines modulation and coding choices for a supported PHY configuration.",
      "Cyclic prefix protects OFDM against limited multipath delay spread.",
    ],
    comparisonTitle: "OFDM vs OFDMA",
    comparison: {
      left: {
        label: "OFDM",
        points: [
          "Many orthogonal subcarriers",
          "One scheduled user uses channel",
          "Parallel symbols resist multipath",
        ],
      },
      right: {
        label: "OFDMA",
        points: [
          "Groups subcarriers into resource units",
          "Several users can share opportunity",
          "Efficient for dense mixed traffic",
        ],
      },
    },
    followUp: "Why does higher-order QAM normally require a higher SNR?",
  },
  lastMinute: {
    definition:
      "Capacity grows by using radio resources efficiently across space, time, and frequency.",
    memoryLine:
      "MIMO separates space; OFDMA divides frequency resources among users.",
    cues: [
      "SISO: one stream. SU-MIMO: several streams to one client.",
      "MU-MIMO: spatial streams to multiple clients.",
      "OFDM: subcarriers. OFDMA: scheduled resource units.",
      "Wider channel and higher QAM need good radio conditions.",
    ],
    trap: "Do not say beamforming and spatial multiplexing are the same operation merely because both use multiple antennas.",
  },
};

export const wifiAccessBandsAndPerformance: SubjectTopic = {
  slug: "wifi-access-bands-and-performance",
  title: "Wi-Fi Access, Bands, Channels, and Performance",
  description:
    "Understand CSMA/CA, acknowledgments, hidden nodes, RTS/CTS, Wi-Fi bands and channels, interference, roaming, and throughput.",
  readTime: "31 min",
  difficulty: "Intermediate",
  tags: ["CSMA/CA", "Channels", "Performance"],
  learn: {
    opening:
      "Wi-Fi devices share a half-duplex radio channel. They cannot reliably listen for a collision while transmitting, so 802.11 coordinates access through collision avoidance, random backoff, acknowledgments, and optional reservation messages.",
    sections: [
      {
        title: "Why Wi-Fi Uses CSMA/CA",
        paragraphs: [
          "A wireless transmitter's own signal can be far stronger than another station's signal, making collision detection during transmission impractical. A station instead senses the channel before sending and uses positive acknowledgments to infer successful delivery.",
          "Carrier sensing can be physical, by detecting radio energy or a valid preamble, and virtual, by respecting the Network Allocation Vector announced in frame duration information.",
        ],
      },
      {
        title: "DCF Access Process",
        flow: [
          "Sense the medium and wait while it is busy",
          "Wait the required interframe interval after it becomes idle",
          "Choose a random counter inside the contention window",
          "Decrease counter only during idle slots and freeze it when busy",
          "Transmit at zero; success needs ACK, failure causes retry and larger window",
        ],
        paragraphs: [
          "Random backoff reduces the chance that several stations transmit immediately after the same busy period. It cannot eliminate every collision, especially when stations cannot hear one another.",
          "An ACK uses the shorter SIFS interval, while a new ordinary contention attempt waits a longer DIFS-like interval plus backoff. This gives the immediate response priority before unrelated stations begin a new transmission. Exact timing values depend on the 802.11 PHY.",
        ],
      },
      {
        title: "Contention-Window Numerical",
        paragraphs: [
          "Assume an exam question gives minimum contention window CWmin = 15. The station selects an integer from 0 through 15, giving 16 possible backoff values. If the first attempt fails and the rule is CWnew = 2(CWold + 1) - 1, the next window is 31, with values 0 through 31.",
          "After another failure it becomes 63, subject to the protocol's maximum. If the chosen counter is 9 and three idle slots pass before another frame arrives, the station freezes at 6 and resumes later rather than choosing a new counter immediately.",
        ],
      },
      {
        title: "Hidden Nodes and RTS/CTS",
        paragraphs: [
          "A hidden-node problem occurs when stations A and C can both reach AP B but cannot hear each other. Both may believe the medium is idle and transmit to B at the same time.",
          "Optional RTS/CTS lets a sender request a transmission opportunity and lets the receiver announce it. Other stations update their virtual carrier-sense timer. The exchange adds overhead, so it is most useful when collision cost is high or frames are large.",
          "The exposed-node problem is different: a station unnecessarily waits after hearing a nearby transmission even though its own receiver could have accepted a simultaneous transmission. Carrier sensing protects shared airtime but can also reduce spatial reuse.",
        ],
      },
      {
        title: "2.4, 5, and 6 GHz Bands",
        paragraphs: [
          "Regulatory channel availability and transmit power vary by country. Range also depends on power, antennas, walls, receivers, and noise, so band comparisons are useful tendencies rather than fixed distance promises.",
        ],
        dataTable: {
          headers: ["Band", "Typical advantage", "Typical limitation"],
          rows: [
            [
              "2.4 GHz",
              "Longer reach and broad compatibility",
              "Few non-overlapping wide channels and heavy interference",
            ],
            [
              "5 GHz",
              "More channels and high throughput",
              "More wall loss than 2.4 GHz",
            ],
            [
              "6 GHz",
              "Large clean spectrum and wide channels",
              "Newer clients and shorter practical reach",
            ],
          ],
        },
      },
      {
        title: "Channels, Width, and Reuse",
        paragraphs: [
          "A channel occupies a frequency range. Wider 40, 80, 160, or 320 MHz channels can raise peak PHY rate but consume more spectrum and overlap more neighboring networks. Dense deployments often gain more total capacity from narrower channels and careful reuse.",
          "In 2.4 GHz deployments using 20 MHz channels, channels 1, 6, and 11 are a common non-overlapping plan in countries permitting them. Adjacent-channel interference is usually worse than properly planned co-channel sharing because overlapping transmissions cannot coordinate cleanly.",
        ],
      },
      {
        title: "Three Kinds of Interference",
        dataTable: {
          headers: ["Condition", "What happens", "Typical response"],
          rows: [
            [
              "Co-channel contention",
              "WLANs share one channel and defer to detected frames",
              "Plan reuse and reduce excess cell overlap",
            ],
            [
              "Adjacent-channel interference",
              "Partly overlapping channels corrupt one another without clean coordination",
              "Use non-overlapping channel plans",
            ],
            [
              "Non-Wi-Fi interference",
              "Other radio sources consume or disturb spectrum",
              "Locate source or change band/channel",
            ],
          ],
        },
        paragraphs: [
          "Co-channel networks reduce available airtime but can coordinate through carrier sensing. Adjacent-channel and non-Wi-Fi energy may look like noise or repeated corruption and can be more damaging.",
        ],
      },
      {
        title: "DFS and Automatic Channel Changes",
        paragraphs: [
          "Some 5 GHz channels require Dynamic Frequency Selection because radar systems have priority. An AP must check for radar and move away when required. This can temporarily interrupt clients or cause an unexpected channel change, so channel planning must consider local regulations and device support.",
        ],
      },
      {
        title: "What Controls Real Throughput",
        points: [
          "Signal strength and SNR determine sustainable modulation and coding.",
          "Distance, walls, metal, and multipath change signal quality.",
          "Neighboring WLANs and non-Wi-Fi devices consume or disturb airtime.",
          "Slow clients and retransmissions use extra airtime.",
          "Half-duplex contention, headers, ACKs, and security add overhead.",
          "The AP, client, backhaul, router, ISP, and remote server can each bottleneck performance.",
        ],
        paragraphs: [
          "A speed-test result is not a direct measurement of Wi-Fi PHY rate. Diagnose the wireless link, LAN backhaul, and Internet path separately.",
        ],
      },
      {
        title: "Practical Wi-Fi Metrics",
        dataTable: {
          headers: ["Metric", "Meaning", "Diagnostic clue"],
          rows: [
            [
              "RSSI",
              "Received signal strength indicator",
              "Strong signal alone does not prove clean channel",
            ],
            [
              "Noise floor",
              "Measured background energy",
              "Higher noise reduces usable margin",
            ],
            [
              "SNR",
              "Signal level relative to noise",
              "Higher SNR supports stronger MCS",
            ],
            [
              "Retry percentage",
              "Frames requiring retransmission",
              "High value suggests loss or contention",
            ],
            [
              "Channel utilization",
              "Fraction of sensed busy airtime",
              "High value leaves little transmission opportunity",
            ],
          ],
        },
        paragraphs: [
          "Example: a laptop shows strong RSSI beside an AP but has low throughput. High channel utilization and retry percentage can reveal a crowded or interfering channel. Moving closer will not solve the main problem; channel planning or interference removal may.",
        ],
      },
      {
        title: "Airtime Fairness",
        paragraphs: [
          "A slow client occupies more airtime to send the same amount of data. Airtime-fair scheduling tries to share transmission time rather than giving every client an equal number of frames or bytes. It can improve total capacity but may reduce service to distant or legacy clients.",
        ],
      },
      {
        title: "Airtime Numerical",
        paragraphs: [
          "Suppose a channel can carry useful data for 70 percent of time after contention and protocol overhead. A client has a 600 Mbit/s PHY rate and receives half of the available airtime. A rough throughput estimate is 600 x 0.70 x 0.50 = 210 Mbit/s.",
          "This simplified estimate ignores rate changes, retransmissions, multi-user scheduling, and direction changes, but it explains why several clients do not each receive the full advertised rate.",
        ],
      },
      {
        title: "ALOHA as a Multiple-Access Baseline",
        paragraphs: [
          "Pure ALOHA transmits whenever ready and retries after collision. Its normalized throughput is S = G e^(-2G), maximized at G = 0.5, giving 1/(2e) or about 18.4 percent. Slotted ALOHA allows transmission only at slot boundaries, with S = G e^(-G), maximized at G = 1, giving 1/e or about 36.8 percent.",
          "ALOHA is a simple exam model, not the access method of modern Wi-Fi. Wi-Fi uses carrier sensing, contention windows, ACKs, and scheduling enhancements.",
        ],
      },
    ],
    mechanism: {
      title: "How a Wi-Fi station contends for airtime",
      steps: [
        "Sense the radio channel and defer while it is busy.",
        "After the required idle interval, choose a random backoff counter.",
        "Count down in idle slots and pause during another transmission.",
        "Transmit when the counter reaches zero.",
        "Use ACK success or timeout to finish or retry with a larger contention window.",
      ],
    },
    example: {
      title: "Why a wider channel can be slower",
      body: "An 80 MHz channel offers a higher peak rate, but in a crowded apartment it overlaps several networks and suffers retransmissions. A clean 40 MHz channel can deliver steadier and sometimes higher useful throughput.",
    },
    misconception:
      "A stronger signal does not guarantee faster Internet. Interference, airtime contention, backhaul, ISP service, and the remote server still matter.",
  },
  revise: {
    definition:
      "Wi-Fi uses collision avoidance and shared airtime across regulated radio channels.",
    sections: [
      {
        title: "Access Recall",
        points: [
          "Sense, defer, random backoff, transmit, wait for ACK.",
          "Freeze the counter when the channel becomes busy.",
          "Failure grows the contention window before retry.",
          "RTS/CTS can reduce hidden-node collision cost.",
        ],
      },
    ],
    essentials: [
      "Wi-Fi is shared and half-duplex.",
      "2.4 GHz usually reaches farther; 5 and 6 GHz offer more spectrum.",
      "Wider channels raise peak rate but reduce reuse opportunities.",
      "PHY rate, airtime share, and application throughput are different.",
      "Pure ALOHA peaks near 18.4 percent; Slotted ALOHA near 36.8 percent.",
      "SIFS responses such as ACK get priority over a new DIFS contention attempt.",
      "High RSSI with poor SNR or many retries can still produce low throughput.",
    ],
    comparisonTitle: "CSMA/CD vs CSMA/CA",
    comparison: {
      left: {
        label: "CSMA/CD",
        points: [
          "Classic shared Ethernet",
          "Detect collision while sending",
          "Jam and back off",
        ],
      },
      right: {
        label: "CSMA/CA",
        points: [
          "Wi-Fi contention",
          "Avoid through sensing and backoff",
          "Uses ACK and optional RTS/CTS",
        ],
      },
    },
    followUp:
      "Why does the Wi-Fi backoff counter freeze when another station transmits?",
  },
  lastMinute: {
    definition:
      "CSMA/CA shares Wi-Fi airtime through sensing, random backoff, and ACKs.",
    memoryLine: "Listen, wait, count down, send, confirm.",
    cues: [
      "Hidden nodes can reach the AP but not hear each other.",
      "RTS/CTS reserves airtime but adds overhead.",
      "Channel 1, 6, and 11 is a common 2.4 GHz 20 MHz plan.",
      "Throughput is lower than PHY rate.",
    ],
    trap: "Do not say Wi-Fi detects collisions while transmitting in the same way as classic Ethernet.",
  },
};

export const wifiSecurityEvolution: SubjectTopic = {
  slug: "wifi-security-evolution",
  title: "Wi-Fi Security: WEP, WPA, WPA2, and WPA3",
  description:
    "Compare wireless security generations, personal and enterprise authentication, encryption, handshakes, protected management frames, and common attacks.",
  readTime: "27 min",
  difficulty: "Intermediate",
  tags: ["WPA2", "WPA3", "Wireless Security"],
  learn: {
    opening:
      "Wi-Fi security must authenticate access and protect frames travelling through a shared radio medium. Older designs are no longer safe even when they use long passwords.",
    sections: [
      {
        title: "Security Evolution",
        dataTable: {
          headers: ["Generation", "Main protection", "Security status"],
          rows: [
            ["WEP", "RC4 with short IV design", "Broken and must not be used"],
            ["WPA", "TKIP transitional protection", "Obsolete"],
            [
              "WPA2",
              "AES-CCMP",
              "Secure when configured and patched correctly",
            ],
            [
              "WPA3",
              "SAE and stronger requirements",
              "Preferred for capable modern devices",
            ],
          ],
        },
        paragraphs: [
          "WPA was a transitional response that could run on some older hardware. WPA2 standardized strong AES-CCMP protection. WPA3-Personal replaces the traditional pre-shared-key exchange with Simultaneous Authentication of Equals.",
        ],
      },
      {
        title: "Personal vs Enterprise",
        table: {
          headers: ["Personal mode", "Enterprise mode"],
          rows: [
            [
              "Shared network password or SAE credential",
              "Per-user or device authentication",
            ],
            [
              "Suitable for homes and small networks",
              "Uses 802.1X and an authentication server",
            ],
            ["Simple management", "Central policy and revocation"],
          ],
        },
        paragraphs: [
          "Enterprise Wi-Fi commonly uses 802.1X with EAP methods and a RADIUS server. Certificate validation is critical; accepting an untrusted authentication server can expose credentials to an evil-twin network.",
        ],
      },
      {
        title: "Enterprise Authentication Roles",
        paragraphs: [
          "Enterprise access separates the device requesting access, the network device controlling access, and the server that validates identity.",
        ],
        dataTable: {
          headers: ["Role", "Typical device", "Job"],
          rows: [
            [
              "Supplicant",
              "Wireless client",
              "Requests access and supplies EAP identity or proof",
            ],
            [
              "Authenticator",
              "Access point or controller",
              "Controls the network port and relays authentication",
            ],
            [
              "Authentication server",
              "RADIUS server",
              "Validates credentials and returns authorization",
            ],
          ],
        },
      },
      {
        title: "PMK, PTK, and GTK",
        paragraphs: [
          "The PTK is derived from the PMK plus fresh nonces and endpoint addresses. This lets separate sessions use different transient keys even when clients start from related credential material.",
        ],
        dataTable: {
          headers: ["Key material", "Scope", "Simple meaning"],
          rows: [
            [
              "PMK",
              "Authentication result",
              "Root key material known to client and WLAN infrastructure",
            ],
            [
              "PTK",
              "One client-AP relationship",
              "Derived unicast session keys",
            ],
            [
              "GTK",
              "WLAN group",
              "Key used for protected broadcast and multicast traffic",
            ],
          ],
        },
      },
      {
        title: "WPA2 Four-Way Handshake",
        paragraphs: [
          "After authentication establishes shared key material, the WPA2 four-way handshake proves both sides possess it and derives fresh session keys. Nonces and MAC addresses contribute to key derivation, and replay counters help prevent reuse of old handshake messages.",
          "The handshake does not send the Wi-Fi password through the air. Captured handshake data can still support offline password guessing when a weak WPA2-Personal password is used.",
        ],
        flow: [
          "Message 1: AP sends its fresh nonce to the client",
          "Message 2: client sends its nonce and proves the derived key",
          "Message 3: AP confirms key installation and delivers group-key information",
          "Message 4: client acknowledges completion",
        ],
      },
      {
        title: "CCMP and the KRACK Lesson",
        paragraphs: [
          "CCMP uses AES-based counter mode for confidentiality and a CBC-MAC component for integrity and authentication of protected frame data. WPA2-AES security depends on correct nonce, replay, key, and implementation behavior, not simply on the AES cipher name.",
          "KRACK targeted handshake key reinstallation behavior and nonce reuse in vulnerable implementations. It did not mean the AES algorithm was broken. Updating affected clients and access points was the required defense.",
        ],
      },
      {
        title: "What WPA3 Improves",
        points: [
          "SAE resists passive offline dictionary testing better than the older PSK handshake.",
          "Forward secrecy limits the effect of a password discovered later on previously captured sessions.",
          "Protected Management Frames are required in WPA3 certification profiles.",
          "Enhanced Open uses Opportunistic Wireless Encryption for per-user encryption on supported open networks, but it does not authenticate the venue.",
        ],
        paragraphs: [
          "WPA3 transition mode permits older WPA2 clients but can retain downgrade or configuration risks. Security depends on client support, updates, password quality, certificate validation, and disabling obsolete protocols.",
        ],
      },
      {
        title: "Common Wireless Threats and Defenses",
        paragraphs: [
          "Wireless threats target credentials, AP identity, management traffic, and unencrypted local communication. Defense requires both Wi-Fi protection and secure applications.",
        ],
        dataTable: {
          headers: ["Threat", "Risk", "Useful defense"],
          rows: [
            [
              "Weak password",
              "Offline guessing or account sharing",
              "Long unique credential or Enterprise authentication",
            ],
            [
              "Evil twin",
              "Fake AP impersonates trusted SSID",
              "Validate certificates and use trusted profiles",
            ],
            [
              "Deauthentication abuse",
              "Forces clients off network",
              "Protected Management Frames",
            ],
            [
              "WPS PIN attack",
              "Recovers access despite good WPA password",
              "Disable vulnerable WPS methods",
            ],
            [
              "Open hotspot snooping",
              "Unprotected local radio traffic",
              "HTTPS, trusted VPN when needed, or Enhanced Open",
            ],
          ],
        },
      },
      {
        title: "Wireless Protection Modes Compared",
        paragraphs: [
          "Transition modes improve compatibility but can preserve weaker choices that administrators intended to retire.",
        ],
        dataTable: {
          headers: ["Mode", "Network authentication", "Wireless encryption"],
          rows: [
            ["Open", "None", "None"],
            [
              "Enhanced Open / OWE",
              "Does not prove venue identity",
              "Per-user over-the-air encryption",
            ],
            ["WPA2-Personal", "Shared PSK", "AES-CCMP"],
            [
              "WPA3-Personal",
              "SAE shared credential",
              "Modern WPA3 protection",
            ],
            [
              "WPA2/3-Enterprise",
              "802.1X/EAP identity",
              "Per-session enterprise keys",
            ],
          ],
        },
        points: [
          "In WPA2/WPA3 transition mode, one SSID accepts both client types.",
          "A user or misconfigured client may connect through the weaker WPA2 option.",
          "Use transition mode only while compatibility requires it, then remove the weaker mode.",
        ],
      },
    ],
    mechanism: {
      title: "How to configure a safer WLAN",
      steps: [
        "Use WPA3 where all required devices support it, otherwise patched WPA2-AES.",
        "Disable WEP, TKIP-only modes, and vulnerable WPS methods.",
        "Choose a long unique personal credential or deploy 802.1X Enterprise authentication.",
        "Enable Protected Management Frames where supported.",
        "Update APs and clients, segment guests, and monitor for rogue APs.",
      ],
    },
    example: {
      title: "An open hotspot with HTTPS",
      body: "HTTPS protects the browser session to a valid website even on an open WLAN, but nearby devices may still observe metadata or attack other exposed services. Network encryption and end-to-end application encryption solve different problems.",
    },
    misconception:
      "A hidden SSID is not a meaningful encryption method. The network name can still be discovered from management traffic, while WPA protection is what secures frames.",
  },
  revise: {
    definition:
      "Modern Wi-Fi security authenticates access and encrypts wireless frames; WPA3 is the preferred current generation.",
    sections: [
      {
        title: "Generation Recall",
        points: [
          "WEP: broken RC4 design.",
          "WPA: temporary TKIP transition.",
          "WPA2: AES-CCMP.",
          "WPA3-Personal: SAE and stronger requirements.",
        ],
      },
    ],
    essentials: [
      "Personal mode uses a shared credential; Enterprise uses 802.1X/EAP.",
      "The WPA2 password is not transmitted directly in the four-way handshake.",
      "Weak WPA2-Personal passwords can be tested offline after capture.",
      "PMF protects selected management frames.",
      "Enhanced Open encrypts traffic but does not authenticate the hotspot owner.",
      "Supplicant asks, authenticator controls access, and RADIUS validates Enterprise identity.",
      "PMK is root material; PTK protects unicast; GTK protects group traffic.",
    ],
    comparisonTitle: "WPA2-Personal vs WPA3-Personal",
    comparison: {
      left: {
        label: "WPA2-Personal",
        points: [
          "PSK-based authentication",
          "AES-CCMP",
          "Weak passwords enable offline guesses",
        ],
      },
      right: {
        label: "WPA3-Personal",
        points: [
          "SAE authentication",
          "Forward secrecy",
          "Better password-guessing resistance",
        ],
      },
    },
    followUp: "Why is hiding the SSID not a replacement for WPA2 or WPA3?",
  },
  lastMinute: {
    definition:
      "WPA protects access and wireless frame confidentiality and integrity.",
    memoryLine: "WEP broken, WPA temporary, WPA2 AES, WPA3 SAE.",
    cues: [
      "Avoid WEP and TKIP-only configurations.",
      "Enterprise Wi-Fi commonly uses 802.1X, EAP, and RADIUS.",
      "PMF reduces management-frame spoofing attacks.",
      "Validate Enterprise authentication certificates.",
    ],
    trap: "Do not say WPA3 or a VPN makes unsafe applications automatically secure in every other respect.",
  },
};

export const transmissionMediaNoiseAndCapacity: SubjectTopic = {
  slug: "transmission-media-noise-and-capacity",
  title: "Transmission Media, Noise, and Channel Capacity",
  description:
    "Compare wired and wireless media, cable capabilities, attenuation and noise, decibels, SNR, Nyquist, and Shannon numericals.",
  readTime: "34 min",
  difficulty: "Intermediate",
  tags: ["Transmission Media", "SNR", "Shannon"],
  learn: {
    opening:
      "The physical medium carries electromagnetic energy between devices. Its bandwidth, attenuation, noise, propagation behavior, and cost determine which signals and data rates are practical.",
    sections: [
      {
        title: "Guided and Unguided Media",
        paragraphs: [
          "Guided media constrain the signal through a physical path such as copper or glass. Unguided media radiate through free space. Neither category is always better; distance, mobility, interference, deployment cost, and capacity decide the fit.",
        ],
        visual: {
          src: "/notes/computer-networks/transmission-media.png",
          alt: "Transmission media divided into guided twisted pair coaxial and fiber, and unguided radio microwave and satellite",
          width: 1536,
          height: 1024,
          caption:
            "Guided signals follow copper or glass; unguided signals propagate through free space.",
        },
      },
      {
        title: "Twisted Pair, Coaxial, and Fiber",
        paragraphs: [
          "The main guided media differ in signalling method, interference resistance, reach, installation effort, and achievable capacity.",
        ],
        dataTable: {
          headers: ["Medium", "Signal", "Strength", "Limitation"],
          rows: [
            [
              "Twisted pair",
              "Electrical",
              "Low cost and common Ethernet installation",
              "Distance and electromagnetic interference",
            ],
            [
              "Coaxial",
              "Electrical",
              "Shielding and useful RF bandwidth",
              "Bulkier and less common for switched LAN access",
            ],
            [
              "Fiber optic",
              "Light",
              "High capacity, long reach, and immunity to EMI",
              "Optics, termination, and bend sensitivity",
            ],
          ],
        },
      },
      {
        title: "UTP, STP, and Why Wires Are Twisted",
        paragraphs: [
          "Twisting makes both conductors experience similar external interference, allowing differential receivers to cancel much of the common noise. It also reduces crosstalk between nearby pairs.",
        ],
        table: {
          headers: ["UTP", "STP"],
          rows: [
            [
              "No added metallic pair or cable shield",
              "Adds shielding around pairs or cable",
            ],
            [
              "Lower cost and easier installation",
              "Better control of electromagnetic interference",
            ],
            [
              "Common in offices and homes",
              "Needs correct grounding and installation",
            ],
          ],
        },
      },
      {
        title: "Ethernet Cable Categories",
        paragraphs: [
          "Category alone does not guarantee a speed. Link rate depends on the Ethernet standard, cable construction, length, connectors, installation quality, and equipment at both ends. The values below are common study references for standard maximum channel lengths unless qualified.",
        ],
        dataTable: {
          headers: ["Category", "Common Ethernet capability", "Typical note"],
          rows: [
            ["Cat5", "100BASE-TX", "Legacy; Cat5e replaced it for new work"],
            [
              "Cat5e",
              "1000BASE-T to 100 m",
              "Often supports faster rates at shorter lengths",
            ],
            [
              "Cat6",
              "1 Gbit/s to 100 m; 10 Gbit/s at shorter reach",
              "Better crosstalk performance",
            ],
            [
              "Cat6A",
              "10GBASE-T to 100 m",
              "Designed for full 10-gigabit channel reach",
            ],
            ["Cat8", "25/40GBASE-T to about 30 m", "Data-center short reach"],
          ],
        },
      },
      {
        title: "Fiber Types and Propagation",
        paragraphs: [
          "Single-mode fiber uses a small core and supports long distances with low modal dispersion. Multimode fiber uses a larger core and supports lower-cost optics over shorter distances. Fiber is immune to electromagnetic interference because information travels as light.",
          "Fiber confines light mainly through total internal reflection at the core-cladding boundary when the geometry and refractive indices meet the required condition. Excessive bending can let optical power escape and increase loss.",
          "Propagation delay depends mainly on path length and signal speed, not the link's bit rate. A faster link serializes bits sooner but does not make the wave travel through the medium instantly.",
        ],
      },
      {
        title: "Baud Rate, Bit Rate, and Bandwidth",
        paragraphs: [
          "Baud is the number of transmitted symbols per second. A symbol may represent more than one bit. For an ideal M-level modulation, bits per symbol = log2(M), so bit rate = symbol rate x bits per symbol before coding and protocol overhead.",
          "Channel bandwidth in formulas such as Nyquist and Shannon is measured in hertz, while data rate is measured in bit/s. Everyday networking sometimes uses bandwidth to mean bit rate, but exam formulas require the units to be distinguished.",
          "Example: 2,400 baud using 16-QAM carries log2(16) = 4 bits per symbol, so the uncoded bit rate is 2,400 x 4 = 9,600 bit/s.",
        ],
      },
      {
        title: "Attenuation, Noise, and SNR",
        paragraphs: [
          "Attenuation is loss of signal power over distance. Thermal noise comes from random electron motion; crosstalk comes from nearby signals; impulse noise comes from short disturbances. The receiver needs sufficient signal relative to total noise.",
          "SNR = signal power / noise power. In decibels, SNRdB = 10 log10(S/N). Power gain or loss in dB also uses 10 log10(Pout/Pin). A 10 dB power increase means 10 times the power; 20 dB means 100 times.",
        ],
      },
      {
        title: "dB and SNR Numerical",
        paragraphs: [
          "If signal power is 10 mW and noise power is 0.01 mW, linear SNR = 10 / 0.01 = 1,000. Therefore SNRdB = 10 log10(1,000) = 30 dB.",
          "To convert back, SNRlinear = 10^(SNRdB/10). For 20 dB, the ratio is 10^2 = 100.",
        ],
      },
      {
        title: "Attenuation and Link-Budget Numerical",
        paragraphs: [
          "Decibel gains and losses can be added. Suppose a transmitter sends 20 dBm, the cable loses 3 dB, the transmit antenna adds 5 dBi, path loss is 80 dB, and the receive antenna adds 2 dBi. Received power = 20 - 3 + 5 - 80 + 2 = -56 dBm.",
          "If receiver sensitivity for the selected rate is -70 dBm, the link margin is -56 - (-70) = 14 dB. A positive margin suggests room for fading and extra losses; required margin depends on reliability goals and environment.",
          "A separate attenuation example: input power is 100 mW and output power is 10 mW. Gain = 10 log10(10/100) = -10 dB, so the path has 10 dB attenuation.",
        ],
      },
      {
        title: "Propagation-Delay Numericals",
        paragraphs: [
          "For 100 km of fiber with propagation speed 2 x 10^8 m/s, one-way propagation delay = 100,000 / (2 x 10^8) = 0.0005 s = 0.5 ms. This excludes transmission, queueing, and processing delay.",
          "For a simplified geostationary satellite path of 36,000 km up and 36,000 km down, one ground-to-ground one-way distance is about 72,000 km. At 3 x 10^8 m/s, propagation is about 240 ms before other path segments. A reply produces roughly 480 ms propagation round trip.",
        ],
      },
      {
        title: "Nyquist and Shannon Capacity",
        paragraphs: [
          "For an ideal noiseless channel of bandwidth B using L discrete signal levels, the Nyquist limit is C = 2B log2(L). For a noisy channel, Shannon-Hartley gives C = B log2(1 + S/N), where S/N must be a linear ratio, not a dB value.",
          "Nyquist shows how bandwidth and signal levels limit ideal symbol transmission. Shannon gives the theoretical upper bound for reliable communication in the presence of noise. Real systems operate below these limits because of implementation and protocol overhead.",
        ],
      },
      {
        title: "Channel-Capacity Numericals",
        paragraphs: [
          "Nyquist example: B = 3,000 Hz and L = 4. Capacity = 2 x 3,000 x log2(4) = 12,000 bit/s.",
          "Shannon example: B = 3,000 Hz and SNR = 30 dB. Convert first: S/N = 10^(30/10) = 1,000. C = 3,000 log2(1,001), which is about 29,902 bit/s or 29.9 kbit/s.",
          "If both limits apply to one design, the achievable bit rate cannot exceed the smaller relevant bound for the chosen number of levels and channel noise.",
        ],
      },
    ],
    mechanism: {
      title: "How to solve a Shannon numerical",
      steps: [
        "Write bandwidth B in hertz.",
        "If SNR is in dB, convert using S/N = 10^(SNRdB/10).",
        "Calculate 1 + S/N.",
        "Evaluate log base 2 and multiply by B.",
        "State the answer in bit/s and compare with any other channel limit.",
      ],
    },
    example: {
      title: "Bandwidth is not throughput",
      body: "A fiber link may have a 1 Gbit/s configured rate, while an application receives less because Ethernet, IP, transport, contention, server processing, and congestion consume capacity or create delay.",
    },
    misconception:
      "Do not substitute an SNR value measured in decibels directly into Shannon's formula. Convert it to a linear power ratio first.",
  },
  revise: {
    definition:
      "Media properties and SNR limit physical communication; Nyquist and Shannon describe theoretical capacity bounds.",
    sections: [
      {
        title: "Formula Recall",
        points: [
          "SNR = S/N.",
          "SNRdB = 10 log10(S/N).",
          "Nyquist: C = 2B log2(L).",
          "Shannon: C = B log2(1 + S/N).",
        ],
      },
    ],
    essentials: [
      "Twisted pair and coax carry electrical signals; fiber carries light.",
      "Fiber resists EMI and supports long high-capacity links.",
      "Attenuation reduces signal; noise reduces useful SNR.",
      "Convert dB SNR to linear before Shannon.",
      "Propagation delay and transmission delay are different.",
      "Bit rate = baud x bits per symbol before coding and overhead.",
      "Link budget adds gains and subtracts losses in dB.",
    ],
    comparisonTitle: "Nyquist vs Shannon",
    comparison: {
      left: {
        label: "Nyquist",
        points: [
          "Ideal noiseless channel",
          "Uses signal levels L",
          "C = 2B log2(L)",
        ],
      },
      right: {
        label: "Shannon",
        points: [
          "Noisy channel limit",
          "Uses linear S/N",
          "C = B log2(1 + S/N)",
        ],
      },
    },
    followUp: "What is the linear SNR corresponding to 40 dB?",
  },
  lastMinute: {
    definition:
      "Channel capacity grows with bandwidth and usable signal quality.",
    memoryLine: "Convert dB first, then place linear SNR inside Shannon.",
    cues: [
      "10 dB power ratio = 10; 20 dB = 100; 30 dB = 1,000.",
      "Nyquist uses L levels; Shannon uses S/N.",
      "Guided: copper and fiber. Unguided: radio and microwave.",
      "Fiber uses light and is immune to EMI.",
    ],
    trap: "Do not confuse a cable category's possible standard support with a guaranteed speed at every distance and installation quality.",
  },
};
