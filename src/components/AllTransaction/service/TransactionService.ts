import { ethers } from 'ethers'

export function convertUTCToLocal(utcDateString: string, offsetHours: number): string {
  const utcDate = new Date(utcDateString)

  const localDate = new Date(utcDate.getTime() + offsetHours * 60 * 60 * 1000)

  const localDateString = localDate.toISOString().replace('Z', `+${offsetHours.toString().padStart(2, '0')}:00`)

  const [datePart, timePart] = localDateString.split('T')
  const [timeWithoutTZ] = timePart.split('+')

  return `${datePart} ${timeWithoutTZ}`
}
export function formatTxnFee(gasUsed: string, gasPrice: string): string {
  const gasUsedBN = BigInt(gasUsed)
  const gasPriceBN = BigInt(gasPrice)
  const txnFee = gasUsedBN * gasPriceBN

  return ethers.formatUnits(txnFee.toString(), 18)
}
