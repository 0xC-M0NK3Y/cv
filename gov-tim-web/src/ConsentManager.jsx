import { useContext } from 'react'
import { createConsentManagement } from "@codegouvfr/react-dsfr/consentManagement"
import { AlertContext } from './Root'

var g_setAlerts = null

// dumy component to have acces to alertcontext
export function ConsentManager() {
    const { alerts, setAlerts } = useContext(AlertContext)

    g_setAlerts = setAlerts
    
    return <></>
}

export const { 
    ConsentBannerAndConsentManagement, 
    FooterConsentManagementItem, 
    FooterPersonalDataPolicyItem,
    useConsent
} = createConsentManagement({
    "finalityDescription": ({ lang }) => ({
        "Méchants": {
            "title": "Méchants",
            "description": "Nous utilisons des cookies empoisonnés pour vous faire un maximum de mal."
        },
    }),
    "personalDataPolicyLinkProps": {
        "href": "/politique-de-confidentialite",
    },
    "consentCallback": async ({ finalityConsent, finalityConsent_prev })=> {
        console.log(finalityConsent)
        if (finalityConsent_prev === undefined && finalityConsent.isFullConsent == false) {
            g_setAlerts(prevAlerts => [...prevAlerts, {
                severity: "success",
                small: false,
                title: "Bien joué",
                description: "Tu as bien refusé les cookies, la gourmandise est un peché.",
            }])
        } else if (finalityConsent_prev === undefined && finalityConsent.isFullConsent == true) {
            g_setAlerts(prevAlerts => [...prevAlerts, {
                severity: "error",
                small: false,
                title: "Oh non !",
                description: "Tu as accepté les cookies, la gourmandise est un peché !",
            }])
        }
    }
})
