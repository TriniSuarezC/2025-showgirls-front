import React from 'react'
import SectionCard from './SectionCard'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'
import { View } from 'react-native'
import { Text } from '@/components/ui/text'

interface ProjectionCardProps {
  title: string
  value: string
  hoverText: string
}

function ProjectionCard({ title, value, hoverText }: ProjectionCardProps) {
  return (
    <SectionCard className={'flex-1 m-0 p-4 border-2 '}>
      <HoverCard>
        <HoverCardTrigger>
          <Text className="text-muted-foreground text-[10px] text-center uppercase tracking-wider mb-1 font-medium">
            {title}
          </Text>
          <View className="flex-row items-center justify-center gap-1">
            <Text className={'text-center text-lg font-bold'}>{value}</Text>
          </View>
        </HoverCardTrigger>
        <HoverCardContent className="w-full border-0 rounded-[30px] p-6 justify-center bg-transparent shadow-none">
          <SectionCard>
            <Text className="text-sm text-muted-foreground mb-2 text-center">
              {hoverText}
            </Text>
          </SectionCard>
        </HoverCardContent>
      </HoverCard>
    </SectionCard>
  )
}

export default ProjectionCard
