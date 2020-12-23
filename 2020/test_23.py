from day23 import getLabel, getStars

def test_part1():
	assert(getLabel("389125467", 10)=="92658374")
	assert(getLabel("389125467", 100)=="67384529")

def test_part2():
	#assert(getStars("389125467", 1000000, 10000000) == 149245887792)
	assert(getStars("389125467", 1000, 10000) == 430728)
