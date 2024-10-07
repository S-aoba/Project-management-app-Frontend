'use client'

import { Table } from '@tanstack/react-table'
import { ArrowDown, ArrowRight, ArrowUp, Check, CircleCheck, CirclePause, CirclePlus, Timer } from 'lucide-react'
import React from 'react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useFilteringButton } from '../store/use-filtering-button'

interface Props<TData> {
  table: Table<TData>
  filterKey: 'status' | 'priority'
  filterKeyList: {
    value: string
    label: string
  }[]
}

export function FilteringButton<TData>({ table, filterKey, filterKeyList }: Props<TData>) {
  const [open, setOpen] = React.useState(false)
  const [state, setState] = useFilteringButton()

  const handleSelect = (event: string) => {
    table.getColumn(filterKey)?.setFilterValue(event)

    setState({ ...state, [filterKey]: event })
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' role='combobox' aria-expanded={open}>
          <CirclePlus className='size-4 mr-2' />
          {filterKey}
          {state[filterKey] && (
            <>
              <div data-orientation='vertical' role='none' className='shrink-0 bg-border w-[1px] mx-2 h-4'></div>
              <div className='bg-gray-300/40 text-xs px-2 rounded-md'>
                {state[filterKey] ? filterKeyList.find((key) => key.value === state[filterKey])?.label : ''}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search framework...' />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {filterKeyList.map((key) => (
                <CommandItem key={key.value} value={key.value} onSelect={(event) => handleSelect(event)}>
                  <Check className={cn('mr-2 h-4 w-4', state[filterKey] === key.value ? 'opacity-100' : 'opacity-0')} />
                  {key.value === 'pending' && <CirclePause className='size-4 mr-2' />}
                  {key.value === 'progress' && <Timer className='size-4 mr-2' />}
                  {key.value === 'completed' && <CircleCheck className='size-4 mr-2' />}
                  {key.value === 'low' && <ArrowDown className='size-4 mr-2' />}
                  {key.value === 'medium' && <ArrowRight className='size-4 mr-2' />}
                  {key.value === 'high' && <ArrowUp className='size-4 mr-2' />}
                  {key.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
