export const setCache = (key: string, data: any, expirationMs: number = 86400000) => { 
    const expiryTime = Date.now() + expirationMs;
    const cacheItem = {
      data,
      expiryTime,
    };
    localStorage.setItem(key, JSON.stringify(cacheItem));
  };
  
  export const getCache = (key: string) => {
    const cacheItemStr = localStorage.getItem(key);
    if (!cacheItemStr) return null;
  
    const cacheItem = JSON.parse(cacheItemStr);
    if (Date.now() > cacheItem.expiryTime) {
      localStorage.removeItem(key);
      return null;
    }
    return cacheItem.data;
  };
  
  export const clearCache = (key: string) => {
    localStorage.removeItem(key);
  };
  