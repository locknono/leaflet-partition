const defaultOptions = {
  type: "voronoi"
};

L.Partition = L.Layer.extend({
  initialize: function(options = defaultOptions) {
    detectEnvironment(options.type);
    this.options = options;
    this.data = null;
    this.layerGroup = null;
  },
  setData: function(data) {
    if (!this.data) {
      this.data = data;
    } else {
      this.layerGroup.remove();
      this.data = data;
      const layerGroup = this.addTo(map);
      layerGroup.addTo(map);
      this.layerGroup = layerGroup;
    }
  },
  setOption: function(option) {
    this.option = option;
    const layerGroup = this.addTo(map);
    layerGroup.addTo(map);
    this.layerGroup = layerGroup;
  },
  addTo: function() {
    const data = this.data;
    const { type, pathStyleOption } = this.options;
    if (type === "voronoi") {
      const voronoi = d3.voronoi();
      const polygons = voronoi(data).polygons();
      const triangles = voronoi(data).triangles();
      const links = voronoi(data).links();
      const layers = triangles.map(e => L.polygon(e, pathStyleOption));
      const layerGroup = L.layerGroup(layers).addTo(map);
      this.layerGroup = layerGroup;
      return layerGroup;
    } else if (type === "hexagon") {
      const paths = calHexPath(this.data);
      const layers = paths.map(e => L.polygon(e, pathStyleOption));
      const layerGroup = L.layerGroup(layers).addTo(map);
      this.layerGroup = layerGroup;
    }
  }
});

function detectEnvironment(type) {
  if (type === "voronoi") {
    if (typeof d3 === "undefined" || typeof d3.voronoi === "undefined") {
      throw new ReferenceError(
        "Voronoi partition requires `d3` library loaded first",
        +"Import `d3-voronoi` first:`https://github.com/d3/d3-voronoi`"
      );
    }
  }
}

function calHexPath(bound, sideLength) {
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

L.partition = function(options = defaultOptions) {
  return new L.Partition(options);
};
