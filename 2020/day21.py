import re

def getFoods(lines):
	foods = []
	foodRe = re.compile("^(.*) \\(contains (.+)\\)$")
	allergens = {}
	for line in lines:
		match = foodRe.match(line)
		ingredients = match.group(1).split(" ")
		for allergen in match.group(2).split(", "):
			ingredientSet = set(ingredients)
			if allergen in allergens:
				allergens[allergen] = allergens[allergen].intersection(ingredientSet)
			else:
				allergens[allergen] = ingredientSet
		foods.append(ingredients)
	changed = True
	while changed:
		changed = False
		for allergen, ingredients in allergens.items():
			if len(ingredients) == 1:
				ingredient = next(iter(ingredients))
				for key in allergens.keys():
					if key != allergen and ingredient in allergens[key]:
						changed = True
						allergens[key].remove(ingredient)
	return foods, allergens

def freeCount(lines):
	foods, allergens = getFoods(lines)
	nonFree=set()
	for possible in allergens.values():
		nonFree = nonFree.union(possible)
	count = 0
	for food in foods:
		for ingredient in food:
			if not ingredient in nonFree:
				count += 1
	return count

def dangerList(lines):
	_, allergens = getFoods(lines)
	list = [next(iter(allergens[key])) for key in sorted(allergens.keys())]
	return ",".join(list)


def main():
    with open('input/day21.txt') as f:
        lines = [line.rstrip() for line in f]
    print(f'Part 1:{freeCount(lines)}')
    print(f'Part 2:{dangerList(lines)}')

if __name__ == "__main__":
    main()