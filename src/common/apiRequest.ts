export let requestConfig: { apiVersion?: string, langId?: number | string, apiUrl?: string, access_token?: string } = {};

async function apiRequest(apiMethod: string, requestData: object = {}) {
  const queryParams: string[] = [];
  // Добавление параметра access_token
  if (requestConfig.access_token) {
    queryParams.push(`access_token=${requestConfig.access_token}`);
  }
  // Добавление параметра langId
  if (requestConfig.langId) {
    queryParams.push(`langId=${requestConfig.langId}`);
  }
  // Добавление параметра apiVersion
  if (requestConfig.apiVersion) {
    queryParams.push(`v=${requestConfig.apiVersion}`);
  }
  // Добавление дополнительных параметров из requestData
  Object.entries(requestData).forEach(([key, value]) => {
    queryParams.push(`${key}=${encodeURIComponent(value)}`);
  });

  const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
  const url = `${requestConfig.apiUrl}/method/${apiMethod}${queryString}`;

  const response = await fetch(url);
  const json = await response.json();
  return json;
}

export { apiRequest };
