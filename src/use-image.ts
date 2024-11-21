import { ref, watch, Ref } from "vue";

export function useImage(
  url: string | Ref<string>,
  crossorigin?: string | Ref<string>,
  referrerPolicy?: string | Ref<string>
) {
  const image = ref<HTMLImageElement | null>(null);
  const status = ref<"loading" | "loaded" | "error">("loading");

  const load = (
    newUrl: string,
    newCrossorigin?: string,
    newReferrerPolicy?: string
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

  // Watch for changes in url, crossorigin, and referrerPolicy
  watch(
    [
      typeof url === 'string' ? ref(url) : url,
      crossorigin ? (typeof crossorigin === 'string' ? ref(crossorigin) : crossorigin) : ref(undefined),
      referrerPolicy ? (typeof referrerPolicy === 'string' ? ref(referrerPolicy) : referrerPolicy) : ref(undefined)
    ],
    ([newUrl, newCrossorigin, newReferrerPolicy]) => {
      if (newUrl) {
        load(
          newUrl,
          newCrossorigin,
          newReferrerPolicy
        );
      }
    },
    { immediate: true }
  );

  return [image, status] as const;
}
