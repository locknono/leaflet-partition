export default function getHexagonPath(bound, sideLength) {
  const [top, left] = bound[0];
  const [bottom, right] = bound[1];
  if (!sideLength) {
    sideLength = (right - left) / 40;
  }
  const rowWidth = 2 * sideLength * Math.cos((Math.PI / 180) * 30);
  const rowCount = Math.round(Math.abs(right - left) / rowWidth);
  const colCount = Math.round(
    ((Math.abs(top - bottom) - 0.5 * sideLength) / (3 * sideLength)) * 2
  );
  const paths = [];
  for (let i = 0; i < rowCount + 1; i++) {
    for (let j = 0; j < colCount + 1; j++) {
      let lng, lat;
      if (j % 2 === 0) {
        lng = left + i * rowWidth;
      } else {
        lng = left + i * rowWidth + sideLength * Math.cos((Math.PI / 180) * 30);
      }
      lat = top - 1.5 * j * sideLength;
      const p1 = [
        lat - sideLength / 2,
        lng - sideLength * Math.cos((Math.PI / 180) * 30)
      ];
      const p2 = [
        lat + sideLength / 2,
        lng - sideLength * Math.cos((Math.PI / 180) * 30)
      ];
      const p3 = [lat + sideLength, lng];
      const p4 = [
        lat + sideLength / 2,
        lng + sideLength * Math.cos((Math.PI / 180) * 30)
      ];
      const p5 = [
        lat - sideLength / 2,
        lng + sideLength * Math.cos((Math.PI / 180) * 30)
      ];
      const p6 = [lat - sideLength, lng];
      const path = [p1, p2, p3, p4, p5, p6, p1];
      paths.push(path);
    }
  }
  return paths;
}
