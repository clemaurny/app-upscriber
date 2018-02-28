import React from 'react';
import { Image }  from 'semantic-ui-react';
import UploadImage from './upload_image';
import 'semantic-ui-css/semantic.min.css';
import { Link } from 'react-router-dom';

export default class Upload extends React.Component {
  render() {
    return (
      <div class="wrapper">
        <div id="wrapper-text"></div>
        <div id="wrapper-image"></div>
      </div>
    );
  }
}
