import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, MapPin, Coffee, Wifi, Users, Image as ImageIcon } from 'lucide-react';

interface ListCafeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ListCafeModal: React.FC<ListCafeModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xl"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-[101] pointer-events-none flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-background border border-foreground/10 rounded-2xl shadow-2xl pointer-events-auto flex flex-col max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-foreground/10 flex items-center justify-between relative">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20">
                    <Coffee className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black uppercase tracking-widest text-foreground">List Your Cafe</h2>
                    <p className="text-xs text-foreground/50 font-medium mt-1">Join our exclusive property network</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full hover:bg-foreground/5 flex items-center justify-center text-foreground/50 hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-8">
                {/* Basic Details */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center text-xs">1</span>
                    Basic Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-foreground/70 pl-1">Cafe Name</label>
                      <input
                        type="text"
                        placeholder="e.g. The Rustic Bean"
                        className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:border-accent focus:bg-transparent transition-all placeholder:text-foreground/30"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-widest text-foreground/70 pl-1">Property Size (sqft)</label>
                      <input
                        type="number"
                        placeholder="e.g. 1500"
                        className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:border-accent focus:bg-transparent transition-all placeholder:text-foreground/30"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-widest text-foreground/70 pl-1">Expected Price (Monthly)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50 font-bold">₹</span>
                        <input
                          type="number"
                          placeholder="0.00"
                          className="w-full bg-foreground/5 border border-foreground/10 rounded-xl pl-8 pr-4 py-3 text-sm text-foreground outline-none focus:border-accent focus:bg-transparent transition-all placeholder:text-foreground/30"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center text-xs">2</span>
                    Location
                  </h3>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/70 pl-1">Full Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-3.5 w-4 h-4 text-foreground/40" />
                      <textarea
                        rows={2}
                        placeholder="Enter full property address..."
                        className="w-full bg-foreground/5 border border-foreground/10 rounded-xl pl-10 pr-4 py-3 text-sm text-foreground outline-none focus:border-accent focus:bg-transparent transition-all resize-none placeholder:text-foreground/30 custom-scrollbar"
                      />
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center text-xs">3</span>
                    Property Features
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { icon: Wifi, label: 'Free WiFi' },
                      { icon: Coffee, label: 'Espresso Machine' },
                      { icon: Users, label: '50+ Seating' },
                      { icon: MapPin, label: 'Main Road' },
                    ].map((feature, idx) => (
                      <label key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-foreground/10 cursor-pointer hover:bg-foreground/5 transition-colors group">
                        <input type="checkbox" className="w-4 h-4 rounded text-accent focus:ring-accent accent-accent" />
                        <span className="text-xs font-bold text-foreground/70 group-hover:text-foreground flex items-center gap-1.5">
                          <feature.icon className="w-3.5 h-3.5" /> {feature.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Photos */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center text-xs">4</span>
                    Property Photos
                  </h3>
                  <div className="w-full h-40 border-2 border-dashed border-foreground/20 rounded-2xl flex flex-col items-center justify-center text-foreground/50 hover:text-accent hover:border-accent/50 transition-colors cursor-pointer group bg-foreground/[0.02] hover:bg-accent/5">
                    <div className="w-12 h-12 rounded-full bg-foreground/5 group-hover:bg-accent/10 flex items-center justify-center mb-3 transition-colors">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest">Click to Upload Images</span>
                    <span className="text-xs mt-1 opacity-70">JPG, PNG (Max 5MB)</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-foreground/10 bg-foreground/[0.02] flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl font-bold uppercase tracking-widest text-xs text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  className="px-8 py-2.5 rounded-xl bg-accent hover:bg-[#b5952f] text-background font-black uppercase tracking-widest text-xs transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:-translate-y-0.5"
                >
                  Post Listing
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ListCafeModal;
