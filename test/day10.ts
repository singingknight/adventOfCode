interface Point {
  x: number;
  y: number;
}
class Day10 {
  isBlocked(start: Point, current: Point, test: Point) {
    if (
      start.y === test.y ||
      (current.x - start.x) / (current.y - start.y) ===
        (test.x - start.x) / (test.y - start.y)
    ) {
      return true;
    }
    return false;
  }
  loadAsteroids(input: string): Point[] {
    const map = [];
    input.split("\n").forEach((line, y) => {
      line
        .trim()
        .split("")
        .forEach((char, x) => {
          if (char === "#") {
            map.push({ x: x, y: y });
          }
        });
    });
    return map;
  }
  getVisibleData(map) {
    const workMap = [...map];
    const visibleData = new Map<Point, Set<Point>>();
    while (workMap.length > 0) {
      const origin = workMap.shift();
      let rest = [...workMap];
      const originData = visibleData.get(origin) || new Set<Point>();
      while (rest.length > 0) {
        const current = rest.shift();
        originData.add(current);
        const currentData = visibleData.get(current) || new Set<Point>();
        currentData.add(origin);
        visibleData.set(current, currentData);
        rest = rest.filter(test => !this.isBlocked(origin, current, test));
      }
      visibleData.set(origin, originData);
    }
    return visibleData;
  }
  getOptimal(visibleData) {
    var maxVisible = {
      origin: { x: -1, y: -1 },
      visibleCount: -1
    };
    visibleData.forEach((d, origin) => {
      const visibleCount = d.size;
      if (visibleCount > maxVisible.visibleCount) {
        maxVisible = { origin: origin, visibleCount: visibleCount };
      }
    });
    return maxVisible;
  }
  getMostVisible(input: string) {
    const map = this.loadAsteroids(input);
    const visibleData = this.getVisibleData(map);
    return this.getOptimal(visibleData);
  }
  getRoundShootingOrder(origin: Point, targets: Set<Point>) {
    var targetsWithAngle = Array.from(targets).map(current => {
      return {
        p: current,
        angel:
          (360 -
            (Math.atan2(origin.y - current.y, current.x - origin.x) * 180) / Math.PI +
            90) %
          360
      };
    });
    return targetsWithAngle.sort((a, b) => a.angel - b.angel);
  }
  getShootingOrder(input: string, max: number) {
    let map = this.loadAsteroids(input);
    let visibleData = this.getVisibleData(map);
    const origin = this.getOptimal(visibleData).origin;
    const shootingOrder = [];
    while (map.length > 1) {
      const visibleNodes = visibleData.get(origin);
      shootingOrder.push(...this.getRoundShootingOrder(origin, visibleNodes));
      map = map.filter(p => !visibleNodes.has(p));
      visibleData = this.getVisibleData(map);
    }
    return shootingOrder;
  }
}
describe("Day 10", () => {
  var testBlocked = (start, current, test, expected) => {
    var target = new Day10();
    const result = target.isBlocked(start, current, test);
    expect(result).toEqual(expected);
  };
  var testMap = (map, expected) => {
    var target = new Day10();
    const result = target.loadAsteroids(map);
    expect(result).toEqual(expected);
  };
  var testMostVisibleCount = (map, expected) => {
    var target = new Day10();
    const result = target.getMostVisible(map).visibleCount;
    expect(result).toEqual(expected);
  };
  var testMostVisibleNode = (map, expected) => {
    var target = new Day10();
    const result = target.getMostVisible(map).origin;
    expect(result).toEqual(expected);
  };
  var testShootingOrder = (map, expected) => {
    var target = new Day10();
    const result = target.getShootingOrder(map, 200);
    expected.forEach(e => {
      const p = result[e.pos].p;
      const v = p.x * 100 + p.y;
      expect(v).toEqual(e.value);
    });
  };
  it("blocked", () => {
    testBlocked({ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, true);
    testBlocked({ x: 0, y: 0 }, { x: 0, y: 2 }, { x: 0, y: 3 }, true);
    testBlocked({ x: 1, y: 0 }, { x: 2, y: 2 }, { x: 3, y: 4 }, true);
    testBlocked({ x: 2, y: 0 }, { x: 2, y: 2 }, { x: 3, y: 4 }, false);
  });
  it("map", () => {
    testMap(
      `.#..#
        .....
        #####
        ....#
        ...##`,
      [
        { x: 1, y: 0 },
        { x: 4, y: 0 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
        { x: 3, y: 2 },
        { x: 4, y: 2 },
        { x: 4, y: 3 },
        { x: 3, y: 4 },
        { x: 4, y: 4 }
      ]
    );
  });
  it("Part 1", () => {
    testMostVisibleCount(
      `.#..#
        .....
        #####
        ....#
        ...##`,
      8
    );
    testMostVisibleCount(
      `......#.#.
        #..#.#....
        ..#######.
        .#.#.###..
        .#..#.....
        ..#....#.#
        #..#....#.
        .##.#..###
        ##...#..#.
        .#....####`,
      33
    );
    testMostVisibleCount(
      `#.#...#.#.
        .###....#.
        .#....#...
        ##.#.#.#.#
        ....#.#.#.
        .##..###.#
        ..#...##..
        ..##....##
        ......#...
        .####.###.`,
      35
    );
    testMostVisibleCount(
      `.#..#..###
        ####.###.#
        ....###.#.
        ..###.##.#
        ##.##.#.#.
        ....###..#
        ..#.#..#.#
        #..#.#.###
        .##...##.#
        .....#.#..`,
      41
    );
    testMostVisibleCount(map, 278);
  });
  it("MostVisibileNode", () => {
    testMostVisibleNode(test, { x: 11, y: 13 });
    testMostVisibleNode(test2, { x: 8, y: 3 });
  });
  it("TestShootingOrder", () => {
    testShootingOrder(test2, [
      { pos: 0, value: 801 },
      { pos: 8, value: 1501 },
      { pos: 9, value: 1202 },
      { pos: 17, value: 404 },
      { pos: 26, value: 501 },
      { pos: 29, value: 700 },
      { pos: 30, value: 800 },
      { pos: 35, value: 1403 }
    ]);
    testShootingOrder(test, [
      { pos: 0, value: 1112 },
      { pos: 199, value: 802 },
      { pos: 298, value: 1101 }
    ]);
    testShootingOrder(map, [{ pos: 199, value: 1417 }]);
  });
  const test = `.#..##.###...#######
    ##.############..##.
    .#.######.########.#
    .###.#######.####.#.
    #####.##.#.##.###.##
    ..#####..#.#########
    ####################
    #.####....###.#.#.##
    ##.#################
    #####.##.###..####..
    ..######..##.#######
    ####.##.####...##..#
    .#####..#.######.###
    ##...#.##########...
    #.##########.#######
    .####.#.###.###.#.##
    ....##.##.###..#####
    .#.#.###########.###
    #.#.#.#####.####.###
    ###.##.####.##.#..##`;
  const test2 = `.#....#####...#..
    ##...##.#####..##
    ##...#...#.#####.
    ..#.....#...###..
    ..#.#.....#....##`;
  const map = `.#......#...#.....#..#......#..##..#
    ..#.......#..........#..##.##.......
    ##......#.#..#..#..##...#.##.###....
    ..#........#...........#.......##...
    .##.....#.......#........#..#.#.....
    .#...#...#.....#.##.......#...#....#
    #...#..##....#....#......#..........
    ....#......#.#.....#..#...#......#..
    ......###.......#..........#.##.#...
    #......#..#.....#..#......#..#..####
    .##...##......##..#####.......##....
    .....#...#.........#........#....#..
    ....##.....#...#........#.##..#....#
    ....#........#.###.#........#...#..#
    ....#..#.#.##....#.........#.....#.#
    ##....###....##..#..#........#......
    .....#.#.........#.......#....#....#
    .###.....#....#.#......#...##.##....
    ...##...##....##.........#...#......
    .....#....##....#..#.#.#...##.#...#.
    #...#.#.#.#..##.#...#..#..#..#......
    ......#...#...#.#.....#.#.....#.####
    ..........#..................#.#.##.
    ....#....#....#...#..#....#.....#...
    .#####..####........#...............
    #....#.#..#..#....##......#...#.....
    ...####....#..#......#.#...##.....#.
    ..##....#.###.##.#.##.#.....#......#
    ....#.####...#......###.....##......
    .#.....#....#......#..#..#.#..#.....
    ..#.......#...#........#.##...#.....
    #.....####.#..........#.#.......#...
    ..##..#..#.....#.#.........#..#.#.##
    .........#..........##.#.##.......##
    #..#.....#....#....#.#.......####..#
    ..............#.#...........##.#.#..`;
});
