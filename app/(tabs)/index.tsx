import React, { useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, SafeAreaView,
  TextInput, TouchableOpacity, Modal, Image, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { products, Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import PromoBanner from '@/components/PromoBanner';
import { Colors } from '@/constants/Colors';
import { formatPrice, useApp } from '@/context/AppContext';

const CATEGORIES = ['Tất cả', 'Giày dép', 'Đồng hồ', 'Điện tử', 'Thời trang', 'Laptop', 'Phụ kiện', 'Làm đẹp'];

export default function StorefrontScreen() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { dispatch } = useApp();

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === 'Tất cả' || p.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Xin chào 👋</Text>
          <Text style={styles.title}>Khám phá sản phẩm</Text>
        </View>
        <TouchableOpacity style={styles.notifBtn}>
          <Ionicons name="notifications-outline" size={24} color={Colors.darkText} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchWrapper}>
        <Ionicons name="search-outline" size={18} color={Colors.grayMedium} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm sản phẩm..."
          placeholderTextColor={Colors.grayMedium}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={18} color={Colors.grayMedium} />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <PromoBanner />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContent}
              style={styles.categories}
            >
              {CATEGORIES.map(cat => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.catChip, selectedCategory === cat && styles.catChipActive]}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <Text style={[styles.catText, selectedCategory === cat && styles.catTextActive]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Text style={styles.sectionTitle}>{filtered.length} sản phẩm</Text>
          </>
        }
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={() => setSelectedProduct(item)} />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="search" size={48} color={Colors.grayLight} />
            <Text style={styles.emptyText}>Không tìm thấy sản phẩm</Text>
          </View>
        }
      />

      <Modal
        visible={!!selectedProduct}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelectedProduct(null)}
      >
        {selectedProduct && (
          <View style={styles.modal}>
            <Image source={{ uri: selectedProduct.image }} style={styles.modalImage} />
            <TouchableOpacity style={styles.closeBtn} onPress={() => setSelectedProduct(null)}>
              <Ionicons name="close" size={20} color={Colors.darkText} />
            </TouchableOpacity>
            <ScrollView style={styles.modalContent}>
              <Text style={styles.modalCategory}>{selectedProduct.category}</Text>
              <Text style={styles.modalName}>{selectedProduct.name}</Text>
              <View style={styles.modalMeta}>
                <View style={styles.ratingRow}>
                  {[1, 2, 3, 4, 5].map(i => (
                    <Ionicons
                      key={i}
                      name={i <= Math.floor(selectedProduct.rating) ? 'star' : 'star-outline'}
                      size={16}
                      color="#FFD700"
                    />
                  ))}
                  <Text style={styles.ratingNum}>{selectedProduct.rating}</Text>
                  <Text style={styles.reviewCount}>({selectedProduct.reviews} đánh giá)</Text>
                </View>
              </View>
              <Text style={styles.modalPrice}>{formatPrice(selectedProduct.price)}</Text>
              <Text style={styles.modalDesc}>{selectedProduct.description}</Text>
              <TouchableOpacity
                style={styles.modalAddBtn}
                onPress={() => {
                  dispatch({ type: 'ADD_TO_CART', product: selectedProduct });
                  setSelectedProduct(null);
                }}
              >
                <Ionicons name="bag-add-outline" size={20} color="#fff" />
                <Text style={styles.modalAddText}>Thêm vào giỏ hàng</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
      </Modal>
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
    paddingBottom: 12,
  },
  greeting: { fontSize: 13, color: Colors.grayText },
  title: { fontSize: 22, fontWeight: '800', color: Colors.darkText },
  notifBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: Colors.darkText },
  categories: { marginBottom: 8 },
  categoriesContent: { paddingHorizontal: 16, gap: 8 },
  catChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  catChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  catText: { fontSize: 12, fontWeight: '600', color: Colors.grayText },
  catTextActive: { color: Colors.white },
  sectionTitle: {
    fontSize: 12,
    color: Colors.grayText,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
  },
  listContent: { paddingTop: 8, paddingBottom: 100 },
  row: { justifyContent: 'space-between', paddingHorizontal: 16 },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyText: { marginTop: 12, color: Colors.grayText, fontSize: 14 },
  modal: { flex: 1, backgroundColor: Colors.white },
  modalImage: { width: '100%', height: 300, resizeMode: 'cover' },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  modalContent: { padding: 20 },
  modalCategory: {
    fontSize: 11,
    color: Colors.grayText,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
  },
  modalName: { fontSize: 22, fontWeight: '800', color: Colors.darkText, marginBottom: 12, lineHeight: 30 },
  modalMeta: { marginBottom: 12 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingNum: { fontSize: 13, fontWeight: '700', color: Colors.darkText, marginLeft: 4 },
  reviewCount: { fontSize: 12, color: Colors.grayText },
  modalPrice: { fontSize: 28, fontWeight: '800', color: Colors.accent, marginBottom: 16 },
  modalDesc: { fontSize: 14, lineHeight: 22, color: Colors.grayText, marginBottom: 32 },
  modalAddBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 40,
  },
  modalAddText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
