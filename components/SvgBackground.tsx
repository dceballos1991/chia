export const SvgBackground = () => {
  return (
    <svg className="absolute w-full h-full fill-gray-200">
      <pattern
        id="pattern-1"
        x="1.5"
        y="5"
        width="24"
        height="24"
        patternUnits="userSpaceOnUse"
        patternTransform="translate(-1,-1)"
      >
        <circle cx="1" cy="1" r="1" className="fill-graph-dots"></circle>
      </pattern>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="url(#pattern-1)"
      ></rect>
    </svg>
  );
};
