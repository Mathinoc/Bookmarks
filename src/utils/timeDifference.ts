  const timeTable = {
    'an': 3.1556926e10,
    'mois': 2.62974383e9,
    'semaine': 6048e5,
    'jour': 864e5,
    'heure': 36e5,
    'minute': 6e4,
  }  
export function timeDifference (startDate: number): {deltaTime:number, formatted: string} {
  const deltaTime = Date.now() - startDate;
  
  for (let [key, value] of Object.entries(timeTable)) {
    let amount = Math.floor(deltaTime/value);
    if (amount >= 1) {
      let addAnS = key === "mois" ? "" : amount > 1 ? "s": "";
      return {deltaTime: deltaTime, formatted:`Ajouté il y a ${amount} ${key}${addAnS}`}
    }
  }
  return {deltaTime: deltaTime, formatted: "Ajouté il y a moins de 1 minute"}
}

export function updateInterval (deltaTime: number): number {

  for (let value in timeTable) {
    let amount = Math.floor(deltaTime/timeTable[value as keyof typeof timeTable]);
    if (amount >= 1) {
      return timeTable[value as keyof typeof timeTable]
    }
  }
  return 60000
}