module.exports = {
  host: (process.env.MYSQL_HOST || 'localhost'),
  user: (process.env.MYSQL_USER || 'root'),
  password: (process.env.MYSQL_PASS || 'root'),
  name: (process.env.MYSQL_NAME || 'cosfinex_market'),
  connectionLimit: (process.env.MYSQL_POOL_SIZE || 16)
}