"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function addTodo(formData: FormData) {
  const supabase = createClient()
  const text = formData.get("todo") as string
  console.log(text)
  if (!text) {
    throw new Error('Text required')
  }

  const {data : {user}} = await supabase.auth.getUser()
  console.log(user)

  if (!user) {
    throw new Error('You must log in.')
  }

  const {error, data} = await supabase.from("todos").insert({
    task: text,
    user_id: user.id
  })
  console.log(error)
  if (error) {
    throw new Error('Error adding task.')
  }

  revalidatePath('/todos')
}