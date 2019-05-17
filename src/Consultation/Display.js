import React, { Component } from 'react'
import axios from 'axios';
import SERVER_URL from '../constants/server';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
// import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class Display extends Component {
	constructor(props){
    super(props);
    this.state = {
      products: '',
      apptLength: '',
      estimate: '',
      stylistComment: '',
      consultationID: this.props.consultation._id,
      approved:true
    };
  }

  handleProductsChange = (e) => { this.setState({ products: e.target.value }); }

  handleTimeChange = (e) => { 
  	let timeArr = e.target.value.split(':')
  	let seconds = (timeArr[0] * 3600) + (timeArr[1] * 60)
  	this.setState({ apptLength: seconds }); 
  }

  handleCostChange = (e) => { this.setState({ estimate: e.target.value }); }

  handleStylistCommentChange = (e) => { this.setState({ stylistComment: e.target.value }); }

  handleSubmit = (e) => {
  	// this.setState({approved:true})
    e.preventDefault();
    console.log('HERE - handle submit', this.state)
    let token = localStorage.getItem('serverToken');
    // SEND DATA TO SERVER
    axios.put(`${SERVER_URL}/consultation/display`, this.state, {
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    })
    .then(response => {
    	console.log('consultation response', response)
    })
    .catch(error => {
      console.log('error', error)
    })
  }

	render() {
		let currentPhotos = this.props.consultation.currentHair.map((c, i) => {
			return (
				<div key={i}>
	        <img src={c} alt="Before Hair" />
	      </div>
	    )
		})
		let dreamPhotos = this.props.consultation.dreamHair.map((d, i) => {
			return (
				<div key={i}>
	        <img src={d} alt="Dream Hair" />
	      </div>
      )
		})
		return (
			<div>
				<FormText color="muted">
          Current hair photos
        </FormText>
        <Carousel>
          {currentPhotos}
        </Carousel>
				<hr />
				<FormText color="muted">
          Dream hair photos
        </FormText>
        <Carousel>
          {dreamPhotos}
        </Carousel>
				<hr />
				<FormText color="muted">
          Client Comments
        </FormText>
          {this.props.consultation.clientComment}
				<hr />
				<FormText color="muted">
          Your Reply
        </FormText>
				<Form onSubmit={this.handleSubmit}>
	        <FormGroup>
	          <Label for="products">Products</Label>
	          <Input type="text" name="products" id="products" value={this.state.products} onChange={this.handleProductsChange}/>
	        </FormGroup>
	        <FormGroup>
          <Label for="apptLength">Time Required</Label>
          <Input type="select" name="apptLength" id="apptLength" onChange={this.handleTimeChange}>
            <option>-:--</option>
            <option>0:15</option>
            <option>0:30</option>
            <option>0:45</option>
            <option>1:00</option>
            <option>1:15</option>
            <option>1:30</option>
            <option>1:45</option>
            <option>2:00</option>
            <option>2:15</option>
            <option>2:30</option>
            <option>2:45</option>
            <option>3:00</option>
            <option>3:15</option>
            <option>3:30</option>
            <option>3:45</option>
            <option>4:00</option>
            <option>4:15</option>
            <option>4:30</option>
            <option>4:45</option>
            <option>5:00</option>
            <option>5:15</option>
            <option>5:30</option>
            <option>5:45</option>
            <option>6:00</option>
            <option>6:15</option>
            <option>6:30</option>
            <option>6:45</option>
            <option>7:00</option>
            <option>7:15</option>
            <option>7:30</option>
            <option>7:45</option>
            <option>8:00</option>
          </Input>
        </FormGroup>
 					<FormGroup>
	          <Label for="estimate">Estimated Cost</Label>
	          <Input type="text" name="estimate" id="estimate" value={this.state.estimate} onChange={this.handleCostChange}/>
	        </FormGroup>
	       {/* <FormGroup check>
	          <Label check>
	            <Input type="checkbox" name="cut" value="cut"/>{' '}
	            Cut
	          </Label>
	        </FormGroup>
	        <FormGroup check>
	          <Label check>
	            <Input type="checkbox" name="color" value="color"/>{' '}
	            Color
	          </Label>
	        </FormGroup>*/}
	        <FormGroup>
	          <Label for="stylistComment">Process Description</Label>
	          <Input type="hidden" name="approved" value="true" id="approved" />
	          <Input type="textarea" name="stylistComment" id="stylistComment" value={this.state.stylistComment} onChange={this.handleStylistCommentChange}/>
	        </FormGroup>
	        <Button color="success" type="submit" >Approve and Send</Button>
	      </Form>
	      <br />
	      <br />
			</div>
		)
	}
}

export default Display