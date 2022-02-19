const Express = require('express');
const app = Express();
require('dotenv').config({ path: 'config/.env' });

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
