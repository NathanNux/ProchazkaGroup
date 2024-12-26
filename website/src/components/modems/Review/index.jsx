
import SmallButton from "@/components/ui/stickyButtons/buttons/SmallButton";
import SVGButton from "@/components/ui/stickyButtons/buttons/SvgButton";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import ReviewModem from "../ReviewModem";
import ReviewsSearch from "./ReviewsSearch";
import { WebsiteReviews } from "@/constants/pages/reviews";


export default function ReviewsList() {
    const [isOpen, setIsOpen] = useState(false)
    const [visibleItems, setVisibleItems] = useState(6)
    const [activeFilter, setActiveFilter] = useState('všechno')
    const [searchQuery, setSearchQuery] = useState("")
    const [activeMode, setActiveMode] = useState('filter') // 'filter' or 'search'

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

    const getFilteredReviews = () => {
        try {
            if (activeMode === 'search' && searchQuery) {
                return WebsiteReviews.filter(review => 
                    review?.person?.toLowerCase().includes(searchQuery.toLowerCase())
                )
            }
    
            if (activeMode === 'filter') {
                return WebsiteReviews.filter(review => 
                    activeFilter === 'všechno' || 
                    review?.hastag?.toLowerCase() === activeFilter.toLowerCase()
                )
            }
    
            return WebsiteReviews
        } catch (error) {
            console.error('Filter error:', error)
            return []
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
                            <SVGButton src='/thumbsUp.svg' altText="add__icon" />
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
                        const { number, hastag, message, name, likes} = review
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
                                        <p>{number}</p>
                                        <p>#{hastag}</p>
                                    </div>
                                    <div className="message">
                                        <p>{message}</p>
                                    </div>  
                                </div>
                                <div className="ratings">
                                    <p>{name}</p>
                                    <div className="buttons">
                                        <SVGButton src='/thumbsUp.svg' altText='Like__icon'/>
                                        <p>{likes}</p>
                                        <div style={{ backgroundColor: '#050A10'}}>
                                            <Image src='/thumbsUp.svg' alt="like__icon" width={35} height={35}/>
                                        </div>
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