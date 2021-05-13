import {
  isGreaterThan,
  pipeline,
} from '../../functionalProgramming/functionalProgramming';

import byteCount from '../getByteCount/getByteCount';

export default limit => record =>
  pipeline(record, byteCount, isGreaterThan(limit));
