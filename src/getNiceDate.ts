export const getNiceDate = (unix: any, t: any, times?: boolean) => {
    const date = new Date(unix * 1000);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours();
    const min = date.getMinutes();
    const monthNames = [
        t('vkui_common_months_of.0'),
        t('vkui_common_months_of.1'),
        t('vkui_common_months_of.2'),
        t('vkui_common_months_of.3'),
        t('vkui_common_months_of.4'),
        t('vkui_common_months_of.5'),
        t('vkui_common_months_of.6'),
        t('vkui_common_months_of.7'),
        t('vkui_common_months_of.8'),
        t('vkui_common_months_of.9'),
        t('vkui_common_months_of.10'),
        t('vkui_common_months_of.11')
    ];
  
    return `${day} ${monthNames[month]} ${year} ${times ? `в ${hour}:${min}`: ''}`;
  };
  
  export function TimeConverter(unixtime: any, text?: any) {
    let date = new Date(unixtime * 1000);
    let read_time = '';
    if (unixtime) {
        read_time = date.getDate() + ".";
        read_time += (date.getMonth() < 10) ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        read_time += "." + date.getFullYear() + " " + date.getHours() + ":"
        read_time += (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes();
    } else {
        read_time = text;
    }
    return read_time
  };
  
  export const randomInteger = (min: any, max: any) => Math.floor(min + Math.random() * (max + 1 - min));
  