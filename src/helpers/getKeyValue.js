import { get } from 'lodash';

export const getKeyValue = (object, path, defaultValue) => { 
    return get(object, path, defaultValue);
}