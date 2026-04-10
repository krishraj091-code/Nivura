import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface DataContextType {
  data: any;
  loading: boolean;
  refetch: () => Promise<void>;
}

const DataContext = createContext<DataContextType>({
  data: null,
  loading: true,
  refetch: async () => {},
});

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/data");
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, refetch: fetchData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
