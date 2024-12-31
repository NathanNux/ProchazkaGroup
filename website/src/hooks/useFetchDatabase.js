import { useState } from 'react'
import { supabase } from './supabaseClient'

export const useFetchDatabase = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [people, setPeople] = useState([])
    const [reviews, setReviews] = useState([])
    const [total, setTotal] = useState(null)

    const fetchPeople = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('people')
                .select('*')
            
            if (error) throw error
            setPeople(data)
            return data
        } catch (err) {
            setError(err.message)
            return null
        } finally {
            setLoading(false)
        }
    }

    const fetchClovek = async (name) => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('people')
                .select('*')
                .eq('name', name)
            
            if (error) throw error
            setPeople(data)
            return data
        }
        catch (err) {
            setError(err.message)
            return null
        } finally {
            setLoading(false)
        }

    }

    const fetchReviews = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('reviews')
                .select('*')
            
            if (error) throw error
            setReviews(data)
            return data
        } catch (err) {
            setError(err.message)
            return null
        } finally {
            setLoading(false)
        }
    }

    const fetchTotal = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('total')
                .select('*')
                .eq('id', "7d1cc7c4-b546-40a1-8e9e-97d0601e7b07")
                .single()
            
            if (error) throw error
            setTotal(data)
            return data
        } catch (err) {
            setError(err.message)
            return null
        } finally {
            setLoading(false)
        }
    }


    return {
        people,
        reviews,
        total,
        loading,
        error,
        fetchPeople,
        fetchReviews,
        fetchTotal,
        fetchClovek
    }
}