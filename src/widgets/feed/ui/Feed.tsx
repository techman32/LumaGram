'use client'
import { useState } from 'react'
import { TabId } from '@/widgets/feed/lib/types'
import AllPostsList from '@/features/allPosts/ui/AllPostsList'

export default function Feed() {
  const [tab, setTab] = useState<TabId>('all')

  return <div>{tab === 'all' && <AllPostsList />}</div>
}
