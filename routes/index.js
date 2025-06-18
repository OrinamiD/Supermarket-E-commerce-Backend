const authRoutes = require("./authRoutes");

const categoryRoutes = require("./categoryRoutes");

const productRoutes = require("./productRoutes")

const orderRoutes = require("./orderRoutes")



const routes = [
  authRoutes,
  categoryRoutes,
  productRoutes,
  orderRoutes
  
];

module.exports = routes;
