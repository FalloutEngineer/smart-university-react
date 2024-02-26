import React, { useEffect, useState } from "react"
import Layout from "../components/Layout/Layout"
import ImageSlider from "../components/ImageSlider/ImageSlider"
import FacultiesHero from "../components/faculties/FacultiesHero"
import FacultiesGrid from "../components/faculties/FacultiesGrid"
import FacultiesCard from "../components/faculties/FacultiesCard"

const API_URL = process.env.REACT_APP_API_URL

const facultiesPageAPI = API_URL + `/api/facultiesPage`

const cardsAPI = API_URL + "/api/facultyCard"

export default function Faculties() {
  const [facultyPage, setFacultyPage] = useState({
    heading: `ФАКУЛЬТЕТИ`,
    description: `При ХДУ існує 9 факультетів. Якщо ви уважно вивчите спеціалізації та наукові напрямки різних факультетів, то знайдете багато спільного.
Це не дивно: розвиток наукових напрямків на багатьох факультетах проходить паралельно. Так що близькі вашим прагненням (інтересам) наукові
напрямки ви зможете знайти відразу на кількох факультетах.
Безумовно, кожен факультет відрізняє своя конкретна спеціалізація, але це вже тонкощі, які ви зможете збагнути, ставши студентами, і уточнити свій вибір.`,
    images: ["/img/4.jpg"],
  })

  const [slides, setSlides] = useState([{ url: "/img/1.jpg", caption: "" }])

  const [cards, setCards] = useState([])

  useEffect(() => {
    const fetchFacultiesPage = async () => {
      const response = await fetch(facultiesPageAPI)

      try {
        const json = await response.json()

        if (response.ok) {
          console.log("faculties: ", json)

          setFacultyPage(json)
          console.log("jimages:", json.images)

          const readyImages =
            json.images.length > 0
              ? json.images.map((image: string) => {
                  return { url: image, caption: "" }
                })
              : [{ url: "/img/1.jpg", caption: "" }]

          setSlides(readyImages)

          console.log(slides)
        } else {
          console.error(response.status, response.text)
        }
      } catch (e) {
        console.error(e)
      }
    }

    fetchFacultiesPage()
  }, [])

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(cardsAPI)

        const data = await response.json()

        setCards(data)

        console.log("cards: ", cards)
      } catch (e) {
        //TODO: TOAST?
        console.error(e)
      }
    }

    fetchCards()
  }, [])

  const sliderWrapperStyles = {
    width: "100vw",
    minHeight: "600px",
    height: "100vh",
    margin: "0 auto",
    position: "relative",
  } as React.CSSProperties
  return (
    <Layout>
      <div style={sliderWrapperStyles} className="slider-wrapper">
        <ImageSlider
          slides={slides}
          sliderParams={{
            isAutoplay: false,
            isInfinite: false,
          }}
        />
        <FacultiesHero
          heading={facultyPage.heading}
          text={facultyPage.description}
        />
      </div>

      <FacultiesGrid>
        {/* TODO: Auto generate from array, todotodo: generate from array that returns from server*/}
        {cards.map((card) => {
          return <FacultiesCard params={card} />
        })}
      </FacultiesGrid>
    </Layout>
  )
  {
    /* <script src="/js/page.js"></script> */
  }
}
