import { ref, computed, watch, toValue, type MaybeRefOrGetter } from "vue";

export function useImage(
  url: MaybeRefOrGetter<string>,
  crossorigin?: MaybeRefOrGetter<string>,
  referrerPolicy?: MaybeRefOrGetter<string>
) {
  const image = ref<HTMLImageElement | null>(null);
  const status = ref<"loading" | "loaded" | "error">("loading");

  const load = (
    newUrl: string,
    newCrossorigin?: string,
    newReferrerPolicy?: string,
  ) => {
    status.value = "loading";
    const img = new Image();

    if (newCrossorigin) {
      img.crossOrigin = newCrossorigin;
    }
    if (newReferrerPolicy) {
      img.referrerPolicy = newReferrerPolicy;
    }

    img.onload = () => {
      image.value = img;
      status.value = "loaded";
    };

    img.onerror = () => {
      image.value = null;
      status.value = "error";
    };

    img.src = newUrl;
  };

  const toWatchable = computed(() => ({
    url: toValue(url),
    crossorigin: toValue(crossorigin),
    referrerPolicy: toValue(referrerPolicy),
  }))

  // Watch for changes in url, crossorigin, and referrerPolicy
  watch(
    toWatchable,
    ({ url, crossorigin, referrerPolicy }) => {
      if (url) {
        load(url, crossorigin, referrerPolicy);
      }
    },
    { immediate: true }
  );

  return [image, status] as const;
}
