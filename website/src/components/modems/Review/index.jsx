
import SmallButton from "@/components/ui/stickyButtons/buttons/SmallButton";
import SVGButton from "@/components/ui/stickyButtons/buttons/SvgButton";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import ReviewModem from "../ReviewModem";
import ReviewsSearch from "./ReviewsSearch";
import { WebsiteReviews } from "@/constants/pages/reviews";
import {useFetchDatabase} from "@/hooks/useFetchDatabase";
import { supabase } from '@/hooks/supabaseClient';


export default function ReviewsList() {
    const [isOpen, setIsOpen] = useState(false)
    const [visibleItems, setVisibleItems] = useState(6)
    const [activeFilter, setActiveFilter] = useState('všechno')
    const [searchQuery, setSearchQuery] = useState("")
    const [activeMode, setActiveMode] = useState('filter') // 'filter' or 'search'

    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { fetchReviews, fetchClovek } = useFetchDatabase()



    useEffect(() => {
        const loadReviews = async () => {
            try {
                const data = await fetchReviews()
                if (data) {
                    setReviews(data)
                }
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        loadReviews()
    }, [])

    const handleFilterClick = (filter) => {
        setActiveFilter(filter)
        setSearchQuery("") // Reset search
        setActiveMode('filter')
        setVisibleItems(6)
    }

    const handleSearch = (value) => {
        setSearchQuery(value)
        setActiveFilter('všechno') // Reset filter
        setActiveMode('search')
        setVisibleItems(6)
    }

    const getIPAddress = async () => {
        try {
            const response = await fetch('https://api.ipify.org?format=json')
            const data = await response.json()
            return data.ip
        } catch (error) {
            console.error('Chyba při získávání IP adresy:', error)
            return null
        }
    }

    const getFilteredReviews = () => {
        try {
            // Nejprve kopie
            let workingArray = [...reviews];
            
            if (activeMode === 'search' && searchQuery) {
                workingArray = workingArray.filter(review => 
                    review?.customer_name?.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }
            else if (activeMode === 'filter') {
                workingArray = workingArray.filter(review => 
                    activeFilter === 'všechno' 
                    || review?.hashtag?.toLowerCase() === activeFilter.toLowerCase()
                );
            }
      
            // Seřazení podle "number"
            workingArray.sort((a, b) => a.number - b.number);
      
            return workingArray;
        } catch (error) {
            console.error('Filter error:', error);
            return [];
        }
      };

    const addLike = async (reviewId) => {
        try {
            console.log('Adding like to review:', reviewId)
            // Získání IP adresy
            const userIP = await getIPAddress()
            if (!userIP) throw new Error('Nepodařilo se získat IP adresu')
    
                // Načtení aktuální recenze
                const { data: reviewData, error: reviewError } = await supabase
                    .from('reviews')
                    .select('likes, ip_list, list_of_all_ips, consultant_name')
                    .eq('id', reviewId)
                    .single()
        
                if (reviewError) throw reviewError
        
                // Kontrola IP v seznamu
                const ipList = reviewData.ip_list ? reviewData.ip_list.split(',') : []
                
                if (ipList.includes(userIP)) {
                    // Odstranění IP adresy ze seznamu

                    const { data: totalData, error: totalError } = await supabase
                        .from('total')
                        .select('totalpeople, likes')
                        .eq('id', "7d1cc7c4-b546-40a1-8e9e-97d0601e7b07")



                    const TotalObject = {
                        totalpeople: totalData[0].totalpeople - 1,
                        likes: totalData[0].likes - 1
                    }

                    const { data: totalDataUpdate, error: totalErrorUpdate } = await supabase
                        .from('total')
                        .update(TotalObject)
                        .eq('id', "7d1cc7c4-b546-40a1-8e9e-97d0601e7b07")
                        
                        const newIpList = ipList.filter(ip => ip !== userIP)
                    
                        const { error: updateError } = await supabase
                            .from('reviews')
                            .update({
                                likes: (reviewData.likes || 0) - 1,
                                ip_list: newIpList.join(',')
                            })
                            .eq('id', reviewId)
                    
                        if (updateError) throw updateError
                    
                        // Aktualizace UI
                        setReviews(prevReviews =>
                            prevReviews.map(review =>
                                review.id === reviewId
                                    ? {
                                        ...review,
                                        likes: (review.likes || 0) - 1,
                                        ip_list: newIpList.join(',')
                                    }
                                    : review
                            )
                        )

                        const peopledata = await fetchClovek(reviewData.consultant_name)

                        const { data: peopleData, error: peopleError } = await supabase
                            .from('people')
                            .update({ likes: peopledata[0].likes - 1 })
                            .eq('name', reviewData.consultant_name)
                    }
            else{
                // Přidání nové IP do seznamu
                ipList.push(userIP)

                    const { data: totalData, error: totalError } = await supabase
                        .from('total')
                        .select('totalpeople, likes')
                        .eq('id', "7d1cc7c4-b546-40a1-8e9e-97d0601e7b07")



                    const TotalObject = {
                        totalpeople: totalData[0].totalpeople + 1,
                        likes: totalData[0].likes + 1
                    }

                    const { data: totalDataUpdate, error: totalErrorUpdate } = await supabase
                        .from('total')
                        .update(TotalObject)
                        .eq('id', "7d1cc7c4-b546-40a1-8e9e-97d0601e7b07")
            
                // Update recenze
                const { error: updateError } = await supabase
                    .from('reviews')
                    .update({ 
                        likes: (reviewData.likes || 0) + 1,
                        ip_list: ipList.join(',')
                    })
                    .eq('id', reviewId)
        
                if (updateError) throw updateError
        
                // Aktualizace UI
                setReviews(prevReviews => 
                    prevReviews.map(review => 
                        review.id === reviewId 
                            ? { 
                                ...review, 
                                likes: (review.likes || 0) + 1,
                                ip_list: ipList.join(',')
                            }
                            : review
                    )
                )

                const peopledata = await fetchClovek(reviewData.consultant_name)

                        const { data: peopleData, error: peopleError } = await supabase
                            .from('people')
                            .update({ likes: peopledata[0].likes + 1 })
                            .eq('name', reviewData.consultant_name)
            }
    
            
    
        } catch (error) {
            console.error('Chyba při přidávání like:', error)
            alert('Nepodařilo se přidat like')
        }
    }

    const filteredReviews = getFilteredReviews()

    const showMore = () => {
        setVisibleItems(prevCount => prevCount + 6);
    };
    

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
    };
    
    const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
    };

    return(
        <section className="ReviewsList">
            <div className="ReviewsList__header">
                <div className="devider"/>
                <div className="header">
                    <h3>02</h3>
                    <p> 
                        Tolik spokojených lidí není náhoda - je to důkaz, že děláme svou praci tak jak se má dělat - od lidí k lidem
                    </p>
                    <div className="devider__header"/>
                </div>
                <div className="mainText">
                    <h2>
                        ODEZVA OD NAŠICH KLIENTŮ
                    </h2>
                </div>
            </div>

            <div className="ReviewsList__menu">
                <div className="devider__menu"/>
                <div className="menu__controls">
                    <div className="menu__buttons">
                        <div className="button" onClick={() => handleFilterClick('všechno')}>
                            <SmallButton 
                                href='/' 
                                text='všechno' 
                                active={activeMode === 'filter' && activeFilter === 'všechno'}
                            />
                        </div>
                        <div className="button" onClick={() => handleFilterClick('benefitprogram')}>
                            <SmallButton 
                                href='/' 
                                text='benefit' 
                                active={activeMode === 'filter' && activeFilter === 'benefitprogram'}
                            />
                        </div>
                        <div className="button" onClick={() => handleFilterClick('poradce')}>
                            <SmallButton 
                                href='/' 
                                text='poradci' 
                                active={activeMode === 'filter' && activeFilter === 'poradce'}
                            />
                        </div>
                    </div>
                    
                    <div className="searchBar">
                        <ReviewsSearch 
                            onSearch={handleSearch} // Function to update search
                            reviews={WebsiteReviews}
                            searchValue={searchQuery} // String value
                            resetSearch={() => {
                                setSearchQuery("")
                                setActiveMode('filter')
                            }}
                        />
                    </div>
                </div>
                <div className="addReviews">
                    <div className="devider__rev"/>
                    <div className="controls">
                        <div className="button" onClick={() => setIsOpen(!isOpen)}>
                            <SVGButton src='/svg/addIcon.svg' altText="add__icon" />
                        </div>
                        <p>Chcete přidat váš feedback?</p>
                    </div>
                </div>
            </div>

            <motion.div className="ReviewsList__Reviews" 
                layout
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <AnimatePresence>
                    {filteredReviews.slice(0, visibleItems).map(( review, i) => {
                        const { number, hashtag, message, customer_name, likes, consultant_name, id} = review
                        return (
                            <motion.div 
                                key={review.number}
                                className="review__item"
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                layout
                                transition={{
                                opacity: { duration: 0.2 },
                                layout: { duration: 0.4, type: "spring" }
                                }}
                            >
                                <div className="devider__item"/>
                                <div className="context">
                                    <div className="Header">
                                        <h3>{number < 9 ? "0" + number : number}</h3>
                                        <h3>#{hashtag}</h3>
                                        <p>{hashtag === "poradce" ? " | " + consultant_name : ""}</p>
                                    </div>
                                    <div className="message">
                                        <p>{message}</p>
                                    </div>  
                                </div>
                                <div className="ratings">
                                    <p>{customer_name}</p>
                                    <div className="buttons">
                                        <SVGButton src='/svg/thumbsUp.svg' altText='Like__icon' onClick={() => addLike(id)}/>
                                        <p>{likes}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </motion.div>
            {visibleItems < WebsiteReviews.length && (
                <motion.div
                    onClick={showMore}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="showMore__button"
                >
                    <SmallButton href='/' text='Zobrazit Více' />
                </motion.div>
            )}
            <AnimatePresence mode="wait">
                { isOpen && <ReviewModem isOpen={isOpen} setIsOpen={setIsOpen}/>}
            </AnimatePresence>
        </section>
    )
}