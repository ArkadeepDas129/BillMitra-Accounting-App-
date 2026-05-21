import {
  ref,
  push,
  get,
  set
}
from "firebase/database"

import {
  db
}
from "../firebase"

export async function saveLedgerEntry(
  companyId,
  ledgerName,
  entry
) {

  const ledgerRef = ref(
    db,
    `companies/${companyId}/ledgers/${ledgerName}`
  )

  await push(
    ledgerRef,
    entry
  )
}

export async function getLedger(
  companyId,
  ledgerName
) {

  const ledgerRef = ref(
    db,
    `companies/${companyId}/ledgers/${ledgerName}`
  )

  const snapshot = await get(
    ledgerRef
  )

  if (snapshot.exists()) {
    return snapshot.val()
  }

  return {}
}
