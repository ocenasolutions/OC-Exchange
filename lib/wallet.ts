import { getDatabase } from "./mongodb"

export interface WalletBalance {
  _id?: string
  userId: string
  symbol: string
  balance: number
  availableBalance: number
  lockedBalance: number
  updatedAt: Date
}

export interface Transaction {
  _id?: string
  userId: string
  type: "deposit" | "withdrawal" | "trade" | "transfer"
  symbol: string
  amount: number
  status: "pending" | "completed" | "failed" | "cancelled"
  txHash?: string
  fromAddress?: string
  toAddress?: string
  fee?: number
  createdAt: Date
  updatedAt: Date
}

export async function getUserBalances(userId: string): Promise<WalletBalance[]> {
  try {
    const db = await getDatabase()
    const balances = db.collection<WalletBalance>("wallet_balances")

    const userBalances = await balances.find({ userId }).toArray()

    return userBalances.map((balance) => ({
      ...balance,
      _id: balance._id!.toString(),
    }))
  } catch (error) {
    console.error("Get user balances error:", error)
    return []
  }
}

export async function updateBalance(
  userId: string,
  symbol: string,
  amount: number,
  type: "add" | "subtract" | "lock" | "unlock",
): Promise<{ success: boolean; error?: string }> {
  try {
    const db = await getDatabase()
    const balances = db.collection<WalletBalance>("wallet_balances")

    const session = db.client.startSession()

    try {
      await session.withTransaction(async () => {
        let balance = await balances.findOne({ userId, symbol }, { session })

        if (!balance) {
          balance = {
            userId,
            symbol,
            balance: 0,
            availableBalance: 0,
            lockedBalance: 0,
            updatedAt: new Date(),
          }
        }

        switch (type) {
          case "add":
            balance.balance += amount
            balance.availableBalance += amount
            break
          case "subtract":
            if (balance.availableBalance < amount) {
              throw new Error("Insufficient balance")
            }
            balance.balance -= amount
            balance.availableBalance -= amount
            break
          case "lock":
            if (balance.availableBalance < amount) {
              throw new Error("Insufficient available balance")
            }
            balance.availableBalance -= amount
            balance.lockedBalance += amount
            break
          case "unlock":
            if (balance.lockedBalance < amount) {
              throw new Error("Insufficient locked balance")
            }
            balance.lockedBalance -= amount
            balance.availableBalance += amount
            break
        }

        balance.updatedAt = new Date()

        await balances.replaceOne({ userId, symbol }, balance, { upsert: true, session })
      })

      return { success: true }
    } finally {
      await session.endSession()
    }
  } catch (error) {
    console.error("Update balance error:", error)
    return { success: false, error: error instanceof Error ? error.message : "Failed to update balance" }
  }
}

export async function createTransaction(
  transactionData: Omit<Transaction, "_id" | "createdAt" | "updatedAt">,
): Promise<{ success: boolean; transaction?: Transaction; error?: string }> {
  try {
    const db = await getDatabase()
    const transactions = db.collection<Transaction>("transactions")

    const newTransaction: Transaction = {
      ...transactionData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await transactions.insertOne(newTransaction)

    return {
      success: true,
      transaction: { ...newTransaction, _id: result.insertedId.toString() },
    }
  } catch (error) {
    console.error("Create transaction error:", error)
    return { success: false, error: "Failed to create transaction" }
  }
}

export async function getUserTransactions(userId: string): Promise<Transaction[]> {
  try {
    const db = await getDatabase()
    const transactions = db.collection<Transaction>("transactions")

    const userTransactions = await transactions.find({ userId }).sort({ createdAt: -1 }).limit(100).toArray()

    return userTransactions.map((transaction) => ({
      ...transaction,
      _id: transaction._id!.toString(),
    }))
  } catch (error) {
    console.error("Get user transactions error:", error)
    return []
  }
}
