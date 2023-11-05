<script>
  export let barHeight = 8;
  export let strokeWidth = 3;
  export let gapBetweenBars = 2;
  export let lowerLimitOfBarWidth = 1;
  export let rectHeightExpansion = 1;
  import { getContext, createEventDispatcher } from "svelte";

  const { data, xGet, yGet, zGet, xScale, zScale, height } =
    getContext("LayerCake");
  /**
   * @type {number | null}
   * @type {boolean}
   */
  let showTooltip,
    highlighted = false; // This will hold the index of the hovered bar
  const dispatch = createEventDispatcher();
  function showTooltipRect(event, index) {
    showTooltip = index;
  }

  function handleMousemove(e, barData) {
    if (e.layerX !== 0 && e.layerY !== 0) {
      dispatch("mousemove", {
        e,
        props: {
          content: barData.start_ms,
          xCoord: $xGet(barData) - strokeWidth / 2,
        },
      });
    }
  }
</script>

{#each $data as bar, index}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- on:mouseout={() => (showTooltip = null)} -->
  <g
    on:mouseover={(event) => showTooltipRect(event, index)}
    on:mousemove={(e) => handleMousemove(e, bar)}
    on:mouseout={(e) => dispatch("mouseout")}
    on:focus={(event) => showTooltipRect(event, index)}
    on:blur={() => (showTooltip = null)}
  >
    <!-- Conditionally render the tooltip rect -->
    <rect
      class="hover-to-show-tooltip"
      width={$xScale(bar.length_ms) + strokeWidth}
      height={$height * rectHeightExpansion}
      x={$xGet(bar) - strokeWidth / 2}
      y="1"
      fill="#D9D4D9"
    />
    <!-- -2 means controls the gap between bars -->
    <!--! we are setting the lower limit of width here -->
    <rect
      width={Math.max(
        $xScale(bar.length_ms) - gapBetweenBars,
        lowerLimitOfBarWidth
      )}
      height={barHeight}
      x={$xGet(bar)}
      y={$yGet(bar) - barHeight / 2}
      fill={bar.match_ms ? $zGet(bar) : $zScale(0)}
      rx="2.5"
      class:highlighted={showTooltip === index}
      style={`stroke-width: ${strokeWidth}px;`}
    />
  </g>
{/each}

<style>
  g:hover .hover-to-show-tooltip {
    opacity: 0.5;
  }
  .hover-to-show-tooltip {
    opacity: 0;
    transition: opacity 0.2s;
  }
  .highlighted {
    stroke: black;
  }
</style>
