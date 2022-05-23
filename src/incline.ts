/**
 * Returns inclined word
 * @param count
 * @param ifOneString
 * @param ifTwoString
 * @param ifFiveString
 */
 export function incline(
    count: number,
    ifOneString: string,
    ifTwoString: string,
    ifFiveString: string,
  ) {
    let tempNumber = Math.abs(count) % 100;
  
    if (tempNumber >= 5 && tempNumber <= 20) {
      return ifFiveString;
    }
    tempNumber %= 10;
    if (tempNumber === 1) {
      return ifOneString;
    }
    if (tempNumber >= 2 && tempNumber <= 4) {
      return ifTwoString;
    }
  
    return ifFiveString;
  }
  