require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`EduFlow Ai API is running on port ${PORT}`);
  console.log(`-> http://localhost:${PORT}`);
  console.log(`-> http://localhost:${PORT}/health`);
});