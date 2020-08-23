import React,{Component} from 'react';
import {Card,CardImg,CardTitle,CardBody,CardText, CardGroup,BreadcrumbItem,Breadcrumb} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Button, Modal, ModalHeader, ModalBody,
  Label, Row} from 'reactstrap';

import {LocalForm, Control, Errors} from 'react-redux-form';

const minLength = (len) => (val) => val && val.length>=len
const maxLength = (len) => (val) => !val || val.length<=len

class CommentForm extends Component
{
  constructor(props){
    super(props);

    this.state={
      isModalOpen:false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal(){
    this.setState({
      isModalOpen : !this.state.isModalOpen
    })
  }

  handleSubmit(values) {
    // console.log('Current State is: ' + JSON.stringify(values));
    alert('Current State is: ' + JSON.stringify(values));
    this.toggleModal();
    // event.preventDefault();
  }

  render(){
    return(

      <React.Fragment>
        <Button outline onClick={this.toggleModal}><span className="fa fa-edit fa-lg"></span> Submit Comment</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>Submit  Comment</ModalHeader>
              <ModalBody>
                <LocalForm onSubmit={this.handleSubmit}>
                  <div className ="container">
                    <Row className="form-group">
                      <Label htmlFor="rating" >Rating</Label>
                      <Control.select model=".rating" id="rating" name="rating"
                        className="form-control">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Control.select>
                    </Row>
                    
                    <Row className="form-group">
                      <Label htmlFor="name" >Your Name</Label>
                      <Control.text model=".name" id="name" name="name"
                        placeholder = "Your name"
                        className="form-control"
                        validators={{
                          minLength : minLength(3),
                          maxLength : maxLength(15)
                        
                        }}/>
                        <Errors className="text-danger"
                                model=".name"
                                show="touched"
                                messages={{
                                
                                  minLength: 'Must be greater than 2 characters',
                                  maxLength: 'Must be 15 characters or less',
                                 }}/>
                    </Row>

                    <Row className="form-group">
                      <Label htmlFor="rating" >Comment</Label>
                      <Control.textarea model=".comment" id="comment" name="comment"
                        rows="6"
                        className="form-control"/>
                    </Row>
                  </div>
                  <Button type="submit" value="submit" color="primary">Submit</Button>
                </LocalForm>
              </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}


  function RenderDish({dish}){

    return(
      <div className = "col-12 col-md-5 m-1">
      <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
      </Card>
    </div>
    );
  }


  function RenderComments({comments}){
    const comm = comments.map((comment)=>{
      return(
        <div className = "comment-item " key={comment.id}>
          <ul className ="list-unstyled">
            <li>
              {comment.comment}
              <br></br>
              --{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}

            </li>
          </ul>
        </div>
      );
    });
    return(
      <div className = "col-12 col-md-5 m-1">
        <Card >
          <CardBody>
            <CardTitle><strong>Comments</strong></CardTitle>
            
            {comm}
            
            <CommentForm/>
          </CardBody>
        </Card>
      </div>
    );
  }

  function DishDetail({dish, comments}){

    if (dish != null){
     
        return(
          <div className = "container">
            <div className = "row">
            <Breadcrumb>

              <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
              <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
            
            </Breadcrumb>
            <div className="col-12">
              <h3>{dish.name}</h3>
              <hr />
            </div>                
            </div>
            <div className="row">
              <CardGroup>
                <RenderDish dish = {dish}/>

                <RenderComments comments = {comments}/>
              </CardGroup>
            </div>
          </div>
        );
      }
    else
        return(
            <div></div>
        );
  }

export default DishDetail;