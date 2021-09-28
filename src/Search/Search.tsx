import { TextField } from "@mui/material"
import React from "react"

export default function Search ({items}){
    const [search,setSearch] = React.useState<string>("")
    const [filtered,setFiltered] = React.useState<string>(items)
    return(
        <TextField id="standard-basic" label="write your keywords... e.g. #pdf #converter #resize" variant="standard" sx={{ width: "100%", mt: "20px" }} />
    )
}
