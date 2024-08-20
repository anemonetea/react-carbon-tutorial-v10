export const headers = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'createdAt',
    header: 'Created',
  },
  {
    key: 'updatedAt',
    header: 'Updated',
  },
  {
    key: 'issueCount',
    header: 'Open Issues',
  },
  {
    key: 'stars',
    header: 'Stars',
  },
  {
    key: 'links',
    header: 'Links',
  },
];

export const rows = (function() {
  const rowsArr = [];
  for (let i = 0; i < 12; i++) {
    rowsArr.push({
      id: `${i}`,
      name: `Repo ${i}`,
      createdAt: 'Date',
      updatedAt: 'Date',
      issueCount: '123',
      stars: '456',
      links: 'Links',
      description: 'Description',
    });
  }
  return rowsArr;
})();
