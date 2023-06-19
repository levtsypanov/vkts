export type debounceType = {
    func: Function;
    wait: number
    immediate?: boolean
}

export function debounce({ func, wait, immediate }: debounceType) {
    let timeout: NodeJS.Timeout | null, 
        args: IArguments | null, 
        context: any, 
        timestamp: number, 
        result: any;
    if (null == wait) wait = 100;
  
    function later() {
      const last = Date.now() - timestamp;
    
      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          context = args = null;
        }
      }
    }
  
    const debounced: any = function (this: any) {
      context = this;
      args = arguments;
      timestamp = Date.now();
      const callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }
  
      return result;
    };
  
    debounced.clear = function () {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
    };
  
    debounced.flush = function () {
      if (timeout) {
        result = func.apply(context, args);
        context = args = null;
  
        clearTimeout(timeout);
        timeout = null;
      }
    };
  
    return debounced;
  }
