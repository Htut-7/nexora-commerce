import Hero from "../Components/Hero";
import EditorialShowcase from "../Components/EditorialShowcase";
import ShopByMood from "../Components/ShopbyMood";
import SeasonalCampaign from "../Components/SeasonalCampaign";
import FashionalJournal from "../Components/FashionalJournal";

export default function Home() {
  return (
    <div className="home-container">
      <Hero/>
      <EditorialShowcase/>
      <ShopByMood/>
      <SeasonalCampaign/>
      <FashionalJournal/>
    </div>
  )
}
