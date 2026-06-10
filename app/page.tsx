import FeaturedProperties from "@/components/home/FeaturedProperties";
import Hero from "@/components/home/Hero";
import Category from "@/components/home/Categories";
import ReadyToListYourProperty from "@/components/home/ReadyToListYourProperty";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { getHomePageData } from "@/services";

const page = async () => {
  const homeData = await getHomePageData().catch(() => null);

  return (
    <>
      <Navbar />
      <main>
        <Hero searchConfig={homeData?.search_config} />
        <FeaturedProperties properties={homeData?.featured_properties ?? []} />
        <Category categories={homeData?.categories ?? []} />
        <ReadyToListYourProperty />
      </main>
      <Footer />
    </>
  );
};

export default page;
