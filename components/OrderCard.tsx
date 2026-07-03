import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Order, formatPrice } from '@/context/AppContext';

interface Props {
  order: Order;
}

export default function OrderCard({ order }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.8}
      >
        <View style={styles.headerLeft}>
          <Text style={styles.orderId}>{order.id}</Text>
          <Text style={styles.date}>{order.date}</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>{order.status}</Text>
          </View>
          <Text style={styles.total}>{formatPrice(order.total)}</Text>
        </View>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={Colors.grayText}
          style={{ marginLeft: 8 }}
        />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.itemsList}>
          <View style={styles.divider} />
          {order.items.map(item => (
            <View key={item.id} style={styles.item}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.itemDetail}>
                  {formatPrice(item.price)} × {item.quantity}
                </Text>
              </View>
              <Text style={styles.itemTotal}>{formatPrice(item.price * item.quantity)}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    overflow: 'hidden',
  },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  headerLeft: { flex: 1 },
  orderId: { fontSize: 14, fontWeight: '700', color: Colors.darkText },
  date: { fontSize: 12, color: Colors.grayText, marginTop: 2 },
  headerRight: { alignItems: 'flex-end', marginRight: 4 },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#E8FFF3',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 4,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.success },
  statusText: { fontSize: 11, color: Colors.success, fontWeight: '600' },
  total: { fontSize: 14, fontWeight: '700', color: Colors.accent },
  divider: { height: 1, backgroundColor: Colors.grayLight, marginHorizontal: 16 },
  itemsList: { paddingBottom: 12 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 10,
  },
  itemImage: { width: 44, height: 44, borderRadius: 8, resizeMode: 'cover' },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 12, fontWeight: '600', color: Colors.darkText },
  itemDetail: { fontSize: 11, color: Colors.grayText, marginTop: 2 },
  itemTotal: { fontSize: 13, fontWeight: '700', color: Colors.darkText },
});
