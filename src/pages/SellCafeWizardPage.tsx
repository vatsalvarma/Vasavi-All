import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Briefcase, 
  DollarSign, 
  MapPin, 
  Image as ImageIcon, 
  Video, 
  Eye, 
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Loader2
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';

const api = {
  post: async (url: string, data?: any) => {
    return new Promise((resolve) => setTimeout(() => resolve({ data: { success: true } }), 1500));
  }
};

const STEPS = [
  { id: 1, title: 'Basic Details', icon: Building2 },
  { id: 2, title: 'Business Info', icon: Briefcase },
  { id: 3, title: 'Financials', icon: DollarSign },
  { id: 4, title: 'Property', icon: MapPin },
  { id: 5, title: 'Images', icon: ImageIcon },
  { id: 6, title: 'Videos', icon: Video },
  { id: 7, title: 'Preview', icon: Eye },
  { id: 8, title: 'Publish', icon: CheckCircle2 },
];

const SellCafeWizardPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitError, setSubmitError] = useState('');
  const [isPending, setIsPending] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();
  
  const formData = watch();

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  
  const onSubmit = async (data: any) => {
    setIsPending(true);
    setSubmitError('');
    try {
      const payload = {
        title: data.title,
        description: data.description,
        price: data.askingPrice ? parseFloat(data.askingPrice) : 0,
        monthlyRevenue: data.monthlyRevenue ? parseFloat(data.monthlyRevenue) : 0,
        monthlyProfit: data.monthlyProfit ? parseFloat(data.monthlyProfit) : 0,
        areaSqft: data.areaSqft ? parseInt(data.areaSqft) : null,
        seatingCapacity: data.seatingCapacity ? parseInt(data.seatingCapacity) : null,
        isFranchise: data.isFranchise || false,
        city: { name: data.city || 'Unknown' },
        category: { name: data.category || 'cafe' },
        primaryImageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80"
      };
      
      await api.post('/listings', payload);
      setCurrentStep(8); // Move to success step
    } catch (error: any) {
      console.error("Listing creation failed", error);
      setSubmitError(error.response?.data?.message || 'Failed to create listing. Please try again.');
    } finally {
      setIsPending(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-foreground/50 mb-2">Listing Title</label>
              <input 
                {...register("title", { required: true })}
                type="text" 
                placeholder="e.g. Premium Artisan Coffee Shop in Koramangala" 
                className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-2.5 text-foreground font-bold focus:border-accent outline-none transition-colors placeholder:text-foreground/30 text-sm"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-foreground/50 mb-1.5">Category</label>
              <select 
                {...register("category")}
                className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-2.5 text-foreground font-bold focus:border-accent outline-none transition-colors appearance-none cursor-pointer text-sm"
              >
                <option value="cafe" className="bg-background">Independent Cafe</option>
                <option value="franchise" className="bg-background">Franchise Coffee Shop</option>
                <option value="cloud_kitchen" className="bg-background">Cloud Kitchen</option>
                <option value="restaurant" className="bg-background">Fine Dining Restaurant</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-foreground/50 mb-1.5">Brief Description</label>
              <textarea 
                {...register("description")}
                rows={3}
                placeholder="Describe your business, its history, and why it's a great opportunity..."
                className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-2.5 text-foreground font-bold focus:border-accent outline-none transition-colors resize-none placeholder:text-foreground/30 text-sm"
              ></textarea>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-foreground/50 mb-1.5">Business Age (Years)</label>
                <input type="number" {...register("businessAge")} className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-2.5 text-foreground font-bold focus:border-accent outline-none transition-colors text-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-foreground/50 mb-1.5">Number of Employees</label>
                <input type="number" {...register("employeesCount")} className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-2.5 text-foreground font-bold focus:border-accent outline-none transition-colors text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-foreground/50 mb-1.5">Reason for Selling</label>
              <textarea {...register("reasonForSelling")} rows={2} className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-2.5 text-foreground font-bold focus:border-accent outline-none transition-colors resize-none text-sm"></textarea>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="franchise" {...register("isFranchise")} className="w-5 h-5 accent-accent rounded cursor-pointer border-foreground/10 bg-foreground/5" />
              <label htmlFor="franchise" className="text-sm font-black uppercase tracking-widest text-foreground/70 cursor-pointer">Is this a franchise?</label>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-foreground/50 mb-1.5">Asking Price (₹)</label>
              <input type="number" {...register("askingPrice", { required: true })} className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-2.5 text-accent focus:border-accent outline-none text-xl font-black transition-colors" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-foreground/50 mb-1.5">Monthly Revenue (₹)</label>
                <input type="number" {...register("monthlyRevenue")} className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-2.5 text-foreground font-bold focus:border-accent outline-none transition-colors text-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-foreground/50 mb-1.5">Monthly Profit (₹)</label>
                <input type="number" {...register("monthlyProfit")} className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-2.5 text-green-500 font-bold focus:border-accent outline-none transition-colors text-sm" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="negotiable" {...register("isNegotiable")} className="w-5 h-5 accent-accent rounded cursor-pointer" />
              <label htmlFor="negotiable" className="text-[10px] font-black uppercase tracking-widest text-foreground/70 cursor-pointer">Is the asking price negotiable?</label>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-foreground/50 mb-1.5">City</label>
                <input type="text" {...register("city")} className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-2.5 text-foreground font-bold focus:border-accent outline-none transition-colors text-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-foreground/50 mb-1.5">Locality / Area</label>
                <input type="text" {...register("locality")} className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-2.5 text-foreground font-bold focus:border-accent outline-none transition-colors text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-foreground/50 mb-1.5">Area (Sq.Ft)</label>
                <input type="number" {...register("areaSqft")} className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-2.5 text-foreground font-bold focus:border-accent outline-none transition-colors text-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-foreground/50 mb-1.5">Seating Capacity</label>
                <input type="number" {...register("seatingCapacity")} className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-2.5 text-foreground font-bold focus:border-accent outline-none transition-colors text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-foreground/50 mb-1.5">Property Type</label>
              <select {...register("propertyType")} className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-2.5 text-foreground font-bold focus:border-accent outline-none transition-colors appearance-none cursor-pointer text-sm">
                <option value="leased" className="bg-background">Leased</option>
                <option value="owned" className="bg-background">Owned (Included in sale)</option>
              </select>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-foreground/10 rounded-3xl p-6 text-center hover:border-accent hover:bg-accent/5 transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 text-accent">
                <ImageIcon size={24} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-foreground mb-1.5">Upload High-Quality Images</h3>
              <p className="text-foreground/50 text-[10px] font-bold max-w-sm mx-auto mb-4">Drag and drop images here, or click to browse. At least 3 images required. Maximum 10 images.</p>
              <button type="button" className="px-6 py-2 rounded-xl bg-foreground/10 text-foreground font-black uppercase tracking-widest text-[10px] hover:bg-foreground/20 transition-colors">
                Browse Files
              </button>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-foreground/10 rounded-3xl p-6 text-center hover:border-accent hover:bg-accent/5 transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 text-accent">
                <Video size={24} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-foreground mb-1.5">Upload a Video Walkthrough</h3>
              <p className="text-foreground/50 text-[10px] font-bold max-w-sm mx-auto mb-4">Listings with videos get 300% more engagement. Upload an MP4 up to 50MB or provide a YouTube link.</p>
              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
                <button type="button" className="px-6 py-2 rounded-xl bg-foreground/10 text-foreground font-black uppercase tracking-widest text-[10px] hover:bg-foreground/20 transition-colors whitespace-nowrap">
                  Upload MP4
                </button>
                <span className="text-foreground/40 font-black text-[10px] uppercase">or</span>
                <input type="text" placeholder="YouTube URL" className="bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-2 text-foreground outline-none w-full sm:w-64 focus:border-accent text-sm font-bold" />
              </div>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-black uppercase tracking-tight text-foreground">Review Your Listing</h3>
            <div className="rounded-2xl p-6 bg-card border border-foreground/10 shadow-xl">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <div>
                  <p className="text-[9px] text-foreground/50 font-black uppercase tracking-widest mb-1">Title</p>
                  <p className="text-foreground font-black text-sm">{formData.title || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[9px] text-foreground/50 font-black uppercase tracking-widest mb-1">Asking Price</p>
                  <p className="text-accent font-black text-lg">₹{formData.askingPrice || '0'}</p>
                </div>
                <div>
                  <p className="text-[9px] text-foreground/50 font-black uppercase tracking-widest mb-1">Location</p>
                  <p className="text-foreground font-bold text-sm">{formData.locality ? `${formData.locality}, ` : ''}{formData.city || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[9px] text-foreground/50 font-black uppercase tracking-widest mb-1">Monthly Revenue</p>
                  <p className="text-foreground font-bold text-sm">₹{formData.monthlyRevenue || '0'}</p>
                </div>
              </div>
            </div>
            <p className="text-[9px] font-bold text-foreground/40 text-center uppercase tracking-widest">Ensure all details are accurate. A premium listing fee may apply before going live.</p>
            {submitError && (
              <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-black uppercase tracking-widest text-center">
                {submitError}
              </div>
            )}
          </div>
        );
      case 8:
        return (
          <div className="py-8 text-center flex flex-col items-center justify-center h-full">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 text-green-500 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
            >
              <CheckCircle2 size={40} />
            </motion.div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-foreground mb-3">Listing Published!</h2>
            <p className="text-foreground/60 font-bold max-w-md mx-auto mb-6 text-[10px] uppercase tracking-widest">
              Your cafe listing has been successfully submitted and is now under review by our team. It will be live on the marketplace within 2-4 hours.
            </p>
            <Link to="/cafe" className="bg-accent hover:bg-[#b5952f] text-background px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] inline-flex">Return to Marketplace</Link>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen bg-background pt-[75px] pb-4 px-4 sm:px-6 lg:px-8 flex flex-col overflow-hidden">
      <div className="max-w-4xl mx-auto w-full h-full flex flex-col">
        
        {/* Header */}
        <div className="text-center mb-4 shrink-0">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-foreground mb-2">List Your Business</h1>
          <p className="text-foreground/60 text-sm font-bold uppercase tracking-widest">Join India's most exclusive premium marketplace for hospitality businesses.</p>
        </div>

        {/* Wizard Container */}
        <div className="rounded-3xl bg-card border border-foreground/10 shadow-2xl flex flex-col flex-1 min-h-0 overflow-hidden">
          
          {/* Progress Sidebar/Header */}
          <div className="bg-foreground/[0.02] border-b border-foreground/10 p-3 md:p-4 shrink-0 flex justify-center">
            <div className="flex items-center w-full max-w-full overflow-hidden justify-between">
              {STEPS.map((step, index) => (
                <div key={step.id} className="flex items-center shrink">
                  <div className={`flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-lg text-[9px] md:text-[10px] uppercase font-black tracking-widest transition-all ${
                    currentStep === step.id 
                      ? 'bg-accent/20 text-accent border border-accent/50 shadow-[0_0_15px_rgba(212,175,55,0.2)]' 
                      : currentStep > step.id
                        ? 'text-foreground'
                        : 'text-foreground/40'
                  }`}>
                    <step.icon size={14} className={`shrink-0 ${currentStep > step.id ? 'text-green-500' : ''}`} />
                    <span className="hidden lg:inline whitespace-nowrap">{step.title}</span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className={`w-2 sm:w-4 md:w-8 h-px mx-1 md:mx-2 transition-colors shrink ${currentStep > step.id ? 'bg-green-500/50' : 'bg-foreground/10'}`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 relative flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={currentStep === 7 ? handleSubmit(onSubmit) : (e) => e.preventDefault()}>
                  {renderStepContent()}
                </form>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer Controls */}
          {currentStep < 8 && (
            <div className="p-4 md:px-6 border-t border-foreground/10 bg-foreground/[0.01] flex justify-between items-center shrink-0">
              <button 
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all ${
                  currentStep === 1 
                    ? 'opacity-0 pointer-events-none' 
                    : 'bg-foreground/5 text-foreground hover:bg-foreground/10 border border-foreground/10'
                }`}
              >
                <ChevronLeft size={16} /> Back
              </button>
              
              <button 
                onClick={currentStep === 7 ? handleSubmit(onSubmit) : nextStep}
                disabled={isPending}
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-accent text-background hover:bg-[#b5952f] font-black uppercase tracking-widest text-[10px] transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] disabled:opacity-50"
              >
                {isPending ? <Loader2 size={16} className="animate-spin" /> : currentStep === 7 ? 'Publish Listing' : 'Continue'} 
                {currentStep < 7 && <ChevronRight size={16} />}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellCafeWizardPage;
