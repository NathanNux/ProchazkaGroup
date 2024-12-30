import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"

export default function CopyText({ text, className, type }) {
    const [isCopied, setIsCopied] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const { toast } = useToast()

    useEffect(() => {
        setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
    }, [])

    const handleCopy = async () => {
        if (isMobile) {
            if (type === "phone") {
                window.location.href = `tel:${text}`
                return
            }
            if (type === "email") {
                window.location.href = `mailto:${text}`
                return
            }
        }

        try {
            await navigator.clipboard.writeText(text)
            setIsCopied(true)
            toast({
                title: "Úspěch!",
                description: "Text byl zkopírován do schránky",
                variant: "success"
            })
        } catch (err) {
            toast({
                title: "Chyba!",
                description: "Kopírování se nezdařilo",
                variant: "destructive"
            })
        }
    }

    return (
        <div className={`${className} font-[1rem] text-[#00F0FF] hover:text-[#00F0FF/10]`}>
            <button onClick={handleCopy}>
                <p>{text}</p>
            </button>
        </div>
    )
}