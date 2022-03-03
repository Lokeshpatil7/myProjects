export const getFilterArr = (allData, columnName) => {
  if (!allData) return [];

  var flags = [],
    output = [],
    l = allData.length,
    i;
  for (i = 0; i < l; i++) {
    if (flags[allData[i][columnName]]) continue;
    flags[allData[i][columnName]] = true;
    output.push({
      text: allData[i][columnName],
      value: allData[i][columnName],
    });
  }

  return output;
};
