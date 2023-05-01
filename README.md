# [leaflet-partition](https://github.com/locknono/leaflet-partition)  [![GitHub license](https://camo.githubusercontent.com/890acbdcb87868b382af9a4b1fac507b9659d9bf/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d4d49542d626c75652e737667)](https://github.com/locknono/leaflet-partition/blob/master/LICENSE)

leaflet-partition is a leaflet plugin designed to divide geographic areas into distinct sections.

- **Various methods**:Supports different partitioning techniques, such as triangulation and hexagonal tiling.
- **Data binding**:leaflet-partition enables you to bind arbitrary data to partitions and apply data-driven transformations to them. 
- **Simple and Flexible**:leaflet-partition takes care of path calculations, data binding, rendering, and updating, while still providing you with full control over individual partitions (DOM operations, style settings).

- **Suitable for data visualization**



[View the basic demo here](https://locknono.github.io/leaflet-partition/)

## Requirements

- leaflet 1.x
- If you choose to use triangulation for partitioning, d3-voronoi is required.



## Basic Usage

Include the dependency libraries in the dist folder

`<script src="leaflet-partition.min.js"></script>`

**(optional)**If you use trigulation for partition, add the following:

`<script src="https://d3js.org/d3-voronoi.v1.min.js"></script>`

This plugin is a **UMD**  module, so you can use it in commonJS or AMD environments. 


 Then:

```
const partition = L.partition();
partition.setData(data);
const layerGroup = partition.addTo(map);
```

layerGroup is just a leafelt [LayerGroup](https://leafletjs.com/reference-1.4.0.html#layergroup) Object, which allows you to take full control of each partition.


Set type and style option:

```
const options = {
  type: "voronoi",
  pathStyleOption: {
    color: "blue"
  }
};

//initialize option
const partition = L.partition(options);

//update option
partition.setOption(options)
```

Where **type** is a string value represents partition method. Options:**'voronoi'**,**'hexagon'**.

If type is `voronoi`, `data` should be a list of `L.Latlng`.

If type is `hexagon`, `data` should be `L.LatLngBounds`/

**pathStyleOption** property is a leaflet [Path Options](https://leafletjs.com/reference-1.4.0.html#path) Object.



Set data and Update:

```
partition.setData(data);
```

Then, the view updates itself.





## License

leaflet-partition is [MIT licensed](https://github.com/locknono/leaflet-partition/blob/master/LICENSE)






