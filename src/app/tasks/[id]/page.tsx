import React from 'react'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import TaskPlayerClient from '../../../components/tasks/TaskPlayerClient'

export default async function TaskPlayer({ params }:{ params: { id: string } }){
  const { userId } = await auth()
  if (!userId) redirect(`/sign-in?redirect_url=%2Ftasks%2F${params.id}`)

  return <TaskPlayerClient id={params.id} />
}
