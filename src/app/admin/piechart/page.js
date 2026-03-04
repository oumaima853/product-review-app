'use client';

import PieChart from "../_components/PieChart";

export default function PieChartPage(){
    return(
<div

style={{
   
    display:"flex",
    justifyContent:"center",
    flexDirection:"column",
    alignItems:"center"

}}

>
      <h1>Content Type Distribution</h1>

       <div style={{ margin: "0 auto", display: "block" }}>

         <PieChart /> 

       </div>
     
    </div>    );
}