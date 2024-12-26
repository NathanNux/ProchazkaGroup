import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command"
import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ReviewsSearch({ onSearch, reviews, searchValue, resetSearch }) {
  const [isOpen, setIsOpen] = useState(false)
  const [filteredReviews, setFilteredReviews] = useState([])

  // Get unique persons
  const uniquePersons = useMemo(() => {
    if (!Array.isArray(reviews)) return []
    return [...new Set(reviews.filter(review => review?.person).map(review => review.person))]
  }, [reviews])

  useEffect(() => {
    // Reset internal state when searchValue is cleared externally
    if (!searchValue) {
        setFilteredReviews([])
    }
  }, [searchValue])

  const handleSearch = (value) => {
    if (!value || typeof value !== 'string') {
      resetSearch?.()
      setFilteredReviews([])
      return
    }

    try {
      const filtered = uniquePersons.filter(person => 
        person?.toLowerCase().includes(value.toLowerCase())
      ).map(person => ({
        person,
        count: reviews.filter(review => review?.person === person).length || 0
      }))

      setFilteredReviews(filtered)
      onSearch?.(value)
    } catch (error) {
      console.error('Search error:', error)
      setFilteredReviews([])
    }
  }

  const handlePersonSelect = (person) => {
    onSearch(person) // Use onSearch instead of searchValue
    setIsOpen(false)
  }

  return (
    <div className="relative w-full [&>*]:!border-none [&>*]:!shadow-none [&>*]:!outline-none">
      <Command 
        className="rounded-[25px] w-full bg-transparent border-none shadow-none ring-0 ring-offset-0"
        aria-label="Vyhledávání poradců"
      >
        <CommandInput 
          value={searchValue}
          onValueChange={handleSearch}
          placeholder="Hledat podle jména poradce"
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          type="search"
          role="searchbox"
          aria-label="Vyhledat poradce podle jména"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls="search-results-list"
          className="h-9 text-[1.5rem] bg-transparent border-0 border-none 
          focus:outline-none focus:ring-0 focus:ring-offset-0
          text-[#050A10] p-4 placeholder:text-[#050A10/10]
          [-webkit-tap-highlight-color:transparent] 
          [-webkit-appearance:none]
          [&:-webkit-autofill]:bg-none
          [&:-webkit-autofill]:!bg-transparent"
        />
        <AnimatePresence>
          {isOpen && searchValue && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 w-full z-50 mt-2"
              id="search-results"
              role="listbox"
              aria-label="Výsledky vyhledávání"
            >
              <CommandList 
                id="search-results-list"
                role="listbox"
                aria-label="Výsledky vyhledávání"
                className="rounded-[25px] border border-[#00F0FF] p-4 max-h-[300px] overflow-auto bg-[#050A10]"
              >
                {filteredReviews.length === 0 ? (
                  <CommandEmpty className="text-white/70" role="status" aria-live="polite">Žádné výsledky.</CommandEmpty>
                ) : (
                  filteredReviews.map(({ person, count }, index) => (
                    <CommandItem
                      key={person}
                      value={person}
                      onSelect={() => handlePersonSelect(person)}
                      role="option"
                      aria-selected={searchValue === person}
                      className="px-4 py-2 hover:bg-[#00F0FF]/10 cursor-pointer text-white/70"
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex justify-between items-center w-full"
                      >
                        <span className="text-[#00F0FF] text-[1.2rem]">{person}</span>
                        <span className="text-white/50 text-[1.1rem]" >{count} recenzí</span>
                      </motion.div>
                    </CommandItem>
                  ))
                )}
              </CommandList>
            </motion.div>
          )}
        </AnimatePresence>
      </Command>
</div>
  )
}