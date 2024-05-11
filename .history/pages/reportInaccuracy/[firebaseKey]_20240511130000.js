import { useState } from 'react';
import ReportInaccuracyForm from '../../components/forms/reportInaccuracyForm.js';

const ShowReportInaccuracyForm = () => {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  return (
    <div>
      {/* Other components and elements */}
      <button type="button" onClick={handleButtonClick}>Report Inaccuracy</button>
      {showForm && <ReportInaccuracyForm />}
      {/* Other components and elements */}
    </div>
  );
};

export default ShowReportInaccuracyForm;
