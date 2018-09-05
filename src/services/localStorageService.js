import uniqid from "uniqid";
import _ from "lodash";
import convert from "convert-units/lib";

const GEAR_LIST_KEY = "gear";

const store = () => localStorage;

export const displayUnit = (grams) => {
	const oz = convert(grams).from('g').to('oz');
	const best = convert(oz).from('oz').toBest();
	const val = Math.round(best.val * 100) / 100;
	return `${val} ${best.plural}`;
};

/*
 * Gear Entries
 */

const saveGearList = (gearList) => {
	try {
		store().setItem(GEAR_LIST_KEY, JSON.stringify(gearList));
	} catch (e) {
		throw new Error("Error saving gear list.");
	}
};

const gearListExists = () => {
	try {
		return store().hasOwnProperty(GEAR_LIST_KEY);
	} catch (e) {
		throw new Error("Error checking if gear list exists.");
	}
};

const readGearList = () => {
	try {
		if (gearListExists()) {
			return JSON.parse(store().getItem(GEAR_LIST_KEY));
		} else {
			const newGearList = [];
			saveGearList(newGearList);
			return newGearList;
		}
	} catch (e) {
		throw new Error("Could not read gear list.");
	}
};

const deleteGearList = () => {
	if (gearListExists()) {
		try {
			return store().removeItem(GEAR_LIST_KEY);
		} catch (e) {
			throw new Error("Could not delete gear list.");
		}
	}
};

/*
 * Gear Entries
 */

const newGearItem = {
	key: uniqid.time(), category: "", name: "", description: "", weight: ""
};

const createGearItem = (gear) => {
	const gearList = readGearList();
	const {category, name, description, weight} = gear;
	gearList.push({
		key: uniqid.time(), category, name, description, weight
	});
	saveGearList(gearList);
};

const readGearItem = (key) => {
	const gearList = readGearList();
	return gearList.filter(o => o.key === key)[0];
};

const gearItemIndex = (key) => {
	const gearList = readGearList();
	if (!gearList || gearList.length-1 > key) {
		throw new Error("Error getting gear item index.");
	}
	return _.findIndex(gearList, o => o.key === key);
};

const updateGearItem = (item) => {
	if (!item || !item.key) {
		throw new Error("Could not delete: Invalid key.");
	}
	const list = readGearList();
	const index = gearItemIndex(item.key);
	list.splice(index, 1, item);
	saveGearList(list);
};

const deleteGearItem = (key) => {
	if (!key) {
		throw new Error("Could not delete: Invalid key.");
	}
	const gearList = readGearList();
	const index = gearItemIndex(key);
	gearList.splice(index, 1);
	saveGearList(gearList);
};

export const gearService = {
	gearListExists, saveGearList, readGearList, deleteGearList,
	newGearItem, createGearItem, readGearItem, gearItemIndex, updateGearItem, deleteGearItem
};
