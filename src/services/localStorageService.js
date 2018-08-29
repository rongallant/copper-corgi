import uniqid from "uniqid";
import GearItem from "../dtos/gearItem";

export const GEAR_LIST_KEY = "gear";

/*
 * Gear Entries
 */

export const newGearList = () => {
	return [];
};

export const gearListExists = () => {
	try {
		return localStorage.hasOwnProperty(GEAR_LIST_KEY);
	} catch (e) {
		throw new Error("Error checking if gear list exists.");
	}
};

export const saveGearList = (gearList) => {
	if (!gearListExists()) {
		localStorage.setItem(GEAR_LIST_KEY, JSON.stringify(gearList));
	} else {
		throw new Error("GearList already exists");
	}
};

export const readGearList = () => {
	try {
		if (gearListExists()) {
			return JSON.parse(localStorage.getItem(GEAR_LIST_KEY));
		} else {
			const newGearList = newGearList();
			saveGearList(newGearList);
			return newGearList;
		}
	} catch (e) {
		throw new Error("Could not read gear list.");
	}
};

export const deleteGearList = () => {
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

export const newGearItem = () => {
	return new GearItem(uniqid.time());
};

export const createGearItem = (category, name, description, weight) => {
	return new GearItem(uniqid.time(), category, name, description, weight);
};

export const readGearItem = (gearId) => {
	const gearList = readGearList();
	return gearList.filter(o => o.gearId === gearId);
};

export const gearItemIndex = (gearId) => {
	const gearList = readGearList();
	return gearList.findIndex(o => o.gearId === gearId);
};

export const updateGearItem = (gearItem) => {
	const gearList = readGearList();
	const gearItemIndex = gearItemIndex(gearItem.gearId);
	gearList[gearItemIndex] = gearItem;
	saveGearList(gearList);
};

export const deleteGearItem = (gearId) => {
	const gearList = readGearList();
	gearList.pop(gearItemIndex(gearId));
	saveGearList(gearList);
};