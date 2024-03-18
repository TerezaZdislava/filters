import { customers } from '../src/api/customers';
import { createFilters } from '../src/filters';

describe('customers', () => {
  it('19 customers', () => {
    expect(customers.length).toEqual(19);
  });
});

describe('filters', () => {
  it('check filters for 2 groups of postal codes ', () => {
    const userImput = 2;
    const { listOfCustomers, errorMessage, filters } = createFilters(userImput);
    expect(filters).toEqual([
      'postal codes 10400 - 19300',
      'postal codes 30100 - 36452',
    ]);
    expect(errorMessage).toEqual('');
  });
});
