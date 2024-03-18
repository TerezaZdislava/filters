import { customers } from './api/customers';

export function createFilters(groups: number) {
  let errorMessage = '';

  // sort customers data by postal codes and convert these to number
  const modifiedData = customers.map((customer) => ({
    ...customer,
    psc: parseInt(customer.psc.replace(/\s/g, '')),
  }));
  modifiedData.sort((a, b) => a.psc - b.psc);

  // based on number of groups given by the user, find number of gaps between these groups
  let gaps = groups - 1;

  // create array of differences between sorted postal codes
  let differences = [];
  for (let i = 1; i < modifiedData.length; i++)
    differences.push(modifiedData[i].psc - modifiedData[i - 1].psc);
  differences.sort((a, b) => b - a);

  // find nth biggest difference based on user imput
  const difference = differences[gaps - 1];

  // separate data into expected number of groups, based on difference between postal codes
  const listOfCustomers = [[modifiedData[0]]];
  let last = modifiedData[0].psc;
  for (const item of modifiedData.slice(1)) {
    if (item.psc - last > difference - 1) listOfCustomers.push([]);
    listOfCustomers[listOfCustomers.length - 1].push(item);
    last = item.psc;
  }

  // create filters
  const filters: string[] = [];
  listOfCustomers.forEach((group) => {
    if (group[0].psc !== group.slice(-1)[0].psc) {
      filters.push(`postal codes ${group[0].psc} - ${group.slice(-1)[0].psc}`);
    } else filters.push(`postal codes ${group[0].psc}`);
  });

  // edge case: number of groups is bigger than number of customers
  if (groups > modifiedData.length) {
    errorMessage = `Number of groups is bigger than number of customers. Maximum is ${modifiedData.length} groups`;
    listOfCustomers.length = 0;
  }
  // edge case: more gaps than there are supposed to be
  if (listOfCustomers.length > groups) {
    errorMessage = `Invalid imput. Please select number ${listOfCustomers.length}`;
    // 'Your computer has been attacked by a virus. Throw it out from the window, now!!!';
  }

  return { listOfCustomers, errorMessage, filters };
}
