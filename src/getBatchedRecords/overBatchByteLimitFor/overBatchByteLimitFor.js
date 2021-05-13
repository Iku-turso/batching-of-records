import {
  isGreaterThan,
  pipeline,
  sumBy,
} from '../../functionalProgramming/functionalProgramming';

import byteCount from '../getByteCount/getByteCount';

export default limit => batch =>
  pipeline(batch, sumBy(byteCount), isGreaterThan(limit));
