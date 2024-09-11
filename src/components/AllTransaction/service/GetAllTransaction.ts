import { api } from '../../../setting/api/api'

export interface Transaction {
  id: number
  transactionHash: string
  method: string
  block: number
  timestamp: string
  from: string
  to: string
  tokentokenTransfer: string
  gasUsed: string
  gasPrice: string
}
export interface Meta {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  firstPage: number
}

export interface TransactionResponse {
  meta: Meta
  data: Transaction[]
}

export interface Pagination {
  pageNumber: number
  limitNumber: number
  address: string
}
export async function GetAllTransaction(pagination: Pagination) {
  const { pageNumber, limitNumber, address } = pagination
  return (
    await api.get<TransactionResponse>(`/transactions/all?page=${pageNumber}&limit=${limitNumber}&keyword=${address}`)
  ).data
}
