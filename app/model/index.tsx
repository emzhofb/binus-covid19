// model/data.tsx
export interface ItemData {
  id: string;
  name: string;
  data: {
    [key: string]: string | number | null;
  } | null;
}

export const fetchData = async (): Promise<ItemData[]> => {
  const response = await fetch('https://api.restful-api.dev/objects');
  const data = await response.json();
  return data;
};
