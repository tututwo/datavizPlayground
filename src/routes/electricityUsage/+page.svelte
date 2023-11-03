<script>
  // @ts-nocheck

  import { Html, LayerCake, Svg } from "layercake";

  import * as d3 from "d3";

  import ConnectPath from "$lib/electricity-usage-components/ConnectPath.svelte";
  import TimeBar from "$lib/electricity-usage-components/TimeBar.svelte";
  import YAxis from "$lib/electricity-usage-components/axis/YAxis.svelte";
  import Tooltip from "$lib/electricity-usage-components/Tooltip.svelte";

  import dataJSON from "$lib/electricity-usage-components/dataset.json";
  /**
   * @property {string} intro
   * @type {Object} data
   *  @property {number} data.movie_length_ms
   *  @property {Array} data.trailer.shots
   */

  let data;

  if (dataJSON) {
    dataJSON.data.forEach((d) => {
      // convert to milliseconds
      d.length_ms = +d.length_ms * 60000;
      d.start_ms = new Date(d.start_ms);
    });

    data = dataJSON.data.sort((a, b) => {
      // Convert the 'start_ms' properties to Date objects for comparison
      const dateA = new Date(a.start_ms);
      const dateB = new Date(b.start_ms);

      // Compare the Date objects
      return dateA - dateB;
    });
  }

  console.log(data.map((d) => d.appliance));
  const startDate = new Date("2023-11-03T08:30:00.000Z");
  const endDate = new Date("2023-11-04T08:30:00.000Z");

  let barHeight = 20;

  let rectHeightExpansion = 1.75;

  let tooltipXCoord;
  let hideTooltip = true;
</script>

<figure class="w-full h-2/3 my-10">
  {#if data}
    <LayerCake
      x="start_ms"
      xScale={d3.scaleTime()}
      xDomain={[startDate, endDate]}
      y="appliance"
      yScale={d3.scaleBand()}
      yDomain={data.map((d) => d.appliance)}
      z="appliance"
      zScale={d3.scaleOrdinal()}
      zDomain={data.map((d) => d.appliance)}
      zRange={[
        "#fd9226",
        "#fa7c36",
        "#f26843",
        "#e7554e",
        "#d94359",
        "#c93264",
        "#b7216e",
        "#ffdac4",
        "#ffb3a7",
        "#fb8a8c",
        "#eb6574",
        "#d5405e",
        "#b81b4a",
        "#93003a",
      ]}
      padding={{ top: 8, right: 10, bottom: 20, left: 160 }}
      {data}
    >
      <Svg>
        <YAxis {rectHeightExpansion} />
        <ConnectPath />

        <TimeBar
          {barHeight}
          {rectHeightExpansion}
          on:mousemove={(event) => {
            tooltipXCoord = event.detail.props;
          }}
          on:mouseout={() => (hideTooltip = true)}
        />

        {#if hideTooltip !== true}
          <Tooltip {evt} let:detail />
        {/if}
      </Svg>
    </LayerCake>
  {/if}
</figure>
