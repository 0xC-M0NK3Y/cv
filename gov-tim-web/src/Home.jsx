import { useContext } from 'react'
import { Button } from "@codegouvfr/react-dsfr/Button"
import { AlertContext } from './Root'

function Home() {
    const { alerts, setAlerts } = useContext(AlertContext)
    
    return <div>
               <br/><br/>
               <h1>Site officiel du membre d'Etat français, ESCANDELL Timothee.</h1>
               <p>Ce site est entirement dédié à ce membre d'Etat</p>
               <br/><br/><br/><br/>
               <Button linkProps={{href: "https://github.com/0xC-M0NK3Y"}}>
                   GitHub
               </Button>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <Button linkProps={{href: "https://www.root-me.org/0xC_M0NK3Y"}}>
                   Root-Me
               </Button>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <Button onClick={() => {
                           console.log("click on button")
                           setAlerts(prevAlerts => [...prevAlerts, {
                               severity: "warning",
                               small: false,
                               title: "Oups",
                               description: "ESCANDELL Timothee ne possède aucun reseau social de ce type",
                           }])}}>
                   Instagram
               </Button>
               <br/><br/><br/><br/><br/><br/><br/>
           </div>
}

export default Home
