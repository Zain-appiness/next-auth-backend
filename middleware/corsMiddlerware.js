const allowCors = (fn) => async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://next-auth-frontend-olv3-c6l6skcsk-zain-appiness-projects.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
    if (req.method === 'OPTIONS') {
      res.status(200).end(); // Respond to preflight requests
      return;
    }
  
    return await fn(req, res);
  };
  
  module.exports = allowCors;
  