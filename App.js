/** @jsx jsx */
import React, { Component } from 'react';
import { jsx } from '@emotion/core';
import axios from 'axios';
import sun from './sun.jpg';
import storm from './storm.png';

class GetData extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      //id: [],
      //topic: [],
      //sentiment: []
    };
  }

  componentDidMount() {
    const id = this.props.id;
    console.log(id);
    axios.get('http://localhost:8081/api/' + id).then(res => {
      const dat = res.data;
      console.log(dat);
      this.setState({
        data: res.data,
        //id: res.data.id,
        //topic: dat.topic,
        sentiment: res.data[0].sentiment
      });
      console.log(this.state.data);
      console.log(this.state.sentiment);
    });
  }


  render() {
    const {data} = this.state;
    //console.log(data);
    return(
          <React.Fragment>
          <div className = "scoreBox"
          css = {{
            borderRadius: 25,
            background: `${this.state.sentiment < 0 ? '#8B0000' : '#228B22'}`,
            padding: 20,
            width: 250,
            height: 120,
            fontColor: 'white'
          }}>

            <p />
            {data.map(data => <div>{data.topic}</div>)}
            <p />
            {data.map(data => <div>{data.sentiment}</div>)}

          </div>
          </React.Fragment>
        );}

      }


class Forecast extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      line: []
    };
    //this.state = this.state.bind(this);
    //this.state.data = this.state.data.bind(this);
    //this.state.line = this.state.line.bind(this);
  }

  componentDidMount() {
    //const id = this.props.id;

    axios.get('http://localhost:8081/api/11').then(res => {
      //const dat = res.data;
      //console.log(dat);
      this.setState({
        data: res.data,
        //id: res.data.id,
        //topic: dat.topic,
        sentiment: res.data[0].sentiment,


      })


    }).then(console.log(this.state.line));
  }


  render() {
    const {data} = this.state;

    return(
      <React.Fragment>
      <div className = 'headerForecast'>
      <div css = {{

        height: 60,
        width: 160,
        marginTop: -43,
        marginLeft: 480,
        fontFamily: 'Impact, serif',
        fontSize: 48,
        display: 'flex',
        flexDirection: 'row',
        color: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
      }}>

      <div css = {{
        textAlign: 'center'
      }}>
      {this.state.sentiment < 0 ? <img css = {{
        height: 90,
        width: 90
      }} src={storm} alt = "storm"/> : <img src={sun} alt = "sun" />}
      </div>
      </div>
      </div>
      </React.Fragment>
    )
  }
}






function App() {
  return (
    <div className="App">

      <header className="App-header"
      css = {{
        background: '#5246a0',
        height: 90,
        fontFamily: 'Impact, serif',
        fontSize: 36,
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
      }}>

        <div>
          Today's Social Media Forecast:
          <Forecast />

        </div>



      </header>




      <div className = "container"
      css = {{
        background: '#5246a0',
        height: 1900,
        width: 700,
        margin: 'auto',
        border: '3px solid #000000'
      }}>
        <div className = "overview"
        css = {{
          fontFamily: 'Impact, serif',
          fontSize: 24,
          color: '#ffffff',
          textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
          padding: 25
        }}>

        <div> <GetData id = {1}/> </div>
        <p></p>
          <div><GetData id = {2}/></div>
          <p></p>
          <div><GetData id = {3}/> </div>
          <p></p>
          <div> <GetData id = {4}/> </div>
          <p></p>
          <div> <GetData id = {5}/> </div>
          <p></p>
          <div> <GetData id = {6}/> </div>
          <p></p>
          <div> <GetData id = {7}/> </div>
          <p></p>
          <div> <GetData id = {8}/> </div>
          <p></p>
          <div> <GetData id = {9}/> </div>
          <p></p>
          <div> <GetData id = {10}/> </div>


        </div>
        <div className = "trending-topic"
        css = {{
          fontFamily: 'Impact, serif',
          fontSize: 24,
          color: '#ffffff',
          textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
          padding: 25
        }}>


        </div>
    </div>

    </div>
  );
}

export default App;
