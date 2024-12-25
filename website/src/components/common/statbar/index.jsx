import StatNumberVariable from "@/components/anim/TextAnims/StatNumber";

export default function Statbar({data}) {
    const parseValue = (value) => {
        // Remove currency symbol and commas, but keep decimals
        const cleanValue = value.replace(/[^0-9.]/g, '');
        return parseFloat(cleanValue);
    }

    return (
        <div className="Statbar">
            {data.map((object, i) => {
                const { value, name, barkingPoint } = object
                const numericValue = parseValue(value);
                
                return (
                    <div className="data__item" key={i}>
                        <div className="number__wrapper">
                        <StatNumberVariable
                            number={numericValue}  
                            EndDuration={2} // Shorter duration for better UX
                            StartDuration={1} 
                            BreakPoint={parseValue(barkingPoint)}
                            delay={i * 0.2} // Stagger animation
                        />
                            {value.includes(',-') && <span className="currency">,-</span>}
                        </div>
                        <p>{name}</p>
                    </div>
                )
            })}
            <div className="devider"/>
        </div>
    )
}