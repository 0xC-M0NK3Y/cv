import { Button } from "@codegouvfr/react-dsfr/Button"

function CV() {
    return  <div>
                <br/>
                <Button
                    style={{left: "50%", transform: "translate(-50%)",
                            position: "absolute"}}
                    linkProps={{href: "https://tim-web.fr/assets/cv.jpg"}}>
                    Télécharger
                </Button>
                <br/><br/><br/>
                <iframe src="/raw/cv.html" style={{ width: '100vw', height: '100vh' }} />
            </div>
}

export default CV
