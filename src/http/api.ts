
// Auth Service

import { Credentials } from "../types";
import api from "./client";

export const AUTH_SERVICE = '/api/auth';
// const CATALOG_SERVICE = '/api/catalog';
// const ORDER_SERVICE = '/api/order';

export const login = (credentials: Credentials) => api.post('/auth/login', credentials);
export const self = () => api.get(`/auth/self`);