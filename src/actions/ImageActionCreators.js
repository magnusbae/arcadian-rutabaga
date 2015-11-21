import Dispatcher from '../core/Dispatcher';
import XhrUtil from '../utils/XhrUtil';
import ActionTypes from '../constants/ActionTypes';

let requests;

class ImageActionCreators {

  constructor(){
    requests = new XhrUtil();
  }

  deleteImage(id){
    requests
      .deleteImage(id)
      .then(function(){
        Dispatcher.dispatch({
          type: ActionTypes.DELETED_IMAGE,
          id: id,
        });
      });
  }
}

export default ImageActionCreators;
