import React from "react";

export function isArraysEqual (arr1: any, arr2: any) {
  // if the other array is a falsy value, return
  if (!arr1 || !arr2)
      return false;

  // compare lengths
  if (arr2.length !== arr1.length)
      return false;

  for (var i = 0, l=arr2.length; i < l; i++) {

    if (JSON.stringify(arr2[i]) !== JSON.stringify(arr1[i])) { 
          // Warning - two different object instances will never be equal: {x:20} != {x:20}
          return false;   
      }           
  }       
  return true;
}

export function convertUnicode(input: string | null) {
  if(!input) return '';
  return input.replace(/\\u[0-9a-fA-F]{4}/g, function (a, b) {
    var charcode = parseInt(b, 16);
    return String.fromCharCode(charcode);
  });
}

export function convertIndentsToHTML(str : string){
  if(!str) return ''
  str = encodeSpecChars(str)
  let regEx = /\b(img=https?:\/\/.*?\.[a-z]{2,4}\/[^\s]*\b)/g;
  return str.split("\n").map((el, idx) => {
    let img = el.match(regEx)
    return (
      <React.Fragment key={idx}>
        {img? <img src={img[0].slice(4)} alt="img" style={{maxWidth: '70vw'}}/> : el}
        <br />
      </React.Fragment>
    );
  })
}

export function encodeSpecChars(str:string) {
  if(!str) return '';
  return str.replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"');
}

export function $(query: string): HTMLElement | null {
  return document.querySelector(query);
}
