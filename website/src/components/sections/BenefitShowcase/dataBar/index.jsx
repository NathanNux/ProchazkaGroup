import StatNumberVariable from "@/components/anim/TextAnims/StatNumber";

const data = [
    {
        value: '12',
        barkingPoint: '7',
        name: 'odměn celkem'
    },
    {
        value: '5',
        barkingPoint: '3',
        name: 'úrovní odměn'
    },
    {
        value: '2500,-',
        barkingPoint: '2300',
        name: 'na první úrovni '
    },
    {
        value: '47 500,-',
        barkingPoint: '45000',
        name: 'celkem v odměnách'
    }
]

export default function DataBar() {
    const parseValue = (value) => {
        // Remove currency symbol and commas
        const cleanValue = value.replace(/[^0-9]/g, '');
        return parseInt(cleanValue, 10);
    }

    return (
        <div className="DataBar">
            {data.map((object, i) => {
                const { value, name, barkingPoint } = object
                const numericValue = parseValue(value);
                
                return (
                    <div className="data__item" key={i}>
                        <div className="number__wrapper">
                            <StatNumberVariable
                                number={numericValue}  
                                EndDuration={4} 
                                StartDuration={2} 
                                BreakPoint={barkingPoint}
                                // WIP: fix the animation so it only animates onView
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