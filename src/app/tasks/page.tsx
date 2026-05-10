import React from 'react'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import TasksClient from '../../components/tasks/TasksClient'

export default async function TasksPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in?redirect_url=%2Ftasks')

  return <TasksClient />
}
