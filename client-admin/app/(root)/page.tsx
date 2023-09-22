'use client';

import Modal from '@/components/ui/modal';
import { useStoreModal } from '@/hooks/useStoreModal';
import { UserButton } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function Home() {
  const isOpen = useStoreModal((state) => state.isOpen);
  const onOpen = useStoreModal((state) => state.onOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return (
    <div className="p-4">
      <UserButton afterSignOutUrl="/" />
      Root page
    </div>
  );
}
