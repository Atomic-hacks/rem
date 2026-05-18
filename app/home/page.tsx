import FeaturedProperties from "@/components/home/FeaturedProperties";
import Hero from "@/components/home/Hero";
import Category from "@/components/home/Categories";
import ReadyToListYourProperty from "@/components/home/ReadyToListYourProperty";

const page = () => (
  <div>
    <Hero />;
    <FeaturedProperties />;
    <Category />;
    <ReadyToListYourProperty />;
  </div>
);

export default page;
