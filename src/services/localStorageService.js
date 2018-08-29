import uniqid from "uniqid";

const GEAR_LIST_KEY = "gear";

/*
 * Gear Entries
 */

const saveGearList = (gearList) => {
	try {
		localStorage.setItem(GEAR_LIST_KEY, JSON.stringify(gearList));
	} catch (e) {
		throw new Error("Error saving gear list.");
	}
};

const gearListExists = () => {
	try {
		return localStorage.hasOwnProperty(GEAR_LIST_KEY);
	} catch (e) {
		throw new Error("Error checking if gear list exists.");
	}
};

const readGearList = () => {
	try {
		if (gearListExists()) {
			return JSON.parse(localStorage.getItem(GEAR_LIST_KEY));
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
			return localStorage.removeItem(GEAR_LIST_KEY);
		} catch (e) {
			throw new Error("Could not delete gear list.");
		}
	}
};

/*
 * Gear Entries
 */

const newGearItem = {
	key: uniqid.time(), category: null, name: null, description: null, weight: null
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
	return gearList.filter(o => o.key === key);
};

const gearItemIndex = (key) => {
	const gearList = readGearList();
	if (!gearList || gearList.length-1 > key) {
		throw new Error("Error getting gear item index.");
	}
	return gearList.findIndex(o => o.key === key);
};

const updateGearItem = (gearItem) => {
	const gearList = readGearList();
	const gearItemIndex = this.gearItemIndex(gearItem.key);
	gearList[gearItemIndex] = gearItem;
	saveGearList(gearList);
};

const deleteGearItem = (key) => {
	if (!key) {
		throw new Error("Could not delete: Invalid key.");
	}
	const gearList = readGearList();
	gearList.pop(gearItemIndex(key));
	saveGearList(gearList);
};

export const gearService = {
	gearListExists, saveGearList, readGearList, deleteGearList,
	newGearItem, createGearItem, readGearItem, gearItemIndex, updateGearItem, deleteGearItem
};
