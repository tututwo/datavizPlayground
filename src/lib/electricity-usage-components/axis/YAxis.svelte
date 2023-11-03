<script>
  import { getContext } from "svelte";

  const { xScale, yScale, yDomain, zDomain, zScale, padding, width, height } =
    getContext("LayerCake");

  export let rectHeightExpansion = 1;
</script>

<!-- x axis top-->
<line x1={-$padding.left} x2={$width} stroke="#A8A8A8" />
{#each $yDomain as section, index}
  <!-- Y axis sections -->
  <g transform="translate(0,{$yScale(section)})">
    <rect
      x={$xScale.range()[0]}
      y={0}
      width={Math.max($width, 200)}
      height={$yScale.bandwidth()}
      fill={$zScale(section)}
      opacity="0.2"
    />
    <line
      x1={-$padding.left}
      x2={$width}
      stroke="#aaa"
      stroke-dasharray="6,6"
      transform={`translate(0, ${
        ($height / $yDomain.length) * rectHeightExpansion
      })`}
    />
    <text
      font-weight="bold"
      font-size="1.2rem"
      text-anchor="end"
      transform={`translate(0, ${
        ($height / ($yDomain.length * 2)) * rectHeightExpansion
      })`}
      dx="-1em"
      fill={$zScale(section)}
    >
      {section}
    </text>
  </g>
{/each}
