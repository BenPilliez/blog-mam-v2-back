/**
 * * Test si un objet est vide
 * @param object
 * @returns {boolean}
 */
const isEmpty = (object) => {
    try {
        if (!object) {
            return "Object can't be null or undefined";
        }
        return Object.keys(object).length === 0;
    } catch (e) {
        return e;
    }

};

/**
 * Test si les propriétées demandées sont bien dans l'objet
 * @param {object} object
 * @param {string || array} property
 * @returns {[]|boolean}
 */
const checkProperty = (object, property) => {
    try {

        if (isEmpty(object)) {
            return "Object can't be null or undefined";
        }

        if (!property || property.length === 0) {
            return "Property can't be blank, null or empty";
        }

        let list = typeof property === "string" ? property.split(" ") : property;
        for (let props of list) {
            if (!object.hasOwnProperty(props)) {
                return true;
            }
        }
        return false;

    } catch (e) {
        console.log(typeof e);
        return e;
    }

};
module.exports = {
    isEmpty, checkProperty
};
