import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useGlobalSearchParams } from 'expo-router';

interface ProvinceLocation {
  lat: number;
  lon: number;
  display_name: string;
}

export default function DetailsScreen() {
  const { province } = useGlobalSearchParams();
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<ProvinceLocation | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!province) return;

    const fetchProvinceCoordinates = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?state=${province}&country=Indonesia&format=json`
        );
        const data = await response.json();
        if (data.length > 0) {
          setLocation({
            lat: parseFloat(data[0].lat),
            lon: parseFloat(data[0].lon),
            display_name: data[0].display_name,
          });
        } else {
          setError('Coordinates not found for the specified province');
        }
      } catch (err) {
        setError('Failed to fetch coordinates');
      } finally {
        setLoading(false);
      }
    };

    fetchProvinceCoordinates();
  }, [province]);

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
      {location ? (
        <>
          <Text style={styles.title}>{location.display_name}</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.lat,
              longitude: location.lon,
              latitudeDelta: 1,  // Adjust for zoom level
              longitudeDelta: 1,
            }}
          >
            <Marker
              coordinate={{ latitude: location.lat, longitude: location.lon }}
              title={location.display_name}
            />
          </MapView>
        </>
      ) : (
        <Text style={styles.noDetails}>No location details available</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: '80%',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
  },
  noDetails: {
    fontStyle: 'italic',
    color: '#888',
  },
});
