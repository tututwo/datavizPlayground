<script>
  export let ticks,
    xAxisOffsetY,
    tooltipToXAxisText,
    hideTooltip,
    tickNumber = 20;

  import { getContext, tick } from "svelte";
  import { fade } from "svelte/transition";
  import { formatSeconds } from "../utility";
  const { xScale, yRange, zDomain, zScale, padding, width, height } =
    getContext("LayerCake");

  $: console.log();
</script>

<g>
  {#each ticks as tick}
    {@const isCloseToTooltip = Math.abs(tooltipToXAxisText - tick) < 10000}
    {@const shouldShowText = hideTooltip || !isCloseToTooltip}
    <g transform={`translate(${$xScale(tick)},${-xAxisOffsetY})`}>
      <line y2="-25" x2="0" x1="0" y1="0" stroke="#ccc" />
      {#if shouldShowText}
        <text x="12" y="-7" class="font-mono">{formatSeconds(tick)} </text>
      {/if}
    </g>
  {/each}

  {#each $xScale.ticks(tickNumber) as tick}
    <g transform={`translate(${$xScale(tick)},0)`}>
      <line y2="-10" x2="0" x1="0" y1="0" stroke="#ccc" />
    </g>
  {/each}
</g>
