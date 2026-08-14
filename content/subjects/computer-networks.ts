import {
  encapsulationAndPacketJourney,
  introductionToComputerNetworks,
  networkCommunicationModels,
  networkTopologiesAndDevices,
  osiAndTcpIpModels,
} from "@/content/subjects/computer-networks/foundations";
import {
  dynamicRoutingProtocols,
  ipDatagramsIcmpAndDiagnostics,
  ipv4AddressingAndSubnetting,
  ipv6NatAndAddressDelivery,
  routerForwardingAndRouteSelection,
} from "@/content/subjects/computer-networks/network-layer";
import {
  firewallsRulesAndInspection,
  idsIpsAndDetection,
  networkSecurityFoundations,
  vpnFoundationsAndTunneling,
  vpnProtocolsAndIpsec,
} from "@/content/subjects/computer-networks/network-security";
import {
  transmissionMediaNoiseAndCapacity,
  wifiAccessBandsAndPerformance,
  wifiFoundationsArchitectureAndGenerations,
  wifiSecurityEvolution,
  wirelessCapacityTechniques,
} from "@/content/subjects/computer-networks/wireless-and-media";
import {
  arpAndLocalAddressResolution,
  dataLinkLayerAndEthernetFrames,
  dhcpAndAutomaticConfiguration,
  framingStuffingAndCrc,
  macAddressingAndLanSwitching,
} from "@/content/subjects/computer-networks/data-link-layer";
import {
  flowControlAndArq,
  tcpAndUdpFundamentals,
  tcpCongestionAndNetworkDelay,
  tcpConnectionAndReliability,
  transportServicesPortsAndSockets,
} from "@/content/subjects/computer-networks/transport-layer";
import {
  applicationProtocols,
  cdnAndWebCaching,
  domainNameSystem,
  httpMessagesAndSemantics,
  httpsAndHttpEvolution,
} from "@/content/subjects/computer-networks/application-layer";
import { curateTopicSections } from "@/content/subjects/curation";
import type { SubjectContent } from "@/lib/subject-content";

const conciseNetworkTopologiesAndDevices = curateTopicSections(
  networkTopologiesAndDevices,
  {
    readTime: "15 min",
    omitLearnSections: ["How an Ethernet Switch Learns and Forwards"],
    omitReviseSections: ["Ethernet Switching"],
    omitLastMinuteCues: [
      "Switch: learn source, look up destination, forward or flood.",
    ],
  },
);

export const computerNetworksContent: SubjectContent = {
  order: "05",
  slug: "computer-networks",
  title: "Computer Networks",
  shortTitle: "CN",
  eyebrow: "CS Core",
  description:
    "Learn how devices exchange data through layered protocols, local networks, and the Internet.",
  estimatedTime: "12-12.5 hours",
  modules: [
    {
      order: "01",
      title: "Networking Foundations",
      description:
        "Network purpose, communication models, protocol layers, packet journeys, topologies, and device roles.",
      topics: [
        introductionToComputerNetworks,
        networkCommunicationModels,
        osiAndTcpIpModels,
        encapsulationAndPacketJourney,
        conciseNetworkTopologiesAndDevices,
      ],
    },
    {
      order: "02",
      title: "Application Layer and Web Services",
      description:
        "Application protocols, DNS resolution, HTTP messages, secure web transport, HTTP evolution, CDNs, and caching.",
      topics: [
        applicationProtocols,
        domainNameSystem,
        httpMessagesAndSemantics,
        httpsAndHttpEvolution,
        cdnAndWebCaching,
      ],
    },
    {
      order: "03",
      title: "Transport Layer and Reliable Delivery",
      description:
        "Ports, sockets, TCP and UDP, connection reliability, flow control, ARQ, congestion control, and network-delay numericals.",
      topics: [
        transportServicesPortsAndSockets,
        tcpAndUdpFundamentals,
        tcpConnectionAndReliability,
        flowControlAndArq,
        tcpCongestionAndNetworkDelay,
      ],
    },
    {
      order: "04",
      title: "Network Layer, Addressing, and Routing",
      description:
        "IPv4 and IPv6 addressing, subnetting, NAT, IP datagrams, ICMP diagnostics, router forwarding, and dynamic routing protocols.",
      topics: [
        ipv4AddressingAndSubnetting,
        ipv6NatAndAddressDelivery,
        ipDatagramsIcmpAndDiagnostics,
        routerForwardingAndRouteSelection,
        dynamicRoutingProtocols,
      ],
    },
    {
      order: "05",
      title: "Data Link Layer and LAN Services",
      description:
        "Ethernet frames, MAC addressing, LAN switching, ARP resolution, DHCP leases, framing techniques, bit stuffing, and CRC numericals.",
      topics: [
        dataLinkLayerAndEthernetFrames,
        macAddressingAndLanSwitching,
        arpAndLocalAddressResolution,
        dhcpAndAutomaticConfiguration,
        framingStuffingAndCrc,
      ],
    },
    {
      order: "06",
      title: "Wireless Networks and Transmission Media",
      description:
        "Wi-Fi architecture and generations, MIMO and OFDMA, wireless access and channels, Wi-Fi security, physical media, noise, and channel-capacity numericals.",
      topics: [
        wifiFoundationsArchitectureAndGenerations,
        wirelessCapacityTechniques,
        wifiAccessBandsAndPerformance,
        wifiSecurityEvolution,
        transmissionMediaNoiseAndCapacity,
      ],
    },
    {
      order: "07",
      title: "Network Security, Firewalls, and VPNs",
      description:
        "Defense in depth, firewall rules and state, IDS/IPS detection, VPN tunneling and deployment, IPsec, OpenVPN, WireGuard, and security numericals.",
      topics: [
        networkSecurityFoundations,
        firewallsRulesAndInspection,
        idsIpsAndDetection,
        vpnFoundationsAndTunneling,
        vpnProtocolsAndIpsec,
      ],
    },
  ],
};
