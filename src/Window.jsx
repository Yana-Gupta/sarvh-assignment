import React, { useState, useEffect } from "react"
import { FixedSizeList as List } from "react-window"

const ReactWindow = () => {
  const [photos, setPhotos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)

  const fetchPhotos = async () => {
    try {
      setIsLoading(true)
      const apiKey1 = "-MzWcXyjWv_T_68q584q_fcCnT5ra6B31c4EL5vmx04"

      const apiKey = "SRm2T7oOp35dpvfxGRZ8ID-xzXIPuGSxdpcZNY3XGwE"

      const response = await fetch(
        `https://api.unsplash.com/photos?client_id=${apiKey1}&page=${page}&per_page=10`
      )
      console.log(response)

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`)
      }

      const data = await response.json()
      console.log(data)

      if (data.length === 0) {
      } else {
        setPhotos((prevPhotos) => [...prevPhotos, ...data])
        setPage(page + 1)
      }
    } catch (error) {
      console.error("Error fetching photos:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleScroll = (e) => {
    const container = e.target
    console.log("at the end of the scrollbar")

    console.log(e)

    if (
      container.scrollTop + container.clientHeight >=
      container.scrollHeight
    ) {
      fetchPhotos()
    }
  }

  useEffect(() => {
    fetchPhotos()
  }, [])

  return (
    <div
      onScrollCapture={handleScroll}
      style={{ overflowY: "scroll", height: "100vh" }}
    >
      <List
        itemData={photos}
        itemCount={photos.length}
        itemSize={400}
        height={window.innerHeight - (10 * window.innerHeight) / 100}
        width="100%"
      >
        {({ index, style }) => (
          <div style={style}>
            {photos[index] ? (
              <div>
                <img
                  height={"300px"}
                  src={photos[index].urls.small}
                  alt={photos[index].alt_description}
                />
                <p> Taken by : {photos[index].user.username}</p>
                <p>{photos[index].alt_description}</p>
              </div>
            ) : (
              "Loading..."
            )}
          </div>
        )}
      </List>
    </div>
  )
}

export default ReactWindow
