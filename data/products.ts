export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Giày Nike Air Max 270',
    price: 2850000,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
    description: 'Giày thể thao Nike Air Max 270 với đệm khí lớn nhất từ trước đến nay, mang lại cảm giác thoải mái cả ngày dài. Thiết kế hiện đại, phù hợp cả đi chơi lẫn tập luyện.',
    category: 'Giày dép',
    rating: 4.8,
    reviews: 324,
  },
  {
    id: '2',
    name: 'Đồng Hồ Apple Watch Series 9',
    price: 9990000,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80',
    description: 'Apple Watch Series 9 với chip S9 mạnh mẽ, màn hình Always-On Retina sáng hơn 2x, tính năng Double Tap tiện lợi và vô số ứng dụng sức khỏe thông minh.',
    category: 'Đồng hồ',
    rating: 4.9,
    reviews: 891,
  },
  {
    id: '3',
    name: 'Tai Nghe Sony WH-1000XM5',
    price: 7490000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    description: 'Tai nghe chống ồn chủ động hàng đầu thế giới từ Sony. Âm thanh Hi-Res, thời lượng pin 30 giờ, thoải mái khi đeo cả ngày với đệm tai mềm mại.',
    category: 'Điện tử',
    rating: 4.7,
    reviews: 567,
  },
  {
    id: '4',
    name: 'Túi Da Louis Vuitton Mini',
    price: 15500000,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80',
    description: 'Túi xách mini da thật cao cấp phong cách Louis Vuitton. Thiết kế tinh tế, dây đeo có thể điều chỉnh, phù hợp mọi occasion từ dạo phố đến tiệc tối.',
    category: 'Thời trang',
    rating: 4.6,
    reviews: 203,
  },
  {
    id: '5',
    name: 'Laptop MacBook Air M3',
    price: 28990000,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
    description: 'MacBook Air với chip M3 đột phá, mỏng nhẹ chỉ 1.24kg, màn hình Liquid Retina 13.6 inch, pin 18 giờ. Không quạt, không ồn, hoàn toàn yên tĩnh.',
    category: 'Laptop',
    rating: 4.9,
    reviews: 1204,
  },
  {
    id: '6',
    name: 'Kính Rayban Aviator Classic',
    price: 3200000,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80',
    description: 'Kính mắt Rayban Aviator Classic huyền thoại với gọng kim loại vàng, tròng kính xanh lá G-15. Chống tia UV100%, phù hợp cả nam lẫn nữ.',
    category: 'Phụ kiện',
    rating: 4.5,
    reviews: 445,
  },
  {
    id: '7',
    name: 'Bàn Phím Cơ Keychron K2',
    price: 1890000,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80',
    description: 'Bàn phím cơ không dây Keychron K2 75% layout, kết nối Bluetooth đa thiết bị, switch Gateron Brown êm ái. Tương thích Mac/Windows.',
    category: 'Phụ kiện máy tính',
    rating: 4.7,
    reviews: 788,
  },
  {
    id: '8',
    name: 'Nước Hoa Chanel No.5',
    price: 4200000,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&q=80',
    description: 'Nước hoa Chanel No.5 huyền thoại - biểu tượng của sự sang trọng và nữ tính từ năm 1921. Mùi hương hoa cỏ phương đông quyến rũ, lưu hương trên 8 giờ.',
    category: 'Làm đẹp',
    rating: 4.8,
    reviews: 2341,
  },
];
