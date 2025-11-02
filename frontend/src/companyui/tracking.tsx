"use client";

import React, { Suspense } from "react";
import TrackingDashBoardContent from "../app/component/TrackingDasboard";

export default function TrackingDashBoard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TrackingDashBoardContent />
    </Suspense>
  );
}
