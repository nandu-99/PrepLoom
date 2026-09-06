import { redirect } from "next/navigation";
import { firstDsaVisualization } from "@/lib/dsa-visualizations";

export default function VisualizationsPage() {
  redirect(firstDsaVisualization);
}
