"use client"

import { Fragment } from "react"
import { Lock } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ContactButton } from "@/components/contact-button"
import { PrivateButton } from "@/components/private-button"
import { useDarkMode } from "@/hooks/use-dark-mode"
import { useTranslation } from "@/hooks/use-translation"
import { cn } from "@/lib/utils"
import { ContactInfo, PrivateDataSectionProps } from "@/types/contact"
import { ApiContact } from "@/types/contact/api-contact"
import { mapApiTypeToContactType } from "@/lib/contact-mapper"

interface CardTabsProps {
  contact: ContactInfo
  apiContacts: ApiContact[]
  loading: boolean
  isVisible: boolean
  onEditContact?: (contactId: number) => void
}

function PrivateDataSection({ contact, isDark, t }: PrivateDataSectionProps) {
  return (
    <div className="space-y-3">
      {contact.password && (
        <PrivateButton
          type="password"
          value={contact.password}
          displayValue="••••••••"
        />
      )}
      {contact.privateNotes && (
        <PrivateButton
          type="privateNotes"
          value={contact.privateNotes}
        />
      )}
      {!contact.password && !contact.privateNotes && (
        <div className={cn(
          "w-full p-4 rounded-xl text-center",
          isDark ? "text-slate-400" : "text-gray-500"
        )}>
          {t("private")} {t("privateNotes").toLowerCase()}
        </div>
      )}
    </div>
  )
}

const LoadingState = ({ isDark, t }: { isDark: boolean; t: ReturnType<typeof useTranslation> }) => (
  <div className={cn(
    "w-full p-4 rounded-xl text-center",
    isDark ? "text-slate-400" : "text-gray-500"
  )}>
    {t("loading")}
  </div>
)

const renderContactItem = (
  apiContact: ApiContact,
  onEditContact?: (contactId: number) => void
) => {
  const typeLower = apiContact.type.toLowerCase()
  
  // Se for password ou privateNotes, usar PrivateButton
  if (typeLower === "password" || typeLower === "privatenotes" || typeLower === "private_notes") {
    return (
      <PrivateButton
        type={typeLower === "password" ? "password" : "privateNotes"}
        value={apiContact.value}
        label={apiContact.label}
        displayValue={typeLower === "password" ? "••••••••" : undefined}
        contactId={apiContact.id}
        onEdit={onEditContact}
      />
    )
  }
  
  // Tentar mapear para ContactButton
  const contactType = mapApiTypeToContactType(apiContact.type)
  if (contactType) {
    return (
      <ContactButton
        type={contactType}
        value={apiContact.value}
        label={apiContact.label}
        contactId={apiContact.id}
        onEdit={onEditContact}
      />
    )
  }
  
  // Fallback: usar PrivateButton como padrão
  return (
    <PrivateButton
      type="privateNotes"
      value={apiContact.value}
      label={apiContact.label || apiContact.type}
      contactId={apiContact.id}
      onEdit={onEditContact}
    />
  )
}

const PublicContactsList = ({ 
  apiContacts, 
  contact,
  onEditContact
}: { 
  apiContacts: ApiContact[]
  contact: ContactInfo
  onEditContact?: (contactId: number) => void
}) => {
  const publicContacts = apiContacts.filter(c => c.is_public === true || c.is_public === "true")
  
  if (publicContacts.length === 0) {
    return (
      <>
        {contact.email && <ContactButton type="email" value={contact.email} />}
        {(contact.phone || contact.whatsapp) && (
          <ContactButton 
            type={contact.whatsapp ? "whatsapp" : "phone"} 
            value={contact.whatsapp || contact.phone || ""} 
          />
        )}
        {contact.website && <ContactButton type="website" value={contact.website} />}
        {contact.address && <ContactButton type="address" value={contact.address} />}
      </>
    )
  }

  return (
    <div className="space-y-3">
      {publicContacts.map((apiContact) => (
        <Fragment key={apiContact.id}>
          {renderContactItem(apiContact, onEditContact)}
        </Fragment>
      ))}
    </div>
  )
}

const PrivateContactsList = ({ 
  apiContacts, 
  contact,
  onEditContact
}: { 
  apiContacts: ApiContact[]
  contact: ContactInfo
  onEditContact?: (contactId: number) => void
}) => {
  const isDark = useDarkMode()
  const t = useTranslation()
  const privateContacts = apiContacts.filter(c => c.is_public === false || c.is_public === "false" || !c.is_public)

  if (privateContacts.length === 0) {
    return <PrivateDataSection contact={contact} isDark={isDark} t={t} />
  }

  return (
    <div className="space-y-3">
      {privateContacts.map((apiContact) => (
        <Fragment key={apiContact.id}>
          {renderContactItem(apiContact, onEditContact)}
        </Fragment>
      ))}
    </div>
  )
}

export const CardTabs = ({ contact, apiContacts, loading, isVisible, onEditContact }: CardTabsProps) => {
  const isDark = useDarkMode()
  const t = useTranslation()

  return (
    <Tabs defaultValue="public" className={cn(
      "mb-6 transition-all duration-700 delay-500",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    )}>
      <TabsList className={cn(
        "w-full grid grid-cols-2 p-1",
        isDark ? "bg-slate-800/50" : "bg-slate-100/50"
      )}>
        <TabsTrigger 
          value="public" 
          className={cn(
            "transition-all",
            isDark 
              ? "data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400" 
              : "data-[state=active]:bg-white data-[state=active]:text-gray-900 text-gray-600"
          )}
        >
          {t("public")}
        </TabsTrigger>
        <TabsTrigger 
          value="private" 
          className={cn(
            "transition-all",
            isDark 
              ? "data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400" 
              : "data-[state=active]:bg-white data-[state=active]:text-gray-900 text-gray-600"
          )}
        >
          <Lock className="h-4 w-4 mr-2" />
          {t("private")}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="public" className="mt-4">
        <div className="space-y-3">
          {loading ? (
            <LoadingState isDark={isDark} t={t} />
          ) : (
            <PublicContactsList apiContacts={apiContacts} contact={contact} onEditContact={onEditContact} />
          )}
        </div>
      </TabsContent>

      <TabsContent value="private" className="mt-4">
        {loading ? (
          <LoadingState isDark={isDark} t={t} />
        ) : (
          <PrivateContactsList apiContacts={apiContacts} contact={contact} onEditContact={onEditContact} />
        )}
      </TabsContent>
    </Tabs>
  )
}

