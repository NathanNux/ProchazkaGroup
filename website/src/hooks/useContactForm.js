import { useState } from "react"

export const useContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        selectedPerson: ''
    })
    const [loading, setLoading] = useState(false)

    const validateForm = () => {
        if (!formData.name.trim()) {
            return { isValid: false, message: 'Prosím vyplňte jméno' }
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            return { isValid: false, message: 'Neplatná emailová adresa' }
        }

        const phoneRegex = /^\+?[0-9]{9,}$/
        if (!phoneRegex.test(formData.phone)) {
            return { isValid: false, message: 'Neplatné telefonní číslo' }
        }

        if (!formData.message.trim()) {
            return { isValid: false, message: 'Prosím vyplňte zprávu' }
        }

        if (!formData.selectedPerson) {
            return { isValid: false, message: 'Prosím vyberte poradce' }
        }

        return { isValid: true }
    }

    const handleSubmit = async () => {
        // console.log('Form submission started with:', formData)
        setLoading(true)

        const validation = validateForm()
        if (!validation.isValid) {
            setLoading(false)
            return { success: false, message: validation.message }
        }

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))
            console.log('Would send email with:', {
                customerName: formData.name,
                customerEmail: formData.email,
                customerPhone: formData.phone,
                selectedConsultant: formData.selectedPerson,
                message: formData.message,
                timestamp: new Date().toISOString()
            })
            
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: '',
                selectedPerson: ''
            })
            
            return { success: true, message: 'Zpráva byla úspěšně odeslána' }
        } catch (err) {
            console.error('Form submission failed:', err)
            return { success: false, message: 'Něco se pokazilo, zkuste to prosím znovu' }
        } finally {
            setLoading(false)
        }
    }

    return { formData, setFormData, loading, handleSubmit }
}