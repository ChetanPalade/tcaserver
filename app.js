const express = require('express');
const cors = require('cors');
const checklistRoutes = require('./routes/checklistRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// API Route
app.use('/api/checklist', checklistRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
