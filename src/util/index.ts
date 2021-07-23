import type { OBJ } from "@util/Types";

/**
 * Takes in an **array** and a **number** to produce a new two dimmensional array.
 * These smaller arrays have a max length equal to the input number
 *
 * @template T any type
 * @param array source array to be chunked
 * @param chunkSize the max number of elements to go in each new sub-array
 * @returns Two-Dimmensional Array of type T
 *
 * @example
 * //* returns [[1,2],[3,4]]
 * chunkArray([1,2,3,4],2);
 */
export function chunkArray<T>(array: T[], chunkSize: number) {
  const numberOfChunks = Math.ceil(array.length / chunkSize);

  return Array.from(Array(numberOfChunks)).map((_value, index) => {
    return array.slice(index * chunkSize, (index + 1) * chunkSize);
  });
}

/**
 * Capitalizes the first letter of an input string
 *
 * @param str string to modify
 * @returns modified string
 *
 * @example
 * //* returns "Stream-pi"
 * capitalize("stream-pi")
 */
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Takes in an array of objects, and produces a new Set of a common object property value.
 *
 * @template T any kind of object shape
 * @param arr array of objects
 * @param key string, key of object
 *
 * @example
 * type Person = {name: string, age: number};
 * const people: Person[] = [{name: "Bob", age: 24},{name: "Mark", age: 20}]
 * //* returns ["Bob", "Mark"]
 * propertySet(people, "name");
 */
export function propertySet<T extends OBJ>(arr: T[], key: keyof T) {
  return new Set(arr.map((obj) => obj[key]));
}

/**
 * Takes in an object and tests to see if this object is empty.
 *
 * - If the object has any proprties, returns false.
 * - If the object when stringified equals "{}", returns true
 *
 * @param obj object to test emptiness of
 * @returns boolean reflecting "is this object empty?"
 *
 * @example
 * const emptyObj = {};
 * //* returns true
 * isEmpty(emptyObj);
 * @example
 * const nonEmpty = {property: "value"};
 * //* returns false
 * isEmpty(nonEmpty);
 */
export function isEmpty(obj: OBJ) {
  for (const prop in obj) {
    if (obj[prop]) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}

/**
 * Utility function to replace `JSON.stringify(something, null, 2)`
 *
 * @param obj
 * @returns stringified JSON object
 */
export function prettyPrint(obj: OBJ) {
  return JSON.stringify(obj, null, 2);
}
