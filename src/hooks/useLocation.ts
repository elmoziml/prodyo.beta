
import { useState, useEffect } from 'react';
import axios from '@/lib/axios';

interface LocationItem {
  id: string;
  name: string;
  name_ar: string;
}

export function useWilayas() {
  const [wilayas, setWilayas] = useState<LocationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWilayas = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/wilayas');
        setWilayas(response.data);
      } catch (error) {
        console.error('Failed to fetch wilayas', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWilayas();
  }, []);

  return { wilayas, isLoading };
}

export function useDairas(wilayaId: string | null) {
  const [dairas, setDairas] = useState<LocationItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (wilayaId) {
      const fetchDairas = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(`/api/wilayas/${wilayaId}/dairas`);
          setDairas(response.data);
        } catch (error) {
          console.error('Failed to fetch dairas', error);
          setDairas([]);
        } finally {
          setIsLoading(false);
        }
      };
      fetchDairas();
    } else {
      setDairas([]);
    }
  }, [wilayaId]);

  return { dairas, isLoading };
}

export function useCommunes(dairaId: string | null) {
  const [communes, setCommunes] = useState<LocationItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (dairaId) {
      const fetchCommunes = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(`/api/dairas/${dairaId}/communes`);
          setCommunes(response.data);
        } catch (error) {
          console.error('Failed to fetch communes', error);
          setCommunes([]);
        } finally {
          setIsLoading(false);
        }
      };
      fetchCommunes();
    } else {
      setCommunes([]);
    }
  }, [dairaId]);

  return { communes, isLoading };
}
