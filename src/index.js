import getVoronoiPath from "./algorithm/voronoi";
import getHexagonPath from "./algorithm/hexagon";

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
      const triangles = getVoronoiPath(data);
      const layers = triangles.map(e => L.polygon(e, pathStyleOption));
      const layerGroup = L.layerGroup(layers).addTo(map);
      this.layerGroup = layerGroup;
      return layerGroup;
    } else if (type === "hexagon") {
      const paths = getHexagonPath(this.data);
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

L.partition = function(options = defaultOptions) {
  return new L.Partition(options);
};
