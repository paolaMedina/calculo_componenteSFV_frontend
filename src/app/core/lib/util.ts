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