const capitalizeSenten = (sentence) => {
    return sentence.substr(0, 1).toUpperCase() + sentence.slice(1);
  }
  
const abbreviat2Word = (word) => {
    const words = [
        {pos: "position"},
        {allow: "allowance"},
        {transp: "transport"},
        {tax: "taxable"},
        {tele: "Telephone"},
    ]

    const keys = word.split(" ");
    const newWord = [];

    keys.forEach(key => {
        for(let dict of words) {
        if (dict[key]) {
            newWord.push(dict[key]);
            return
        }
        }    
        newWord.push(key);
    });

    return newWord.join(" ");
}
export const convert2ExportData = (dataSource) => {
    const listOfData = [];
    const data = dataSource.map(item => ({...item, employee: item.employee.name}));

    data.forEach(element => {
        delete element["id"];
        delete element["payPeriod"];
        delete element["processed_date"];
        delete element["status"];

        element = Object.fromEntries(
        Object.entries(element).map(
            ([key, value]) => [
            capitalizeSenten(abbreviat2Word(key.replaceAll("_", " "))),
            value]));

        listOfData.push(element);   
    });

    return listOfData;
}