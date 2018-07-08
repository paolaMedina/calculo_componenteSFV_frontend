export function distinctOn<T>(objects: T[], distinct_by: string): any[] {

    if (objects.length === 0) {
        console.warn('Ha ingresado un array vacio')
        return new Array<String>();
    } else {
        const objectProperties = Object.getOwnPropertyNames(objects[0]);
        if (!objectProperties.includes(distinct_by)) {
            console.error(`El atributo '${distinct_by}' no existe en los objetos ingresados, debe elegir uno de estos: '${objectProperties.join(',')}'`)
            return new Array<String>();
        }
        const unique = Array.from(new Set(objects.map(item => item[`${distinct_by}`])));
        return unique;
    }
}
/**
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

  