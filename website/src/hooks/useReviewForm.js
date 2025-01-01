import { useState } from 'react'
import { supabase } from './supabaseClient'
import Reviews from '@/components/sections/BenefitDetails/Reviews'
import { useFetchDatabase } from './useFetchDatabase'


//na vaclava to nefunguje moc dobře, ostatní jsou v pohodě. Nastavil bych to tak, aby tam nikdo nebyl už předem předvolený, 
//ať si to vybere sám, ať to funguje správně.

export const useReviewForm = () => {

    const {fetchClovek} = useFetchDatabase()
    const [formData, setFormData] = useState({
        customerName: '',
        reviewType: '', // Will be either 'poradce' or 'benefitprogram'
        consultantName: 'Václav Procházka', // The selected person's name
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
                hashtag: formData.consultantName === "benefitprogram" ? "benefitprogram" : "poradce",
                consultant_name: formData.consultantName,
                message: formData.message,
                timestamp: new Date().toISOString(),
                approved: false
            }
    
            const { data, error } = await supabase
                .from('reviews')
                .insert([reviewObject])
    
            if (error) throw error

            const peopledata = await fetchClovek(formData.consultantName)

            console.log("jmeno:", formData.consultantName)
            const { data: peopleData, error: peopleError } = await supabase
                    .from('people')
                    .update({ reviews: peopledata[0].reviews + 1 })
                    .eq('name', formData.consultantName)

                console.log("reviews:", peopleData)
            
                    if (peopleError) throw peopleError


            const { data: totalData, error: totalError } = await supabase
                .from('total')
                .select('totalpeople, reviews')
                .eq('id', "7d1cc7c4-b546-40a1-8e9e-97d0601e7b07")



            const TotalObject = {
                totalpeople: totalData[0].totalpeople + 1,
                reviews: totalData[0].reviews + 1
            }

            const { data: totalDataUpdate, error: totalErrorUpdate } = await supabase
                .from('total')
                .update(TotalObject)
                .eq('id', "7d1cc7c4-b546-40a1-8e9e-97d0601e7b07")
    
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