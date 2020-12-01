interface Reaction {
    produces: number;
    consumes: { chemical: string; count: number }[];
}
class Day14 {
    reactions = new Map<string, Reaction>();
    store = new Map<string, number>();
    oreConsumed = 0;
    getCountChemical(str) {
        const [count, chemical] = str.trim().split(" ");
        return { count: Number(count), chemical: chemical };
    }
    load(list: string) {
        list.split("\n")
            .map(l => l.trim())
            .forEach(l => {
                const [partList, productPart] = l.split("=>");
                const { count, chemical } = this.getCountChemical(productPart);
                this.reactions.set(chemical, {
                    produces: count,
                    consumes: partList.split(",").map(this.getCountChemical)
                });
                this.store.set(chemical, 0);
            });
    }
    produce(count, chemical) {
        if (chemical === "ORE") {
            this.oreConsumed += count;
            return;
        }
        count -= this.store.get(chemical);
        const reaction = this.reactions.get(chemical);
        while (count > 0) {
            const batch = Math.trunc((reaction.produces + count - 1) / reaction.produces);
            reaction.consumes.forEach(part => {
                this.produce(part.count * batch
                , part.chemical);
            });
            count -= reaction.produces * batch;
        }
        this.store.set(chemical, 0 - count);
    }
    getOreConsumed() {
        return this.oreConsumed;
    }
    multiply(count) {
        this.oreConsumed *= count;
        this.store.forEach((v, k) => this.store.set(k, v*count));
    }
}
describe("Day 14", () => {
    var testProduceFuel = (list, fuels, expected) => {
        var target = new Day14();
        target.load(list);
        target.produce(1, "FUEL");
        const result = target.getOreConsumed();
        expect(result).toEqual(expected);
    };
    var testCanProduce = (list, expected) => {
        var target1 = new Day14();
        target1.load(list);
        target1.produce(1, "FUEL");
        const maxOreConsumed = target1.getOreConsumed();
        const cargo = 1000000000000;
        let lower = Math.floor(cargo / maxOreConsumed);
        let upper = lower;
        for (;;upper*=2) {
            var target = new Day14();
            target.load(list);
            target.produce(upper, "FUEL");
            if (target.getOreConsumed()>cargo) {
                break;
            }
            lower=upper;
        }
        for (let i=0;lower<upper-1;i++) {
            const test = Math.floor((lower+upper)/2);
            var target = new Day14();
            target.load(list);
            target.produce(test, "FUEL");
            if (target.getOreConsumed()>cargo) {
                upper = test;
            } else {
                lower = test;
            }
        }
        expect(lower).toEqual(expected);
    };
    it("Fuel", () => {
        testProduceFuel(
            `10 ORE => 10 A
            1 ORE => 1 B
            7 A, 1 B => 1 C
            7 A, 1 C => 1 D
            7 A, 1 D => 1 E
            7 A, 1 E => 1 FUEL`,
            1,
            31
        );
        testProduceFuel(
            `9 ORE => 2 A
            8 ORE => 3 B
            7 ORE => 5 C
            3 A, 4 B => 1 AB
            5 B, 7 C => 1 BC
            4 C, 1 A => 1 CA
            2 AB, 3 BC, 4 CA => 1 FUEL`,
            1,
            165
        );
        testProduceFuel(ore13312, 1, 13312);
        testProduceFuel(reactions, 1, 378929);
    });
    it ("Part 2" , () => {
        testCanProduce(ore13312, 82892753);
        testCanProduce(reactions, 3445249);
    })
    const ore13312 = `157 ORE => 5 NZVS
    165 ORE => 6 DCFZ
    44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL
    12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ
    179 ORE => 7 PSHF
    177 ORE => 5 HKGWZ
    7 DCFZ, 7 PSHF => 2 XJWVT
    165 ORE => 2 GPVTF
    3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT`;
    const reactions = `11 TLKRB, 9 DHRN, 1 XTLB => 5 TPXQR
        1 GVWZR, 1 RVXMK => 5 BSKC
        5 PQXHB, 1 WLMCM => 5 FDGBF
        7 XVPB, 10 RMRPX, 2 XVQDV => 4 JFSDT
        8 MCQK, 11 RMRPX => 7 STJNH
        6 JFRPS => 3 ZRKZ
        3 DNDTC, 1 SLPZ => 4 WQCSD
        5 BSKC => 1 ZVBX
        3 TQXFD, 24 FDGBF, 2 RMRPX => 6 MGHBF
        7 JFSDT => 5 VHJM
        5 XTLB, 3 DGDNX => 5 ZKDG
        12 KHLSP, 1 JFSDT, 23 PBJMZ => 5 RMHKH
        1 RMRPX => 9 DNDTC
        2 CKRXP, 1 HKWV, 1 RBCPD => 3 ZLVG
        11 SLPZ, 27 WQCSD, 2 STJNH => 4 RBCPD
        1 TQXFD, 1 RVXMK => 5 LNWD
        2 WCJM => 8 NMWV
        1 PQXHB, 5 WLMCM => 5 XTLB
        1 DHRN => 2 RVXMK
        147 ORE => 4 XPFRX
        4 KMHG, 11 LNWD => 4 MCQK
        4 MGHBF => 3 JCVCG
        2 ZRKZ, 1 JFRPS => 6 QTRJ
        4 RMHKH => 5 HJNP
        13 JPKGW, 20 STJNH, 32 JBPFQ, 9 GXSTP, 3 QRFRQ, 35 ZVBX, 4 HJNP, 54 DVRSL, 45 KZBW, 23 RVXMK => 1 FUEL
        12 VFTDK, 29 QDTNQ => 4 XVPB
        3 XVQDV => 8 MXWK
        11 RVXMK, 12 PZNJ, 1 QXNK, 2 ZKDG, 4 DHWR, 4 WCJM, 7 VHJM, 2 HKWV => 5 QRFRQ
        1 LNWD, 4 VHJM => 4 WCJM
        6 NMWV, 6 MXWK, 15 DVRSL, 17 ZLVG, 5 JFSDT, 10 SGBQP, 1 GWDVS => 5 JBPFQ
        3 TPXQR, 3 RVXMK => 5 XKSXK
        6 TPXQR, 2 JCVCG, 1 KMHG => 3 DHWR
        3 XTLB => 7 RMRPX
        26 HKWV, 2 STJNH, 1 MXWK, 3 CPXW, 2 CKRXP, 16 QTRJ, 1 WQCSD => 8 GXSTP
        5 TLKRB => 7 TQXFD
        12 VHJM => 9 JPKGW
        4 MGHBF, 17 XVPB => 3 KHLSP
        1 DVRSL => 3 GWDVS
        3 DHRN => 6 KZBW
        13 QXNK, 3 SGSBS, 23 BSKC => 6 DVRSL
        11 RBCPD => 5 CPXW
        177 ORE => 6 VFTDK
        1 XVQDV => 4 SLPZ
        17 SGSBS, 1 GVWZR => 5 JFRPS
        178 ORE => 1 WLMCM
        7 DVRSL, 2 MXWK => 4 DGDNX
        14 PZNJ, 5 JCVCG, 3 RBCPD => 8 SGBQP
        1 QDTNQ, 2 JFRPS, 1 ZRKZ => 8 PBJMZ
        4 LNWD => 1 QXNK
        30 VFTDK => 8 DHRN
        8 TPXQR, 6 XKSXK, 6 TLKRB => 6 KMHG
        1 TQXFD, 3 QTRJ => 6 QDTNQ
        123 ORE => 4 TLKRB
        1 BSKC => 5 XVQDV
        132 ORE => 4 PQXHB
        5 TLKRB => 7 SGSBS
        17 XPFRX => 6 GVWZR
        4 HKWV => 5 CKRXP
        1 RVXMK, 1 KHLSP => 8 PZNJ
        1 JFSDT => 4 HKWV`;
});
