# [leaflet-partition](https://github.com/locknono/leaflet-partition)  [![GitHub license](https://camo.githubusercontent.com/890acbdcb87868b382af9a4b1fac507b9659d9bf/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d4d49542d626c75652e737667)](https://github.com/locknono/leaflet-partition/blob/master/LICENSE)

leaflet-partition is a leaflet plugin for dividing the area into parts.

- **Different ways**:such as triangulation and hexagonal tiling.
- **Data binding**:leaflet-partition allows you to bind arbitrary data to partition, and then apply data-driven transformations to the partition. 
- **Simple and Flexible**:leaflet-partition takes charge of path calculating ,data binding,rendering and updating,But you still have full control(DOM operations,style settings) of each partition.

- **Suitable for data visualization**



[View the basic demo here](https://locknono.github.io/leaflet-partition/)

## Requirements

- leaflet 1.x
- if you use trigulation for partition,`d3-voronoi`is required



## Basic Usage

Include the dependency libraries in the dist folder

`<script src="leaflet-partition.min.js"></script>`

**(optional)**If you use trigulation for partition,add the following:

`<script src="https://d3js.org/d3-voronoi.v1.min.js"></script>`

This plugin is a **UMD**  module,so you can also use it in commonJS or AMD environment. 



 Then:

```
const partition = L.partition();
partition.setData(data);
const layerGroup = partition.addTo(map);
```

layerGroup is just a leafelt [LayerGroup](https://leafletjs.com/reference-1.4.0.html#layergroup) Object,which you can take full control of each partition.



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

Where **type** is a string value represents partition method,options:**'voronoi'**,**'hexagon'**

If type is `voronoi`,`data` should be an array of `L.Latlng`s

if type is `hexagon`,data should be `L.LatLngBounds`

**pathStyleOption** property is a leaflet [Path Options](https://leafletjs.com/reference-1.4.0.html#path) Object





Set data and Update:

```
partition.setData(data);
```

Then the view updates itself.







## License

leaflet-partition is [MIT licensed](https://github.com/locknono/leaflet-partition/blob/master/LICENSE)









