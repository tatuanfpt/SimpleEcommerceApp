import React from 'react';
import {
  View, Text, FlatList, StyleSheet, SafeAreaView,
  TouchableOpacity, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useApp, cartTotal, formatPrice } from '@/context/AppContext';
import CartItemCard from '@/components/CartItem';

export default function CartScreen() {
  const { state, dispatch } = useApp();
  const { cart, user } = state;
  const total = cartTotal(cart);

  const handleCheckout = () => {
    if (!user) {
      Alert.alert(
        'Chưa đăng nhập',
        'Bạn cần đăng nhập để thanh toán.',
        [
          { text: 'Hủy', style: 'cancel' },
          { text: 'Đăng nhập ngay', onPress: () => router.push('/(tabs)/profile') },
        ]
      );
      return;
    }
    Alert.alert(
      'Xác nhận đặt hàng',
      `Tổng thanh toán: ${formatPrice(total)}\n\nXác nhận đặt hàng?`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Đặt hàng',
          onPress: () => {
            dispatch({ type: 'PLACE_ORDER' });
            Alert.alert(
              '🎉 Đặt hàng thành công!',
              'Đơn hàng của bạn đã được tiếp nhận. Xem lịch sử đơn hàng để theo dõi.',
              [{ text: 'OK', onPress: () => router.push('/(tabs)/orders') }]
            );
          },
        },
      ]
    );
  };

  if (cart.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Giỏ hàng</Text>
        </View>
        <View style={styles.empty}>
          <Ionicons name="bag-outline" size={72} color={Colors.grayLight} />
          <Text style={styles.emptyTitle}>Giỏ hàng trống</Text>
          <Text style={styles.emptyText}>Hãy thêm sản phẩm yêu thích vào giỏ</Text>
          <TouchableOpacity style={styles.shopBtn} onPress={() => router.push('/(tabs)/')}>
            <Text style={styles.shopBtnText}>Mua sắm ngay</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Giỏ hàng</Text>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Xóa tất cả?', '', [
              { text: 'Hủy', style: 'cancel' },
              { text: 'Xóa', style: 'destructive', onPress: () => dispatch({ type: 'CLEAR_CART' }) },
            ]);
          }}
        >
          <Text style={styles.clearText}>Xóa tất cả</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={cart}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <CartItemCard item={item} />}
      />

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tạm tính ({cart.length} sản phẩm)</Text>
          <Text style={styles.summaryValue}>{formatPrice(total)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Phí vận chuyển</Text>
          <Text style={[styles.summaryValue, { color: Colors.success }]}>Miễn phí</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Tổng cộng</Text>
          <Text style={styles.totalValue}>{formatPrice(total)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
          <Ionicons name="card-outline" size={20} color="#fff" />
          <Text style={styles.checkoutText}>Thanh toán ngay</Text>
        </TouchableOpacity>
      </View>
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
  clearText: { fontSize: 13, color: '#FF4B4B', fontWeight: '600' },
  list: { paddingHorizontal: 16, paddingBottom: 16 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 60 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: Colors.darkText, marginTop: 16 },
  emptyText: { fontSize: 14, color: Colors.grayText, marginTop: 8 },
  shopBtn: {
    marginTop: 24,
    backgroundColor: Colors.accent,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 14,
  },
  shopBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  summary: {
    backgroundColor: Colors.white,
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 10,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryLabel: { fontSize: 14, color: Colors.grayText },
  summaryValue: { fontSize: 14, fontWeight: '600', color: Colors.darkText },
  divider: { height: 1, backgroundColor: Colors.border, marginVertical: 10 },
  totalLabel: { fontSize: 16, fontWeight: '700', color: Colors.darkText },
  totalValue: { fontSize: 20, fontWeight: '800', color: Colors.accent },
  checkoutBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 14,
  },
  checkoutText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
