import { useEffect, useState } from "react"
import "./locations.css"
export const LocationList = () => {
    const [locations, setLocations] = useState([])
    

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
            .then(response => response.json())
            .then((locationArray) => {
              setLocations(locationArray)
            })
        },
        [] // When this array is empty, you are observing initial component state
    )

    
    return <>
    <h2>Store Locations</h2>

    <article className="locations">
    {
      locations.map(
      (location) => {
        return <section className="location" key={`location--${location.id}`}>
          <ul className="location--list">{location.address}, {location.squareFootage} sq. ft.</ul>
        </section>
      }
      )
    }
    </article>
    </>
}
