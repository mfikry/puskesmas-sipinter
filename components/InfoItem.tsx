import React from "react";

type InfoItemProps = {
  label: string;
  value: string;
};

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
  <div>
    <p className="text-gray-500">{label}</p>
    <p className="text-gray-800">{value}</p>
  </div>
);

export default InfoItem;
