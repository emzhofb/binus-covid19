import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useGlobalSearchParams } from 'expo-router'; // Correct import for query parameters

// Define the interface for the 'data' object
interface ItemDataDetails {
  color: string;
  "capacity GB": number; // You can also use `capacityGB` if you want a cleaner key
}

// In your component (where you access smartphone)
interface Smartphone {
  id: string;
  name: string;
  data: ItemDataDetails;
  // Add other fields as necessary based on your API response
}

export default function DetailsScreen() {
  const { id } = useGlobalSearchParams(); // Use useSearchParams to extract query parameters
  const [loading, setLoading] = useState(true);
  const [smartphone, setSmartphone] = useState<Smartphone | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // If no id is present, don't make a request

    const fetchSmartphoneDetails = async () => {
      try {
        const response = await fetch(`https://api.restful-api.dev/objects?id=${id}`);
        const data = await response.json();
        setSmartphone(data[0]);
      } catch (err) {
        setError('Failed to fetch smartphone details');
      } finally {
        setLoading(false);
      }
    };

    fetchSmartphoneDetails();
  }, [id]);

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{smartphone?.name}</Text>
      {smartphone?.data ? (
        <View style={styles.detailsContainer}>
          {Object.entries(smartphone.data).map(([key, value], index) => (
            <View key={index} style={styles.detailRow}>
              <Text style={styles.detailKey}>{key}:</Text>
              <Text style={styles.detailValue}>{String(value)}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.noDetails}>No details available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
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
});
