'use client';

import  ContentGrowthChart from "../_components/BarChart";


export default function BarChartPage(){
    return(
<div
style={{
   
    display:"flex",
    justifyContent:"center",
    flexDirection:"column",
    alignItems:"center"

}}
>
      <h1>30-Day Activity Summary</h1>


        
    <div style={{ margin: "0 auto", display: "block" }}>
        <ContentGrowthChart />
    </div>



    </div>    );
}