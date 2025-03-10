import { useMutation } from "@tanstack/react-query";

import { ImageService } from "../services/images";

export const useUploadImages = () => {
  const { mutate, isPending, data } = useMutation({
    mutationKey: ["upload-images"],
    mutationFn: (variables: FormData) => ImageService.uploadImages(variables),
  });

  return {
    mutate,
    isPending,
  };
};
