const rbacPolicy = (actionRoles) => (req, res, next) => {
    const userRoles = req.egContext.user && req.egContext.user.userType;
  
    if (userRoles && userRoles.some(role => actionRoles.includes(role))) {
      next(); 
    } else {
      res.status(403).json({ message: "Unauthorized" });
    }
  };