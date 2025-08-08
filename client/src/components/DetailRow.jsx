import React from 'react';

const DetailRow = ({ label, value }) => (
  <div className="mb-2 flex">
    <div className="w-40 font-semibold">{label}</div>
    <div className="w-5 font-semibold">:</div>
    <div>{value || "-"}</div>
  </div>
);

export default DetailRow;
