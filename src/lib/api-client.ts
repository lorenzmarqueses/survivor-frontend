type FetcherOptions = {
  url: string;
  body?: any;
  headers?: Record<string, string>;
};

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = {
  get: async <T>(url: string, headers: Record<string, string> = {}): Promise<T> => {
    const response = await fetch(`${baseURL}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });

    if (!response.ok) {
      throw new Error(await getErrorMessage(response));
    }
    return response.json();
  },

  post: async <T>(url: string, body: any, headers: Record<string, string> = {}): Promise<T> => {
    const response = await fetch(`${baseURL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(await getErrorMessage(response));
    }
    return response.json();
  },

  put: async <T>(url: string, body: any, headers: Record<string, string> = {}): Promise<T> => {
    const response = await fetch(`${baseURL}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(await getErrorMessage(response));
    }
    return response.json();
  },

  delete: async <T>(url: string, headers: Record<string, string> = {}): Promise<T> => {
    const response = await fetch(`${baseURL}${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });

    if (!response.ok) {
      throw new Error(await getErrorMessage(response));
    }
    return response.json();
  },
};

const getErrorMessage = async (response: Response): Promise<string> => {
  try {
    const error = await response.json();
    return error.message || "Something went wrong";
  } catch {
    return response.statusText || "Something went wrong";
  }
};
