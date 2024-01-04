

import { getBestPhysician } from "@/services/physicians/physician"
import HomePage from "@templates/HomePage"



export default async function Home() {
  const res = await getBestPhysician(0, 0, 1, 12)

  console.log(res ,"Asdfasdf")

  return (
    <HomePage physicians={res} />
  )
}
