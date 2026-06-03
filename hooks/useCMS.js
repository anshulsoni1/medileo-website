import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabaseBrowser";

// In-memory cache to prevent redundant fetches during a single session
const cache = {
  settings: {},
  faqs: null
};

// We only need one supabase client instance for the browser
let supabase;
const getSupabase = () => {
  if (!supabase) {
    supabase = createClient();
  }
  return supabase;
};

export function useSiteSettings(key, fallbackData = null) {
  const [data, setData] = useState(fallbackData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchSettings() {
      // If we already have it in cache, use it immediately
      if (cache.settings[key]) {
        setData(cache.settings[key]);
        setIsLoading(false);
        return;
      }

      try {
        const client = getSupabase();
        const { data: result, error: fetchError } = await client
          .from("site_settings")
          .select("data")
          .eq("key", key)
          .single();

        if (fetchError) throw fetchError;
        
        if (isMounted && result?.data) {
          setData(result.data);
          // Update cache
          cache.settings[key] = result.data;
        }
      } catch (err) {
        console.error(`Failed to fetch setting [${key}]:`, err);
        if (isMounted) {
          setError(err);
          // On error, the fallbackData (initial state) remains the data
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchSettings();

    return () => {
      isMounted = false;
    };
  }, [key]);

  return { data, isLoading, error };
}

export function useFAQs(fallbackData = []) {
  const [data, setData] = useState(fallbackData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchFAQs() {
      if (cache.faqs) {
        setData(cache.faqs);
        setIsLoading(false);
        return;
      }

      try {
        const client = getSupabase();
        const { data: result, error: fetchError } = await client
          .from("faqs")
          .select("question, answer")
          .eq("is_active", true)
          .order("sort_order", { ascending: true });

        if (fetchError) throw fetchError;
        
        if (isMounted && result) {
          setData(result);
          cache.faqs = result;
        }
      } catch (err) {
        console.error("Failed to fetch FAQs:", err);
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchFAQs();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, isLoading, error };
}
