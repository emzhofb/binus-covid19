import React from 'react';
import { StyleSheet, FlatList, Text, View, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router'; // Import the useRouter hook
import { ItemData } from '../model/index';
import { useHomeScreenViewModel } from '../view-model/index';

const HomeScreenView: React.FC = () => {
  const { items, loading, error } = useHomeScreenViewModel();
  const router = useRouter(); // Initialize the router

  const handlePress = (id: string) => {
    // Navigate to the 'details' screen passing the smartphone id
    router.push(`/details?id=${id}`);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: ItemData }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      {item.data ? (
        <View style={styles.detailsContainer}>
          {Object.entries(item.data).map(([key, value], index) => (
            <View key={index} style={styles.detailRow}>
              <Text style={styles.detailKey}>{key}:</Text>
              <Text style={styles.detailValue}>{String(value)}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.noDetails}>No details available</Text>
      )}
      {/* Add press event to navigate to the details screen */}
      <Text style={styles.detailsButton} onPress={() => handlePress(item.id)}>
        View Details
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Binus Apps!</Text>
        <Text style={styles.subtitle}>List of the Smartphones</Text>
      </View>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '300',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 8,
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailsContainer: {
    marginTop: 8,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  detailKey: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  detailValue: {
    color: '#555',
  },
  noDetails: {
    fontStyle: 'italic',
    color: '#888',
  },
  errorText: {
    color: 'red',
  },
  detailsButton: {
    color: 'blue',
    marginTop: 8,
    textDecorationLine: 'underline',
  },
});

export default HomeScreenView;
