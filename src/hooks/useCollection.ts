import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';

type FilterOperator = 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'ilike';

interface Filter {
  column: string;
  operator: FilterOperator;
  value: any;
}

export function useCollection<T = any>(
  table: string,
  options: {
    filters?: Filter[];
    orderBy?: { column: string; ascending?: boolean };
    limit?: number;
  } = {}
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let query = supabase
      .from(table)
      .select('*') as PostgrestFilterBuilder<any, any, any[]>;

    // Apply filters
    if (options.filters) {
      options.filters.forEach(filter => {
        query = query.filter(filter.column, filter.operator, filter.value);
      });
    }

    // Apply ordering
    if (options.orderBy) {
      query = query.order(options.orderBy.column, {
        ascending: options.orderBy.ascending ?? true
      });
    }

    // Apply limit
    if (options.limit) {
      query = query.limit(options.limit);
    }

    const subscription = supabase
      .channel(`${table}_changes`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: table
      }, async () => {
        // Refetch data when changes occur
        const { data: newData, error: fetchError } = await query;
        
        if (fetchError) {
          setError(fetchError);
        } else {
          setData(newData as T[]);
        }
      })
      .subscribe();

    // Initial fetch
    query.then(
      ({ data: initialData, error: initialError }) => {
        if (initialError) {
          setError(initialError);
        } else {
          setData(initialData as T[]);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [table, JSON.stringify(options)]);

  return { data, loading, error };
}