import { BusinessCard } from "@/components/business-card"
import { contactData } from "@/lib/contact-data"

export default function Home() {
  return <BusinessCard contact={contactData} />
}
