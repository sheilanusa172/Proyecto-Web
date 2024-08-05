
// export const authorizeRoles = (allowedRoles) => {
//     return (req, res, next) => {
//         const userRole = req.user.rol; 

//         if (allowedRoles.includes(userRole)) {
//             next();
//         } else {
//             res.status(403).json({ message: 'Forbidden: Insufficient privileges' });
//         }
//     };
// }

// export const authorizeRoles = (...allowedRoles) => {
//     return (req, res, next) => {
//         if (!req.user || !allowedRoles.includes(req.user.rol)) {
//             return res.status(403).json({ message: 'Accion Bloqueada: No cuenta con los permisos suficientes' });
//         }
//         next();
//     };
// };

export const authorizeRoles = (allowedRoles) => {
    return (req, res, next) => {
      console.log('User role:', req.user.rol); // Verifica el rol del usuario
      if (!req.user || !allowedRoles.includes(req.user.rol)) {
        return res.status(403).json({ message: 'Accion Bloqueada: No cuenta con los permisos suficientes' });
      }
      next();
    };
  };
  