
export default function timeDifference (startDate: number): string {
  const timeTable = {
    'an': 3.1556926e10,
    'mois': 2.62974383e9,
    'semaine': 6048e5,
    'jour': 864e5,
    'heure': 36e5,
    'minute': 6e4,
  }  
  const deltaTime = Date.now() - startDate;
  
  for (let [key, value] of Object.entries(timeTable)) {
    let amount = Math.floor(deltaTime/value);
    if (amount >= 1) {
      let addAnS = key === "mois" ? "" : amount > 1 ? "s": "";
      return `Ajouté il y a ${amount} ${key}${addAnS}`
    }
  }
  return "Ajouté il y a moins de 1 minute"
}