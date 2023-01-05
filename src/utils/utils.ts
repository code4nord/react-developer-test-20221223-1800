const formatDate = (date: Date): string => {
  return new Date(date).toISOString().split('T')[0];
};

const SortbyOldestFirst = (array: any[]): any[] => {
  return array.sort(function (a, b) {
    return new Date(a.timestamp).valueOf() - new Date(b.timestamp).valueOf();
  });
};

const SortbyNewestFirst = (array: any[]): any[] => {
  return array.sort(function (a, b) {
    return new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf();
  });
};

export { SortbyNewestFirst, SortbyOldestFirst, formatDate };
