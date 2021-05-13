import { curry } from 'lodash/fp';

export default curry((item, array) => [...array, item]);
