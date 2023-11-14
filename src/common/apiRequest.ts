import { useState, useEffect } from 'react';

export let requestConfig: { apiVersion?: string, langId?: number | string, apiUrl?: string, access_token?: string } = {};

function useApiRequest(apiMethod: string, requestData: object = {} ) {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const buildUrl = () => {
    const queryParams: string[] = [];
    // Добавление параметра access_token
    if (requestConfig.access_token) {
      queryParams.push(`access_token=${requestConfig.access_token}`);
    }
    // Добавление параметра langId
    if (requestConfig.langId) {
      queryParams.push(`langId=${requestConfig.langId}`);
    }
    // Добавление дополнительных параметров из requestData
    Object.entries(requestData).forEach(([key, value]) => {
      queryParams.push(`${key}=${encodeURIComponent(value)}`);
    });

    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
    return `${requestConfig.apiUrl}/method/${apiMethod}${queryString}`;
  };

  async function fetchUrl() {
    const url = buildUrl();
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
    setLoading(false);
  }

  useEffect(() => {
    fetchUrl();
    console.clear();
  }, []);

  return [data, loading];
}

export { useApiRequest };
