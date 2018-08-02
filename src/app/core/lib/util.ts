/**
 * Retorna una lista de objetos unicos construida basada en los atributos de una clase, 
 * por ejemplo, si se ingresa objects<A> y A tiene atributos b y c, y distinct by 
 * @param objects 
 * @param distinct_by 
 */
export function isOdd(n) {
    return Math.abs(n % 2) == 1;
 }

export function distinctOn<T>(objects: T[], distinct_by: string): any[] {

    if (objects.length === 0) {
        return new Array<String>();
    } else {
        const objectProperties = Object.getOwnPropertyNames(objects[0]);
        if (!objectProperties.includes(distinct_by)) {
            return new Array<String>();
        }
        const unique = Array.from(new Set(objects.map(item => item[`${distinct_by}`])));
        return unique;
    }
}


export function distinctOn_GetObjects<T>(objects: T[], distinct_by: string): T[] {

    if (objects.length === 0) {
        return new Array<T>();
    } else {
        const objectProperties = Object.getOwnPropertyNames(objects[0]);
        if (!objectProperties.includes(distinct_by)) {
            return new Array<T>();
        }
        const unique = Array.from(new Set(objects));
        return unique;
    }
}/**
 *Filtra los valores repetidos de un array ingresado
 *
 * @export
 * @param {(Array<number|string|String>)} objects
 * @returns {Array<String>}
 */
export function distinctNumbers(objects: Array<number|string|String>): Array<String>{
    return Array.from(new Set(objects.map(item => String(item))));
  }


  export function excludeZero(objects: Array<number|string|String>): Array<number|string|String>{
    return objects.filter(object => Number(object) !==0);
  }

  export function distinctWithoutZeros(objects: Array<number|string|String>): Array<number|string|String>{
    return excludeZero(distinctNumbers(objects));
  }

  