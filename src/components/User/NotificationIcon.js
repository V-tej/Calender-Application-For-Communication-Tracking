// NotificationIcon.js


import React from "react";

export const NotificationIcon = ({ count }) => (
  <div>
    <span role="img" aria-label="notification">
      🔔
    </span>
    <span>{count > 0 ? count : null}</span>
  </div>
);

