export function parseQueryParams<T extends Record<string, any>>(query: string): Partial<T> {
    return query
      .substring(1)
      .split('&')
      .map((pair) => pair.split('=').map(decodeURIComponent))
      .filter(([, value]) => value)
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as any);
  }
  
  export function stringifyQueryParams(params: Record<string, any>): string {
    return `?${Object.entries(params)
      .filter((component) => component)
      .map((components) => components.map(encodeURIComponent).join('='))
      .join('&')}`;
  }
  