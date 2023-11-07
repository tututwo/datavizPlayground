<script>
  export let tooltipContent, xAxisOffsetY;
  import { getContext } from "svelte";

  import { formatTimecode } from "./utility";
  const { xScale, yRange, padding } = getContext("LayerCake");

</script>

<text x={tooltipContent.xCoord +2} y={$yRange[1] - xAxisOffsetY*2} class="font-mono">
  {formatTimecode(tooltipContent.content)}
</text>
