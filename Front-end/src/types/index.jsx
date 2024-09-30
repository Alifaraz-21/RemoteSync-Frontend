// Representing the Task structure with JSDoc comments
/**
 * @typedef {Object} TaskT
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} priority
 * @property {number} deadline
 * @property {string} [image] // optional
 * @property {string} [alt] // optional
 * @property {Array<{ title: string; bg: string; text: string }>} tags
 */

/**
 * @typedef {Object} Column
 * @property {string} name
 * @property {TaskT[]} items
 */

/**
 * @typedef {Object.<string, Column>} Columns
 */
