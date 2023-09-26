interface QueryOptions {
    encode?: boolean;
  }
  
  interface QueryData {
    [key: string]: string | number | boolean | string[] | number[] | boolean[];
  }
  
  export const querystring = {
    parse: (string = ''): QueryData => {
      if (typeof string !== 'string') return {};
      const matches = /\?(.+)$/ig.exec(string);
      const str = matches ? matches[1] : string;
      return str
        .split('&')
        .reduce((acc: QueryData, item) => {
          const param = item.split('=');
          if (param[1]) {
            acc[param[0]] = decodeURIComponent(param[1]) as string;
          }
          return acc;
        }, {});
    },
  
    create: (data: QueryData = {}, opts?: QueryOptions): string => {
      if (typeof data !== 'object' || data === null) return '';
      let options = { encode: true, ...opts };
      return Object.keys(data).reduce((acc: string[], item) => {
        const type = typeof data[item];
        if (type === 'string' || type === 'number' || type === 'boolean') {
          acc.push(item + '=' + (options.encode ? encodeURIComponent(data[item] as string) : data[item]));
        }
        if (Array.isArray(data[item])) {
          (data[item] as (string | number | boolean)[]).forEach(value => {
            acc.push(item + '[]=' + (options.encode ? encodeURIComponent(value as string) : value));
          });
        }
        return acc;
      }, []).join('&');
    }
  };
  