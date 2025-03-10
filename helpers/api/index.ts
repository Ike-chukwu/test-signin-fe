// import { getCookie } from "cookies-next";
// import { pickBy } from "lodash";
// import { toast } from "sonner";

// import { USER_TOKEN_KEY } from "@/constants";
// import { UserService } from "@/services/user";

// export class Api {
//   private static headers = {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   };

//   static async get<T extends Record<string, any> | string>(
//     endpoint: string,
//     config?: { query?: Record<string, any>; headers?: Record<string, any> },
//     signal?: AbortSignal,
//   ) {
//     const url = new URL(endpoint);

//     url.search = new URLSearchParams(
//       pickBy(config?.query, (value) => !!value && value !== "all"),
//     ).toString();

//     let response = await fetch(url, {
//       method: "GET",
//       headers: {
//         ...this.headers,
//         Authorization: `Bearer ${getCookie(USER_TOKEN_KEY)?.toString()}`,
//         ...config?.headers,
//       },
//       signal: signal,
//     });

//     if (response.status === 401) {
//       const newToken = await UserService.reAuthenticate();

//       if (newToken) {
//         response = await fetch(url, {
//           method: "GET",
//           headers: {
//             ...this.headers,
//             ...config?.headers,
//             Authorization: `Bearer ${newToken}`,
//           },
//         });
//       }
//     }

//     if (response.status !== 200) {
//       const data = (await response.json()) as any;

//       toast.error(data?.errors[0]?.errorMessages || data?.statusText);
//       throw data.message;
//     }

//     return (await response.json()) as unknown as T;
//   }

//   static async post<T extends Record<string, any> | string>(
//     endpoint: string,
//     config?: {
//       query?: Record<string, any>;
//       headers?: Record<string, any>;
//       body?: Record<string, any>;
//     },
//   ) {
//     return this.mutate<T>(endpoint, "POST", config);
//   }

//   static async put<T extends Record<string, any> | string>(
//     endpoint: string,
//     config?: {
//       query?: Record<string, any>;
//       headers?: Record<string, any>;
//       body?: Record<string, any>;
//     },
//   ) {
//     return this.mutate<T>(endpoint, "PUT", config);
//   }

//   static async patch<T extends Record<string, any> | string>(
//     endpoint: string,
//     config?: {
//       query?: Record<string, any>;
//       headers?: Record<string, any>;
//       body?: Record<string, any>;
//     },
//   ) {
//     return this.mutate<T>(endpoint, "PATCH", config);
//   }

//   static async delete<T extends Record<string, any> | string>(
//     endpoint: string,
//     config?: {
//       query?: Record<string, any>;
//       headers?: Record<string, any>;
//     },
//   ) {
//     return this.mutate<T>(endpoint, "DELETE", config);
//   }

//   private static async mutate<T extends Record<string, any> | string>(
//     endpoint: string,
//     method: "PUT" | "POST" | "DELETE" | "PATCH",
//     config?: {
//       query?: Record<string, any>;
//       headers?: Record<string, any>;
//       body?: Record<string, any>;
//     },
//   ) {
//     const url = new URL(endpoint);

//     url.search = new URLSearchParams(
//       pickBy(config?.query, (value) => value !== null && value !== undefined),
//     ).toString();

//     let response = await fetch(url, {
//       method: method,
//       headers: {
//         ...this.headers,
//         Authorization: `Bearer ${getCookie(USER_TOKEN_KEY)?.toString()}`,
//         ...config?.headers,
//       },
//       body: JSON.stringify(config?.body),
//     });

//     if (response.status === 401) {
//       const newToken = await UserService.reAuthenticate();

//       if (newToken) {
//         response = await fetch(endpoint, {
//           method: "POST",
//           headers: {
//             ...this.headers,
//             ...config?.headers,
//             Authorization: `Bearer ${newToken}`,
//           },
//           body: JSON.stringify(config?.body),
//         });
//       }

//       if (!response.ok) {
//         window.location.href = "/login";
//       }
//     }

//     if (!response.ok) {
//       throw await response.json();
//     }

//     const contentType = response.headers.get("content-type");

//     if (contentType && contentType.includes("application/text")) {
//       return await response.text();
//     }

//     try {
//       const contentType = response.headers.get("content-type");

//       if (contentType && contentType.includes("application/json")) {
//         return (await response.json()) as unknown as T;
//       }
//     } catch (e) {}

//     return true;
//   }
// }
