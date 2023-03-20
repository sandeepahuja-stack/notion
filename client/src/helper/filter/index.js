export const filterField = {
  checkbox: {
    does_not_equal: 'boolean',
    equals: 'boolean',
  },
  multi_select: {
    contains: 'string',
    does_not_contain: 'string',
    is_empty: 'true',
    is_not_empty: 'true',
  },
  rich_text: {
    contains: 'string',
    is_empty: 'true',
    is_not_empty: 'true',
    does_not_contain: 'string',
    ends_with: 'string',
    equals: 'string',
  },
  status: {
    does_not_equal: 'boolean',
    equals: 'boolean',
    is_empty: 'true',
    is_not_empty: 'true',
  },
  select: {
    does_not_equal: 'boolean',
    equals: 'boolean',
    is_empty: 'true',
    is_not_empty: 'true',
  },
  number: {
    does_not_equal: 'number',
    equals: 'number',
    greater_than: 'number',
    is_empty: 'true',
    is_not_empty: 'true',
  },
};