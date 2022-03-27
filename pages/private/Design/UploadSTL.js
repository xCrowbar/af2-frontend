import React, { Component } from 'react';
import { create } from "ipfs-http-client";

class UploadSTL extends Component{

  constructor({changeFile}){
    super();
    this.state = {file : undefined, photo: undefined, Taur: undefined, Taup: undefined, Component: undefined};
    this.changeFile = changeFile;
    this.ipfs = create({ host: '127.0.0.1', port: '5001', protocol: 'http', apiPath: '' });
  } 
  
	onChange(event) {
    if(event.target.files[0] === undefined) return;
    let reader = new FileReader();
    reader.readAsArrayBuffer(event.target.files[0]);
    reader.onload = () => {
      this.setState({file : reader.result});
    }
    let reader2 = new FileReader();
    reader2.readAsDataURL(event.target.files[0]);
    reader2.onload = () => {
      this.changeFile(reader2.result);
    }
  }

  getFrame() {
    if(!this.state.file) {
      alert('Carica un STL prima di fare una foto!');
      return;
    }
    let canvas = document.getElementsByTagName("canvas")[0];
    this.setState({photo: canvas.toDataURL()});
  }

  async submitForm(event) {
    if(!this.state.photo || !this.state.file) {
      alert('Carica un STL e fai una foto prima di Annunciare!');
      return;
    }
    let file = await this.ipfs.add(this.state.file);
    let photo = await this.ipfs.add(this.state.photo);
    if(file && file.path && photo && photo.path) {
      alert('Operazione completata!');
      console.log(this.state);
    }
  }

	render() {
		return(
      <>
        <img class="screenshotDiv" src={this.state.photo}/>
        <div class="announceDiv">
          <input class="announceButton" type="file" onChange={(event) => this.onChange(event)}/>
          <input class="announceButton" type="text" placeholder="Component" onChange={(event) => this.setState({ Component: event.target.value})}/>
          <input class="announceButton" type="text" placeholder="Taur" onChange={(event) => this.setState({ Taur: event.target.value})}/>
          <input class="announceButton" type="text" placeholder="Taup" onChange={(event) => this.setState({ Taup: event.target.value})}/>
          <button class="announceButton" onClick={(event) => this.submitForm(event)}>Announce Design</button>
          <button class="announceButton" onClick={(event) => this.getFrame(event)}>Take a snap!</button>
        </div>
      </>
		)
	}
}

export default UploadSTL;