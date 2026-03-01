'use client';

import { motion } from 'framer-motion';
import { Calendar, Hotel, ClipboardList } from 'lucide-react';

type Tab = 'events' | 'hotels' | 'rsvp';

interface NavigationProps {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
}

const tabs = [
    { id: 'events' as Tab, label: 'Événements', icon: Calendar },
    { id: 'hotels' as Tab, label: 'Hôtels', icon: Hotel },
    { id: 'rsvp' as Tab, label: 'RSVP', icon: ClipboardList },
];

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
    return (
        <nav className="nav-tabs">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                    <motion.button
                        key={tab.id}
                        className={`nav-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => onTabChange(tab.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Icon size={20} />
                        <span className="label">{tab.label}</span>
                    </motion.button>
                );
            })}
        </nav>
    );
}
