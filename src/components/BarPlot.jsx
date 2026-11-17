import { data } from "../data/data";
import { scaleBand, scaleLinear, max } from "d3";

const sortedData = [...data].sort(
  (a, b) => b.count - a.count
);

export default function BarPlot() {
  // Chart dimensions
  const width = 760;
  const rowHeight = 36;
  const height = sortedData.length * rowHeight;

  // Margins
  const margin = {
    top: 28,
    right: 50,
    bottom: 10,
    left: 0,
  };

  // Available plotting area
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height;

  // X scale: converts counts into pixel positions
  const xScale = scaleLinear()
    .domain([0, max(sortedData, (d) => d.count)])
    .range([0, innerWidth])
    .nice();

  // Y scale: gives each disease its vertical position
  const yScale = scaleBand()
    .domain(sortedData.map((d) => d.name))
    .range([0, innerHeight])
    .padding(0.3);

  // Axis tick values
  const ticks = xScale.ticks(5);
  const labelPadding = 8;
  const categoryLabelFontSize = 18;
  const outsideLabelCount = 3;

  return (
    <div className="bar-plot">
      <svg
        viewBox={`0 0 ${width} ${height + margin.top + margin.bottom}`}
        width="100%"
        role="img"
        aria-label="Horizontal bar chart showing counts for nine diseases"
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>


          {/* Vertical grid lines */}
          {ticks.map((tick) => (
            <line
              key={tick}
              x1={xScale(tick)}
              x2={xScale(tick)}
              y1={0}
              y2={innerHeight}
              className="grid-line"
            />
          ))}

          {/* Vertical baseline at x = 0 */}
<line
  x1={0}
  x2={0}
  y1={0}
  y2={innerHeight}
  className="zero-line"
/>



          {/* Bars */}
          {sortedData.map((d) => (
            <rect
              key={d.name}
              x={0}
              y={yScale(d.name)}
              width={xScale(d.count)}
              height={yScale.bandwidth()}
              className="bar"
            />
          ))}

          {/* Disease labels */}
          {sortedData.map((d, index) => {
            const barWidth = xScale(d.count);
            const isOutside = index >= sortedData.length - outsideLabelCount;

            return (
              <text
                key={d.name}
                x={isOutside ? barWidth + labelPadding : labelPadding}
                y={yScale(d.name) + yScale.bandwidth() / 2}
                textAnchor="start"
                dominantBaseline="middle"
                fontSize={categoryLabelFontSize}
                className={`category-label ${isOutside ? "" : "category-label--inside"}`}
              >
                {d.name}
              </text>
            );
          })}
          

          {/* Top axis */}
          {ticks.map((tick) => (
            <text
              key={tick}
              x={xScale(tick)}
              y={-10}
              textAnchor="middle"
              className="axis-label"
            >
              {tick}
            </text>
          ))}

        </g>
      </svg>
    </div>
  );
}