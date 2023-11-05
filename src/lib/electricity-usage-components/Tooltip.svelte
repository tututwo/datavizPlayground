<script>
  export let tooltipContent, xAxisOffsetY;
  import { getContext } from "svelte";

  import { formatTimecode } from "./utility";
  const { xScale, yRange, padding } = getContext("LayerCake");

</script>

<text x={tooltipContent.xCoord +2} y={$yRange[1] - xAxisOffsetY}>
  {formatTimecode(tooltipContent.content)}
</text>
