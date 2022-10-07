import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as $ from 'jquery'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

$(function(){

  // let helpBtn = document.querySelector('.help-info-btn');
  // helpBtn.addEventListener('click', function(e){
  //   console.log(e);
  // })

  // $('.help-info-btn').on("click mousedown touchstart", (e) => {
  //   $('.help-text').hide();
  //   let helpEle = $(e.currentTarget.parentElement).children().eq(0);
  //   let eleHeight = (parseInt($(helpEle).css("height").replace(/px/,"")));
  //   eleHeight = (eleHeight+(eleHeight/2)) * -1;
  //   $(helpEle).css({"transform": "translate(0px, "+eleHeight+"px)"});
  //   $(helpEle).show();
    
    
  // })
  // $('.help-text').on("mouseout", (e) => {
  //   let helpEle = $(e.currentTarget.parentElement).children().eq(0);
  //   $(helpEle).hide();
  
  // })
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
