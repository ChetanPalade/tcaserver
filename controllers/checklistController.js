const axios = require('axios');

// Function to fetch data from API and evaluate checklist rules
const evaluateChecklist = async (req, res) => {
  try {
    const applicationId = '67339ae56d5231c1a2c63639';
    const response = await axios.get(`http://qa-gb.api.dynamatix.com:3100/api/applications/getApplicationById/${applicationId}`);
    const data = response.data;

    // Define the checklist rules
    const rules = [
      { name: 'Valuation Fee Paid', passed: data.isValuationFeePaid },
      { name: 'UK Resident', passed: data.isUkResident },
      { name: 'Risk Rating Medium', passed: data.riskRating === 'Medium' },
      { name: 'LTV Below 60%', passed: (data.loanRequired / data.purchasePrice) * 100 < 60 }
    ];

    // Send the evaluation result
    res.json({ rules });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching data or evaluating checklist.' });
  }
};

module.exports = { evaluateChecklist };
