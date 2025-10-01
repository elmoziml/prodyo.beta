
import { useState, useEffect } from 'react';
import { fetchWilayas, fetchDairas, fetchCommunes, LocationItem } from '@/services/locationService';

export function useWilayas() {
  const [wilayas, setWilayas] = useState<LocationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWilayas = async () => {
      try {
        setIsLoading(true);
        const data = await fetchWilayas();
        setWilayas(data);
      } catch (error) {
        console.error('Failed to fetch wilayas', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadWilayas();
  }, []);

  return { wilayas, isLoading };
}

export function useDairas(wilayaId: string | null) {
  const [dairas, setDairas] = useState<LocationItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (wilayaId) {
      const loadDairas = async () => {
        try {
          setIsLoading(true);
          const data = await fetchDairas(wilayaId);
          setDairas(data);
        } catch (error) {
          console.error('Failed to fetch dairas', error);
          setDairas([]);
        } finally {
          setIsLoading(false);
        }
      };
      loadDairas();
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
      const loadCommunes = async () => {
        try {
          setIsLoading(true);
          const data = await fetchCommunes(dairaId);
          setCommunes(data);
        } catch (error) {
          console.error('Failed to fetch communes', error);
          setCommunes([]);
        } finally {
          setIsLoading(false);
        }
      };
      loadCommunes();
    } else {
      setCommunes([]);
    }
  }, [dairaId]);

  return { communes, isLoading };
}
