import React, {Component} from 'react';
import {Card,CardImg,CardTitle,CardBody,CardText, CardGroup,BreadcrumbItem,Breadcrumb} from 'reactstrap';
import {Link} from 'react-router-dom';

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