<script>
  // @ts-nocheck

  import { Html, LayerCake, Svg } from "layercake";
  import { onMount } from "svelte";
  import * as d3 from "d3";

  import ConnectPath from "$lib/electricity-usage-components/ConnectPath.svelte";
  import TimeBar from "$lib/electricity-usage-components/TimeBar.svelte";
  import YAxis from "$lib/electricity-usage-components/axis/YAxis.svelte";
  import Tooltip from "$lib/electricity-usage-components/Tooltip.svelte";

  /**
   * @property {string} intro
   * @type {Object} data
   *  @property {number} data.movie_length_ms
   *  @property {Array} data.trailer.shots
   */
  let data;
  onMount(async () => {
    const response = await fetch(
      "https://static01.nyt.com/newsgraphics/2013/01/04/movie-marker/b1a9c2fc1689fd89ecff4a7d2be5e5757716e344/movies.json"
    );
    const dataJSON = await response.json();

    data = dataJSON.filter(
      (/** @type {{ intro: string; }} */ d) =>
        d.intro ===
        "“Silver Linings Playbook” follows the standard model for trailers, according to <a href='http://www.billwoolery.com/'>Bill Woolery</a>, a trailer specialist in Los Angeles who once worked on trailers for movies like “The Usual Suspects” and “E.T. the Extra-Terrestrial.” While introducing the movie’s story and its characters, the trailer largely follows the order of the film itself."
    )[0];
    let firstButEndingDuration = data.trailer.trailer_length_ms;
    data.trailer?.shots.reverse().forEach((d, i) => {
      // if (i === 0) {
      //   d.length_ms = firstButEndingDuration - d.start_ms
      // } else {
      //   d.length_ms = data.trailer.shots[i+1].start_ms - d.start_ms
      // }
      // 1. always make the next starting time minus current starting time = duration
      // 2. assigns the current starting time to the next starting time
      // so that firstButEndingDuration is always the starting time of the next shot
      d.length_ms =
        firstButEndingDuration - (firstButEndingDuration = d.start_ms);
    });
  });

  let barHeight = 20;
  let yaxisText = ["Beginning", "Middle", "End"];
  let rectHeightExpansion = 1.015;

  let tooltipXCoord;
  let hideTooltip = true;
</script>

<figure class="w-full h-2/3 my-10">
  {#if data}
    <LayerCake
      x="start_ms"
      xDomain={[0, 152100]}
      y="match_ms"
      yDomain={[0, data.movie_length_ms]}
      z="match_ms"
      zScale={d3.scaleOrdinal()}
      zDomain={yaxisText}
      zRange={["#fd9226", "#fa4f43", "#a20f79"]}
      padding={{ top: 8, right: 10, bottom: 20, left: 160 }}
      data={data.trailer?.shots}
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
