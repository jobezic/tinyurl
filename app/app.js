const Express = require('express');
const app = Express();
require('dotenv').config({ path: 'config/.env' });
const connectDB = require('../config/db');

connectDB();

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

app.use('/api', require('./routes/urls'));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
