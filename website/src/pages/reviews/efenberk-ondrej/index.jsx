import Navbar from "@/components/common/navbar";
import Cursor from "@/components/common/navbar/cursor";
import ContactIntro from "@/components/intros/contact";


export default function PersonFeebackPage2() {
    const name = "Ondřej Efenberk";
    const moto = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    const number = '02';
    return(
        <>
            <Cursor />
            <Navbar />
            <ContactIntro name={name} moto={moto} number={number}/>
        </>
    )
}