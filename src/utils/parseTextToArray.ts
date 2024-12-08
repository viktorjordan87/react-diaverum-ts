export const parseTextToArray = (encodedText: string) => {
  //split the text into an array of texts
  const textArray = encodedText.split("\r\n");

  //get the length of the array
  const length = textArray.length;

  //get the keys of the object
  const keys = textArray.at(3)?.split("|");

  //get the values of the object of the textArray
  const valuesText = textArray.slice(4, length - 1);

  const values = valuesText.map((value) => {
    return value.split("|");
  });

  if (!keys || !values) {
    return [];
  }

  // Define a type for the resulting object
  type ResultObject = { [key: string]: string };

  //create an array of objects
  const arrayOfObjects = values.map((value) => {
    const obj = keys.reduce((acc, key, index) => {
      acc[key] = value[index];
      return acc;
    }, {} as ResultObject);
    return obj;
  });

  return arrayOfObjects;
};
