export const getApi = async () => {
    const url = 'https://restcountries.com/v3.1/all';
    try {
        const response = await fetch(url);
        const data = await response.json();
        const modifiedData = data.map(item => ({
            code: item.alpha2Code,
            name: item.name,
            callingCode: `${item.callingCodes[0]}`,
            flag: `https://countryflagsapi.com/png/${item.name}`
        }));
        return modifiedData;
    } catch (error) {
        console.error('Error fetching data:', error);
        return []; // Return an empty array if an error occurs
    }
}
