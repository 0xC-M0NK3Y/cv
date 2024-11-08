import { useState, createContext, Fragment } from 'react';
import { Header } from "@codegouvfr/react-dsfr/Header"
import { Footer } from "@codegouvfr/react-dsfr/Footer"
import { Alert } from "@codegouvfr/react-dsfr/Alert";
import { headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display"
import { useLocation } from 'react-router-dom'
import { 
    ConsentBannerAndConsentManagement, 
    FooterConsentManagementItem, 
    FooterPersonalDataPolicyItem,
    ConsentManager,
} from "./ConsentManager";

export const AlertContext = createContext()

function Root({children}) {
    const location = useLocation()
    const [alerts, setAlerts] = useState([])
    
    return (<>
                <AlertContext.Provider value={{ alerts, setAlerts }}>
                    <ConsentManager />
                   <ConsentBannerAndConsentManagement />
                   <Header
                       brandTop={<>INTITULE<br />OFFICIEL</>}
                       serviceTitle="ESCANDELL Timothee / Membre de l'état Français"
                       homeLinkProps={{
                           "to": "/",
                       }}
                       quickAccessItems={[
                           headerFooterDisplayItem,
                           {
                               iconId: "ri-mail-line",
                               linkProps: {
                                   to: `mailto:${"timothee.escandell@gmail.com"}`,
                               },
                               text: "Nous contacter",
                           }
                       ]}
                       navigation={[
                           {
                               "text": "Home",
                               "linkProps": {
                                   "to": "/"
                               },
                               "isActive": location.pathname === "/"
                           },
                           {
                               "text": "CV",
                               "linkProps": {
                                   "to": "/cv"
                               },
                               "isActive": location.pathname === "/cv"
                           }
                       ]}
                   />
                   <div style={{display: "flex",
                                flexDirection: "column",
                                alignItems: "center"}}>
                       {alerts.map((a, index)=> (
                           <Fragment key={index}>
                               <br/>
                               <Alert
                                   severity={a.severity}
                                   small={a.small || false}
                                   title={a.title}
                                   description={a.description}
                                   closable={true}
                               ></Alert>
                           </Fragment>
                       ))}
                       {children}
                   </div>
                   <Footer
                       accessibility="fully compliant"
                       contentDescription={"Ce site est géré par le Service d'Information de ESCANDELL Timothee (SIET)."}
                       bottomItems={[
                           headerFooterDisplayItem,
                           <FooterPersonalDataPolicyItem />,
                           <FooterConsentManagementItem />
                       ]}
                   />
               </AlertContext.Provider>
            </>)
}

export default Root
