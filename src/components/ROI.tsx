import React from 'react'
export function ROI({ capex, savingsPerYear }:{ capex: number; savingsPerYear: number }){
  const roiYears = capex / Math.max(1, savingsPerYear)
  return <p className="font-semibold">ROI = {roiYears.toFixed(1)} Jahre = {roiYears.toFixed(1)} A</p>
}
