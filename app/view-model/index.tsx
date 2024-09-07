// viewModel/HomeScreenViewModel.tsx
import { useState, useEffect } from 'react';
import { fetchData, ItemData } from '../model/index';

export function useHomeScreenViewModel() {
  const [items, setItems] = useState<ItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData();
        setItems(data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    items,
    loading,
    error,
  };
}
