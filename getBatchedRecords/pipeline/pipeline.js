import { flow } from 'lodash/fp';

export default (data, ...functions) => flow(...functions)(data);
