import React, { useState } from 'react';
import { Dumbbell, Users, ClipboardCheck, MessageSquare, Menu, X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', plan: 'Standard' });
  const [formStatus, setFormStatus] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('Submitting...');
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setFormStatus('Registration successful! We will contact you soon.');
        setFormData({ name: '', email: '', phone: '', plan: 'Standard' });
      } else {
        setFormStatus('Error during registration.');
      }
    } catch (err) {
      setFormStatus('Network error. Is backend running?');
    }
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const stagger: Variants = {
    visible: { transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="min-h-screen text-zinc-100 font-sans font-light tracking-wide bg-zinc-950 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-zinc-600/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-zinc-800/20 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      {/* Navbar */}
      <nav className="fixed w-full z-50 liquid-glass border-b border-white/5 bg-black/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tighter text-white">MATRIX</div>
          
          <div className="hidden md:flex gap-10 text-sm font-medium text-zinc-400">
            <a href="#about" className="hover:text-white transition-colors">Philosophy</a>
            <a href="#facility" className="hover:text-white transition-colors">Facility</a>
            <a href="#memberships" className="hover:text-white transition-colors">Plans</a>
            <a href="#trainers" className="hover:text-white transition-colors">Team</a>
          </div>

          <a href="#register" className="hidden md:inline-flex items-center justify-center h-10 px-6 text-sm font-medium text-black bg-white rounded-full hover:bg-zinc-200 transition-colors">
            Join the Elite
          </a>

          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="md:hidden flex flex-col items-center py-6 liquid-glass border-t border-white/5 space-y-6">
             <a href="#about" className="text-lg" onClick={() => setMenuOpen(false)}>Philosophy</a>
             <a href="#facility" className="text-lg" onClick={() => setMenuOpen(false)}>Facility</a>
             <a href="#memberships" className="text-lg" onClick={() => setMenuOpen(false)}>Plans</a>
             <a href="#register" className="text-lg font-medium text-white" onClick={() => setMenuOpen(false)}>Join the Elite</a>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 min-h-[95vh] flex items-center z-10">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
            alt="Gym Background" 
            className="w-full h-full object-cover opacity-30 grayscale mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
        </div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-7xl mx-auto w-full relative z-10 grid md:grid-cols-2 gap-12 items-center mt-20">
          <div>
            <div className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-900/50 px-3 py-1 text-xs font-medium text-zinc-300 mb-8 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-white mr-2"></span>
              Now accepting new members for 2026
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8 text-white">
              Forge your <br/> physical <span className="text-zinc-500 font-light italic">legacy.</span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl mb-10 max-w-lg leading-relaxed">
              Step into an environment engineered for peak performance. Minimal distractions, elite equipment, and a culture of relentless progress.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#register" className="inline-flex items-center justify-center h-14 px-8 text-base font-medium text-black bg-white rounded-full hover:bg-zinc-200 transition-colors">
                Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a href="#facility" className="inline-flex items-center justify-center h-14 px-8 text-base font-medium text-white liquid-glass rounded-full hover:bg-white/10 transition-colors">
                Explore Facility
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Statistics Section (Brand Authority) */}
      <section className="py-12 border-y border-white/5 bg-black/40 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/5">
           <div>
             <div className="text-4xl font-bold text-white mb-2">15,000+</div>
             <div className="text-sm text-zinc-500 uppercase tracking-widest font-semibold">Sq Ft Floor</div>
           </div>
           <div>
             <div className="text-4xl font-bold text-white mb-2">24/7</div>
             <div className="text-sm text-zinc-500 uppercase tracking-widest font-semibold">Access</div>
           </div>
           <div>
             <div className="text-4xl font-bold text-white mb-2">50+</div>
             <div className="text-sm text-zinc-500 uppercase tracking-widest font-semibold">Elite Machines</div>
           </div>
           <div>
             <div className="text-4xl font-bold text-white mb-2">100%</div>
             <div className="text-sm text-zinc-500 uppercase tracking-widest font-semibold">Commitment</div>
           </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">The Matrix Philosophy</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">We stripped away the neon lights, the juice bars, and the gimmicks. What remains is the pure essence of training.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div variants={fadeUp} className="liquid-glass p-10 group hover:border-white/20 transition-all duration-500">
              <div className="h-14 w-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <Dumbbell className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">Curated Equipment</h3>
              <p className="text-zinc-400 leading-relaxed">State-of-the-art machinery sourced globally. Every piece of equipment is selected for its biomechanical perfection and heavy-duty reliability.</p>
            </motion.div>
            
            <motion.div variants={fadeUp} className="liquid-glass p-10 group hover:border-white/20 transition-all duration-500">
              <div className="h-14 w-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <Users className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">Iron Community</h3>
              <p className="text-zinc-400 leading-relaxed">Surround yourself with individuals who share your intensity. A respectful, focused atmosphere where everyone is pushing towards their limits.</p>
            </motion.div>
            
            <motion.div variants={fadeUp} className="liquid-glass p-10 group hover:border-white/20 transition-all duration-500">
              <div className="h-14 w-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <ClipboardCheck className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">Data-Driven Growth</h3>
              <p className="text-zinc-400 leading-relaxed">Leave nothing to chance. We provide the tools, assessments, and expert guidance to track your metrics and guarantee continual progression.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Image Showcase Section */}
      <section id="facility" className="py-20 z-10 relative">
        <div className="max-w-screen-2xl mx-auto px-4 grid md:grid-cols-2 gap-4 h-[70vh]">
          <div className="relative group overflow-hidden rounded-3xl">
            <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop" alt="Gym Floor" className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-10">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">The Floor</h3>
                <p className="text-zinc-300 max-w-md">Over 15,000 sq ft of uninterrupted training space.</p>
              </div>
            </div>
          </div>
          <div className="grid grid-rows-2 gap-4">
             <div className="relative group overflow-hidden rounded-3xl">
               <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop" alt="Free Weights" className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
               <div className="absolute inset-0 bg-black/40 flex items-end p-8">
                  <h3 className="text-2xl font-bold text-white">Heavy Iron Zone</h3>
               </div>
             </div>
             <div className="relative group overflow-hidden rounded-3xl">
               <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop" alt="Recovery" className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
               <div className="absolute inset-0 bg-black/40 flex items-end p-8">
                  <h3 className="text-2xl font-bold text-white">Recovery Lab</h3>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Memberships */}
      <section id="memberships" className="py-32 px-6 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">Access Tiers</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">Simple, transparent pricing. No hidden fees or lock-in contracts.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             {/* Standard Card */}
             <div className="liquid-glass p-12 rounded-3xl flex flex-col justify-between border-white/5 hover:border-white/20 transition-all">
                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-white">Standard Access</h3>
                  <p className="text-zinc-400 mb-6">Everything you need to build your foundation.</p>
                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="text-6xl font-bold tracking-tighter text-white">$75</span>
                    <span className="text-zinc-500 font-medium">/ month</span>
                  </div>
                  <ul className="space-y-4 mb-10">
                    {['24/7 Facility Access', 'Full Gym Floor & Free Weights', 'Locker Room & Showers', 'Monthly InBody Scan'].map((item, i) => (
                      <li key={i} className="flex items-center text-zinc-300">
                        <CheckCircle2 className="w-5 h-5 mr-3 text-zinc-500" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <a href="#register" className="w-full inline-flex items-center justify-center h-14 px-6 text-base font-medium text-white bg-zinc-900 border border-white/10 rounded-xl hover:bg-zinc-800 transition-colors">
                  Select Standard
                </a>
             </div>
             
             {/* Premium Card */}
             <div className="relative p-12 rounded-3xl flex flex-col justify-between bg-zinc-100 text-black shadow-2xl scale-105 z-10">
                <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-black text-white text-xs font-bold uppercase tracking-widest py-2 px-4 rounded-full">
                  Most Popular
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Elite Access</h3>
                  <p className="text-zinc-600 mb-6">For those demanding peak performance.</p>
                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="text-6xl font-bold tracking-tighter">$140</span>
                    <span className="text-zinc-500 font-medium">/ month</span>
                  </div>
                  <ul className="space-y-4 mb-10">
                    {['Everything in Standard', 'Unlimited Recovery Lab Access', '1 Personal Training Session/mo', 'Guest Passes (2/mo)', 'Priority Support'].map((item, i) => (
                      <li key={i} className="flex items-center text-zinc-800 font-medium">
                        <CheckCircle2 className="w-5 h-5 mr-3 text-black" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <a href="#register" className="w-full inline-flex items-center justify-center h-14 px-6 text-base font-bold text-white bg-black rounded-xl hover:bg-zinc-800 transition-colors shadow-lg">
                  Select Elite
                </a>
             </div>
          </div>
        </motion.div>
      </section>

      {/* Trainers */}
      <section id="trainers" className="py-32 px-6 bg-zinc-950 z-10 relative">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-7xl mx-auto">
           <div className="text-center mb-20">
             <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">The Architects</h2>
             <p className="text-zinc-400 max-w-2xl mx-auto text-lg">Industry-leading coaches dedicated to refining your mechanics and shattering your plateaus.</p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8">
             {[
               { name: 'Alex Rivera', role: 'Head of Strength', img: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=1964&auto=format&fit=crop' },
               { name: 'Jordan Lee', role: 'Hypertrophy Specialist', img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop' },
               { name: 'Taylor Kim', role: 'Biokinetics Expert', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop' }
             ].map((trainer, i) => (
                <motion.div variants={fadeUp} key={i} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-6">
                    <img src={trainer.img} alt={trainer.name} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-1">{trainer.name}</h3>
                  <p className="text-zinc-500 font-medium uppercase tracking-wider text-sm">{trainer.role}</p>
                </motion.div>
             ))}
           </div>
        </motion.div>
      </section>

      {/* Registration Form */}
      <section id="register" className="py-32 px-6 relative z-10 overflow-hidden">
        {/* Abstract background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-zinc-800/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
        
        <div className="max-w-5xl mx-auto liquid-glass rounded-3xl p-1 md:p-2 border border-white/10 shadow-2xl shadow-black/50 backdrop-blur-2xl">
          <div className="grid md:grid-cols-2 rounded-2xl overflow-hidden bg-zinc-950/80">
            {/* Form Left Side - Image/Text */}
            <div className="relative p-12 flex flex-col justify-between overflow-hidden hidden md:flex">
              <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale" alt="Form bg" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-950/90" />
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-4">Commit to the process.</h3>
                <p className="text-zinc-400">Fill out the application below. Our team will review your profile and reach out to schedule an orientation.</p>
              </div>
              <div className="relative z-10">
                <div className="text-white font-bold text-2xl mb-1">MATRIX</div>
                <div className="text-zinc-500 text-sm">Elite Training Facility</div>
              </div>
            </div>

            {/* Form Right Side - Actual Form */}
            <div className="p-10 md:p-14">
              <h2 className="text-3xl font-bold mb-8 text-white">Join Matrix</h2>
              
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Full Name</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleInputChange} 
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all" 
                    placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Email Address</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleInputChange} 
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all" 
                    placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Phone Number</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} 
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all" 
                    placeholder="+1 (555) 000-0000" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Select Tier</label>
                  <div className="relative">
                    <select name="plan" value={formData.plan} onChange={handleInputChange} 
                      className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 appearance-none transition-all">
                      <option value="Standard">Standard Access - $75/mo</option>
                      <option value="Elite">Elite Access - $140/mo</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                      ▼
                    </div>
                  </div>
                </div>
                <button type="submit" 
                  className="w-full h-14 mt-4 bg-white text-black rounded-xl font-bold text-lg hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]">
                  Submit Application
                </button>
                {formStatus && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
                    className="text-center p-4 rounded-xl bg-zinc-900/80 border border-white/10 text-sm font-medium text-zinc-300 mt-4">
                    {formStatus}
                  </motion.div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 border-t border-white/5 z-10 relative bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-bold tracking-tighter text-white">MATRIX</div>
          <div className="text-zinc-600 text-sm">
            &copy; {new Date().getFullYear()} MATRIX Elite Training Facility. All rights reserved.
          </div>
          <div className="flex gap-6 text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
