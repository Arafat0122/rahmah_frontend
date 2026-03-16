import { Facebook, Instagram, Linkedin, Youtube, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative text-slate-900 pt-24 pb-12 border-t border-slate-200 overflow-hidden bg-white">

      {/* --- Subtle Islamic Pattern Watermark --- */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: `url('https://img.freepik.com/premium-vector/ramadan-festival-pattern-intricate-islamic-geometric-background_687236-1153.jpg?semt=ais_hybrid&w=740&q=80')`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 w-full">

        {/* --- Top Section: Four Columns --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">

          {/* 1. Learn with us */}
          <div>
            <h3 className="text-primary font-black text-[11px] uppercase tracking-[0.3em] mb-8">Learn with us</h3>
            <ul className="space-y-4 text-slate-600 text-sm font-bold">
              <li className="hover:text-primary transition-colors"><Link to="/quran">Quran</Link></li>
              <li className="hover:text-primary transition-colors"><Link to="/arabic">Arabic</Link></li>
              <li className="hover:text-primary transition-colors"><Link to="/fiqh">Fiqh</Link></li>
              <li className="hover:text-primary transition-colors"><Link to="/curriculum">Azhari Curriculum</Link></li>
              <li className="hover:text-primary transition-colors"><Link to="/alemi">Alemi Course</Link></li>
              <li className="hover:text-primary transition-colors"><Link to="/hadis">Dawra Hadis</Link></li>
            </ul>
          </div>

          {/* 2. For Students */}
          <div>
            <h3 className="text-primary font-black text-[11px] uppercase tracking-[0.3em] mb-8">For Students</h3>
            <ul className="space-y-4 text-slate-600 text-sm font-bold">
              <li className="hover:text-primary transition-colors"><Link to="/how-it-works">How Rahmah Institute works</Link></li>
            </ul>
          </div>

          {/* 3. For Teachers */}
          <div>
            <h3 className="text-primary font-black text-[11px] uppercase tracking-[0.3em] mb-8">For Teachers</h3>
            <ul className="space-y-4 text-slate-600 text-sm font-bold">
              <li className="hover:text-primary transition-colors"><Link to="/become-teacher">Become a Teacher</Link></li>
              <li className="hover:text-primary transition-colors"><Link to="/skills">Develop Your Teaching Skills</Link></li>
            </ul>
          </div>

          {/* 4. Rahmah Institute */}
          <div>
            <h3 className="text-primary font-black text-[11px] uppercase tracking-[0.3em] mb-8">Rahmah Institute</h3>
            <ul className="space-y-4 text-slate-600 text-sm font-bold">
              <li className="hover:text-primary transition-colors"><Link to="/about">About</Link></li>
              <li className="hover:text-primary transition-colors"><Link to="/support">Help & Support</Link></li>
              <li className="hover:text-primary transition-colors"><Link to="/terms">Terms and Conditions</Link></li>
              <li className="hover:text-primary transition-colors"><Link to="/privacy">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* --- Middle Section: Logo | Socials --- */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-slate-200 pt-12 mb-12">
          {/* Logo */}
          <div className="flex items-center gap-4 group">
            <img
              src="/Rahmah-Institute.png"
              alt="Rahmah Institute Logo"
              className="w-12 h-12 object-contain"
            />
            <div className="font-serif text-xl font-bold leading-tight uppercase tracking-widest text-slate-900">
              Rahmah <br />
              <span className="text-primary text-sm font-medium tracking-[0.4em]">Institute</span>
            </div>
          </div>

          {/* Social Links - Added aria-labels and darkened icons */}
          <div className="flex items-center gap-6 mt-8 md:mt-0">
            <a href="https://youtube.com" aria-label="Visit our YouTube channel" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"><Youtube size={18} /></a>
            <a href="https://facebook.com" aria-label="Follow us on Facebook" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"><Facebook size={18} /></a>
            <a href="https://instagram.com" aria-label="Follow us on Instagram" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"><Instagram size={18} /></a>
            <a href="https://linkedin.com" aria-label="Connect on LinkedIn" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"><Linkedin size={18} /></a>
          </div>
        </div>

        {/* --- Bottom Section: Rights & Developer --- */}
        <div className="flex flex-col items-center text-center gap-3">
          <p className="text-[10px] text-slate-600 uppercase tracking-[0.4em] font-bold">
            © {currentYear} Rahmah Institute. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-slate-600 font-bold uppercase tracking-wider">Developed by</span>
            <a
              href="https://arafat0122.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-900 font-black hover:text-primary transition-all flex items-center gap-1.5 group border-b border-slate-300 pb-0.5"
            >
              Soyeb Ahmed Arafat
              <ExternalLink size={10} className="text-slate-500 group-hover:text-primary transition-colors" aria-hidden="true" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;