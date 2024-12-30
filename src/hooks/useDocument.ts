import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useDocument<T>(table: string, id: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const subscription = supabase
      .channel(`${table}_${id}_changes`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: table,
        filter: `id=eq.${id}`
      }, async () => {
        // Refetch data when changes occur
        const { data: newData, error: fetchError } = await supabase
          .from(table)
          .select('*')
          .eq('id', id)
          .single();
        
        if (fetchError) {
          setError(fetchError);
        } else {
          setData(newData as T);
        }
      })
      .subscribe();

    // Initial fetch
    supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data: initialData, error: initialError }) => {
        if (initialError) {
          setError(initialError);
        } else {
          setData(initialData as T);
        }
        setLoading(false);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [table, id]);

  return { data, loading, error };
}