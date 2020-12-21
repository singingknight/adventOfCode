from day21 import freeCount, dangerList

lines = [
'mxmxvkd kfcds sqjhc nhms (contains dairy, fish)',
'trh fvjkl sbzzf mxmxvkd (contains dairy)',
'sqjhc fvjkl (contains soy)',
'sqjhc mxmxvkd sbzzf (contains fish)'
]

def test_part1():
	assert(freeCount(lines)==5)

def test_part2():
	assert(dangerList(lines)=='mxmxvkd,sqjhc,fvjkl')