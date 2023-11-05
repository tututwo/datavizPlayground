<script>
  import { getContext } from "svelte";
  import { fade } from "svelte/transition";
  import { formatSeconds } from "../utility";
  const { xScale, yRange, zDomain, zScale, padding, width, height } =
    getContext("LayerCake");
  export let ticks, xAxisOffsetY, tooltipToXAxisText, hideTooltip;
</script>

<g>
  {#each ticks as tick}
    {@const isCloseToTooltip = Math.abs(tooltipToXAxisText - tick) < 10000}
    {@const shouldShowText = hideTooltip || !isCloseToTooltip}
    {#if shouldShowText}
      <text
       
        x={$xScale(tick)}
        y={-xAxisOffsetY}
        >{formatSeconds(tick)}
      </text>
    {/if}
  {/each}
</g>
