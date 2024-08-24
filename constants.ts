export const BASE_URL = "https://i.instagram.com/api/v1/";
export const LOGIN_URL = `${BASE_URL}web/accounts/login/ajax/`;
export const WEB_USER_AGENT = "Mozilla/5.0";

export const BASE_HEADERS: Record<string, string> = {
  authority: "www.instagram.com",
  accept: "application/json",
  origin: "https://www.instagram.com",
  "user-agent": WEB_USER_AGENT,
  "content-type": "application/x-www-form-urlencoded",
  referer: "https://www.instagram.com/",
};
