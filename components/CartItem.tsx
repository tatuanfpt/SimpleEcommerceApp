import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { CartItem as CartItemType, formatPrice, useApp } from '@/context/AppContext';

interface Props {
  item: CartItemType;
}

export default function CartItemCard({ item }: Props) {
  const { dispatch } = useApp();

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <View style={styles.qtyRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => dispatch({ type: 'UPDATE_QTY', id: item.id, quantity: item.quantity - 1 })}
          >
            <Ionicons name="remove" size={16} color={Colors.primary} />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => dispatch({ type: 'UPDATE_QTY', id: item.id, quantity: item.quantity + 1 })}
          >
            <Ionicons name="add" size={16} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.right}>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => dispatch({ type: 'REMOVE_FROM_CART', id: item.id })}
        >
          <Ionicons name="trash-outline" size={18} color="#FF4B4B" />
        </TouchableOpacity>
        <Text style={styles.subtotal}>{formatPrice(item.price * item.quantity)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    alignItems: 'center',
  },
  image: { width: 80, height: 80, borderRadius: 12, resizeMode: 'cover' },
  details: { flex: 1, marginHorizontal: 12 },
  name: { fontSize: 13, fontWeight: '600', color: Colors.darkText, marginBottom: 4 },
  price: { fontSize: 13, color: Colors.grayText, marginBottom: 8 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: Colors.grayLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: { fontSize: 15, fontWeight: '700', color: Colors.darkText, minWidth: 20, textAlign: 'center' },
  right: { alignItems: 'flex-end', justifyContent: 'space-between', height: 80 },
  deleteBtn: { padding: 4 },
  subtotal: { fontSize: 14, fontWeight: '700', color: Colors.accent },
});
