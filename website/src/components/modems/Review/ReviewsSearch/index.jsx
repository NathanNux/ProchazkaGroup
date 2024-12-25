import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command"
import { Search } from "lucide-react"

export default function ReviewsSearch({ onSearch }) {
  return (
    <Command className="rounded-lg border-none w-full bg-transparent">
      <div className="flex items-center gap-2 px-3">
        <Search className="h-4 w-4 shrink-0 opacity-50" />
        <CommandInput 
          placeholder="Hledat podle jména poradce nebo hashtagu"
          onValueChange={(value) => onSearch(value)}
          className="h-9 bg-transparent border-none focus:outline-none text-white/70"
        />
      </div>
      <CommandList className="bg-[#050A10] rounded-lg mt-2">
        <CommandEmpty>Žádné výsledky.</CommandEmpty>
      </CommandList>
    </Command>
  )
}