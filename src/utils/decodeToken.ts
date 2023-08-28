/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt_decode from 'jwt-decode';
import * as dayjs from 'dayjs'

export const decodeToken = (): { [key: string]: any } | null => {
  const token = localStorage.getItem('token');
  if (token === null) return null;

  const decoded: { [key: string]: any } | null = jwt_decode(token);
  const expireDate = decoded?.exp;
  const momentDate = dayjs().unix();
  if (expireDate && expireDate < momentDate) {
    return null;
  }

  return decoded;
};