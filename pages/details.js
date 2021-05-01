import {useParams} from "react-router-dom"

export default function Details({props}) {
   // retrieve params into a variable
   const params = useParams()

   // print params to console
   console.log(params)

   return(
       <div>this is details page {params}</div>
   )
}