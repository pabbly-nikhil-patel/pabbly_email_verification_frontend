/**
 * Filters rows dynamically based on specified fields and search value.
 * @param {Array} rows - The array of data rows to be filtered.
 * @param {string} searchValue - The search query.
 * @param {Array} fields - Array of field names to search within.
 * @returns {Array} Filtered rows.
 */
export const searchRows = (rows, searchValue, fields) => {
  if (!searchValue) return rows;

  const normalizedSearchValue = searchValue.toLowerCase();

  return rows.filter((row) =>
    fields.some((field) => row[field]?.toString().toLowerCase().includes(normalizedSearchValue))
  );
};
