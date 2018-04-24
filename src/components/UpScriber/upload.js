import React from 'react';
import ReactDOM from 'react-dom';

import { Image }  from 'semantic-ui-react';
import UploadImage from './upload_image';
import 'semantic-ui-css/semantic.min.css';
import { Link } from 'react-router-dom';
import CloudService from '../../services/api/CloudService';

export default class Upload extends React.Component {

  constructor (props){
    super(props);
  
    this.state = {
      inputValue: false
      };
  
    this.processImage = this.processImage.bind(this);
  
  }

  processImage(evt) {
    
    let inputValue  = document.getElementById('inputImage').value;
    let imageSource = document.getElementById('sourceImage').setAttribute('src',inputValue)
    let handwriting = document.getElementById('handwriting').checked; 
    console.log(handwriting);
    let pages = '';
     
    var sourceImageUrl = inputValue;
    let textContent = [];

    CloudService
    .create(sourceImageUrl, handwriting)
    .then((response) => {
     
      let pages = response.regions.map((regions) =>
              regions
         );
      let rows = pages.map((pages, index) =>
              pages.lines
            ); 
      let words = rows.forEach(function(row, index) { 
        let sentences = {"words":[]} 
              row.forEach(function(lineRow, i) {
                  let words = ""
                  lineRow.words.map(function(word,i) {
                    words+=word.text+ " "; 
                    })
                    sentences["words"].push(words); 
                  }) 
                  textContent.push(sentences);

              })
          
      }).then(function(){
        let finalStringMessage = [];

        let textContentLength = textContent.length;
        for(let i=0; i<textContentLength; i++){
          let wordsArray = textContent[i].words;
          let articleName = wordsArray.map((sentences, index) =>
                    <desc-sentence>{sentences}</desc-sentence>

            );
            finalStringMessage.push(<article>{articleName}</article>)

        }
         /* const documentView =
          textContent.map((sentences, index) =>
              <article>
                {sentences.words}
              </article>

          )*/
        
          console.log(finalStringMessage);

          ReactDOM.render(
            <section>{finalStringMessage}</section>,
            document.getElementById('texte-image')
          );
      });
   
  }
  render() {
    return (
      <div>
      <div id="wrapper-text">
      <h1>Analyze image:</h1>
      <p>
        Enter the URL to an image of a natural or artificial landmark, then click the <strong>Analyze image</strong> button.
      </p>

      <input type="text" name="inputImage" id="inputImage" placeholder="https://80d2853cc4def76b377d-54344bc01a8b066c84096a8e7a3499ac.ssl.cf1.rackcdn.com/original/700699.jpg" />
      <br/>
      <section id="handwritingBox">
        <label for="handwriting">hand writing</label>
        <input type="checkbox" id="handwriting" checked="false" />      
      </section>
      <button  onClick={this.processImage} id="analyzer">Analyze image</button>
    </div>

    <div id="wrapper-image">
        <div id="texte-image"></div>
        <div id="imageDiv">
            <img id="sourceImage" width="400" />
        </div>
    </div>
    <div id="document-view"></div>
    </div>
    );
  }
}
