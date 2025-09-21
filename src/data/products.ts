import { Product } from '@/types/shop';
import tshirtImg from '@/assets/tshirt.jpg';
import jeansImg from '@/assets/jeans.jpg';
import sneakersImg from '@/assets/sneakers.jpg';
import backpackImg from '@/assets/backpack.jpg';
import headphonesImg from '@/assets/headphones.jpg';
import smartwatchImg from '@/assets/smartwatch.jpg';
import jacketImg from '@/assets/jacket.jpg';
import walletImg from '@/assets/wallet.jpg';

export const products: Product[] = [
  {
    id: '1',
    name: 'เสื้อยืดผ้าฝ้าย Premium',
    price: 590,
    image: tshirtImg,
    description: 'เสื้อยืดผ้าฝ้าย 100% คุณภาพสูง นุ่มสบาย ใส่ได้ทุกวัน',
    category: 'เสื้อผ้า',
    inStock: true,
  },
  {
    id: '2',
    name: 'กางเกงยีนส์ Slim Fit',
    price: 1290,
    image: jeansImg,
    description: 'กางเกงยีนส์ทรง Slim Fit ใส่สบาย เข้ารูป ดีไซน์ทันสมัย',
    category: 'เสื้อผ้า',
    inStock: true,
  },
  {
    id: '3',
    name: 'รองเท้าผ้าใบ Urban Style',
    price: 2490,
    image: sneakersImg,
    description: 'รองเท้าผ้าใบสไตล์เซอร์ คุณภาพเยื่ยม ใส่สบาย เดินได้ทั้งวัน',
    category: 'รองเท้า',
    inStock: true,
  },
  {
    id: '4',
    name: 'กระเป๋าเป้ Backpack',
    price: 1890,
    image: backpackImg,
    description: 'กระเป๋าเป้ใส่ laptop ดีไซน์เรียบง่าย มีช่องเก็บของหลากหลาย',
    category: 'กระเป๋า',
    inStock: true,
  },
  {
    id: '5',
    name: 'หูฟัง Wireless Premium',
    price: 3490,
    image: headphonesImg,
    description: 'หูฟังไร้สาย เสียงใส คุณภาพสูง แบตเตอรี่ทนนาน',
    category: 'อิเล็กทรอนิกส์',
    inStock: true,
  },
  {
    id: '6',
    name: 'นาฬิกาข้อมือ Smart Watch',
    price: 4990,
    image: smartwatchImg,
    description: 'นาฬิกาอัจฉริยะ ติดตามสุขภาพ กันน้ำ เชื่อมต่อมือถือได้',
    category: 'อิเล็กทรอนิกส์',
    inStock: true,
  },
  {
    id: '7',
    name: 'แจ็คเก็ต Denim Classic',
    price: 1590,
    image: jacketImg,
    description: 'แจ็คเก็ตยีนส์คลาสสิค ทนทาน ใส่ได้หลายโอกาส สไตล์เท่ห์',
    category: 'เสื้อผ้า',
    inStock: false,
  },
  {
    id: '8',
    name: 'กระเป๋าสตางค์หนังแท้',
    price: 890,
    image: walletImg,
    description: 'กระเป๋าสตางค์หนังแท้ งานฝีมือประณีต ใส่การ์ดได้หลายใบ',
    category: 'กระเป๋า',
    inStock: true,
  },
];