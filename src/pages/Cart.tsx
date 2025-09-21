import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
    }).format(price);
  };

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <div className="w-32 h-32 mx-auto mb-8 bg-shop-surface-variant rounded-full flex items-center justify-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            ตะกร้าสินค้าว่างเปล่า
          </h2>
          <p className="text-muted-foreground mb-8">
            คุณยังไม่ได้เพิ่มสินค้าใดในตะกร้า เริ่มช้อปปิ้งกันเลย!
          </p>
          <Link to="/">
            <Button size="lg" className="w-full">
              เริ่มช้อปปิ้ง
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">ตะกร้าสินค้า</h1>
        <p className="text-muted-foreground">
          คุณมีสินค้า {cart.items.reduce((total, item) => total + item.quantity, 0)} ชิ้น ในตะกร้า
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <Card key={item.product.id} className="overflow-hidden border-0 shadow-md">
              <CardContent className="p-0">
                <div className="flex gap-4 p-6">
                  <div className="relative">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-foreground mb-1">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.product.description}
                    </p>
                    <div className="text-lg font-bold text-shop-primary">
                      {formatPrice(item.product.price)}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.product.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="h-8 w-8"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      
                      <span className="w-12 text-center font-medium">
                        {item.quantity}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">รวม</div>
                      <div className="font-bold text-shop-primary">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 border-0 shadow-lg bg-gradient-to-br from-shop-surface to-shop-surface-variant">
            <CardHeader>
              <CardTitle className="text-xl">สรุปคำสั่งซื้อ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ยรวมสินค้า</span>
                  <span>{formatPrice(cart.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ค่าจัดส่ง</span>
                  <span className="text-shop-secondary font-medium">ฟรี</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>รวมทั้งหมด</span>
                  <span className="text-shop-primary">{formatPrice(cart.total)}</span>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <Link to="/checkout" className="block">
                  <Button className="w-full h-12 text-lg font-medium">
                    ดำเนินการสั่งซื้อ
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                
                <Link to="/" className="block">
                  <Button variant="outline" className="w-full">
                    ช้อปปิ้งต่อ
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;