import { redirect } from 'next/navigation'

export default function HomePage() {
  // This will be handled by middleware, but adding redirect as backup
  redirect('/landing')
}