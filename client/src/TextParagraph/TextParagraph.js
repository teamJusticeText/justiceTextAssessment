import React, { useEffect, useState } from "react";
import "./TextParagraph.css";
import TextItem from '../TextItem'

function TextParagraph(props){
  const [paragraph, setParagraph] = useState([])

  useEffect(() => {
    const fetchParagraph = async () => {
      let paragraph = await fetch("/api/dataItem/" + props.i)
      paragraph = await paragraph.json();
      console.log(paragraph);
      setParagraph(paragraph)
    }

    fetchParagraph()
  }, [])


  return (
    <p key={`p${props.i}`}>
      {paragraph.map((textitem, index) => {
        if (props.searchInput.length > 0 && textitem.text.search(props.searchInput) === -1) {
            return null;
        }
        return (
            <>
                <TextItem key={`${props.i}${index}`} value={props.value} data={textitem} />
            </>
        );
      }
      )}
    </p>
  )

}

export default TextParagraph;