import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CreditCard, MapPin, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'credit-card',
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
    }).format(price);
  };

  const subtotal = cart.total;
  const tax = subtotal * 0.07; // 7% VAT
  const shipping = 0; // Free shipping
  const total = subtotal + tax + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    clearCart();
    toast({
      title: "สั่งซื้อสำเร็จ! 🎉",
      description: "คำสั่งซื้อของคุณได้รับการยืนยันแล้ว เราจะจัดส่งให้เร็วที่สุด",
    });

    navigate('/', { replace: true });
    setIsSubmitting(false);
  };

  if (cart.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">สรุปคำสั่งซื้อ</h1>
        <p className="text-muted-foreground">กรุณาตรวจสอบข้อมูลและกรอกรายละเอียดการจัดส่ง</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <div className="space-y-6">
            {/* Customer Information */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  ข้อมูลผู้สั่งซื้อ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">ชื่อ-นามสกุล</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      placeholder="กรอกชื่อ-นามสกุล"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="08X-XXX-XXXX"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">อีเมล</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  ที่อยู่จัดส่ง
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">ที่อยู่</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    placeholder="บ้านเลขที่ หมู่ ตำบล อำเภอ"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">จังหวัด</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      placeholder="กรุงเทพมหานคร"
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">รหัสไปรษณีย์</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      placeholder="10XXX"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  วิธีการชำระเงิน
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 border border-border rounded-lg bg-shop-surface-variant">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 bg-gradient-to-r from-shop-primary to-shop-secondary rounded flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">ชำระเงินปลายทาง</div>
                      <div className="text-sm text-muted-foreground">
                        ชำระเงินเมื่อได้รับสินค้า (เฉพาะเงินสด)
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24 border-0 shadow-lg bg-gradient-to-br from-shop-surface to-shop-surface-variant">
              <CardHeader>
                <CardTitle>สรุปคำสั่งซื้อ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {cart.items.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <div className="font-medium text-sm">{item.product.name}</div>
                          <div className="text-xs text-muted-foreground">จำนวน {item.quantity}</div>
                        </div>
                      </div>
                      <div className="text-sm font-medium">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">ยอดรวมสินค้า</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">ภาษีมูลค่าเพิ่ม (7%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">ค่าจัดส่ง</span>
                    <span className="text-shop-secondary font-medium">ฟรี</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>รวมทั้งหมด</span>
                    <span className="text-shop-primary">{formatPrice(total)}</span>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      กำลังดำเนินการ...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      ยืนยันการสั่งซื้อ
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;