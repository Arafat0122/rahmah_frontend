
import FeaturedFaculty from "./FeaturedFaculty/FeaturedFaculty";
import Hero from "./Hero";
import HiringSteps from "./HiringSteps/HiringSteps";
import ReviewSection from "./ReviewSection/ReviewSection";
import ScholarDiscovery from "./ScholarDiscovery/ScholarDiscovery";
import ServiceDiscovery from "./ServiceDiscovery/ServiceDiscovery";
import UniversityPartners from "./UniversityPartners";


const Home = () => {
    return (
        <div>
            <Hero />
            {/* <UniversityPartners /> */}
            <ScholarDiscovery />
            <ServiceDiscovery />
            {/* <ScholarCapabilityGrid /> */}
            <HiringSteps />
            <FeaturedFaculty />
            <ReviewSection />
        </div>
    );
};

export default Home;