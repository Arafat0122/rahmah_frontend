import { createBrowserRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Error from "../Common/Error/Error";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home";
import QuranPage from "../Pages/Quran/QuranPage";
import FindTeachersPage from "../Pages/FindTeachersPage/FindTeachersPage";
import TeacherDetailsPage from "../Pages/FindTeachersPage/TeacherDetailsPage";
import SearchResultPage from "../Pages/SearchResultPage/SearchResultPage";
import AllTeachersPage from "../Pages/SearchResultPage/AllTeachersPage";
import AllServicesPage from "../Pages/SearchResultPage/AllServicesPage";
import Services from "../Pages/Services/Services";
import ServiceDetails from "../Pages/Services/ServiceDetails";
import JobsPage from "../Pages/Job/JobsPage";
import ApplyJob from "../Pages/Job/ApplyJob";
import NooraniQaidaPage from "../Pages/Quran/NooraniQaidaPage/NooraniQaidaPage";
import QuranTajweedPage from "../Pages/Quran/QuranTajweedPage/QuranTajweedPage";
import AdvancedTajweedPage from "../Pages/Quran/AdvancedTajweedPage/AdvancedTajweedPage";
import QuranHifzPage from "../Pages/Quran/QuranHifzPage/QuranHifzPage";
import BeginnerArabicPage from "../Pages/Arabic/BeginnerArabicPage/BeginnerArabicPage";
import ArabicGrammarPage from "../Pages/Arabic/ArabicGrammarPage/ArabicGrammarPage";
import QuranicArabicPage from "../Pages/Arabic/QuranicArabicPage/QuranicArabicPage";
import ArabicLiteraturePage from "../Pages/Arabic/ArabicLiteraturePage/ArabicLiteraturePage";
import HanafiFiqhPage from "../Pages/Fiqh/HanafiFiqhPage/HanafiFiqhPage";
import ShafiFiqhPage from "../Pages/Fiqh/ShafiFiqhPage/ShafiFiqhPage";
import MalikiFiqhPage from "../Pages/Fiqh/MalikiFiqhPage/MalikiFiqhPage";
import HanbaliFiqhPage from "../Pages/Fiqh/HanbaliFiqhPage/HanbaliFiqhPage";
import AzharIbtedaiPage from "../Pages/AzhariCurriculum/AzharIbtedaiPage/AzharIbtedaiPage";
import AzharEdadiPage from "../Pages/AzhariCurriculum/AzharEdadiPage/AzharEdadiPage";
import AzharSanabiPage from "../Pages/AzhariCurriculum/AzharSanabiPage/AzharSanabiPage";
import DawraSemester1Page from "../Pages/Dawra/DawraSemester1Page/DawraSemester1Page";
import DawraSemester2Page from "../Pages/Dawra/DawraSemester2Page/DawraSemester2Page";
import DawraSemester3Page from "../Pages/Dawra/DawraSemester3Page/DawraSemester3Page";
import FraudPeekChecker from "../CourierStats/FraudPeekChecker";

// Pages (placeholders — you can create these JSX files)
// import QuranLevel1 from "../Pages/Quran/QuranLevel1";
// import QuranLevel2 from "../Pages/Quran/QuranLevel2";
// import QuranLevel3 from "../Pages/Quran/QuranLevel3";
// import QuranLevel4 from "../Pages/Quran/QuranLevel4";

// import ArabicLevel1 from "../Pages/Arabic/ArabicLevel1";
// import ArabicLevel2 from "../Pages/Arabic/ArabicLevel2";
// import ArabicLevel3 from "../Pages/Arabic/ArabicLevel3";
// import ArabicLevel4 from "../Pages/Arabic/ArabicLevel4";

// import Hanafi from "../Pages/Fiqh/Hanafi";
// import Shafi from "../Pages/Fiqh/Shafi";
// import Maliki from "../Pages/Fiqh/Maliki";
// import Hanbali from "../Pages/Fiqh/Hanbali";

// import Dawra1st from "../Pages/Dawra/Dawra1st";
// import Dawra2nd from "../Pages/Dawra/Dawra2nd";
// import Dawra3rd from "../Pages/Dawra/Dawra3rd";

// import Ibtedai from "../Pages/Azhari/Ibtedai";
// import Edadi from "../Pages/Azhari/Edadi";
// import Sanabi from "../Pages/Azhari/Sanabi";

// import FindTeachers from "../Pages/FindTeachers/FindTeachers";
// import FindJobs from "../Pages/FindJobs/FindJobs";
// import Services from "../Pages/Services/Services";
// import Blogs from "../Pages/Blogs/Blogs";

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <ScrollToTop />
                <Layout />
            </>
        ),
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            // Quran Learning
            {
                path: "/quran",
                element: <QuranPage />
            },{
                path: "/noorani-qaida-quran-reading",
                element: <NooraniQaidaPage />
            },
            {
                path: "/quran-recitation-tajweed-course",
                element: <QuranTajweedPage />
            },
            {
                path: "/advanced-tajweed-tilawah",
                element: <AdvancedTajweedPage />
            },
            {
                path: "/quran-hifz-program",
                element: <QuranHifzPage />
            },

            // Arabic 

            {
                path: "/arabic-reading-writing-course",
                element: <BeginnerArabicPage />
            },
            {
                path: "/arabic-grammar-nahw-sarf",
                element: <ArabicGrammarPage />
            },
            {
                path: "/quranic-arabic-course",
                element: <QuranicArabicPage />
            },
            {
                path: "/advanced-arabic-language-course",
                element: <ArabicLiteraturePage />
            },

            // Fiqh 

            {
                path: "/hanafi-fiqh-course",
                element: <HanafiFiqhPage />
            },
            {
                path: "/shafi-fiqh-course",
                element: <ShafiFiqhPage />
            },
            {
                path: "/maliki-fiqh-course",
                element: <MalikiFiqhPage />
            },
            {
                path: "/hanbali-fiqh-course",
                element: <HanbaliFiqhPage />
            },

            // Azhar

            {
                path: "/al-azhar-ibtedai-program",
                element: <AzharIbtedaiPage />
            },
            {
                path: "/al-azhar-edadi-program",
                element: <AzharEdadiPage />
            },
            {
                path: "/al-azhar-sanabi-program",
                element: <AzharSanabiPage />
            },

            // Dawra

            {
                path: "/dawra-semester-1",
                element: <DawraSemester1Page />
            },
            {
                path: "/dawra-semester-2",
                element: <DawraSemester2Page />
            },
            {
                path: "/dawra-semester-3",
                element: <DawraSemester3Page />
            },
            {
                path: "/find-teacher",
                element: <FindTeachersPage />
            },
            {
                path: "/teacher/:id",
                element: <TeacherDetailsPage />
            },
            {
                path: "/search",
                element: <SearchResultPage />
            },
            {
                path: "/all-teachers",
                element: <AllTeachersPage />
            },
            {
                path: "/all-services",
                element: <AllServicesPage />
            },
            {
                path: "/find-services",
                element: <Services />
            },
            {
                path: "/service-details/:id",
                element: <ServiceDetails />,
            },
            {
                path: "/find-jobs",
                element: <JobsPage />
            },
            {
                path: "apply/:id",
                element: <ApplyJob />,
            },

            // // Quran Learning
            // { path: "/quran-level-1", element: <QuranLevel1 /> },
            // { path: "/quran-level-2", element: <QuranLevel2 /> },
            // { path: "/quran-level-3", element: <QuranLevel3 /> },
            // { path: "/quran-level-4", element: <QuranLevel4 /> },

            // // Arabic Language
            // { path: "/arabic-level-1", element: <ArabicLevel1 /> },
            // { path: "/arabic-level-2", element: <ArabicLevel2 /> },
            // { path: "/arabic-level-3", element: <ArabicLevel3 /> },
            // { path: "/arabic-level-4", element: <ArabicLevel4 /> },

            // // Fiqh Studies
            // { path: "/hanafi", element: <Hanafi /> },
            // { path: "/shafi", element: <Shafi /> },
            // { path: "/maliki", element: <Maliki /> },
            // { path: "/hanbali", element: <Hanbali /> },

            // // Dawra Curriculum
            // { path: "/1st-semester", element: <Dawra1st /> },
            // { path: "/2nd-semester", element: <Dawra2nd /> },
            // { path: "/3rd-semester", element: <Dawra3rd /> },

            // // Azhari Curriculum
            // { path: "/ibtedai", element: <Ibtedai /> },
            // { path: "/edadi", element: <Edadi /> },
            // { path: "/sanabi", element: <Sanabi /> },

            // // Other Pages
            // { path: "/find-teachers", element: <FindTeachers /> },
            // { path: "/find-jobs", element: <FindJobs /> },
            // { path: "/services", element: <Services /> },
            // { path: "/blogs", element: <Blogs /> },
        ],
    },
    {
        path: "/a",
        element: <FraudPeekChecker />
    }
]);