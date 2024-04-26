import React from "react";

const FormattedDate = ({ datetimeString }) => {
  // Parse the datetime string
  const dateTime = new Date(datetimeString);

  // Extract the date and time components
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const amOrPm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert to 12-hour format
  const formattedMinutes = String(minutes).padStart(2, "0"); // Ensure minutes are two digits
  const day = dateTime.getDate();
  const month = dateTime.toLocaleString("default", { month: "short" });
  const year = dateTime.getFullYear();

  // Construct the formatted datetime string
  const formattedDateTime = `${formattedHours}:${formattedMinutes} ${amOrPm} - ${day} ${month}, ${year}`;

  return <span>{formattedDateTime}</span>;
};

export default FormattedDate;
