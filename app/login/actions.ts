'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { Provider } from '@supabase/supabase-js'
import { getURL } from '@/utils/helpers'

export async function emailLogin(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  console.log(data)
  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login?message=Could not authenticate user')
  }

  revalidatePath('/', 'layout')
  redirect('/todos')
}

export async function signup(formData: FormData) {
  console.log('signup')
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  console.log(data)
  const { error } = await supabase.auth.signUp(data)
  console.log(error)

  if (error) {
    redirect('/login?message=Error signing up')
  }

  

  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function signout() {
  const supabase = createClient()

  await supabase.auth.signOut()
  redirect('/login')
}

export async function oAuthSignIn(provider: Provider) {
    if (!provider) {
      return redirect('/login?message=No Provider Selected')
    }

    const supabase = createClient()
    const redirectUrl = getURL('/auth/callback')
    const {error, data} = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectUrl
      }
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect(data.url)
}