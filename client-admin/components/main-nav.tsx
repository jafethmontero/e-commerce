'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';

export const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.storeId}/settings`,
    },
  ];
  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      {routes.length > 0
        ? routes.map((route) => (
            <Link
              href={route.href}
              key={route.label}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                route.active
                  ? 'text-black dark:text-white'
                  : 'text-muted-foreground',
              )}
            >
              {route.label}
            </Link>
          ))
        : null}
    </nav>
  );
};
