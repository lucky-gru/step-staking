export function shrinkAddress(address: string, onlyFirst?: boolean) {
  if (onlyFirst) {
    return address.slice(0, 4);
  }
  return `${address.slice(0, 4)}...${address.slice(address.length - 5)}`;
}

export const getTimeAgoFromNowString = (date: Date) => {
  const now = new Date();
  const givenDate = new Date(date);
  const seconds = Math.floor((now.getTime() - givenDate.getTime()) / 1000);

  // Define time units in seconds
  const intervals: { [key: string]: number } = {
    year: 31536000, // 365 * 24 * 60 * 60
    month: 2592000, // 30 * 24 * 60 * 60
    day: 86400, // 24 * 60 * 60
    hour: 3600, // 60 * 60
    minute: 60,
    second: 1,
  };

  for (const unit in intervals) {
    const interval = Math.floor(seconds / intervals[unit]);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
};

export const delayTime = async (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, time);
  });
};

export const delayFunctionCall = <P, R>(
  time: number,
  callback: (params: P) => Promise<R>,
): ((params: P) => Promise<R>) => {
  let lastRequestedTime = 0;

  return async (params: P): Promise<R> => {
    if (Date.now() - lastRequestedTime < time) {
      await delayTime(time);
    }

    const result = await callback(params);

    lastRequestedTime = Date.now();

    return result;
  };
};
