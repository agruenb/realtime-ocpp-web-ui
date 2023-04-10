import { Pane } from "evergreen-ui";

export default function RoutePage(props:any){
    return <Pane padding={32} maxWidth={1024 - 240}>
        {props.children}
    </Pane>
}