import { useState } from 'react'
import emailjs from '@emailjs/browser'

export const useNewsletterForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const validateForm = () => {
        if (!formData.name.trim()) {
            return { isValid: false, message: 'Prosím vyplňte jméno' }
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            return { isValid: false, message: 'Neplatná emailová adresa' }
        }

        return { isValid: true }
    }

    const handleSubmit = async () => {
        // console.log('Form submission attempted with:', formData)
        setLoading(true)
        setError(null)

        const validation = validateForm()
        if (!validation.isValid) {
            setLoading(false)
            return { success: false, message: validation.message }
        }

        try {
            // Simulate API call for testing
            console.log('API call would happen here with:', {
                name: formData.name,
                email: formData.email
            })

            // TODO: Add actual EmailJS implementation here
            await new Promise(resolve => setTimeout(resolve, 1000))

            setSuccess(true)
            setFormData({ name: '', email: '' })
            return { success: true, message: 'Byli jste úspěšně přihlášeni k odběru novinek' }
        } catch (err) {
            console.error('Form submission failed:', err)
            return { 
                success: false, 
                message: 'Něco se pokazilo, zkuste to prosím znovu'
            }
        } finally {
            setLoading(false)
        }
    }

    return {
        formData,
        setFormData,
        loading,
        error,
        success,
        handleSubmit
    }
}