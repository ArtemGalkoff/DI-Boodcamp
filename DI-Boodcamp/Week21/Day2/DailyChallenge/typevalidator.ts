function validateUnionType(value: any, allowedTypes: string[]): boolean {
    const valueType = typeof value;
    
    return allowedTypes.includes(valueType);
  }

const numberTest = 32;
const stringTest = "Hiiiiii";
const booleanTest = true;
const objectTest = { name: "John" };

console.log(validateUnionType(numberTest, ["string", "number"]));  
console.log(validateUnionType(stringTest, ["string", "boolean"]));  
console.log(validateUnionType(booleanTest, ["string", "number"]));  
console.log(validateUnionType(objectTest, ["object", "array"])); 