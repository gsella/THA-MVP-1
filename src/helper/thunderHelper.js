export const getThunderName = (thunders, thunderId) => {
  const findThunder = thunder => {
    return thunder.thunderKey === thunders.currentThunderKey;
  };
  const currentThunder = thunders.activeThunders.find(findThunder) || {};
  const thunderName = 'name' in currentThunder ? currentThunder.name : '';

  return thunderName;
};
