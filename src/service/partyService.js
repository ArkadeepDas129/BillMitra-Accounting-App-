import {

  ref,
  push,
  get

}
from "firebase/database"

import {
  db
}
from "../firebase"

/* SAVE PARTY */

export async function saveParty(

  companyId,

  partyData

) {

  const partyRef = ref(

    db,

    `companies/${companyId}/parties`
  )

  await push(

    partyRef,

    partyData
  )
}

/* GET PARTIES */

export async function getParties(

  companyId

) {

  const partyRef = ref(

    db,

    `companies/${companyId}/parties`
  )

  const snapshot =
    await get(partyRef)

  if (
    snapshot.exists()
  ) {

    return Object.values(

      snapshot.val()
    )
  }

  return []
}