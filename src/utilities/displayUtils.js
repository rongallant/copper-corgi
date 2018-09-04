import convert from "convert-units/lib";

export const displayUnit = (grams) => {
	const oz = convert(grams).from('g').to('oz');
	const best = convert(oz).from('oz').toBest();
	const val = Math.round(best.val * 100) / 100;
	return `${val} ${best.plural}`;
};
