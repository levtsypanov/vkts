import React from 'react';

// Перенос предлогов
export const fixTypography = (string: string, wordLength: number = 3): string | undefined => {
    if (!string) return;
    let strSplit: any = string.split(" "); // разбиваем строку на массив
    strSplit = strSplit.map((str: string) => (str.length <= wordLength ? str + "\u00A0" : str + " ")); // если слово 3 символа, вставляем символ пробела
    strSplit = strSplit.join(""); // возвращаем обратно массив в строку
    return strSplit;
  };

interface TypoProps {
  children: React.ReactNode;
}

export function Typo({ children }: TypoProps): React.ReactNode {
  if (typeof children !== 'string') {
    return children;
  }
  return fixTypography(children as string);
}

// pluralize(21, ['пользователь', 'пользователя', 'пользователей'])
export function pluralize(number: number, titles: string[]) {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
}
