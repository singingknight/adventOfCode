class Day01 {
    getFuel(mass: number) {
        return Math.trunc(mass/3)-2;
    }
    getFuelList(massList: string) {
        const masses = massList.split('\n').map(m => Number(m.trim()));
        const fuels = masses.map(m => this.getFuel(m));
        return fuels.reduce((p,n)=>p+n);
    }
    getFullFuel(mass: number) {
        let sum = 0;
        for (let next=this.getFuel(mass);next>0;next=this.getFuel(next))
        {
            sum += next;
        }
        return sum;
    }
    getFullFuelList(massList: string) {
        const masses = massList.split('\n').map(m => Number(m.trim()));
        const fuels = masses.map(m => this.getFullFuel(m));
        return fuels.reduce((p,n)=>p+n);
    }
}
describe("Day 01", () => {
    var testFuel = (m, expected) => {
        var target = new Day01();
        var result = target.getFuel(m);
        expect(result).toEqual(expected);
    }
    var testFuelList = (ml, expected) => {
        var target = new Day01();
        var result = target.getFuelList(ml);
        expect(result).toEqual(expected);
    }
    var testFullFuel = (m, expected) => {
        var target = new Day01();
        var result = target.getFullFuel(m);
        expect(result).toEqual(expected);
    }
    var testFullFuelList = (ml, expected) => {
        var target = new Day01();
        var result = target.getFullFuelList(ml);
        expect(result).toEqual(expected);
    }
    it("fullFuel", () => {
        testFullFuel(1969, 966);
        testFullFuel(100756, 50346);
        testFullFuelList(input,4941976);
       }); 
    it("fuel", () => {
        testFuel(12, 2);
        testFuel(14, 2);
        testFuel(1969, 654);
        testFuelList(`12
        14`,4);
        testFuelList(input,3296560);
    });
});
const input = `122281
124795
58593
133744
67625
109032
50156
80746
130872
79490
126283
146564
73075
130170
139853
92599
96965
58149
94254
89074
52977
148092
92073
136765
144755
142487
54827
135588
91411
51597
70040
68880
117120
137115
72829
100048
65187
131464
95813
146891
128799
94568
67178
94903
67193
127613
115782
85360
129820
50989
63471
106724
145768
55169
77555
82978
87728
69141
95518
82985
83387
83089
64372
127931
99277
58930
99098
95621
147797
64102
118857
71014
84881
147294
72166
71348
149240
117963
89181
144770
102444
99103
72341
56076
128515
51319
147595
98431
141102
148617
84685
111427
82351
57021
63834
113059
119970
87078
120631
124942`;