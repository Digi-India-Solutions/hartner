import rateLimit from "express-rate-limit";

// Helper to check if IP is localhost
const isLocalhost = (ip?: string): boolean => {
  return ip === "127.0.0.1" || ip === "::1" || ip === "::ffff:127.0.0.1";
};

// Apply to all requests
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later."
  },
  standardHeaders: true, // return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // disable `X-RateLimit-*` headers
  skip: (req) => isLocalhost(req.ip || req.socket.remoteAddress),
});

// Apply to all auth routes
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // only 5 requests per 15 mins
  message: {
    success: false,
    message: "Too many login attempts, please try again later."
  },
  skip: (req) => isLocalhost(req.ip || req.socket.remoteAddress),
});

