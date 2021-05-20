
const calculateProductPrice = (cartItems) => {
  return cartItems.reduce((acc, item) => {
    return acc + item.count * ( 
      calculateByFormula(item)
    )
  },0)
}
  
const calculateByFormula = (item) =>{
  const LIGHT = "LIGHT";
  const MUITA_CARNE = "MUITA_CARNE";
  const MUITO_QUEIJO = "MUITO_QUEIJO";
  const INFLACAO = "INFLACAO";
  
  const totalPrice = item.ingredientList.reduce((acc2, ingredient) => {
    return acc2 + ingredient.price * ingredient.quantity
  },0)
  let discount = 0;
  switch(item.sale){
    case LIGHT:
      const hasAlface = item.ingredientList.some(ing => ing.name === "Alface" && ing.quantity > 0);
      const hasBacon = item.ingredientList.some(ing => ing.name === "Bacon" && ing.quantity > 0);
      if(hasAlface && !hasBacon){
        return totalPrice - totalPrice * 0.1; 
      } else {
        return totalPrice;
      }
    case MUITA_CARNE:
      const meat = item.ingredientList.find(ing => ing.id === 2);
      discount = Math.floor(meat.quantity / 3);
      return totalPrice - discount * meat.price;
    case MUITO_QUEIJO:
      const cheese = item.ingredientList.find(ing => ing.id === 4);
      discount = Math.floor(cheese.quantity / 3);
      return totalPrice - discount * cheese.price;
    case INFLACAO:
      break;
    default:
      return totalPrice;
  }
}
export {calculateProductPrice, calculateByFormula};
