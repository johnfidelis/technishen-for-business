import { GET_ENDPOINTS } from "@/constants/endpoints";

export const buildEndpoint = (endpointKey, params = {}) => {
    const endpoint = GET_ENDPOINTS[endpointKey];
    if (!endpoint) return '';
    const queryString = new URLSearchParams(params).toString();
    return `${endpoint}?${queryString}`;
  };