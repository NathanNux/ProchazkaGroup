import Navbar from "@/components/common/navbar";
import Cursor from "@/components/common/navbar/cursor";
import ContactIntro from "@/components/intros/contact";


export default function PersonFeebackPage1() {
    const name = "Václav Procházka";
    const moto = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    const number = '01';
    return(
        <>
            <Cursor />
            <Navbar />
            <ContactIntro name={name} moto={moto} number={number}/>
        </>
    )
}