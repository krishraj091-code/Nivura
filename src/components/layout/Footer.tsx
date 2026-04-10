import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-lg py-12 mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <span className="font-display font-bold text-lg">N</span>
              </div>
              <span className="font-display text-xl font-semibold tracking-tight">
                Nuvira Global
              </span>
            </Link>
            <p className="text-foreground/60 max-w-sm">
              Senior level advisory and strategic financial consulting for high-growth businesses and premium clients.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-foreground/60 hover:text-gold transition-colors">About</Link></li>
              <li><a href="/#services" className="text-foreground/60 hover:text-gold transition-colors">Services</a></li>
              <li><a href="/#benefits" className="text-foreground/60 hover:text-gold transition-colors">Benefits</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="/#faq" className="text-foreground/60 hover:text-gold transition-colors">FAQ</a></li>
              <li><Link to="/schedule" className="text-foreground/60 hover:text-gold transition-colors">Contact</Link></li>
              <li><Link to="/admin" className="text-foreground/60 hover:text-gold transition-colors">Admin Login</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground/40">
            © {new Date().getFullYear()} Nuvira Global. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-foreground/40">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
