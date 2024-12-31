const allowCors = (fn) => async (req, res) => {
    // Get the 'Origin' from the request header dynamically
    const allowedOrigin = req.headers.origin;
  
    // Allow all origins dynamically based on the request's origin
    // You can also limit this to certain domains if needed
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  
    // Handle preflight request (OPTIONS method)
    if (req.method === 'OPTIONS') {
      res.status(200).end(); // Respond to preflight requests
      return;
    }
  
    // Pass control to the actual API handler
    return await fn(req, res);
  };
  
  module.exports = allowCors;
  