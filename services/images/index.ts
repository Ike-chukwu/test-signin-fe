// import { Api } from "@/helpers/api";

export type ResponseError = {
  key: string;
  errorMessages: string[];
};

export type ApiResponse<T> = {
  status: number;
  statusText: string;
  data: T;
  errors: ResponseError[];
};

export class ImageService {
  public static async uploadImages(files: FormData) {
    return 
  }
}
