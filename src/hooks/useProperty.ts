"use client";

import { useState, useEffect } from "react";
import {
  getHomePageData,
  getProperties,
  getPropertyBySlug,
  getSimilarProperties,
  type HomePageData,
  type ApiProperty,
  type PropertyListResponse,
  type PropertyFilterParams,
} from "@/services";

// Re-export types for use in components
export type {
  HomePageData,
  ApiProperty as Property,
  PropertyListResponse,
  PropertyFilterParams,
};

interface UseAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Hook to fetch home page aggregated data
 */
export function useHomePageData() {
  const [state, setState] = useState<UseAsyncState<HomePageData>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const data = await getHomePageData();
        if (mounted) {
          setState({ data, loading: false, error: null });
        }
      } catch (error) {
        if (mounted) {
          setState({
            data: null,
            loading: false,
            error: error instanceof Error ? error : new Error("Unknown error"),
          });
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  return state;
}

/**
 * Hook to fetch properties with filters
 */
export function useProperties(filters?: PropertyFilterParams) {
  const [state, setState] = useState<UseAsyncState<PropertyListResponse>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const data = await getProperties(filters);
        if (mounted) {
          setState({ data, loading: false, error: null });
        }
      } catch (error) {
        if (mounted) {
          setState({
            data: null,
            loading: false,
            error: error instanceof Error ? error : new Error("Unknown error"),
          });
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [filters]);

  return state;
}

/**
 * Hook to fetch a single property by slug
 */
export function usePropertyDetail(slug: string | null) {
  const [state, setState] = useState<UseAsyncState<ApiProperty>>({
    data: null,
    loading: !!slug,
    error: null,
  });

  useEffect(() => {
    if (!slug) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    let mounted = true;

    const fetchData = async () => {
      try {
        const data = await getPropertyBySlug(slug);
        if (mounted) {
          setState({ data, loading: false, error: null });
        }
      } catch (error) {
        if (mounted) {
          setState({
            data: null,
            loading: false,
            error: error instanceof Error ? error : new Error("Unknown error"),
          });
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [slug]);

  return state;
}

/**
 * Hook to fetch similar properties
 */
export function useSimilarProperties(slug: string | null) {
  const [state, setState] = useState<UseAsyncState<ApiProperty[]>>({
    data: null,
    loading: !!slug,
    error: null,
  });

  useEffect(() => {
    if (!slug) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    let mounted = true;

    const fetchData = async () => {
      try {
        const data = await getSimilarProperties(slug);
        if (mounted) {
          setState({ data, loading: false, error: null });
        }
      } catch (error) {
        if (mounted) {
          setState({
            data: null,
            loading: false,
            error: error instanceof Error ? error : new Error("Unknown error"),
          });
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [slug]);

  return state;
}
