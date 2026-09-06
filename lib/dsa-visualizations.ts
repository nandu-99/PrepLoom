/** Add published lessons here to expose them in the workspace navigation. */
export const dsaVisualizationGroups = [
  {
    title: "Searching",
    lessons: [
      {
        title: "Binary search",
        href: "/dsa/visualizations/binary-search",
      },
    ],
  },
  {
    title: "Sorting",
    lessons: [
      { title: "Bubble sort", href: "/dsa/visualizations/bubble-sort" },
      { title: "Selection sort", href: "/dsa/visualizations/selection-sort" },
    ],
  },
];

export const firstDsaVisualization = dsaVisualizationGroups[0].lessons[0].href;
