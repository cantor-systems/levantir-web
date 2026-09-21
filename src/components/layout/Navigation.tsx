"use client";

import React, { useState } from 'react';
import { Header } from './Header';
import { MobileNavigation } from './MobileNavigation';

export function Navigation() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <>
      <Header
        onOpenMobileNav={() => setIsMobileNavOpen(true)}
        isMobileNavOpen={isMobileNavOpen}
      />
      <MobileNavigation
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </>
  );
}