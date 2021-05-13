import {
  isGreaterThan,
  pipeline,
  size,
} from '../../functionalProgramming/functionalProgramming';

export default limit => batch => pipeline(batch, size, isGreaterThan(limit));
