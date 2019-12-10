interface Point { x: number, y: number }
interface Data { origin: Point, visibleNodes: Set<string> }
class Day10 {
    formatPoint(p: Point) {
        return `${p.x},${p.y}`;
    }
    isBlocked(start: Point, current: Point, test: Point) {
        if (
            (start.x === current.x && start.x === test.x)
            || (start.y === current.y && start.y === test.y)
            || (((test.x - start.x) / (current.x - start.x)) === ((test.y - start.y) / (current.y - start.y)))
        ) {
            return true;
        }
        return false;
    }
    loadAsteroids(input: string): Point[] {
        const map = [];
        input.split('\n').forEach((line, y) => {
            line.trim().split('').forEach((char, x) => {
                if (char === '#') {
                    map.push({ x: x, y: y });
                }
            })
        })
        return map;
    }
    getVisibleData(map) {        
        const visibleData = new Map<string, Data>();
        for (let origin = map.shift(); origin != undefined; origin = map.shift()) {
            let rest = [...map];
            const originKey = this.formatPoint(origin);
            const originData = visibleData.get(originKey) || { origin: { x: origin.x, y: origin.y }, visibleNodes: new Set<string>() };
            for (let current = rest.shift(); current != undefined; current = rest.shift()) {
                const currentKey = this.formatPoint(current);
                originData.visibleNodes.add(currentKey);
                const currentData = visibleData.get(currentKey) || { origin: { x: current.x, y: current.y }, visibleNodes: new Set<string>() };
                currentData.visibleNodes.add(originKey);
                visibleData.set(currentKey, currentData);
                rest = rest.filter(test => !this.isBlocked(origin, current, test));
            }
            visibleData.set(originKey, originData);
        }
        return visibleData;
    }
    getOptimal(visibleData) {
        var maxVisible:Data = {origin:{x:-1,y:-1},visibleNodes:new Set<string>()};
        visibleData.forEach(d => {
            if (d.visibleNodes.size > maxVisible.visibleNodes.size) {
                maxVisible = d;
            }
        })
        return maxVisible;        
    }
    getMostVisible(input: string) {
        const map = this.loadAsteroids(input);
        const visibleData = this.getVisibleData(map);
        return this.getOptimal(visibleData);
    }
    getRoundShootingOrder(origin: Point, targetStrings:Set<string>) {
        var targets = Array.from(targetStrings).map(s => {
            var coords = s.split(',');
            var x = Number(coords[0]);
            var y = Number(coords[1]);
            return {p:{x:x, y:y}, angel:(360-Math.atan2(origin.y-y, x-origin.x)*180/Math.PI+90
            )%360}
        });
        return targets.sort((a,b) => a.angel - b.angel);
    }
    getShootingOrder(input: string, max:number) {
        let map = this.loadAsteroids(input);
        let workMap = [...map];
        let visibleData = this.getVisibleData(workMap);
        const origin = this.getOptimal(visibleData).origin;
        const shootingOrder = [];
        while (map.length>1){
            const visibleNodes = visibleData.get(this.formatPoint(origin)).visibleNodes;
            shootingOrder.push(...this.getRoundShootingOrder(origin, visibleNodes));
            map = map.filter(p => !visibleNodes.has(this.formatPoint(p)));
            workMap = [...map];
            visibleData = this.getVisibleData(workMap);
        }
        return shootingOrder;
    }
}
describe("Day 10", () => {
    var testBlocked = (start, current, test, expected) => {
        var target = new Day10();
        const result = target.isBlocked(start, current, test);
        expect(result).toEqual(expected);
    }
    var testMap = (map, expected) => {
        var target = new Day10();
        const result = target.loadAsteroids(map);
        expect(result).toEqual(expected);
    }
    var testMostVisibleCount = (map, expected) => {
        var target = new Day10();
        const result = target.getMostVisible(map).visibleNodes.size;
        expect(result).toEqual(expected);
    }
    var testMostVisibleNode = (map, expected) => {
        var target = new Day10();
        const result = target.getMostVisible(map).origin;
        expect(result).toEqual(expected);
    }
    var testShootingOrder = (map, expected) => {
        var target = new Day10();
        const result = target.getShootingOrder(map, 200);
        expected.forEach(e => {
            const p = result[e.pos].p;
            const v = p.x * 100 + p.y;
            expect(v).toEqual(e.value);
        })
    }
    it("blocked", () => {
        testBlocked({ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, true);
        testBlocked({ x: 0, y: 0 }, { x: 0, y: 2 }, { x: 0, y: 3 }, true);
        testBlocked({ x: 1, y: 0 }, { x: 2, y: 2 }, { x: 3, y: 4 }, true);
        testBlocked({ x: 2, y: 0 }, { x: 2, y: 2 }, { x: 3, y: 4 }, false);
    });
    it("map", () => {
        testMap(`.#..#
        .....
        #####
        ....#
        ...##`, [
            { x: 1, y: 0 },
            { x: 4, y: 0 },
            { x: 0, y: 2 },
            { x: 1, y: 2 },
            { x: 2, y: 2 },
            { x: 3, y: 2 },
            { x: 4, y: 2 },
            { x: 4, y: 3 },
            { x: 3, y: 4 },
            { x: 4, y: 4 },
        ])
    })
    it("Part 1", () => {
        testMostVisibleCount(`.#..#
        .....
        #####
        ....#
        ...##`, 8);
        testMostVisibleCount(`......#.#.
        #..#.#....
        ..#######.
        .#.#.###..
        .#..#.....
        ..#....#.#
        #..#....#.
        .##.#..###
        ##...#..#.
        .#....####`, 33);
        testMostVisibleCount(`#.#...#.#.
        .###....#.
        .#....#...
        ##.#.#.#.#
        ....#.#.#.
        .##..###.#
        ..#...##..
        ..##....##
        ......#...
        .####.###.`,35);
        testMostVisibleCount(`.#..#..###
        ####.###.#
        ....###.#.
        ..###.##.#
        ##.##.#.#.
        ....###..#
        ..#.#..#.#
        #..#.#.###
        .##...##.#
        .....#.#..`,41)
        testMostVisibleCount(map, 278);
    });
    it("MostVisibileNode", () => {
        testMostVisibleNode(test, {x:11, y:13});
        testMostVisibleNode(test2, {x:8, y:3});
    });
    it("TestShootingOrder", () => {
        testShootingOrder(test2, [
            {pos:0,value:801},
            {pos:8,value:1501},
            {pos:9,value:1202},
            {pos:17,value:404},
            {pos:26,value:501},
            {pos:29,value:700},
            {pos:30,value:800},
            {pos:35,value:1403}
        ]);
        testShootingOrder(test, [
            {pos:0,value:1112},
            {pos:199,value:802},
            {pos:298,value:1101},
        ]);
        testShootingOrder(map, [
            {pos:199,value:1417}
        ]);
    });
    const test=`.#..##.###...#######
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
    const test2=`.#....#####...#..
    ##...##.#####..##
    ##...#...#.#####.
    ..#.....#...###..
    ..#.#.....#....##`;
    const map=`.#......#...#.....#..#......#..##..#
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
