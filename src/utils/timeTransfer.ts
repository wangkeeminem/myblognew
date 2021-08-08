import monthTable from "./monthTable";

export default function(date:Date){
  const day = date.getDate()
  const month = monthTable[date.getMonth()]
  const year = date.getFullYear()
  return {day,month,year}
}

