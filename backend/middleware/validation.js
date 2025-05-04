export const validateUser = (req, res, next) => {
    const { username, password, profession, companyName } = req.body;
  
    if (username && !/^[^\s]{4,20}$/.test(username)) {
      return res.status(400).json({ error: 'Invalid username format' });
    }
  
    if (password && !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(password)) {
      return res.status(400).json({ error: 'Invalid password format' });
    }
  
    if (profession === 'Entrepreneur' && !companyName) {
      return res.status(400).json({ error: 'Company name is required for entrepreneurs' });
    }
  
    next();
  };