// useApi.ts

import { ref } from "vue";
import type { Account, Class, ClassRegistration } from "../interfaces/useApi";

const baseUrl = "https://rp-api.raspi0124.dev";
export function useApi() {
  // token are located inside cookie, as auth._token.auth0
  const token = ref<string | null>(null);

  // Retrieve token from cookie
  const cookieToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("auth._token.auth0="));

  if (cookieToken) {
    token.value = cookieToken.split("=")[1];
    token.value = token.value.split("Bearer%20")[1];
  }

  const request = async (
    url: string,
    options: RequestInit = {}
  ): Promise<any> => {
    if (!token.value) {
      throw new Error("No authentication token found");
    }

    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token.value}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(baseUrl + url, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error making request");
    }

    return {
      status: response.status,
      data: await response.json(),
    };
  };

  const createAccount = async (
    phone_number: number | null
  ): Promise<{ message: string }> => {
    const url = "/api/accounts";
    const options = {
      method: "POST",
      body: JSON.stringify({ phone_number }),
    };
    return request(url, options);
  };

  const getAccount = async (user_id: string): Promise<Account> => {
    console.log("user_id", user_id);
    const url = `/api/accounts/${user_id}`;
    return request(url);
  };

  const updateAccount = async (
    user_id: string,
    phone_number: string
  ): Promise<{ message: string }> => {
    console.log("user_id", user_id);
    const url = `/api/accounts/${user_id}`;
    const options = {
      method: "PUT",
      body: JSON.stringify({ phone_number }),
    };
    return request(url, options);
  };

  const listClasses = async (searchWords: string = ""): Promise<Class[]> => {
    const url = `/api/classes?search=${encodeURIComponent(searchWords)}`;
    return request(url);
  };

  const createClass = async (
    classData: Class
  ): Promise<{ message: string }> => {
    const url = "/api/classes";
    const options = {
      method: "POST",
      body: JSON.stringify(classData),
    };
    return request(url, options);
  };

  const getClass = async (class_id: string): Promise<Class> => {
    const url = `/api/classes/${class_id}`;
    return request(url);
  };

  const updateClass = async (
    class_id: string,
    classData: Partial<Class>
  ): Promise<{ message: string }> => {
    const url = `/api/classes/${class_id}`;
    const options = {
      method: "PUT",
      body: JSON.stringify(classData),
    };
    return request(url, options);
  };

  const deleteClass = async (
    class_id: string
  ): Promise<{ message: string }> => {
    const url = `/api/classes/${class_id}`;
    const options = {
      method: "DELETE",
    };
    return request(url, options);
  };

  const listClassRegistrations = async (): Promise<ClassRegistration[]> => {
    const url = `/api/class_registrations`;
    return request(url);
  };

  const registerClass = async (
    class_id: string,
    absences: number = 0
  ): Promise<{ message: string }> => {
    const url = `/api/class_registrations`;
    const options = {
      method: "POST",
      body: JSON.stringify({ class_id, absences }),
    };
    return request(url, options);
  };

  const updateRegisteredClass = async (
    user_id: string,
    class_id: string,
    absences: number
  ): Promise<{ message: string }> => {
    const url = `/api/class_registrations/${user_id}/${class_id}`;
    const options = {
      method: "PUT",
      body: JSON.stringify({ absences }),
    };
    return request(url, options);
  };

  const unregisterClass = async (
    user_id: string,
    class_id: string
  ): Promise<{ message: string }> => {
    const url = `/api/class_registrations/${user_id}/${class_id}`;
    const options = {
      method: "DELETE",
    };
    return request(url, options);
  };
  const callme = async (): Promise<{ message: string }> => {
    const url = "/api/callme";
    return request(url);
  };

  return {
    callme,
    createAccount,
    getAccount,
    updateAccount,
    listClasses,
    createClass,
    getClass,
    updateClass,
    deleteClass,
    listClassRegistrations,
    updateRegisteredClass,
    registerClass,
    unregisterClass,
  };
}
