'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut } from 'lucide-react';
import Login from '@/components/Login';
import Navigation from '@/components/Navigation';
import EventsTab from '@/components/tabs/EventsTab';
import HotelsTab from '@/components/tabs/HotelsTab';
import RsvpTab from '@/components/tabs/RsvpTab';
import Image from "next/image";
import AnimatedInitials from "@/components/animations/AnimatedInitials";
import AnimatedDivider from "@/components/animations/AnimatedDivider";
import FloatingParticles from "@/components/animations/FloatingParticles";
import Hero from "@/components/Hero";

type Tab = 'events' | 'hotels' | 'rsvp';

const PASSWORD = process.env.NEXT_PUBLIC_WEDDING_PASSWORD || 'mariage2025';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('events');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem('wedding_auth');
    if (auth === 'true') setIsAuthenticated(true);
    setIsLoading(false);
  }, []);

  const handleLogin = (password: string): boolean => {
    if (password === PASSWORD) {
      localStorage.setItem('wedding_auth', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      localStorage.removeItem('wedding_auth');
      setIsAuthenticated(false);
    }
  };

  if (isLoading) return null;

  return (
      <div className="app-container">
        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
              <Login key="login" onLogin={handleLogin} />
          ) : (
              <motion.div
                  key="content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
              >
                {/* Bouton déconnexion */}
                <motion.button
                    className="logout-btn"
                    onClick={handleLogout}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Se déconnecter"
                >
                  <LogOut size={20} />
                </motion.button>
                <Hero />
                <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
                <div className="content-area">
                  <AnimatePresence mode="wait">
                    {activeTab === 'events' && (
                        <motion.div
                            key="events"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                          <EventsTab />
                        </motion.div>
                    )}
                    {activeTab === 'hotels' && (
                        <motion.div
                            key="hotels"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                          <HotelsTab />
                        </motion.div>
                    )}
                    {activeTab === 'rsvp' && (
                        <motion.div
                            key="rsvp"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                          <RsvpTab />
                        </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <footer className="footer">
                  <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                  >
                    Nous avons hâte de célébrer avec vous ! 🎉
                  </motion.p>
                </footer>
              </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
}
