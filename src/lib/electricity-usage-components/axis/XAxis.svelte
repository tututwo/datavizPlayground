<script>
  import { getContext } from "svelte";
  import { fade } from "svelte/transition";
  import { formatSeconds } from "../utility";
  const { xScale, yRange, zDomain, zScale, padding, width, height } =
    getContext("LayerCake");
  export let ticks, xAxisOffsetY, tooltipToXAxisText;
</script>

<g>
  {#each ticks as tick}
    {@const showText =
      Math.abs(tooltipToXAxisText - tick) < 10000 ? false : true}
    {#if showText}
      <text
        in:fade={{ duration: 250 }}
        out:fade={{ duration: 250 }}
        x={$xScale(tick)}
        y={-xAxisOffsetY}
        >{formatSeconds(tick)}
      </text>
    {/if}
  {/each}
</g>
