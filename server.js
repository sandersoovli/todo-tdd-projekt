const app = require('./app');

const PORT = 3015;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
