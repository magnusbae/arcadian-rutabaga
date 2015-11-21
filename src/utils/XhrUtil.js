import request from 'superagent';


class XhrUtil {

  deleteImage(id){
    return new Promise(function(fulfill, reject){
      request
        .del('/api/images/' + id)
        .end((err) => {
          if(!err){
            console.log('Deleted image');
            fulfill();
          }else{
            console.log(err);
            reject(err);
          }
        });
    });
  }
}

export default XhrUtil;
