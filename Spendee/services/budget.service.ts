import ApiService from './api.service'

export interface BudgetCategoryResponse {
  categoriaId: number
  monto: number
  gastado: number
  porcentaje: number
}

export interface BudgetProjectionResponse {
  actualExpense: number
  daysPassed: number
  totalDays: number
  dailyAverageExpense: number
  projectedTotalExpense: number
  expenseOverBudget: number
}

export interface BudgetResponse {
  id: number
  usuarioId: string
  monto: number
  fechaInicio: Date
  fechaFin: Date
  PresupuestoCategoria: BudgetCategoryResponse[]
  projection?: BudgetProjectionResponse
}

export interface BudgetHistoricalStats {
  budgetId: number
  totalSpent: number
  totalDays: number
  avgDailySpent: number
}

export interface BudgetGroupResponse {
  futureBudgets: BudgetResponse[]
  currentBudget: BudgetResponse
  pastBudgets: BudgetResponse[]
  allBudgetDates: Date[]
  stats: {
    historical: BudgetHistoricalStats[]
  }
}

class BudgetService {
  public async createBudget(body: BudgetResponse) {
    return await ApiService.post('/budget', body)
  }
  public async getBudget(userId: string) {
    return await ApiService.get<BudgetGroupResponse>(
      `/budget?usuarioId=${userId}`,
    )
  }
  public async deleteBudget(budgetId: number) {
    return await ApiService.delete(`/budget/${budgetId}`)
  }
  public async modifyBudget(budgetId: number, body: Partial<BudgetResponse>) {
    return await ApiService.put(`/budget/${budgetId}`, body)
  }
  public async findByBudgetId(budgetId: number) {
    return await ApiService.get<BudgetResponse>(`/budget/${budgetId}`)
  }

  public async getBudgetProjection(budgetId: number) {
    return await ApiService.get<BudgetProjectionResponse>(
      `/budget/${budgetId}/projection`,
    )
  }
}

const budgetService = new BudgetService()
export default budgetService
