const map = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const pointsForVoronoi = [
  [51.518783384812714, -0.1436791248938185],
  [51.525085229881086, -0.12891624497409107],
  [51.51119865235411, -0.13423774820096493],
  [51.50478803465899, -0.15432213134758624],
  [51.51280116584553, -0.16565178337899059],
  [51.52860961039737, -0.1620468940962683],
  [51.528396019344, -0.17165993218354106],
  [51.50681816118516, -0.1833329070037837],
  [51.49356728322207, -0.17595146704391998],
  [51.491109035492585, -0.13732765330044974],
  [51.48629903697415, -0.12462471011371212],
  [51.48490938737375, -0.16616676756224805],
  [51.49495633923624, -0.09784495230657832],
  [51.49944488274714, -0.08617178203100374],
  [51.505749471102625, -0.09767328803781838],
  [51.515899094104945, -0.10728648708829391],
  [51.5150444762002, -0.09063505301872167],
  [51.50916854403718, -0.09424000266265999],
  [51.50436039943468, -0.11003311538843265],
  [51.496773183904956, -0.1163846933324897],
  [51.491856848839525, -0.11174975807601187],
  [51.49891055550746, -0.10659983001325425],
  [51.487795128631106, -0.10059158060671702],
  [51.515151304315154, -0.12033297151392787],
  [51.52529883280484, -0.11449638637615059],
  [51.52529883280484, -0.08085018969948622]
];

const voronoiOptions = {
  type: "voronoi",
  pathStyleOption: {
    color: "red"
  }
};

const boundForHex = [
  [51.53213371811051, -0.07364127597232263],
  [51.485016285000434, 0.001889737570466288]
];

const hexOption = {
  type: "hexagon",
  pathStyleOption: {
    color: "blue"
  }
};

const partition = L.partition(hexOption);
partition.setData(boundForHex);
const layerGroup = partition.addTo(map);

const partition2 = L.partition(voronoiOptions);
partition2.setData(pointsForVoronoi);
const layerGroup2 = partition2.addTo(map);

function testVoronoiUpdate() {
  setInterval(function() {
    const points2 = pointsForVoronoi.map(e => [
      e[0] + Math.random(),
      e[1] - Math.random()
    ]);
    p.setData(points2);
  }, 1000);
}

function testHexUpdate() {
  setInterval(function() {
    const bound2 = boundForHex.map(e => [
      e[0] + Math.random(),
      e[1] - Math.random()
    ]);
    p.setData(bound2);
  }, 1000);
}
