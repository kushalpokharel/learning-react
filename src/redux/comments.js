import {COMMENTS} from '../shared/comments';
import * as ActionTypes from './ActionTypes';
import DishDetail from '../components/DishdetailComponent';

export const Comments = (state=COMMENTS, action) =>{
  switch(action.type){

    case ActionTypes.ADD_COMMENT:
      const payload = action.type;
      const comment = action.payload;
      comment.id = state.length;
      comment.date = new Date().toISOString();
      return state.concat(comment);
        
    default :
      return state;
  }
};