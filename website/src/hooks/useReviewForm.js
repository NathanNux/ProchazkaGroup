import { useState } from 'react'
import { supabase } from './supabaseClient'


export const useReviewForm = () => {
    const [formData, setFormData] = useState({
        customerName: '',
        reviewType: '', // Will be either 'poradce' or 'benefitprogram'
        consultantName: '', // The selected person's name
        message: ''
    })
    const [loading, setLoading] = useState(false)

    const validateForm = () => {
        if (!formData.customerName.trim()) {
            return { isValid: false, message: 'Prosím vyplňte jméno' }
        }

        if (!formData.message.trim()) {
            return { isValid: false, message: 'Prosím napište váš názor' }
        }

        if (!formData.consultantName) {
            return { isValid: false, message: 'Prosím vyberte poradce' }
        }

        return { isValid: true }
    }

    const handleSubmit = async () => {
        console.log('Review submission started with:', formData)
        setLoading(true)

        const validation = validateForm()
        if (!validation.isValid) {
            setLoading(false)
            return { success: false, message: validation.message }
        }

        try {
            const reviewObject = {
                customer_name: formData.customerName,
                hashtag: formData.consultantName === 'poradce' ? 'poradce' : 'benefitprogram',
                consultant_name: formData.consultantName,
                message: formData.message,
                timestamp: new Date().toISOString(),
                approved: false
            }
    
            const { data, error } = await supabase
                .from('reviews')
                .insert([reviewObject])
    
            if (error) throw error
    
            setFormData({
                customerName: '',
                reviewType: '',
                consultantName: '',
                message: ''
            })
    
            return { success: true, message: 'Děkujeme za váš názor!' }
        } catch (err) {
            console.error('Review submission failed:', err)
            return { success: false, message: 'Něco se pokazilo, zkuste to prosím znovu' }
        } finally {
            setLoading(false)
        }
    }

    return { formData, setFormData, loading, handleSubmit }
}