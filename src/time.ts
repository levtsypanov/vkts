export const addLeadingZero = (number: number): string => {
    return number < 10 ? `0${number}` : String(number);
  };
  
  interface TimeComponents {
    hours: string;
    mins: string;
    secs: string;
  }
  
  export const seconds2components = (seconds: number): TimeComponents => {
    let hours: any = addLeadingZero(Math.floor(seconds / 3600));
    let mins: any = addLeadingZero(Math.floor((seconds - hours * 3600) / 60));
    let secs: any = addLeadingZero(seconds - hours * 3600 - mins * 60);
  
    return {
      hours,
      mins,
      secs,
    };
  };
  
  export const formatSeconds = (seconds: number): string => {
    const { hours, mins, secs } = seconds2components(seconds);
    return `${hours}:${mins}:${secs}`;
  };
