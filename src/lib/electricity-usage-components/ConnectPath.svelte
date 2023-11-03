<script>
  export let stroke = "#ccc";
  import { getContext } from "svelte";

  import * as d3 from "d3";
  const { data, xGet, yGet, zGet, xScale, yScale, zScale, height } =
    getContext("LayerCake");
  
  $: path = d3.line().x($xGet).y($yGet).curve(d3.curveStepBefore);
</script>

<path
  d={path($data.filter( d => d.appliance !== "Mac studio" ))}
  {stroke}
  stroke-width="2"
  fill="none"
  stroke-linecap="round"
  stroke-linejoin="round"
/>
