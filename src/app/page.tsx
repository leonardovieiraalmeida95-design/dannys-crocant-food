import { siteMarkup } from "@/content";
import SiteInteractions from "@/components/site-interactions";
import MenuEmbed from "@/components/menu-embed";
import { basePath, localPath } from "@/site-config";
import FoodBackground from "@/components/food-background";
export default function HomePage() {
  return <><div className="min-h-screen" dangerouslySetInnerHTML={{ __html: siteMarkup.replaceAll("__BASE_PATH__", basePath) }} /><MenuEmbed /><SiteInteractions /><FoodBackground desktopSrc={localPath("/assets/backgrounds/chicken-barbecue-loop.mp4")} mobileSrc={localPath("/assets/backgrounds/chicken-barbecue-loop-mobile.mp4")} poster={localPath("/assets/backgrounds/barbecue-poster-wide.webp")} /></>;
}
