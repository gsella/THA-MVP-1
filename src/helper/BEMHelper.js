import BEMHelper from 'react-bem-helper';

export const getBEMClasses = classes => {
  const BEMClasses = classes.map(
    className =>
      new BEMHelper({
        name: className,
        outputIsString: true
      })
  );
  return (element, modifier) =>
    BEMClasses.map(BEMClass => BEMClass(element, modifier)).join(' ');
};
