import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, TextInput,
  TouchableOpacity, Image, KeyboardAvoidingView,
  Platform, ScrollView, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useApp } from '@/context/AppContext';

const AVATAR = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80';

export default function ProfileScreen() {
  const { state, dispatch } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Thiếu thông tin', 'Vui lòng nhập email và mật khẩu.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      dispatch({ type: 'LOGIN', email: email.trim() });
      setLoading(false);
    }, 1000);
  };

  if (state.user) {
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.profileContent}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarWrapper}>
              <Image source={{ uri: AVATAR }} style={styles.avatar} />
              <View style={styles.vipBadge}>
                <Ionicons name="star" size={10} color="#FFD700" />
                <Text style={styles.vipText}>VIP</Text>
              </View>
            </View>
            <Text style={styles.userName}>{state.user.name}</Text>
            <Text style={styles.userEmail}>{state.user.email}</Text>
          </View>

          <View style={styles.statsRow}>
            {[
              { label: 'Đơn hàng', value: state.orders.length, icon: 'receipt-outline' },
              { label: 'Yêu thích', value: 12, icon: 'heart-outline' },
              { label: 'Điểm VIP', value: '2.5K', icon: 'diamond-outline' },
            ].map(stat => (
              <View key={stat.label} style={styles.statCard}>
                <Ionicons name={stat.icon as any} size={22} color={Colors.accent} />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {[
            { icon: 'location-outline', label: 'Địa chỉ giao hàng' },
            { icon: 'card-outline', label: 'Phương thức thanh toán' },
            { icon: 'notifications-outline', label: 'Thông báo' },
            { icon: 'shield-checkmark-outline', label: 'Bảo mật tài khoản' },
            { icon: 'help-circle-outline', label: 'Trung tâm hỗ trợ' },
          ].map(item => (
            <TouchableOpacity key={item.label} style={styles.menuItem}>
              <View style={styles.menuIconWrapper}>
                <Ionicons name={item.icon as any} size={20} color={Colors.primary} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={16} color={Colors.grayMedium} />
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => {
              Alert.alert('Đăng xuất?', '', [
                { text: 'Hủy', style: 'cancel' },
                { text: 'Đăng xuất', style: 'destructive', onPress: () => dispatch({ type: 'LOGOUT' }) },
              ]);
            }}
          >
            <Ionicons name="log-out-outline" size={20} color="#FF4B4B" />
            <Text style={styles.logoutText}>Đăng xuất</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.loginContent} keyboardShouldPersistTaps="handled">
          <View style={styles.logoArea}>
            <View style={styles.logoCircle}>
              <Ionicons name="bag" size={36} color="#fff" />
            </View>
            <Text style={styles.logoTitle}>ShopVibe</Text>
            <Text style={styles.logoSub}>Mua sắm thông minh, sống đẳng cấp</Text>
          </View>

          <View style={styles.loginCard}>
            <Text style={styles.loginTitle}>Đăng nhập</Text>
            <Text style={styles.loginSub}>Chào mừng bạn trở lại!</Text>

            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={18} color={Colors.grayMedium} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email của bạn"
                placeholderTextColor={Colors.grayMedium}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={18} color={Colors.grayMedium} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                placeholderTextColor={Colors.grayMedium}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPass}
              />
              <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                <Ionicons name={showPass ? 'eye-off-outline' : 'eye-outline'} size={18} color={Colors.grayMedium} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.forgotLink}>
              <Text style={styles.forgotText}>Quên mật khẩu?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.loginBtn, loading && styles.loginBtnDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.loginBtnText}>{loading ? 'Đang đăng nhập...' : 'Đăng nhập'}</Text>
            </TouchableOpacity>

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>hoặc</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialRow}>
              {(['logo-google', 'logo-facebook', 'logo-apple'] as const).map(icon => (
                <TouchableOpacity key={icon} style={styles.socialBtn}>
                  <Ionicons name={icon} size={22} color={Colors.darkText} />
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.signupRow}>
              <Text style={styles.signupText}>Chưa có tài khoản? </Text>
              <TouchableOpacity>
                <Text style={styles.signupLink}>Đăng ký ngay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  keyboardView: { flex: 1 },
  loginContent: { padding: 20, paddingBottom: 40 },
  logoArea: { alignItems: 'center', paddingVertical: 32 },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logoTitle: { fontSize: 28, fontWeight: '800', color: Colors.primary },
  logoSub: { fontSize: 13, color: Colors.grayText, marginTop: 4 },
  loginCard: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  loginTitle: { fontSize: 24, fontWeight: '800', color: Colors.darkText },
  loginSub: { fontSize: 14, color: Colors.grayText, marginTop: 4, marginBottom: 24 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, height: 50, fontSize: 14, color: Colors.darkText },
  forgotLink: { alignSelf: 'flex-end', marginBottom: 20 },
  forgotText: { fontSize: 13, color: Colors.accent, fontWeight: '600' },
  loginBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginBtnDisabled: { opacity: 0.6 },
  loginBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.border },
  dividerText: { marginHorizontal: 12, fontSize: 12, color: Colors.grayText },
  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: 16, marginBottom: 24 },
  socialBtn: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: Colors.grayLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupRow: { flexDirection: 'row', justifyContent: 'center' },
  signupText: { fontSize: 14, color: Colors.grayText },
  signupLink: { fontSize: 14, color: Colors.accent, fontWeight: '700' },
  profileContent: { padding: 16, paddingBottom: 40 },
  profileHeader: { alignItems: 'center', paddingVertical: 24 },
  avatarWrapper: { position: 'relative', marginBottom: 12 },
  avatar: { width: 96, height: 96, borderRadius: 48, borderWidth: 3, borderColor: Colors.accent },
  vipBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  vipText: { color: '#FFD700', fontSize: 9, fontWeight: '800' },
  userName: { fontSize: 22, fontWeight: '800', color: Colors.darkText },
  userEmail: { fontSize: 13, color: Colors.grayText, marginTop: 4 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  statValue: { fontSize: 18, fontWeight: '800', color: Colors.darkText, marginTop: 6 },
  statLabel: { fontSize: 11, color: Colors.grayText, marginTop: 2 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  menuIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: Colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuLabel: { flex: 1, fontSize: 14, fontWeight: '600', color: Colors.darkText },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#FFF0F0',
  },
  logoutText: { fontSize: 15, fontWeight: '700', color: '#FF4B4B' },
});
