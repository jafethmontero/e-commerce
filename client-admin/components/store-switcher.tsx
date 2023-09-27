'use client';

import React, { useState } from 'react';
import { store } from '@prisma/client';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useStoreModal } from '@/hooks/use-store-modal';
import { useParams, useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import {
  Check,
  ChevronsUpDown,
  ChevronsUpDownIcon,
  PlusCircle,
  Store,
} from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './ui/command';

type PopoverTriggersProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggersProps {
  items: store[];
}

const StoreSwitcher = ({ className, items = [] }: StoreSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const storeModal = useStoreModal();
  const router = useRouter();
  const params = useParams();

  const formattedItems = items.map((store) => ({
    label: store.name,
    value: store.id,
  }));
  const currentStore = formattedItems.find(
    (store) => store.value === params.storeId,
  );

  const onStoreSelect = (store: { label: string; value: string }) => {
    setIsOpen(false);
    router.push(`/${store.value}`);
  };
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={isOpen}
          aria-label="Select a store"
          className={cn('w-[200px] justify-between', className)}
        >
          <Store className="mr-2 h-4 w-4" />
          {currentStore?.label}
          <ChevronsUpDownIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." />
            <CommandEmpty>No store found</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className="text-sm"
                >
                  <Store className="mr-2 h-4 w-4" />
                  {store.label}
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      currentStore?.value === store.value
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setIsOpen(false);
                  storeModal.onOpen();
                }}
                className="cursor-pointer"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwitcher;
