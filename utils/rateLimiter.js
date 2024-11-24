const translationLimitData = { requests: 0, startTime: Date.now() }; 

const RATE_LIMIT_WINDOW_MS = 60 * 1000; 
const MAX_TRANSLATION_REQUESTS = 10; 

const checkTranslationLimit = () => {
  const now = Date.now();

 
  if (now - translationLimitData.startTime > RATE_LIMIT_WINDOW_MS) {
    translationLimitData.requests = 0;
    translationLimitData.startTime = now;
  }

  
  translationLimitData.requests += 1;
  if (translationLimitData.requests > MAX_TRANSLATION_REQUESTS) {
    throw new Error('Rate limit exceeded for translations');
  }
};

module.exports = { checkTranslationLimit };
