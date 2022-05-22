import React from "react";
import {getMergeSortAnimations} from '../SortingAlgorithms/MergeSort.js';
import { getQuickSortAnimations } from "../SortingAlgorithms/QuickSort.js";
import { getBubbleSortAnimations } from "../SortingAlgorithms/BubbleSort.js";
import { getInsertionSortAnimations } from "../SortingAlgorithms/InsertionSort.js";
import "./SortingVisualizer.css";
// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;
export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            array: [],
        };
    }
    componentDidMount(){
        this.resetArray();
    }
    resetArray(){
        const array=[];
        for(let i=0;i<310;i++){
            array.push(randomIntFromInterval(5,700)
            );
        }
        this.setState({array});
    }
    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? 'red' : 'turquoise';
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
          }
        }
    }
    quickSort() {
      const animations = getQuickSortAnimations(this.state.array);
      for (let i = 0; i < animations.length; i++) {
        const isColorChange =
          animations[i][0] === "comparison1" ||
          animations[i][0] === "comparison2";
        const arrayBars = document.getElementsByClassName("array-bar");
        if (isColorChange === true) {
          const color =
            animations[i][0] === "comparison1"?'red': 'turquoise';
          const [, barOneIndex, barTwoIndex] = animations[i];
          const barOneStyle = arrayBars[barOneIndex].style;
          const barTwoStyle = arrayBars[barTwoIndex].style;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
        } else {
          const [, barIndex, newHeight] = animations[i];
          if (barIndex === -1) {
            continue;
          }
          const barStyle = arrayBars[barIndex].style;
          setTimeout(() => {
            barStyle.height = `${newHeight}px`;
          }, i * ANIMATION_SPEED_MS);
        }
      }
    }
    insertionsort() {
       // Handles displaying insertion sort animations
    const animations = getInsertionSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange =
        animations[i][0] === "comparison1" ||
        animations[i][0] === "comparison2";
      const arrayBars = document.getElementsByClassName("array-bar");
      if (isColorChange === true) {
        const color =
          animations[i][0] === "comparison1"? 'red': 'turquoise';
        const [, barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [, barIndex, newHeight] = animations[i];
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    }
    bubbleSort() {
        // Handles displaying bubble sort animations
    const animations = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange =
        animations[i][0] === "comparison1" ||
        animations[i][0] === "comparison2";
      const arrayBars = document.getElementsByClassName("array-bar");
      if (isColorChange) {
        const color =
          animations[i][0] === "comparison1"? 'red': 'turquoise';
        const [, barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [, barIndex, newHeight] = animations[i];
        if (barIndex === -1) {
          continue;
        }
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    }

    testSortingAlgorithms(){
        for(let i=0;i<100;i++){
            const array=[];
            const length=randomIntFromInterval(1,1000);
            for(let i=0;i<length;i++){
                array.push(randomIntFromInterval(-1000,1000));
            }
            const javaScriptSortedArray=array.slice().sort((a,b)=>a-b);
            const mergeSortedArray=getMergeSortAnimations.mergeSort(array.slice());
            console.log(arrayAreEqual(javaScriptSortedArray,mergeSortedArray));
        }
    }
    render(){
        const {array}=this.state;
        return (
            <div className="array-container">
                {
                array.map((value,idx)=>(
                    <div className="array-bar" 
                    key={idx} 
                    style={{ 
                        backgroundColor: 'turquoise',
                        height: `${value}px`,
                    }}></div>
            ))}
            <div className='aa'>
            <button onClick={()=>this.resetArray()}>Generate New Array</button>
            <button onClick={()=>this.mergeSort()}>Merge Sort</button>
            <button onClick={()=>this.quickSort()}>Quick Sort</button>
            <button onClick={()=>this.insertionsort()}>Insertion Sort</button>
            <button onClick={()=>this.bubbleSort()}>Bubble Sort</button>
            </div>
            </div>
        );
    }
}

export function randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function arrayAreEqual(arrayOne,arrayTwo){
    if(arrayOne.length !==arrayTwo.length) return false;
    for(let i=0;i<arrayOne.length;i++){
        if(arrayOne[i]!==arrayTwo[i]) return false;
    }
    return true;
}