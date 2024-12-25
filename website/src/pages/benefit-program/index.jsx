import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import Cursor from "@/components/common/navbar/cursor";
import QNA from "@/components/common/qna";
import BenefitReminder from "@/components/forms/BenefitReminder";
import ContactBenefit from "@/components/modems/ContactBenefit";
import BenefitDetails from "@/components/sections/BenefitDetails";
import BenefitProgramKeyframes from "@/components/sections/BenefitProgram";
import BenefitShowcase from "@/components/sections/BenefitShowcase";


export default function BenefitProgramPage() {
    return (
        <>
            <Navbar />
            <Cursor />
            <BenefitProgramKeyframes />
            <BenefitDetails />
            <BenefitShowcase />
            <BenefitReminder />
            <ContactBenefit />
            <QNA />
            <Footer />
        </>
        
    )
}