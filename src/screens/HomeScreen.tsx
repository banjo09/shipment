import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Card from '../components/Card';
// import { Card } from '../components';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Discover new things</Text>
      </View>

      {/* Featured Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured</Text>
        <Card
          title="Featured Item 1"
          description="This is a featured item description"
          imageUrl="https://via.placeholder.com/300"
        />
      </View>

      {/* Categories Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* Horizontal scroll of category cards */}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
});

export default HomeScreen;