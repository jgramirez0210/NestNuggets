// ./pages/api/report.js
const { createReport } = require('../../api/reportData');

export default async function handler(req, res) {
  const payload = req.body;

  try {
    await createReport(payload);
    res.status(200).json({ message: 'Report created' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
}
fetch('/api/report', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    // your report data
  }),
});
