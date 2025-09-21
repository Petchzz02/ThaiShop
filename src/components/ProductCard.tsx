import React from 'react';
import { Plus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/shop';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
    }).format(price);
  };

  return (
    <Card className="group overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-shop-surface to-shop-surface-variant border-0">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {!product.inStock && (
          <Badge 
            variant="secondary" 
            className="absolute top-3 right-3 bg-destructive text-destructive-foreground"
          >
            หมด
          </Badge>
        )}
        
        <Badge 
          variant="outline" 
          className="absolute top-3 left-3 bg-shop-surface/90 text-shop-primary border-shop-primary/20"
        >
          {product.category}
        </Badge>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-shop-primary transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="text-2xl font-bold text-shop-primary">
          {formatPrice(product.price)}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
          className="w-full group/button transition-all duration-300 hover:shadow-lg"
          variant={product.inStock ? 'default' : 'secondary'}
        >
          {product.inStock ? (
            <>
              <Plus className="w-4 h-4 mr-2 group-hover/button:rotate-90 transition-transform duration-300" />
              เพิ่มในตะกร้า
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-2" />
              สินค้าหมด
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;