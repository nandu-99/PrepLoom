import type { ComputerNetworksQuestion } from "@/content/interview-questions/types";

export const computerNetworksInterviewQuestions: ComputerNetworksQuestion[] = [
  {
    id: "what-is-computer-network",
    category: "Networking fundamentals",
    question: "Let us start with the basics. What is a computer network?",
    answer:
      "A computer network is a group of devices that exchange data over wired or wireless links. The devices follow agreed protocols so they can identify one another, format messages, detect problems, and deliver data to the correct application. The Internet is a network of many smaller networks.",
  },
  {
    id: "what-is-protocol",
    category: "Networking fundamentals",
    question: "What do we mean when we call something a network protocol?",
    answer:
      "A protocol is a set of rules for communication. It defines things such as message format, order, meaning, timing, and how errors are handled. Both sides need to follow the same protocol, just as an HTTP client and server must agree on how requests and responses are represented.",
  },
  {
    id: "osi-and-tcp-ip",
    category: "Networking fundamentals",
    question: "How would you relate the OSI model to the TCP/IP model?",
    answer:
      "The OSI model has seven layers and is mainly useful for learning and troubleshooting. The TCP/IP model describes the stack used on the Internet with application, transport, internet, and link layers. OSI session and presentation responsibilities are usually handled inside the TCP/IP application layer.",
  },
  {
    id: "encapsulation",
    category: "Networking fundamentals",
    question: "What happens to application data as it moves down the network stack?",
    answer:
      "Each layer adds information needed for its job. Transport adds ports and reliability information, the network layer adds IP addresses, and the link layer adds a local frame header and trailer. The receiver removes these in reverse order and delivers the original data to the application.",
  },
  {
    id: "switch-router-gateway",
    category: "Networking fundamentals",
    question: "Can you distinguish a switch, a router, and a gateway?",
    answer:
      "A switch normally forwards frames inside a local network using MAC addresses. A router connects IP networks and selects the next hop using a routing table. Gateway is a broader term for a device or service that provides access to another network or translates between different protocols.",
  },
  {
    id: "bandwidth-throughput-latency",
    category: "Networking fundamentals",
    question: "What is the difference between bandwidth, throughput, and latency?",
    answer:
      "Bandwidth is the maximum data-carrying capacity of a link. Throughput is the useful rate actually achieved after protocol overhead, congestion, and other limits. Latency is the time data takes to travel from source to destination, so a high-bandwidth link can still have high latency.",
  },

  {
    id: "enter-url-in-browser",
    category: "HTTP, HTTPS, and DNS",
    question: "Walk me through what happens after you enter a URL in a browser.",
    answer:
      "The browser parses the URL, resolves the domain through DNS, and connects to the server's IP address. For HTTPS it completes a TLS handshake, then sends an HTTP request. The response may pass through proxies or a CDN before the browser receives it, processes the resources, and renders the page.",
  },
  {
    id: "dns-resolution",
    category: "HTTP, HTTPS, and DNS",
    question: "How does DNS resolve a domain name?",
    answer:
      "The client first checks browser, operating-system, and local resolver caches. If there is no cached answer, a recursive resolver follows referrals from a root server to the relevant top-level-domain server and then the authoritative server. It returns the record and caches it for its remaining TTL.",
  },
  {
    id: "dns-udp-and-tcp",
    category: "HTTP, HTTPS, and DNS",
    question: "Does DNS use UDP or TCP?",
    answer:
      "It can use both. Traditional DNS queries commonly use UDP because it has low overhead, while TCP is required when a response does not fit or for operations such as zone transfer. Modern encrypted DNS can also run over TLS, HTTPS, or QUIC depending on the protocol in use.",
  },
  {
    id: "http-and-https",
    category: "HTTP, HTTPS, and DNS",
    question: "What does HTTPS add on top of HTTP?",
    answer:
      "HTTPS carries HTTP over TLS. TLS encrypts data in transit, detects tampering, and normally authenticates the server using a certificate. The HTTP methods and response semantics remain HTTP; TLS protects the connection that carries those messages.",
  },
  {
    id: "http-stateless",
    category: "HTTP, HTTPS, and DNS",
    question: "HTTP is described as stateless. How do websites still maintain a login session?",
    answer:
      "Stateless means each HTTP request can be understood without the server relying on protocol-level memory of earlier requests. Applications add continuity using cookies, session identifiers, or tokens. The browser sends that information with later requests, allowing the server to associate them with the same authenticated session.",
  },
  {
    id: "safe-and-idempotent-methods",
    category: "HTTP, HTTPS, and DNS",
    question: "What makes an HTTP method safe or idempotent?",
    answer:
      "A safe method is intended only to retrieve information, so GET and HEAD should not change server state. An idempotent method can be repeated with the same intended effect as one request. GET, PUT, and DELETE are idempotent by definition, while POST is not generally idempotent.",
  },
  {
    id: "http-versions",
    category: "HTTP, HTTPS, and DNS",
    question: "What are the practical differences between HTTP/1.1, HTTP/2, and HTTP/3?",
    answer:
      "HTTP/1.1 usually needs multiple TCP connections for good parallelism. HTTP/2 multiplexes streams over one TCP connection and compresses headers, but packet loss can still delay all streams at the TCP layer. HTTP/3 uses QUIC over UDP, giving streams more independent loss recovery and faster connection setup.",
  },

  {
    id: "tcp-and-udp",
    category: "TCP, UDP, and sockets",
    question: "When would you choose UDP instead of TCP?",
    answer:
      "I would choose UDP when low delay, message boundaries, or application-controlled reliability matters more than built-in ordered delivery. Common examples include live media, DNS, and real-time games. TCP is a better default when the application needs a reliable, ordered byte stream without implementing those mechanisms itself.",
  },
  {
    id: "port-number",
    category: "TCP, UDP, and sockets",
    question: "What is a port number, and why do we need it if we already have an IP address?",
    answer:
      "An IP address identifies a network interface on a host, while a port identifies the application endpoint using a transport protocol. Together with the protocol, they let the operating system deliver incoming data to the correct process. TCP port 443 and UDP port 443 are separate transport endpoints.",
  },
  {
    id: "socket",
    category: "TCP, UDP, and sockets",
    question: "What exactly is a socket?",
    answer:
      "A socket is the operating system interface an application uses for network communication. A connected TCP flow is identified by the protocol, source IP and port, and destination IP and port. Applications use socket calls to bind, listen, connect, send, and receive data.",
  },
  {
    id: "tcp-three-way-handshake",
    category: "TCP, UDP, and sockets",
    question: "Why does TCP use a three-way handshake instead of two messages?",
    answer:
      "Both sides need to confirm that they can send and receive and agree on initial sequence numbers. The client sends SYN, the server replies with SYN-ACK, and the client acknowledges it. The third message confirms that the client received the server's sequence number and that the connection is ready.",
  },
  {
    id: "tcp-connection-close",
    category: "TCP, UDP, and sockets",
    question: "Why can closing a TCP connection require four messages?",
    answer:
      "TCP is full duplex, so each direction closes independently. One side sends FIN and the peer acknowledges it, but the peer may still have data to send. When it is finished, it sends its own FIN and receives the final acknowledgment. Some of these messages can be combined.",
  },
  {
    id: "servers-share-port",
    category: "TCP, UDP, and sockets",
    question: "How can one web server handle thousands of clients on the same port?",
    answer:
      "The listening socket uses the server's local address and port, but every accepted connection has a different endpoint combination. The source IP and source port usually differ for each client. The operating system uses the full connection tuple to deliver each segment to the correct socket.",
  },
  {
    id: "tcp-byte-stream",
    category: "TCP, UDP, and sockets",
    question: "If an application sends two messages over TCP, will the receiver read them as two messages?",
    answer:
      "Not necessarily. TCP provides an ordered byte stream and does not preserve application message boundaries. Two writes can arrive in one read, or one write can require several reads. The application must define its own framing, such as a length prefix, delimiter, or structured protocol format.",
  },
  {
    id: "connectionless-udp",
    category: "TCP, UDP, and sockets",
    question: "What does it mean when we call UDP connectionless?",
    answer:
      "UDP can send individual datagrams without first establishing a transport connection or maintaining TCP-style per-flow state. Each datagram is handled independently and keeps its message boundary. UDP itself does not guarantee delivery, ordering, duplicate suppression, or congestion control.",
  },

  {
    id: "tcp-sequence-acknowledgment",
    category: "TCP reliability and congestion",
    question: "How do sequence numbers and acknowledgments make TCP reliable?",
    answer:
      "Sequence numbers identify byte positions in the stream, and acknowledgments tell the sender the next byte the receiver expects. This lets TCP detect missing, duplicate, and out-of-order data. Missing data is retransmitted, while duplicate bytes can be discarded and reordered bytes can be held until the gap is filled.",
  },
  {
    id: "tcp-retransmission",
    category: "TCP reliability and congestion",
    question: "How does TCP decide that data should be retransmitted?",
    answer:
      "TCP retransmits when its retransmission timer expires or when acknowledgment patterns strongly suggest a segment was lost. Duplicate acknowledgments can trigger fast retransmit before the timer expires. Modern TCP also uses selective acknowledgment information when available to identify which ranges are missing.",
  },
  {
    id: "flow-and-congestion-control",
    category: "TCP reliability and congestion",
    question: "What is the difference between flow control and congestion control?",
    answer:
      "Flow control prevents a sender from overwhelming the receiving application and its buffer. Congestion control prevents senders from overwhelming the network path. TCP limits outstanding data using both the receiver's advertised window and the congestion window, effectively following the smaller limit.",
  },
  {
    id: "sliding-window",
    category: "TCP reliability and congestion",
    question: "Why is a sliding window faster than sending one packet and waiting for its acknowledgment?",
    answer:
      "A sliding window allows several bytes or segments to remain unacknowledged at the same time. That keeps the path busy while acknowledgments are traveling back, which is especially important on high-latency links. As data is acknowledged, the permitted range moves forward and more data can be sent.",
  },
  {
    id: "tcp-slow-start",
    category: "TCP reliability and congestion",
    question: "What is TCP slow start trying to achieve?",
    answer:
      "A sender does not initially know how much traffic the path can handle. Slow start begins with a limited congestion window and grows it quickly as acknowledgments arrive. When congestion is detected or a threshold is reached, TCP switches to more cautious growth rather than continuing to increase at the same rate.",
  },
  {
    id: "tcp-head-of-line-blocking",
    category: "TCP reliability and congestion",
    question: "What is head-of-line blocking in TCP?",
    answer:
      "TCP delivers bytes to the application in order. If one segment is missing, later bytes may already be available at the receiver but cannot be delivered past that gap. This is why one lost TCP packet can delay multiple HTTP/2 streams sharing the same connection.",
  },

  {
    id: "ipv4-and-ipv6",
    category: "IP addressing and NAT",
    question: "What are the important differences between IPv4 and IPv6?",
    answer:
      "IPv4 uses 32-bit addresses, while IPv6 uses 128-bit addresses and provides a much larger address space. IPv6 has a simpler base header, uses neighbor discovery instead of ARP, and does not use broadcast. It also restores easier end-to-end addressing, although firewalls are still essential.",
  },
  {
    id: "public-and-private-ip",
    category: "IP addressing and NAT",
    question: "What is the difference between a public IP address and a private IP address?",
    answer:
      "A public address is globally routable on the Internet and must be unique in that routing scope. Private IPv4 ranges are intended for internal networks and are not routed across the public Internet. Devices using private addresses commonly reach the Internet through NAT at an edge router.",
  },
  {
    id: "subnet-mask-cidr",
    category: "IP addressing and NAT",
    question: "What does the /24 mean in 192.168.1.0/24?",
    answer:
      "It means the first 24 bits identify the network and the remaining 8 bits identify addresses within that subnet. The equivalent subnet mask is 255.255.255.0. The range contains 256 addresses, though traditional IPv4 subnets reserve the network and broadcast addresses from normal host assignment.",
  },
  {
    id: "split-24-subnet",
    category: "IP addressing and NAT",
    question: "If I split a /24 network into four equal subnets, what prefix will each subnet use?",
    answer:
      "I need two additional subnet bits because two bits create four combinations. The prefix therefore changes from /24 to /26. Each subnet contains 64 addresses, and the network addresses advance by 64 in the last octet: 0, 64, 128, and 192.",
  },
  {
    id: "nat-and-pat",
    category: "IP addressing and NAT",
    question: "How do NAT and PAT differ?",
    answer:
      "NAT is the general translation of network addresses between scopes. PAT also translates transport ports, allowing many private hosts to share one public IPv4 address at the same time. The router keeps a mapping so returning traffic is sent back to the correct internal connection.",
  },
  {
    id: "mtu-and-fragmentation",
    category: "IP addressing and NAT",
    question: "What happens when an IP packet is larger than the path MTU?",
    answer:
      "In IPv4, a router may fragment the packet unless the Don't Fragment bit is set; otherwise it reports that the packet is too large. In IPv6, routers do not fragment packets, so the sender must adjust. Path MTU discovery helps a sender choose a size that fits the route.",
  },
  {
    id: "default-gateway",
    category: "IP addressing and NAT",
    question: "When does a host send a packet to its default gateway?",
    answer:
      "The host compares the destination with its own network prefix. If the destination is on the local subnet, it sends the frame directly to that host. Otherwise it sends the frame to the default gateway's link-layer address, while the IP destination remains the final remote host.",
  },

  {
    id: "routing-table-choice",
    category: "Routing and diagnostics",
    question: "How does a router choose an entry from its routing table?",
    answer:
      "It first finds routes whose prefixes match the destination address and chooses the longest prefix match, which is the most specific route. If multiple routes to that prefix remain, administrative preference and metric can influence the choice. The selected entry identifies the next hop or outgoing interface.",
  },
  {
    id: "static-and-dynamic-routing",
    category: "Routing and diagnostics",
    question: "When would you use static routing instead of a dynamic routing protocol?",
    answer:
      "Static routes are useful for small, stable networks, default routes, or paths that need strict control. They are simple and predictable but do not adapt automatically to failures. Dynamic protocols are better when many routers must exchange reachability information and respond to topology changes.",
  },
  {
    id: "distance-vector-link-state",
    category: "Routing and diagnostics",
    question: "How do distance-vector and link-state routing protocols differ?",
    answer:
      "A distance-vector router learns destination costs and next hops from its neighbors. A link-state router distributes information about its local links so routers can build a topology map and calculate paths. Link-state protocols usually converge faster but need more memory, processing, and protocol complexity.",
  },
  {
    id: "ping-and-traceroute",
    category: "Routing and diagnostics",
    question: "What do ping and traceroute actually tell you?",
    answer:
      "Ping normally uses ICMP echo messages to test reachability and measure round-trip time, but a failed ping does not always mean the host is down because ICMP may be filtered. Traceroute sends probes with increasing TTL or hop-limit values to reveal responding routers along the path.",
  },
  {
    id: "ttl-purpose",
    category: "Routing and diagnostics",
    question: "Why does an IP packet have a TTL or hop-limit field?",
    answer:
      "It prevents a packet from circulating forever when a routing loop exists. Each router reduces the value, and the packet is discarded when it reaches zero. The router normally returns an ICMP time-exceeded message, which is also the behavior traceroute uses to discover hops.",
  },

  {
    id: "frame-packet-segment",
    category: "Ethernet, ARP, and DHCP",
    question: "What is the difference between a frame, a packet, and a segment?",
    answer:
      "A frame is a link-layer unit used across one local link. A packet usually refers to the network-layer IP unit carried inside that frame. A segment is the TCP transport unit inside the IP packet, while UDP uses the term datagram. The terms reflect different layers of encapsulation.",
  },
  {
    id: "mac-and-ip-address",
    category: "Ethernet, ARP, and DHCP",
    question: "Why does a host need both a MAC address and an IP address?",
    answer:
      "An IP address provides logical, routable identification across networks. A MAC address identifies an interface for delivery on the current Ethernet or Wi-Fi link. Routers preserve the end-to-end IP destination but replace link-layer addresses for each new hop.",
  },
  {
    id: "switch-learning",
    category: "Ethernet, ARP, and DHCP",
    question: "How does an Ethernet switch learn where devices are connected?",
    answer:
      "The switch records the source MAC address of each arriving frame together with the ingress port. When the destination is known, it forwards the frame only to the learned port. Unknown unicast, broadcast, and relevant multicast traffic is flooded within the VLAN except through the incoming port.",
  },
  {
    id: "arp-remote-host",
    category: "Ethernet, ARP, and DHCP",
    question: "If I send data to a host on another network, whose MAC address does ARP resolve?",
    answer:
      "The sender resolves the MAC address of its next hop, usually the default gateway, not the remote host. ARP works only within the local IPv4 link. The Ethernet frame goes to the router, while the IP packet inside still names the final remote destination.",
  },
  {
    id: "dhcp-dora",
    category: "Ethernet, ARP, and DHCP",
    question: "Can you explain the DHCP DORA process?",
    answer:
      "The client broadcasts Discover, a server responds with an Offer, the client sends Request for the chosen configuration, and the server replies with Acknowledgment. The lease can include an IP address, subnet mask, default gateway, DNS servers, and lifetime. A relay can carry DHCP messages across routed networks.",
  },
  {
    id: "collision-broadcast-vlan",
    category: "Ethernet, ARP, and DHCP",
    question: "How do switches and VLANs affect collision and broadcast domains?",
    answer:
      "Each full-duplex switch port is its own collision domain, so normal switched Ethernet does not have shared-media collisions. Ports in the same VLAN remain in one broadcast domain. Creating another VLAN creates another broadcast domain, and traffic between VLANs requires routing.",
  },

  {
    id: "csma-cd-and-csma-ca",
    category: "Wi-Fi and transmission",
    question: "Why does Wi-Fi use CSMA/CA instead of Ethernet's CSMA/CD?",
    answer:
      "A wireless station cannot reliably detect a collision while transmitting because its own signal is much stronger than incoming signals, and not every station can hear every other station. Wi-Fi therefore tries to avoid collisions using sensing, random backoff, acknowledgments, and optional RTS/CTS.",
  },
  {
    id: "wifi-bands",
    category: "Wi-Fi and transmission",
    question: "How would you compare the 2.4 GHz, 5 GHz, and 6 GHz Wi-Fi bands?",
    answer:
      "The 2.4 GHz band generally reaches farther and passes through obstacles better, but it has fewer non-overlapping channels and more interference. The 5 GHz and 6 GHz bands offer more channel capacity and often higher performance, but their useful range is usually shorter. Device and regional support also matters.",
  },
  {
    id: "wifi-throughput-lower",
    category: "Wi-Fi and transmission",
    question: "Why is measured Wi-Fi throughput usually much lower than the advertised link rate?",
    answer:
      "The link rate is a physical-layer signalling rate, not application throughput. Wi-Fi shares airtime and adds framing, contention, acknowledgments, encryption, and retransmission overhead. Signal quality, channel width, interference, client capability, and competing stations reduce the rate further.",
  },
  {
    id: "copper-and-fiber",
    category: "Wi-Fi and transmission",
    question: "When would fiber be a better choice than copper Ethernet?",
    answer:
      "Fiber is better for long distances, high bandwidth, and environments with electromagnetic interference. It is also electrically isolated, which helps between buildings. Copper is usually cheaper and easier to terminate for short access links, and it can deliver power through Power over Ethernet.",
  },

  {
    id: "tls-certificate",
    category: "Network security",
    question: "What does a TLS certificate prove to a browser?",
    answer:
      "A valid certificate binds a public key to a hostname or identity through a trusted certificate chain. The browser also checks the requested hostname, validity period, and certificate status rules. The server proves possession of the matching private key during the handshake, which helps prevent impersonation.",
  },
  {
    id: "stateful-stateless-firewall",
    category: "Network security",
    question: "What is the difference between a stateful and a stateless firewall?",
    answer:
      "A stateless firewall evaluates each packet mainly from fields such as addresses, ports, protocol, and direction. A stateful firewall also tracks connection state, so it can recognize return traffic belonging to an allowed flow. That gives better context but requires memory and correct state handling.",
  },
  {
    id: "ids-and-ips",
    category: "Network security",
    question: "How is an IDS different from an IPS?",
    answer:
      "An intrusion detection system monitors traffic or hosts and raises alerts when it finds suspicious behavior. An intrusion prevention system is placed where it can actively block or modify traffic. Prevention can stop attacks immediately, but false positives can also interrupt legitimate communication.",
  },
  {
    id: "vpn-tunnel",
    category: "Network security",
    question: "What does a VPN tunnel provide?",
    answer:
      "A VPN encapsulates traffic so it can cross another network as a protected logical connection. Secure VPN protocols normally provide encryption, integrity, and peer authentication. The routes and tunnel policy decide which traffic enters the VPN, so a VPN does not automatically protect every packet on the device.",
  },
  {
    id: "symmetric-asymmetric-hashing",
    category: "Network security",
    question: "Where do symmetric encryption, asymmetric cryptography, and hashing fit in secure communication?",
    answer:
      "Symmetric encryption is efficient for protecting bulk data once both sides share a secret. Asymmetric cryptography supports identity and secure key agreement without a pre-shared secret. Hash functions produce fixed-size digests used in integrity checks and signatures, but hashing by itself does not encrypt data.",
  },

  {
    id: "domain-fails-ip-works",
    category: "Practical scenarios",
    question: "A website works by IP address but not by domain name. What would you check?",
    answer:
      "I would start with DNS because basic IP connectivity is working. I would check the resolver configuration, query the expected DNS records with dig or nslookup, inspect caching and TTL, and confirm the authoritative records. I would also check whether the application expects the hostname for TLS or virtual-host routing.",
  },
  {
    id: "website-slow",
    category: "Practical scenarios",
    question: "A website loads, but it is unusually slow. How would you narrow down the network cause?",
    answer:
      "I would separate DNS time, connection setup, TLS negotiation, time to first byte, and content transfer using browser timing or curl. Then I would check latency, packet loss, retransmissions, server location, CDN behavior, and response size. That identifies which stage is slow before changing infrastructure.",
  },
  {
    id: "ping-works-service-fails",
    category: "Practical scenarios",
    question: "You can ping a server, but the application cannot connect to it. What could be wrong?",
    answer:
      "Ping only shows that some ICMP traffic succeeds. The application port may be closed, the service may be listening only on localhost, or a firewall, security group, proxy, or route may block the transport connection. I would test the exact destination port and inspect both client and server logs.",
  },
  {
    id: "intermittent-packet-loss",
    category: "Practical scenarios",
    question: "Users report intermittent packet loss. How would you investigate it?",
    answer:
      "I would determine whether the loss is local, path-specific, or near the destination by testing from multiple points and inspecting interface counters. I would look for congestion, Wi-Fi interference, duplex or cabling errors, overloaded devices, and route changes. A packet capture can show retransmissions and timing patterns.",
  },
  {
    id: "one-device-no-internet",
    category: "Practical scenarios",
    question: "One device has no Internet access, but other devices on the same network work. What would you check first?",
    answer:
      "I would check that the device has a valid IP address, subnet mask, default gateway, and DNS configuration. Then I would test the local gateway, a public IP, and finally a domain name. That sequence separates local-link, routing, and DNS problems without guessing.",
  },
  {
    id: "service-local-not-remote",
    category: "Practical scenarios",
    question: "A service works on the server itself but cannot be reached remotely. How would you debug it?",
    answer:
      "I would confirm that the service is listening on the correct interface rather than only 127.0.0.1. Then I would check host firewalls, cloud security rules, container port mappings, load balancer health, and routing. Testing the port from another machine shows whether packets reach the server at all.",
  },
];
