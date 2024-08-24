import ky from "ky";
import { getCrsf } from "./utils";
import { BASE_HEADERS, LOGIN_URL } from "./constants";

async function createApiInstance(): Promise<any> {
  const csrfToken = await getCrsf();
  return ky.extend({
    hooks: {
      beforeRequest: [
        (request) => {
          for (const [key, value] of Object.entries(BASE_HEADERS)) {
            request.headers.set(key, value);
          }

          if (csrfToken) {
            request.headers.set("x-csrftoken", csrfToken);
          }
        },
      ],
    },
  });
}

async function login(username: string, password: string) {
  const encPassword = `#PWD_INSTAGRAM_BROWSER:0:${new Date().getTime()}:${password}`;
  const loginParams = new URLSearchParams();
  loginParams.append("enc_password", encPassword);
  loginParams.append("username", username);
  loginParams.append("optIntoOneTap", "false");
  loginParams.append("queryParams", "{}");
  loginParams.append("trustedDeviceRecords", "{}");

  try {
    const api = await createApiInstance();
    const response = await api.post(LOGIN_URL, { body: loginParams });

    if (!response.ok) {
      throw new Error(`Login failed, status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error during login:", error);
  }
}
