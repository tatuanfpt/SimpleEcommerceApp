import React from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet, Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Product } from '@/data/products';
import { formatPrice, useApp } from '@/context/AppContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

interface Props {
  product: Product;
  onPress: () => void;
}

export default function ProductCard({ product, onPress }: Props) {
  const { state, dispatch } = useApp();
  const inCart = state.cart.some(i => i.id === product.id);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={10} color="#FFD700" />
          <Text style={styles.ratingText}>{product.rating}</Text>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
        <TouchableOpacity
          style={[styles.addBtn, inCart && styles.addBtnActive]}
          onPress={() => dispatch({ type: 'ADD_TO_CART', product })}
          activeOpacity={0.8}
        >
          <Ionicons name={inCart ? 'checkmark' : 'add'} size={16} color="#fff" />
          <Text style={styles.addBtnText}>{inCart ? 'Đã thêm' : 'Thêm vào giỏ'}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  imageWrapper: { position: 'relative' },
  image: { width: '100%', height: 150, resizeMode: 'cover' },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    paddingHorizontal: 7,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingText: { color: '#fff', fontSize: 10, fontWeight: '600' },
  info: { padding: 12 },
  category: {
    fontSize: 10,
    color: Colors.grayText,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.darkText,
    marginBottom: 8,
    lineHeight: 18,
  },
  price: { fontSize: 15, fontWeight: '700', color: Colors.accent, marginBottom: 10 },
  addBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  addBtnActive: { backgroundColor: Colors.success },
  addBtnText: { color: '#fff', fontSize: 12, fontWeight: '600' },
});
