import ky from "ky";

export const getCrsf = async (): Promise<string | null> => {
  try {
    const response = await ky.get("https://www.instagram.com/accounts/login/");

    if (!response.ok) {
      throw new Error(
        `Failed to get a reponse from instagram : ${response.status}`
      );
    }

    const cookies = response.headers.get("set-cookie");
    if (cookies) {
      const csrfCookie = cookies
        .split(";")
        .find((cookie) => cookie.startsWith("csrftoken="));
      if (csrfCookie) {
        return csrfCookie.split("=")[1];
      }
    }
    return null;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    return null;
  }
};
