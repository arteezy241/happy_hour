import About from "@/pages/About";
import Faq from "@/pages/FAQ";
import Cover from "@/pages/Cover";
import { Switch, Route, Link, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider, useCart } from "@/lib/cart";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import OrderConfirmation from "@/pages/OrderConfirmation";
import { ShoppingCart, Home as HomeIcon, Store, Menu, X, Sun, Moon, Users, Info, HelpCircle } from "lucide-react"; // ADDED Users ICON
import { useEffect } from "react";
import { useState } from "react";

function Navigation() {
  const { itemCount } = useCart();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // --- DARK MODE LOGIC ---
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);
  // -----------------------

  const isActive = (path: string) => location === path;

  return (
  <nav className="bg-white dark:bg-black border-b dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
    <div className="max-w-6xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <Link href="/">
          <span className="font-['Playfair_Display'] text-xl font-bold cursor-pointer dark:text-white">
            Happy Hour Liquors
          </span>
        </Link>

        {/* --- DESKTOP NAV --- */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/">
            <span className={`flex items-center gap-2 cursor-pointer font-['Poppins'] ${isActive('/') ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}>
              <HomeIcon size={18} />
              Home
            </span>
          </Link>
          <Link href="/shop">
            <span className={`flex items-center gap-2 cursor-pointer font-['Poppins'] ${isActive('/shop') ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}>
              <Store size={18} />
              Shop
            </span>
          </Link>
          {/* ... after the Shop link ... */}
          <Link href="/about">
            <span className={`flex items-center gap-2 cursor-pointer font-['Poppins'] ${isActive('/about') ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}>
              About
            </span>
          </Link>
          <Link href="/faq">
            <span className={`flex items-center gap-2 cursor-pointer font-['Poppins'] ${isActive('/faq') ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}>
              FAQ
            </span>
          </Link>
          <Link href="/team">
            <span className={`flex items-center gap-2 cursor-pointer font-['Poppins'] ${isActive('/team') ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}>
              <Users size={18} />
              Team
            </span>
          </Link>

          {/* --- TOGGLE BUTTON (Desktop) --- */}
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-400" />}
          </button>

          <Link href="/cart">
            <div className="relative cursor-pointer">
              <ShoppingCart className="text-gray-700 dark:text-gray-300" size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </div>
          </Link>
        </div>
        
        {/* --- MOBILE TOGGLE BUTTON --- */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} className="dark:text-white" /> : <Menu size={24} className="dark:text-white" />}
        </button>
      </div>
    </div>

    {/* --- START: MOBILE MENU DROPDOWN FIX --- */}
    {mobileMenuOpen && (
      <div className="md:hidden border-t dark:border-gray-800 pb-4 pt-2 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto px-6 space-y-3">
          <Link href="/">
            <span className={`block py-2 cursor-pointer font-['Poppins'] ${isActive('/') ? 'text-black dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`} onClick={() => setMobileMenuOpen(false)}>
              <HomeIcon size={18} className="inline mr-2" /> Home
            </span>
          </Link>
          <Link href="/shop">
            <span className={`block py-2 cursor-pointer font-['Poppins'] ${isActive('/shop') ? 'text-black dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`} onClick={() => setMobileMenuOpen(false)}>
              <Store size={18} className="inline mr-2" /> Shop
            </span>
          </Link>
          <Link href="/team">
            <span className={`block py-2 cursor-pointer font-['Poppins'] ${isActive('/team') ? 'text-black dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`} onClick={() => setMobileMenuOpen(false)}>
              <Users size={18} className="inline mr-2" /> Team
            </span>
          </Link>
          <Link href="/about">
            <span className={`block py-2 cursor-pointer font-['Poppins'] ${isActive('/about') ? 'text-black dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`} onClick={() => setMobileMenuOpen(false)}>
              <Info size={18} className="inline mr-2" /> About Us
            </span>
          </Link>
          <Link href="/faq">
            <span className={`block py-2 cursor-pointer font-['Poppins'] ${isActive('/faq') ? 'text-black dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`} onClick={() => setMobileMenuOpen(false)}>
              <HelpCircle size={18} className="inline mr-2" /> FAQ
            </span>
          </Link>
          
          <div className="flex items-center justify-between py-2 border-t dark:border-gray-700 pt-3">
            <span className="text-gray-500 dark:text-gray-400 font-['Poppins']">Toggle Dark Mode</span>
            <button 
              onClick={() => { setIsDark(!isDark); setMobileMenuOpen(false); }}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-400" />}
            </button>
          </div>
        </div>
      </div>
    )}
    {/* --- END: MOBILE MENU DROPDOWN FIX --- */}
  </nav>
);
}
function Router() {
  return (
    <Switch>
      
      <Route path="/" component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/order-confirmation/:id" component={OrderConfirmation} />
      <Route path="/team" component={Cover} /> {/* <--- OPTION A: ADDED TEAM ROUTE */}
      <Route path="/about" component={About} />
      <Route path="/faq" component={Faq} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    // THIS DIV FIXES THE BACKGROUND
    <div className="min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white transition-colors duration-300 font-['Poppins']">
      
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Navigation />
            <Router />
          </TooltipProvider>
        </CartProvider>
      </QueryClientProvider>

    </div>
  );
}

export default App;