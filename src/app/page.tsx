import { siteMarkup } from "@/content";
import SiteInteractions from "@/components/site-interactions";
import MenuEmbed from "@/components/menu-embed";
import { basePath } from "@/site-config";
export default function HomePage() {
  return <><div className="min-h-screen" dangerouslySetInnerHTML={{ __html: siteMarkup.replaceAll("__BASE_PATH__", basePath) }} /><MenuEmbed /><SiteInteractions /></>;
}
