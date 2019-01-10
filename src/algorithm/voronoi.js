const voronoi = d3.voronoi();
export default function getVoronoiPath(data) {
  const polygons = voronoi(data).polygons();
  const triangles = voronoi(data).triangles();
  return triangles;
}
