export const serializeResource = (resource) => {
  const obj = {};
  for (const key of Object.keys(resource)) {
    resource[key].apply((value) => (obj[key] = value));
  }
  return obj;
};
