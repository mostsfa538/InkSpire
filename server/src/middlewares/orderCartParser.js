// const parseCarts = (req, res, next) => {
//     try {
//         if (req.query.carts) {
//             req.query.carts = JSON.parse(req.query.carts);
//         }
//         next();
//     } catch (error) {
//         return res.status(400).json({ error: 'Invalid carts format, must be a valid JSON array.' });
//     }
// };
// module.exports = parseCarts