//storing userDetails to localStorage

export const saveData = (state) => {
  try {
    const serialData = JSON.stringify(state);

    localStorage.setItem("userDetails", serialData);
  } catch (error) {
    console.log(error);
  }
};

//getting data from localStorge

export const getData = () => {
  try {
    const deSerialisedData = localStorage.getItem("userDetails");
    if (!deSerialisedData) {
      return null;
    }

    const userData = JSON.parse(deSerialisedData);
    return userData;
  } catch (error) {
    return null;
  }
};
