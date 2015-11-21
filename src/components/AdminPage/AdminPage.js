/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './AdminPage.css';
import withStyles from '../../decorators/withStyles';
import ImageActionCretors from '../../actions/ImageActionCreators';

let ImageActions;

@withStyles(styles)
class AdminPage extends Component {

  static propTypes = {
    images: PropTypes.array.isRequired,
  };

  constructor(){
    super();
    ImageActions = new ImageActionCretors();
  }


  deleteImage(id){
    ImageActions.deleteImage(id);
  }

  render() {
    const images = this.props.images.map(function(image){
      return (
        <div key={"image_" + image.id} className="AdminPage-imageBox">
          <img src={"/api/images/" + image.id}/><br />
          <div className="AdminPage-buttonBox">
            <button onClick={this.deleteImage.bind(this, image.id)}>Slett bilde og rapporter til HR</button>
            <button onClick={this.deleteImage.bind(this, image.id)}>Send på e-post og slett bilde</button>
          </div>
        </div>
      );
    }, this);


    return (
      <div className="AdminPage">
        <div className="AdminPage-container">
          {images}
        </div>
      </div>
    );
  }

}

export default AdminPage;
