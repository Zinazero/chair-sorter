import './App.css';
import React, { useState } from 'react';

function App() {
  const [frontRow, setFrontRow] = useState(['Alyssa', 'Jacob', 'Randall', 'Jake', 'Emma', 'Mason', 'Hunter']);
  const [backRow, setBackRow] = useState(['Keara', 'Ash', 'Matt', 'Alex', 'Nat', 'Kara', 'Jared', 'Rohit']);


  const moveLeft = (e, row) => {
    let arr = [];
    if (row === 'front') {
      arr = [...frontRow];
    } else {
      arr = [...backRow];
    }


    const moveIndex = arr.indexOf(e);
    const swapIndex = arr.indexOf(e) - 1;


    [arr[moveIndex], arr[swapIndex]] = [arr[swapIndex], arr[moveIndex]];
    if (row === 'front') setFrontRow(arr);
    if (row === 'back') setBackRow(arr);

  }

  const moveRight = (e, row) => {
    let arr = [];
    if (row === 'front') {
      arr = [...frontRow];
    } else {
      arr = [...backRow];
    }


    const moveIndex = arr.indexOf(e);
    const swapIndex = arr.indexOf(e) + 1;


    [arr[moveIndex], arr[swapIndex]] = [arr[swapIndex], arr[moveIndex]];
    if (row === 'front') setFrontRow(arr);
    if (row === 'back') setBackRow(arr);

  }

  const moveToOther = (e, row) => {
    let oldArr = [];
    let newArr = [];
    if (row === 'front') {
      oldArr = [...frontRow];
      newArr = [...backRow];
    } else {
      oldArr = [...backRow];
      newArr = [...frontRow];
    }

    const moveIndex = oldArr.indexOf(e);
    oldArr.splice(moveIndex, 1);
    newArr.push(e);

    if (row === 'front') {
      setFrontRow(oldArr);
      setBackRow(newArr);
    } else {
      setBackRow(oldArr);
      setFrontRow(newArr);
    }

  }

  const sort = () => {
    const arr = [];
    const rows = [
      ['Alyssa', 'Jacob', 'Randall', 'Jake', 'Emma', 'Mason', 'Hunter', 'Keara', 'Ash', 'Matt', 'Alex', 'Nat', 'Kara', 'Jared', 'Rohit'],
      ['Alyssa', 'Jacob', 'Randall', 'Jake', 'Emma', 'Mason', 'Hunter', 'Keara', 'Ash', 'Matt', 'Alex', 'Nat', 'Kara', 'Jared', 'Rohit']
    ];
    let people = ['Alyssa', 'Jacob', 'Randall', 'Jake', 'Emma', 'Mason', 'Hunter', 'Keara', 'Ash', 'Matt', 'Alex', 'Nat', 'Kara', 'Jared', 'Rohit'];

    function shuffleArray(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; 
      }
    }

    shuffleArray(people);

    for (let i = 0; i < 9; i++) {
      rows[0][i] = people[i]; 
      console.log(rows);
    }

  }


  // for (let i = 0; i <= 50; i++) {
  //   let person = people.shift();
  //   if (fRow.length < 7) {
  //     fRow.unshift(person);
  //   } else if (bRow.length < 8) {
  //     bRow.unshift(person);
  //   } else {
  //     console.error(fRow.length, bRow.length);
  //   }
  //
  //   console.log('Front:', fRow);
  //   console.log('BacK:', bRow);
  // }


  return (
    <div className="App">
      <div className="mainView">
        <table>
          <tbody>
            <tr className="row" id="front-row">
              {frontRow.map((person, index) => (
                <td key={index} className="person">
                  {index > 0 && (
                    <button value={person} onClick={(e) => moveLeft(e.target.value, 'front')}>{'<'}</button>
                  )}
                  <button value={person} onClick={(e) => moveToOther(e.target.value, 'front')}>{person}</button>
                  {index < frontRow.length - 1 && (
                    <button value={person} onClick={(e) => moveRight(e.target.value, 'front')}>{'>'}</button>
                  )}
                </td>
              ))}
            </tr>
            <tr className="row" id="back-row">
              {backRow.map((person, index) => (
                <td key={index} className="person">
                  {index > 0 && (
                    <button value={person} onClick={(e) => moveLeft(e.target.value, 'back')}>{'<'}</button>
                  )}
                  <button value={person} onClick={(e) => moveToOther(e.target.value, 'back')}>{person}</button>
                  {index < backRow.length - 1 && (
                    <button value={person} onClick={(e) => moveRight(e.target.value, 'back')}>{'>'}</button>
                  )}
                </td>
              ))}
              <button onClick={() => sort()}>SORT</button>
            </tr >
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
