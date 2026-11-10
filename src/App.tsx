import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { RoomsPage } from './pages/RoomsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { BookingModal } from './components/BookingModal';
import { SupabaseBookingsModal } from './components/SupabaseBookingsModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | undefined>(undefined);

  // Sync with browser hash if present (e.g., #rooms, #gallery, #contact)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (['home', 'rooms', 'gallery', 'contact'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePageChange = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBookingModal = (roomId?: string) => {
    setSelectedRoomId(roomId);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#070d1e] text-slate-100 selection:bg-red-600 selection:text-white">
      {/* 3-Zone Top Bar Navigation */}
      <Header
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        onOpenBookingModal={handleOpenBookingModal}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            setCurrentPage={handlePageChange}
            onOpenBookingModal={handleOpenBookingModal}
          />
        )}
        {currentPage === 'rooms' && (
          <RoomsPage
            setCurrentPage={handlePageChange}
            onOpenBookingModal={handleOpenBookingModal}
          />
        )}
        {currentPage === 'gallery' && (
          <GalleryPage
            setCurrentPage={handlePageChange}
            onOpenBookingModal={() => handleOpenBookingModal()}
          />
        )}
        {currentPage === 'contact' && (
          <ContactPage
            setCurrentPage={handlePageChange}
          />
        )}
      </main>

      {/* Unified Luxury Footer */}
      <Footer
        setCurrentPage={handlePageChange}
        onOpenBookingModal={() => handleOpenBookingModal()}
        onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
      />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        preSelectedRoomId={selectedRoomId}
      />

      {/* Supabase Database Live Viewer */}
      <SupabaseBookingsModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
      />
    </div>
  );
}
