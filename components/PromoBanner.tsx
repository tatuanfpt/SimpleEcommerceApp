import React, { useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, Image, StyleSheet, Dimensions,
} from 'react-native';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - 32;

const banners = [
  {
    id: '1',
    title: 'SUMMER SALE',
    subtitle: 'Giảm đến 50%\nTất cả sản phẩm thời trang',
    cta: 'Mua ngay',
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=600&q=80',
  },
  {
    id: '2',
    title: 'TECH DEALS',
    subtitle: 'Gadgets & Điện tử\nGiá tốt nhất thị trường',
    cta: 'Khám phá',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
  },
  {
    id: '3',
    title: 'FLASH SALE',
    subtitle: 'Chỉ hôm nay!\nMiễn phí vận chuyển',
    cta: 'Đặt ngay',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
  },
];

export default function PromoBanner() {
  const scrollRef = useRef<ScrollView>(null);
  const currentIndex = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      currentIndex.current = (currentIndex.current + 1) % banners.length;
      scrollRef.current?.scrollTo({
        x: currentIndex.current * (BANNER_WIDTH + 12),
        animated: true,
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.wrapper}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={BANNER_WIDTH + 12}
        decelerationRate="fast"
        contentContainerStyle={styles.scrollContent}
      >
        {banners.map(banner => (
          <View key={banner.id} style={styles.card}>
            <Image source={{ uri: banner.image }} style={styles.image} />
            <View style={styles.overlay} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{banner.title}</Text>
              <Text style={styles.subtitle}>{banner.subtitle}</Text>
              <View style={styles.ctaBtn}>
                <Text style={styles.ctaText}>{banner.cta} →</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginHorizontal: 16, marginBottom: 8 },
  scrollContent: { gap: 12 },
  card: {
    width: BANNER_WIDTH,
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  image: { position: 'absolute', width: '100%', height: '100%' },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  textContainer: {
    position: 'absolute',
    left: 20,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 12,
  },
  ctaBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  ctaText: { color: '#1A1A2E', fontWeight: '700', fontSize: 12 },
});
