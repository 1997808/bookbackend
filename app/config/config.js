module.exports = {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * That long string from mlab
   */
  // databaseURL: process.env.MONGODB_URI,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET,
  // jwtAlgorithm: process.env.JWT_ALGO,
};
