import React from 'react';
import {
  View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useApp } from '@/context/AppContext';
import OrderCard from '@/components/OrderCard';

export default function OrdersScreen() {
  const { state } = useApp();
  const { orders } = state;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Đơn hàng của tôi</Text>
        <Text style={styles.headerCount}>{orders.length} đơn</Text>
      </View>

      {orders.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="receipt-outline" size={72} color={Colors.grayLight} />
          <Text style={styles.emptyTitle}>Chưa có đơn hàng nào</Text>
          <Text style={styles.emptyText}>
            Đặt hàng ngay để xem lịch sử đơn hàng tại đây
          </Text>
          <TouchableOpacity style={styles.shopBtn} onPress={() => router.push('/(tabs)/')}>
            <Text style={styles.shopBtnText}>Mua sắm ngay</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <OrderCard order={item} />}
          ListHeaderComponent={
            <View style={styles.banner}>
              <Ionicons name="cube-outline" size={18} color={Colors.accent} />
              <Text style={styles.bannerText}>Tất cả đơn hàng đang được giao đúng hẹn ✓</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerTitle: { fontSize: 24, fontWeight: '800', color: Colors.darkText },
  headerCount: {
    fontSize: 13,
    color: Colors.grayText,
    backgroundColor: Colors.grayLight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  list: { padding: 16, paddingBottom: 100 },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.accentLight,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  bannerText: { fontSize: 13, color: Colors.accent, fontWeight: '600', flex: 1 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 60 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: Colors.darkText, marginTop: 16 },
  emptyText: {
    fontSize: 14,
    color: Colors.grayText,
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 20,
  },
  shopBtn: {
    marginTop: 24,
    backgroundColor: Colors.accent,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 14,
  },
  shopBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
