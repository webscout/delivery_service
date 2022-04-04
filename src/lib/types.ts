export type Town = string;

/**
 * Type for storing distances between towns as a directed weighted graph
 */
export type TownDistancesMap = Record<Town, Record<Town, number>>;
