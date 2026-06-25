"use client";

import { useCallback, useEffect, useState } from "react";
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

function toError(error: unknown) {
  return error instanceof Error ? error : new Error("Unknown error");
}

function useAsyncResource<T>(load: () => Promise<T>, enabled = true) {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    loading: enabled,
    error: null,
  });

  useEffect(() => {
    if (!enabled) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    let mounted = true;
    setState((current) => ({ ...current, loading: true, error: null }));

    load()
      .then((data) => {
        if (mounted) {
          setState({ data, loading: false, error: null });
        }
      })
      .catch((error: unknown) => {
        if (mounted) {
          setState({ data: null, loading: false, error: toError(error) });
        }
      });

    return () => {
      mounted = false;
    };
  }, [enabled, load]);

  return state;
}

export function useHomePageData() {
  return useAsyncResource(getHomePageData);
}

export function useProperties(filters?: PropertyFilterParams) {
  const load = useCallback(() => getProperties(filters), [filters]);
  return useAsyncResource(load);
}

export function usePropertyDetail(slug: string | null) {
  const load = useCallback(() => {
    if (!slug) {
      return Promise.reject(new Error("Missing property slug"));
    }

    return getPropertyBySlug(slug);
  }, [slug]);

  return useAsyncResource(load, !!slug);
}

export function useSimilarProperties(slug: string | null) {
  const load = useCallback(() => {
    if (!slug) {
      return Promise.reject(new Error("Missing property slug"));
    }

    return getSimilarProperties(slug);
  }, [slug]);

  return useAsyncResource(load, !!slug);
}
