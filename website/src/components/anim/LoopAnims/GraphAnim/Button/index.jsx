import Magnetic from "@/components/anim/Magnetic";

export default function LoopButton({ text }) {
    return (
        <Magnetic sensitivity='0.05'>
            <div className='Div__button_container'>
                <p>{text}</p>
            </div>
        </Magnetic>
    )
}