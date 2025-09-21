import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';

const Navbar = () => {
  const location = useLocation();
  const { cartItemsCount } = useCart();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-shop-surface/95 backdrop-blur supports-[backdrop-filter]:bg-shop-surface/60">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-xl bg-gradient-to-br from-shop-primary to-shop-secondary text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Store className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-shop-primary to-shop-secondary bg-clip-text text-transparent">
              ThaiShop
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button 
                variant={isActive('/') ? 'default' : 'ghost'}
                className="transition-all duration-300"
              >
                รายการสินค้า
              </Button>
            </Link>
            
            <Link to="/cart" className="relative">
              <Button 
                variant={isActive('/cart') ? 'default' : 'outline'}
                size="icon"
                className="relative transition-all duration-300 hover:scale-105"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs animate-pulse"
                  >
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;