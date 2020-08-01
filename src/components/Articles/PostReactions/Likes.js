import React, { useState } from "react"
import { Emojione } from "react-emoji-render"
import { useScrollYPosition } from "react-use-scroll-position"
import { useDocumentOnce } from "react-firebase-hooks/firestore"
import { useWindowSize, useLocalStorage } from "../../../utils/customHooks"
import { useEffect } from "react"
import styled from 'styled-components';
import ReactGA from 'react-ga';

const LikesContainer = styled.div`
    display: flex;
    margin: 0.5rem;
`

const LikesWrapper = styled.div`
    width: 70px;
    flex-direction: row;
    text-align: center;
    display: flex;
    display: inline-block;
    padding-top: 1rem;
`

const ButtonWrapper = styled.div`
    margin: 0 !important;
    font-size: 3em !important;
    :active {
      animation: energy 0.4s infinite;
      @keyframes energy {
        0% {
          transform: scale (1, 1);
        }
        25% {
          transform: scale(0.9, 1.1);
        }
        50% {
          transform: scale(1.2, 0.8);
        }
        75% {
          transform: scale(0.95, 1.05);
        }
      }

    }
      
`
const Button = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    outline: inherit;
    margin: auto
`
const Emoji = styled(Emojione)`
    cursor: pointer;
`
const ButtonCounter = styled.p`
    text-align: center;
    margin: 0.5rem !important;
`

let firebase

if (typeof window !== "undefined") {
  firebase = require("firebase/app")
  require("firebase/firestore")
}

let buttonTypes = [
  { type: "fire", label: "🔥" },
  { type: "applause", label: "👏" },
  { type: "celebration", label: "🎉" },
]

const LikeButton = ({
  type,
  label,
  loading,
  value,
  normalisedValue,
  incrementLikes,
  decrementLikes,
  error,
  selected,
}) => {
  return (
    <LikesContainer>
      <LikesWrapper>
        <Button
          onClick={() =>
            selected(type) ? decrementLikes(type) : incrementLikes(type) 
          }
        >
          <ButtonWrapper>
            <Emoji 
              text={label} 
            />
          </ButtonWrapper>
        </Button>
        <ButtonCounter>
          {!loading && !error
            ? value.data() && value.data()[type]
              ? value.data()[type] + normalisedValue
              : 0 + normalisedValue
            : "..."}
        </ButtonCounter>
      </LikesWrapper>
    </LikesContainer>
  )
}

export default () => {
  const size = useWindowSize()
  const scrollY = useScrollYPosition()
  useEffect(() => {
    window.scrollTo(0, 1)
  }, [])
  const pathArray =
    typeof window !== "undefined"
      ? window.location.pathname.split("/")
      : ["test"]

  const contentID =
    pathArray[pathArray.length - 1].length > 0
      ? pathArray[pathArray.length - 1]
      : pathArray[pathArray.length - 2]
  const [value, loading, error] =
    typeof window !== "undefined"
      ? useDocumentOnce(firebase.firestore().doc(`likes/${contentID}`))
      : [0, true, false]
  const [normalisedValues, setNormalisedValues] = useState(
    buttonTypes.reduce((acc, cur) => {
      acc[cur.type] = 0
      return acc
    }, {})
  )
  const [likes, setLikes] = useLocalStorage("likes", {})

  const incrementLikes = (type) => {
    let contentLikes = likes && likes[contentID] ? likes[contentID] : {}
    if (!loading && !error && (!contentLikes[type] || contentLikes[type] < 1)) {
      setLikes({ ...likes, [contentID]: { ...contentLikes, [type]: 1 } })
      setNormalisedValues({
        ...normalisedValues,
        [type]: normalisedValues[type] + 1,
      })
      firebase
        .firestore()
        .collection("likes")
        .doc(contentID)
        .set(
          {
            [type]:
              value.data() && value.data()[type] ? value.data()[type] + 1 : 1,
          },
          { merge: true }
        )
        ReactGA.event({
          category: 'Reactions',
          action: 'Click',
          label: type
        })
    }
  }
  const decrementLikes = (type) => {
    let contentLikes = likes && likes[contentID] ? likes[contentID] : {}
    if (!loading && !error && contentLikes[type]) {
      setLikes({ ...likes, [contentID]: { ...contentLikes, [type]: 0 } })
      setNormalisedValues({
        ...normalisedValues,
        [type]: normalisedValues[type] - 1,
      })
      firebase
        .firestore()
        .collection("likes")
        .doc(contentID)
        .set(
          {
            [type]:
              value.data() && value.data()[type] ? value.data()[type] - 1 : 1,
          },
          { merge: true }
        )
    }
  }
  const isSelected = (type) =>
    likes &&
    likes[contentID] &&
    (likes[contentID][type] || likes[contentID][type] > 0)
  const Buttons = buttonTypes.map((item) => (
    <LikeButton
      type={item.type}
      title={item.type}
      alt={item.type}
      label={item.label}
      loading={loading}
      error={error}
      value={value}
      normalisedValue={normalisedValues[item.type]}
      contentID={contentID}
      incrementLikes={incrementLikes}
      decrementLikes={decrementLikes}
      selected={isSelected}
    />
  ))

  
    return (
      <div
        style={{
          textAlign: "center",
          justifyContent: "center",
          padding: "1.5rem 0 1rem 0",
          display: "flex",
        }}
      >
        {Buttons}
      </div>
    )}
  