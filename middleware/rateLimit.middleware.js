const rateLimitData = new Map(); 

const RATE_LIMIT_WINDOW_MS = 60 * 1000; 
const MAX_REQUESTS_PER_WINDOW = 10; 

const rateLimitMiddleware = (req, res, next) => {
  const ip = req.ip; 
  const now = Date.now();

  
  if (!rateLimitData.has(ip)) {
    rateLimitData.set(ip, { count: 1, startTime: now });
    return next();
  }

  const requestInfo = rateLimitData.get(ip);

  
  if (now - requestInfo.startTime > RATE_LIMIT_WINDOW_MS) {
    rateLimitData.set(ip, { count: 1, startTime: now });
    return next();
  }

  
  requestInfo.count += 1;

  
  if (requestInfo.count > MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      error: 'Has alcanzado el límite de traducciones por minuto. Por favor, espera antes de intentarlo de nuevo.',
    });
  }

  next(); 
};

module.exports = rateLimitMiddleware;
