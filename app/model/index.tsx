// model/data.tsx
export interface ItemData {
  name: string;
  address: string;
  region: string;
  phone: string;
  province: string;
}

export const fetchData = async (): Promise<ItemData[]> => {
  const response = await fetch('https://dekontaminasi.com/api/id/covid19/hospitals');
  const data = await response.json();
  
  return data;
};
