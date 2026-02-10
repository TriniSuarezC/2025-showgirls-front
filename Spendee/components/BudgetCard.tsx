import { BudgetResponse } from '@/services/budget.service'
import { router } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import SectionCard from './SectionCard'
import { Text } from './ui/text'
import useBudget from '@/hooks/useBudget'
import { TriangleAlert } from 'lucide-react-native'

interface BudgetCardProps {
  budget?: BudgetResponse
}

export default function BudgetCard({
  budget = {
    usuarioId: '',
    fechaInicio: new Date(),
    fechaFin: new Date(),
    monto: 0,
    PresupuestoCategoria: [],
    id: 0,
  },
}: BudgetCardProps) {
  const montoPresupuestado = budget?.monto
  const montoTotalGastado = budget?.PresupuestoCategoria.reduce(
    (acc, presupuestoCategoria) => acc + (presupuestoCategoria.gastado ?? 0),
    0,
  )
  const { currentBudget } = useBudget(budget.usuarioId ? budget.usuarioId : '')
  const budgetInDanger =
    currentBudget?.projection?.expenseOverBudget &&
    currentBudget.projection.expenseOverBudget > 100

  const montoRestante = (
    (montoPresupuestado ?? 0) - (montoTotalGastado ?? 0)
  ).toLocaleString('es-AR')
  const fechaInicio = new Date(budget?.fechaInicio!).toLocaleDateString(
    'es-ES',
    new Date(budget?.fechaInicio!).getFullYear() === new Date().getFullYear()
      ? { day: 'numeric', month: 'short' }
      : {},
  )
  const fechaFin = new Date(budget?.fechaFin!).toLocaleDateString(
    'es-ES',
    new Date(budget?.fechaInicio!).getFullYear() === new Date().getFullYear()
      ? { day: 'numeric', month: 'short' }
      : {},
  )
  const diasRestantes =
    new Date(budget.fechaFin) < new Date()
      ? 0
      : new Date(budget.fechaInicio) > new Date()
        ? new Date().getDate() - new Date(budget?.fechaInicio).getDate()
        : new Date(budget?.fechaFin).getDate() - new Date().getDate()
  const porcentajePresupuesto =
    ((montoTotalGastado ?? 0) / (montoPresupuestado ?? 0)) * 100

  const isCurrentBudget =
    new Date() >= new Date(budget?.fechaInicio!) &&
    new Date() <= new Date(budget?.fechaFin!)

  return (
    <SectionCard
      items="center"
      className="gap-[5px]"
      flex="row"
      justify="between"
      onPress={() =>
        router.push({
          pathname: '/budget/[id]',
          params: { id: budget.id },
        })
      }
    >
      <View>
        <View className="flex-row gap-2 items-center">
          <Text className="text-2xl font-semibold">
            ${montoPresupuestado.toLocaleString('es-AR')}
          </Text>
          <Text className="text-transparent">
            {budgetInDanger && isCurrentBudget && (
              <TriangleAlert color="red" size={18} strokeWidth={2.5} />
            )}
          </Text>
        </View>
        <Text className="text-lg text-muted-foreground">
          {fechaInicio} - {fechaFin}
        </Text>
        <Text className="text-base text-muted-foreground">
          {diasRestantes === 0
            ? `Gastado: ${montoTotalGastado.toLocaleString('es-AR', { maximumFractionDigits: 0 })}`
            : diasRestantes < 0
              ? `${-diasRestantes} días para comenzar`
              : `${diasRestantes} días restantes`}
        </Text>
      </View>
      <View className="items-center gap-2">
        <AnimatedCircularProgress
          fill={porcentajePresupuesto}
          size={90}
          width={10}
          rotation={270}
          tintColor={
            porcentajePresupuesto >= 100
              ? 'darkred'
              : porcentajePresupuesto >= 80 && porcentajePresupuesto < 100
                ? 'orange'
                : '#16a34a'
          }
          backgroundColor="#FFFFFF20"
          lineCap="round"
          children={() => (
            <Text
              className={`${porcentajePresupuesto >= 100 ? 'text-red-600' : porcentajePresupuesto >= 80 && porcentajePresupuesto < 100 ? 'text-orange-300' : 'text-green-600'} text-lg`}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {porcentajePresupuesto.toFixed(0)}%
            </Text>
          )}
        />
      </View>
    </SectionCard>
  )
}
