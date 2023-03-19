import { axios } from '@/api/axios';

const TOKEN = 'accessToken'

export async function signIn () {
  const { token } = (await axios.get<{ token: string }>('/auth/anonymous?platform=subscriptions')).data;
  return token;
}

export function setLocalAccessToken (token: string) {
  return window.localStorage.setItem(TOKEN, token);
}

export function getLocalAccessToken () {
  return window.localStorage.getItem(TOKEN);
}
