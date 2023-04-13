import { Alert } from "evergreen-ui"
import { ReactElement } from "react"

export default function UiAlert(props: any) {
    return <>
        {
            props.title &&
            <Alert intent={props.type} title={props.title}>
                {props.children}
            </Alert>
        }
    </>
}